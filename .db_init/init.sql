-- Create the projects table if it doesn't already exist
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT, -- Optional: For future use
    project_type VARCHAR(50) DEFAULT 'Default', -- Optional: For future use
    status VARCHAR(50) DEFAULT 'In Progress', -- Optional: For future use
    hero_image_url VARCHAR(255),
    logo_image_url VARCHAR(255),
    tech_stack TEXT, -- Optional: For future use
    repo_link VARCHAR(255),
    live_demo_url VARCHAR(255),
    view_case_href VARCHAR(255), -- For "View Case" type links
    link_color VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_images(
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    image_public_id VARCHAR(255) NOT NULL, -- Cloudianary public ID for this image
    description TEXT,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0,
    uploadaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
)

-- Insert initial project data
-- Note: Apostrophes in text are escaped by doubling them (e.g., Wargamer''s Alley)

INSERT INTO projects (title, slug, description, hero_image_url, logo_image_url, repo_link, live_demo_url, link_color)
VALUES (
    'WarMiniPricer',
    'warminipricer',
    'Engineered a web application featuring automated web scraping to gather and track pricing data for miniature figurines across multiple e-commerce sites. This tool, built for local retailer Wargamer''s Alley, provides insights into market trends and includes modules for pre-order and delivery management, enhancing their inventory control and pricing decisions.',
    '/assets/portfolioImages/warmini/minis-list.png', -- Placeholder: Update if served from app/blob
    '/assets/portfolioImages/warmini/WSLogo.jpeg',  -- Placeholder: Update if served from app/blob
    'https://github.com/YOUR_USERNAME/YOUR_WARMINI_REPO', -- <<< PLEASE UPDATE THIS
    'https://your-warmini-demo-live-url.com', -- <<< PLEASE UPDATE THIS
    '#F7BF00'
) ON CONFLICT (slug) DO NOTHING; -- Prevents error if script runs again on existing data

INSERT INTO projects (title, slug, description, hero_image_url, logo_image_url, view_case_href, link_color)
VALUES (
    'STG-ERP',
    'stg-erp',
    'An ERP system, which stands for ''Enterprise Resource Planning'', is a software system that integrates and automates a company''s core business processes, including finance, human resources, manufacturing, supply chain, sales, and procurement, providing a unified view of all operations and a single source of truth for data across different departments within ShareTechGroup Engineering.',
    '/assets/portfolioImages/erp/erpHome.png', -- Placeholder: Update if served from app/blob
    '/assets/portfolioImages/erp/stgLogo.png', -- Placeholder: Update if served from app/blob
    'https://your-stg-erp-case-study-url.com', -- <<< PLEASE UPDATE THIS (or use live_demo_url field instead)
    '#F7BF00'
) ON CONFLICT (slug) DO NOTHING;


-- Add more projects here if you like:
-- INSERT INTO projects (title, slug, ...) VALUES (...) ON CONFLICT (slug) DO NOTHING;

-- Grant privileges if needed, though the default user usually has them on the owned DB.
-- GRANT ALL PRIVILEGES ON TABLE projects TO postgres; -- 'postgres' or your user


-- Assuming WarMiniPricer was inserted into 'projects' and its 'id' is 1
-- (You might need to query the ID or know it if starting fresh)
INSERT INTO project_images (project_id, image_public_id, description, alt_text, display_order) VALUES
    (1, 'minis-list_x0pcqh', 'Home view', 'WarMiniPricer home screenshot', 0),
    (1, 'mini-detail_maj080', 'Miniature detail view', 'Screenshot of war mini details', 1),
    (1, 'portfolio/warminipricer/mobile_view_01', 'Mobile interface', 'WarMiniPricer on a mobile device', 2);
	(1, 'modalStoreOrder_j3q9gg', 'Store Order Modal', 'Store order form', 3);
	(1, 'modalContactSupplier_mkhdbh', 'Supplier Contact Modal', 'Supplier Contact form', 4);
	(1, 'modalDeliveryOrder_k6dstt', 'Delivery Order Modal', 'Delivery order form', 5);

-- Assuming STG-ERP was inserted into 'projects' and its 'id' is 2
INSERT INTO project_images (project_id, image_public_id, description, alt_text, display_order) VALUES
    (2, 'portfolio/stg_erp/overview_dashboard', 'ERP System Overview', 'STG-ERP dashboard overview', 0),
    (2, 'portfolio/stg_erp/module_finance', 'Finance Module', 'Screenshot of STG-ERP finance module', 1);