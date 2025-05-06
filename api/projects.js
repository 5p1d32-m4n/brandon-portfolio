import {sql} from '@vercel/postgres';

export default async function handler(req, res) {
    // Check request method (GET, POST, PUT, DELETE)
    if (req.method === 'GET') {
        try{
            const {rows: projects} = await sql `SELECT * FROM projects ORDER BY id ASC;`;
            res.status(200).json(projects); // Send the projects as a JSON response
        }catch(e){
            console.error('Database error:', e);
            res.status(500).json({message: 'Error fetching projects', error: e.message});
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });

    }
}