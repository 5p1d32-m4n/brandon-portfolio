// src/pages/ProjectDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom'; // Assuming react-router-dom
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fill, fit, scale, pad } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

// Initialize Cloudinary (or import from a shared config)
const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME
    }
});

const ProjectDetail = () => {
    const { slug } = useParams(); // Get slug from URL
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isImageReady, setIsImageReady] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

    useEffect(() => {
        setCurrentImageIndex(0); // Reset image index when project changes
        if (project && project.images && project.images.length > 0) {
            setIsImageReady(false);
        }
    }, [project])

    useEffect(() => {
        setIsImageReady(false);
    }, [currentImageIndex])

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

    // Carousel navigation functions
    const goToNextImage = () => {
        if (project && project.images && project.images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
        }
    };
    const goToPreviousImage = () => {
        if (project && project.images && project.images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-xanthous tourney-unique mb-8">{project.title}</h1>
                {project.logo_image_url && (
                    <div className="w-48 h-48 mx-auto flex items-center justify-center">
                        <AdvancedImage
                            cldImg={cld
                                .image(project.logo_image_url)
                                .resize(pad().width(192).height(192))
                                .delivery(format('auto'))
                                .delivery(quality('auto'))}
                            alt={`${project.title} logo`}
                            className="object-contain rounded"
                        />
                    </div>
                )}
                <div className="flex space-x-4 mt-4">
                    {project.repo_link && (
                        <a href={project.repo_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>
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
                    {/* New wrapper for buttons and gallery for max-width and centering */}
                    <div className="w-full max-w-5xl mx-auto">
                        {/* Flex container for buttons and gallery */}
                        <div className="flex items-center justify-center">
                            {/* Previous Button - outside gallery, styled */}
                            {project.images.length > 1 && (
                                <button
                                    onClick={goToPreviousImage}
                                    className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors duration-150 mr-2 sm:mr-4"
                                    aria-label="Previous Image"
                                >
                                    &#10094; {/* Left Arrow */}
                                </button>
                            )}

                            {/* Gallery Content Div - takes up remaining space */}
                            <div
                                className="relative flex-1 bg-gray-200 rounded-lg shadow-md overflow-hidden" // flex-1 allows it to grow
                                style={{ aspectRatio: '16/9' }}
                            >
                                {/* Placeholder: Shows when isImageReady is false */}
                                {!isImageReady && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        {/* Spinner SVG */}
                                        <svg className="animate-spin h-12 w-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <p className="mt-3 text-sm text-gray-600">Loading image...</p>
                                    </div>
                                )}
                                {/* Actual Image and Caption Container: Fades in when ready */}
                                <div
                                    key={currentImageIndex} // This is crucial for re-triggering the load sequence
                                    className="w-full h-full" // This div will fill the aspect-ratio parent
                                    style={{
                                        opacity: isImageReady ? 1 : 0,
                                        visibility: isImageReady ? 'visible' : 'hidden',
                                        transition: 'opacity 0.4s ease-in-out',
                                    }}
                                >
                                    <AdvancedImage
                                        cldImg={cld.image(project.images[currentImageIndex].image_public_id)
                                            .resize(fit().width(1280).height(720))
                                            .delivery(format('auto')).delivery(quality('auto'))
                                        }
                                        alt={project.images[currentImageIndex].alt_text || project.images[currentImageIndex].caption || `Image ${currentImageIndex + 1} for ${project.title}`}
                                        className="w-full h-full object-contain"
                                        onLoad={() => setIsImageReady(true)}
                                        onError={() => {
                                            setIsImageReady(true);
                                            console.error("Image failed to load:", project.images[currentImageIndex].image_public_id);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Next Button - outside gallery, styled */}
                            {project.images.length > 1 && (
                                <button
                                    onClick={goToNextImage}
                                    className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors duration-150 ml-2 sm:ml-4"
                                    aria-label="Next image"
                                >
                                    &#10095; {/* Right arrow */}
                                </button>
                            )}
                        </div>

                        {/* caption Area - Below the image and navigation buttons */}
                        {project.images && project.images.length > 0 && project.images[currentImageIndex].caption && (
                            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">View details: </h3>
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                    {project.images[currentImageIndex].caption}
                                </p>
                            </div>
                        )}
                    </div>
                    {/* Optional: Dots for navigation (remain outside, below the carousel) */}
                    {project.images.length > 1 && (
                        <div className="flex justify-center space-x-2 mt-4">
                            {project.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)} // Directly set index
                                    className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-400'
                                        } hover:bg-blue-400 focus:outline-none transition-colors`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </section>
            )}


            <div className="mt-12">
                <RouterLink to="/projects" className="text-blue-600 hover:underline">&larr; Back to All Projects</RouterLink>
            </div>
        </div>
    );
};

export default ProjectDetail;