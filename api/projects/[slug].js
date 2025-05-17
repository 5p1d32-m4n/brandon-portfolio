import { sql as vercelSql } from "@vercel/postgres";
import { Pool as PgPool } from "pg";

// --- Database Configuration (reuse from your main api/projects.js or centralize) ---
console.log('----------------------------------------------------');
console.log('SINGLE PROJECT API: Initializing DB config');
console.log('RAW process.env.NODE_ENV:', process.env.VERCEL_ENV);
console.log('POSTGRES_URL from env:', process.env.POSTGRES_URL);
console.log('----------------------------------------------------');

const isDevelopmentEnv = process.env.VERCEL_ENV === 'development';
const isConnectingToLocalhost = process.env.POSTGRES_URL &&
    (process.env.POSTGRES_URL.includes('localhost') ||
        process.env.POSTGRES_URL.includes('127.0.0.1'));

const shouldUsePgLocally = isDevelopmentEnv && isConnectingToLocalhost;

let localPgPool;

if (shouldUsePgLocally) {
    console.log('INFO: Using standard `pg` Pool for local development against localhost.');
    localPgPool = new PgPool({
        connectionString: process.env.POSTGRES_URL,
    })
    localPgPool.on('error', (err, cli) => {
        console.error('!!! ERROR: Local `pg` pool idle client error: ', err.message, err.stack);
    })
} else {
    console.log('SINGLE PROJECT API: Configured to use Vercel Postgres SDK (`sql` tag).');
}

export default async function handler(req, res) {
    const { slug } = req.query; //Get the 'slug' from /api/projects/[slug]

    console.log(`--- SINGLE PROJECT API HANDLER for slug: ${slug} ---`);
    console.log(`INFO: shouldUsePgLocally=${shouldUsePgLocally}`);
    console.log('-------------------------------------------------');

    if (!slug) {
        return res.status(400).json({ message: 'Slug is required' });
    }

    if (req.method === 'GET') {
        try {
            const queryText = `
                SELECT
                    p.id,
                    p.title,
                    p.slug,
                    p.description,       -- Changed from p.caption
                    p.short_description, -- Added
                    p.project_type,      -- Added
                    p.status,            -- Added
                    p.tech_stack,        -- Added
                    p.hero_image_url,
                    p.logo_image_url,
                    p.repo_link,
                    p.live_demo_url,
                    p.view_case_href,
                    p.link_color, 
                    p.created_at,
                    COALESCE(
                        (SELECT JSON_AGG(ROW_TO_JSON(pi_sub.*) ORDER BY pi_sub.display_order ASC)
                         FROM (
                            SELECT
                                pi.id as image_id,
                                pi.image_public_id,
                                pi.caption,
                                pi.alt_text,
                                pi.display_order
                            FROM project_images pi
                            WHERE pi.project_id = p.id
                         ) pi_sub
                        ), '[]'::json
                    ) as images
                FROM projects p
                WHERE p.slug = $1;
            `;

            let project;

            if (shouldUsePgLocally && localPgPool) {
                console.log(`Querying single project (slug: ${slug}) with local \`pg\` pool...`);
                const result = await localPgPool.query(queryText, [slug]);
                project = result.rows[0];
            } else {
                console.log(`Querying single project (slug: ${slug}) with Vercel \`sql\` tag...`);
                const queryResult = await vercelSql.query(queryText, [slug]); // Use .query() for parameterized queries with vercelSql
                project = queryResult.rows[0];
            }

            if (project) {
                console.log(`Successfully queried project: ${project.title}`);
                res.status(200).json(project);
            } else {
                console.log(`Project with slug "${slug} not found.`);
                res.status(404).json({ message: `Project with slug "${slug}" not found.` })
            }
        } catch (error) {
            console.error(`!!! DATABASE OPERATION ERROR for slug ${slug} !!!:`, error);
            res.status(500).json({
                message: 'Error fetching project',
                error: error.message,
                code: error.code,
                stack: error.stack
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}