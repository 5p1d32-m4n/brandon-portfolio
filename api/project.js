
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
} else{
    console.log('INFO: Configured to use Vercel Postgres SDK (`sql` tag) for deployed environment.');
}

export default async function handler(req, res) {

    if (req.method == 'Get'){
        try {
            let project;
            if(localPgPool){
                console.log('Querying with local `pg` pool...');
                const result = await localPgPool.query('SELECT * FROM projects WHERE slug = $1;', [req.query.slug]);
            }
        } catch (error) {
            console.error('!!! DATABASE OPERATION ERROR !!!:', error);
            res.status(500).json({
                message: 'Error fetching projects',
                error: error.message,
                code: error.code,
                stack: error.stack
            });
            
        }
    }
}