import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa"; // For GitHub icon
import { FiExternalLink } from "react-icons/fi"; // For Live Demo icon
import { BsLink45Deg } from "react-icons/bs"; // For View Case icon, like in ProjectHero

const ProjectCard = ({ title, short_description, tech_stack, repoLink, liveDemo, imageUrl, slug }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Logo for ${title}`}
          className="w-full h-48 object-cover" // Adjust height (h-48) as needed
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 mb-2 flex-grow">{short_description}</p>
        <p className="mt-2 mb-2">
          <strong>Tech Used:</strong> {tech_stack}
        </p>
        <div className="mt-auto pt-2 space-x-4"> {/* Pushes links to the bottom */}
          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-medium text-sm rounded-md px-2 py-1 inline-flex items-center gap-x-1.5 transition-all duration-150 ease-in-out hover:brightness-75 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
          )}
          {liveDemo && (
            <a
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 font-medium text-sm rounded-md px-2 py-1 inline-flex items-center gap-x-1.5 transition-all duration-150 ease-in-out hover:brightness-75 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1"
            >
              <FiExternalLink />
              <span>Live Demo</span>
            </a>
          )}
          {slug && (
            <Link
              to={`/project/${slug}`}
              // Styling to match 'View Case' from ProjectHero.jsx
              className="group text-amber-400 text-lg font-medium rounded-md px-2 py-1 inline-flex items-center transition-all duration-150 ease-in-out hover:brightness-75 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-1"
            >
              <span>View Case</span>
              <BsLink45Deg className="ml-2 transition-transform duration-150 ease-in-out group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;