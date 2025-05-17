-- Create the projects table if it doesn't already exist
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT, -- For brief summaries on cards, etc.
    project_type VARCHAR(50) DEFAULT 'Personal Project', -- Example: 'Personal Project', 'Client Work', 'Freelance'
    status VARCHAR(50) DEFAULT 'Completed', -- Example: 'Completed', 'In Progress', 'Archived'
    hero_image_url VARCHAR(255), -- Cloudinary Public ID for main hero image
    logo_image_url VARCHAR(255), -- Cloudinary Public ID for project logo
    tech_stack TEXT, -- Comma-separated string, or JSON string of tech used
    repo_link VARCHAR(255),
    live_demo_url VARCHAR(255),
    view_case_href VARCHAR(255), -- For "View Case" type links
    link_color VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the project_images table if it doesn't already exist
CREATE TABLE IF NOT EXISTS project_images (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_public_id VARCHAR(255) NOT NULL, -- Cloudinary Public ID for this image
    caption TEXT,                          -- Renamed from 'description' for clarity regarding image caption
    alt_text VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Corrected typo from 'uploadaded_at'
);

-- Insert Initial project data (projects)
-- It's generally recommended to let SERIAL handle 'id' generation.
-- If you manually insert 'id', ensure your application or future manual inserts don't conflict.
-- For a one-time seed script, manually setting IDs is okay if you manage them carefully for foreign keys.
-- Added new fields: short_description, project_type, status, tech_stack

INSERT INTO projects (
    id, title, slug, description, short_description, project_type, status,
    hero_image_url, logo_image_url, tech_stack,
    repo_link, live_demo_url, view_case_href, link_color, created_at
) VALUES (
    1,
    'WarMiniPricer',
    'warminipricer',
    'Engineered a web application featuring automated web scraping to gather and track pricing data for miniature figurines across multiple e-commerce sites. This tool, built for local retailer Wargamer''s Alley, provides insights into market trends and includes modules for pre-order and delivery management, enhancing their inventory control and pricing decisions.',
    'A web scraping and price tracking tool for miniature figurines, aiding a local retailer with inventory and pricing.', -- Example short_description
    'Personal Project', -- Example project_type
    'Completed',        -- Example status
    'minis-list_x0pcqh', -- Cloudinary Public ID
    'WSLogo_frf8cu',     -- Cloudinary Public ID
    'Python, Scrapy, Django, React, PostgreSQL, Docker', -- Example tech_stack
    'https://github.com/YOUR_USERNAME/YOUR_WARMINI_REPO', -- <<< PLEASE UPDATE
    'https://your-warmini-demo-live-url.com', -- <<< PLEASE UPDATE
    NULL,                -- Use NULL if no link, rather than empty string for URLs
    '#F7BF00',
    '2025-05-06 19:35:08.507' -- Specific creation date
);

INSERT INTO projects (
    id, title, slug, description, short_description, project_type, status,
    hero_image_url, logo_image_url, tech_stack,
    repo_link, live_demo_url, view_case_href, link_color, created_at
) VALUES (
    2,
    'STG-ERP',
    'stg-erp',
    'An ERP system, which stands for ''Enterprise Resource Planning'', is a software system that integrates and automates a company''s core business processes, including finance, human resources, manufacturing, supply chain, sales, and procurement, providing a unified view of all operations and a single source of truth for data across different departments within ShareTechGroup Engineering.',
    'A comprehensive ERP system to integrate and automate core business processes for an engineering group.', -- Example short_description
    'Client Work',      -- Example project_type
    'Completed',        -- Example status
    'erpHome_rwt3e0',   -- Cloudinary Public ID
    'stgLogo_zeelur',   -- Cloudinary Public ID
    '.NET Core, C#, React, Microsoft SQL Server, Azure DevOps', -- Example tech_stack
    NULL,               -- Use NULL if no link
    NULL,               -- Use NULL if no link
    'https://your-stg-erp-case-study-url.com', -- <<< PLEASE UPDATE
    '#F7BF00',
    '2025-05-06 19:35:08.544' -- Specific creation date
);

-- Insert initial project data (project images)
-- Omitting 'id' from INSERT to let SERIAL handle it is recommended.
-- However, if you keep manual 'id' for project_images, ensure they are unique.
-- Changed 'description' to 'caption' to match table DDL.
-- Corrected 'uploadaded_at' to 'uploaded_at'.

INSERT INTO project_images (id, project_id, image_public_id, caption, alt_text, display_order, uploaded_at)
VALUES (1, 1, 'minis-list_x0pcqh', 'Home view of WarMiniPricer', 'WarMiniPricer home screenshot', 0, '2025-05-10 23:44:45.350');

INSERT INTO project_images (id, project_id, image_public_id, caption, alt_text, display_order, uploaded_at)
VALUES (2, 1, 'mini-detail_maj080', 'Miniature detail view with price history', 'Screenshot of war mini details and pricing', 1, '2025-05-10 23:44:45.350');

-- IDs 3,4,5,6 are missing in your original script for project_images for project_id 1, which is fine, but be aware of gaps if manually setting IDs.
-- I'll assume you want to continue the sequence you started if IDs are manual.

INSERT INTO project_images (id, project_id, image_public_id, caption, alt_text, display_order, uploaded_at)
VALUES (7, 1, 'modalStoreOrder_j3q9gg', 'Modal for creating a new store order', 'Store order form modal', 3, '2025-05-10 23:46:46.075');

INSERT INTO project_images (id, project_id, image_public_id, caption, alt_text, display_order, uploaded_at)
VALUES (8, 1, 'modalContactSupplier_mkhdbh', 'Modal for contacting a supplier', 'Supplier Contact form modal', 4, '2025-05-10 23:46:46.075');

INSERT INTO project_images (id, project_id, image_public_id, caption, alt_text, display_order, uploaded_at)
VALUES (9, 1, 'modalDeliveryOrder_k6dstt', 'Modal for managing a delivery order', 'Delivery order form modal', 5, '2025-05-10 23:46:46.075');

-- Images for STG-ERP (project_id = 2)
INSERT INTO project_images (id, project_id, image_public_id, caption, alt_text, display_order, uploaded_at)
VALUES (10, 2, 'projectDashboard_ci8o48', 'Custom built dashboard for project health, finances and invoicing.', 'STG-ERP dashboard overview', 0, '2025-05-10 23:46:46.084');

INSERT INTO project_images (id, project_id, image_public_id, caption, alt_text, display_order, uploaded_at)
VALUES (11, 2, 'projectDetail_i5t2ov', 'Project detail overview and staff (Resources) breakdown.', 'Project detail overview.', 1, '2025-05-10 23:46:46.084');

INSERT INTO project_images (id, project_id, image_public_id, caption, alt_text, display_order, uploaded_at)
VALUES (12, 2, 'projectEdit2_nkzdtl', 'Project members and deliverable breakdown for deliverables', 'Project edit window', 2, '2025-05-17 00:22:01.123');

INSERT INTO project_images (id, project_id, image_public_id, caption, alt_text, display_order, uploaded_at)
VALUES (13, 2, 'projectDetail2_o4q3bi', 'Project health and detail overview with team preview', 'Project Detail view 2', 3, '2025-05-17 00:22:01.123');

INSERT INTO project_images (id, project_id, image_public_id, caption, alt_text, display_order, uploaded_at)
VALUES (14, 2, 'projectDetail3_f6rpif', 'Project cashflow management overview and projections', 'Project Detail view 3', 4, '2025-05-17 00:22:01.123');