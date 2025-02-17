import React from "react";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "ERP System",
    description: "A .NET web app for managing proposals, projects, timesheets, deliverables and financial allocations.",
    techStack: "ASP.NET Core MVC, JavaScript, Microsoft SQL Server, Docker",
    repoLink: "https://github.com/yourgithub/proposal-management",
    liveDemo: "https://your-live-demo.com"
  },
  {
    title: "WarMiniPricer",
    description: "A Warhammer 40k figurine price tracker, web scraper and composition builder.",
    techStack: "Python, Scrapy, Django, React, Microsoft SQL Server",
    repoLink: "https://github.com/yourgithub/resume-analyzer",
    liveDemo: "https://your-live-demo.com"
  }
];

const Projects = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;