import { sql } from '@vercel/postgres';
import { createClient } from '@vercel/postgres';

export default async function handler(req, res) {

    // Log environment variables directly at the start of the function
    console.log('--- ENVIRONMENT VARIABLES ---');
    console.log('MY_SUPER_TEST_VARIABLE:', process.env.MY_SUPER_TEST_VARIABLE);
    console.log('POSTGRES_URL from env:', process.env.POSTGRES_URL);
    console.log('-----------------------------');

    // Create a new client for each request when using createClient directly.
    // This is suitable for serverless functions.
    const client = createClient({
        connectionString: process.env.POSTGRES_URL // Pass the direct connection string here
    });
    console.log('Client created:', client);

    // Check request method (GET, POST, PUT, DELETE)
    if (req.method === 'GET') {
        try {
            console.log('Connecting to the database...');
            await client.connect(); // Connect to the database
            console.log('Client connected to the database');
            const { rows: projects } = await client.query(`SELECT * FROM projects ORDER BY id ASC;`);
            await client.end(); // Close the connection after the query

            res.status(200).json(projects); // Send the projects as a JSON response
        } catch (e) {
            if (client) await client.end().catch(e => console.error("Error ending client", e));
            console.error('Database Error with createClient():', error);
            response.status(500).json({
                message: 'Error fetching projects with createClient',
                error: error.message,
                code: error.code,
                details: error.toString()
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });

    }
}