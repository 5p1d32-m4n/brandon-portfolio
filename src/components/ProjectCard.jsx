import React from "react";

const ProjectCard = ({ title, description, techStack, repoLink, liveDemo }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="mt-2"><strong>Tech Used:</strong> {techStack}</p>
      <div className="mt-4">
        {repoLink && <a href={repoLink} target="_blank" className="text-blue-500 mr-4">GitHub</a>}
        {liveDemo && <a href={liveDemo} target="_blank" className="text-green-500">Live Demo</a>}
      </div>
    </div>
  );
};

export default ProjectCard;