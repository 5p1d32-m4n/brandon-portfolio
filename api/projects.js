import { sql as vercelSql } from '@vercel/postgres'; // For Vercel-deployed environments
import { Pool as PgPool } from 'pg'; // For local development

// Determine if running in local development with `vercel dev`
const isVercelDev = process.env.VERCEL_ENV === 'development';
// Check if the URL is for localhost or 127.0.0.1
const isConnectingToLocalhost = process.env.POSTGRES_URL &&
    (process.env.POSTGRES_URL.includes('localhost') ||
        process.env.POSTGRES_URL.includes('127.0.0.1'));

let localPgPool; // Define pool variable for the 'pg' library

// Only create the local 'pg' pool if we're in local dev AND connecting to localhost
if (isVercelDev && isConnectingToLocalhost) {
    console.log('INFO: Using standard `pg` Pool for local development against localhost.');
    localPgPool = new PgPool({
        connectionString: process.env.POSTGRES_URL,
        // The `pg` library typically doesn't need explicit sslmode=disable for localhost
        // as it attempts non-SSL first. Your string already has it, which is fine.
    });

    // Optional: Test the local pool immediately (for quick feedback during startup)
    localPgPool.query('SELECT NOW()')
        .then(res => console.log('Local `pg` pool connected successfully. DB time:', res.rows[0].now))
        .catch(err => console.error('!!! ERROR: Local `pg` pool failed to connect:', err));
} else {
    console.log('INFO: Configured to use Vercel Postgres SDK (`sql` tag) for deployed environment.');
}

export default async function handler(req, res) {
    console.log('--- PROJECTS API ---');
    // Ensure you use the correct test variable name from your .env file here
    console.log('SUPER_TEST_VARIABLE:', process.env.SUPER_TEST_VARIABLE);
    console.log('POSTGRES_URL from env:', process.env.POSTGRES_URL);
    console.log(`INFO: isVercelDev=${isVercelDev}, isConnectingToLocalhost=${isConnectingToLocalhost}`);
    console.log('--------------------');

    if (req.method === 'GET') {
        try {
            let projects;
            if (localPgPool) { // If we initialized the 'pg' pool for local dev
                console.log('Querying with local `pg` pool...');
                const result = await localPgPool.query('SELECT * FROM projects ORDER BY id ASC;');
                projects = result.rows;
            } else { // Otherwise, use Vercel's `sql` tag for deployed environments
                console.log('Querying with Vercel `sql` tag...');
                const queryResult = await vercelSql`SELECT * FROM projects ORDER BY id ASC;`;
                projects = queryResult.rows;
            }
            console.log('Successfully queried projects. Number of projects:', projects.length);
            res.status(200).json(projects);
            console.log('Response sent successfully.');
        } catch (e) {
            console.error('!!! DATABASE OPERATION ERROR !!!:', e);
            res.status(500).json({
                message: 'Error fetching projects',
                error: e.message,
                code: e.code,
                stack: e.stack
            });
        }
        // No explicit client.end() is needed here if using localPgPool (the pool manages connections)
        // or vercelSql (it manages its own connections, typically per query for serverless).
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}