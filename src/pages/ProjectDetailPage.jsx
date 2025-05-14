// src/pages/ProjectDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom'; // Assuming react-router-dom
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fill, fit, scale } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

// Initialize Cloudinary (or import from a shared config)
const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME
    }
});

const ProjectDetailPage = () => {
    const { slug } = useParams(); // Get slug from URL
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchProject = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(`/api/projects/${slug}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`Project "${slug}" not found.`);
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProject(data);
            } catch (e) {
                console.error("Failed to fetch project:", e);
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [slug]); // Re-fetch if slug changes

    if (isLoading) {
        return <div className="p-8 text-center">Loading project details...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    }

    if (!project) {
        return <div className="p-8 text-center">Project not found.</div>;
    }

    // Main hero image for the detail page
    const mainHeroImage = project.hero_image_url
        ? cld.image(project.hero_image_url)
            .resize(scale().width(1200)) // Adjust size as needed
            .delivery(format('auto')).delivery(quality('auto'))
        : null;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-columbia-blue mb-2">{project.title}</h1>
                {project.logo_image_url && (
                    <div className="w-20 h-20 my-4">
                        <AdvancedImage
                            cldImg={cld
                                .image(project.logo_image_url)
                                .resize(fit().width(120).height(120))
                                .delivery(format('auto'))
                                .delivery(quality('auto'))}
                            alt={`${project.title} logo`}
                            className="object-contain rounded"
                        />
                    </div>
                )}
                <div className="flex space-x-4 mt-4">
                    {project.repo_link && (
                        <a href={project.repo_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub Repo</a>
                    )}
                    {project.live_demo_url && (
                        <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">Live Demo</a>
                    )}
                    {project.view_case_href && !project.live_demo_url && ( // Show if no live demo but case study exists
                        <a href={project.view_case_href} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">View Case Study</a>
                    )}
                </div>
            </header>

            {mainHeroImage && (
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                    <AdvancedImage cldImg={mainHeroImage} alt={`Hero image for ${project.title}`} className="w-full h-auto object-cover" />
                </div>
            )}

            <section className="prose prose-lg max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
                {/* Render description - split by double newlines for paragraphs */}
                {project.description && project.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                ))}
            </section>

            {project.images && project.images.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {project.images.map((img) => (
                            <div key={img.image_id} className="rounded-lg overflow-hidden shadow-md">
                                <AdvancedImage
                                    cldImg={cld.image(img.image_public_id).resize(fill().width(600).height(400).gravity(autoGravity())).delivery(format('auto')).delivery(quality('auto'))}
                                    alt={img.alt_text || img.caption || `Image for ${project.title}`}
                                    className="w-full h-auto object-cover"
                                />
                                {img.caption && <p className="p-2 text-sm text-gray-700 bg-gray-50">{img.caption}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="mt-12">
                <RouterLink to="/projects" className="text-blue-600 hover:underline">&larr; Back to All Projects</RouterLink>
            </div>
        </div>
    );
};

export default ProjectDetailPage;