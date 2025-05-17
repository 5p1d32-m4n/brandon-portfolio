import React, { useState, useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import ProjectCard from "../components/ProjectCard";


const cld = new Cloudinary({
  cloud: {
    cloudName: "dvo1c1tln"
  }
});

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/projects/projects.js');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects: ", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (isLoading) {
    return <div className="p-6 text-center">Loading projects...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error loading projects: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          let cardImageUrl = null;
          // Assuming 'project.logo_image_url' holds the Cloudinary public ID for the logo
          // This aligns with patterns seen in Home.jsx and ProjectDetail.jsx
          if (project.logo_image_url && cld) {
            cardImageUrl = cld
              .image(project.logo_image_url)
              .resize(fill().width(940).height(420).gravity(autoGravity())) // Adjust W/H for card aspect ratio
              .delivery(format('auto'))
              .delivery(quality('auto'))
              .toURL();
          } else if (project.imageUrl) {
            // Fallback if the API directly provides a full imageUrl for some projects
            cardImageUrl = project.imageUrl;
          }

          // Use project.id or project.slug if available and unique, otherwise fallback to title
          const key = project.id || project.slug || project.title;

          return <ProjectCard key={key} {...project} imageUrl={cardImageUrl} />;
        })}
      </div>
    </div>
  );
};

export default Projects;