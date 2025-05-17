import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import ProjectHero from "../components/ProjectHero.jsx";
import ProjectCard from "../components/ProjectCard";
import selfie2 from "../assets/BrandonCircled.jpg";
import { ImEmbed2 } from "react-icons/im";
import { IoBriefcaseOutline, IoShield, IoLogoJavascript, IoLogoReact, IoLogoHtml5, IoLogoNodejs, IoLogoCss3 } from "react-icons/io5";
import { FaDocker, FaFigma, FaWordpress, FaGithub, FaPython } from "react-icons/fa";
import { BsWindowStack } from "react-icons/bs";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { SiExpress, SiMongodb, SiTailwindcss, SiAdobephotoshop, SiCanva, SiZapier, SiDocker, SiPostman, SiDotnet } from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { DiMsqlServer } from "react-icons/di";
import { VscAzure } from "react-icons/vsc";

// Add this near the top of your file with other imports
const developmentSkills = [
  { name: 'Javascript', icon: IoLogoJavascript, color: '#F7DF1E' },
  { name: 'React', icon: IoLogoReact, color: '#61DAFB' },
  { name: 'HTML', icon: IoLogoHtml5, color: '#E34F26' },
  { name: 'NodeJS', icon: IoLogoNodejs, color: '#68A063' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#38B2AC' },
  { name: 'CSS', icon: IoLogoCss3, color: '#264DE4' },
  { name: 'Next.js', icon: RiNextjsLine, color: '#000000' },
  { name: 'Express', icon: SiExpress, color: '#000000' },
  { name: 'Mongodb', icon: SiMongodb, color: '#4DB33D' },
  { name: 'Microsoft SQL', icon: DiMsqlServer, color: '#CC2927' },
  { name: 'ASP .NET', icon: SiDotnet, color: '#3776AB' },
  { name: 'Python', icon: FaPython, color: '#512BD4' },
  // Add more skills...
];

// Update the design skills array
const designSkills = [
  { name: 'Figma', icon: FaFigma, color: '#0ACF83' },
  { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
  { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
  { name: 'Wordpress', icon: FaWordpress, color: '#21759B' },
];

// Update the other skills array
const otherSkills = [
  { name: 'Github', icon: FaGithub, color: '#181717' },
  { name: 'Zapier', icon: SiZapier, color: '#FF4A00' },
  { name: 'Docker', icon: SiDocker, color: '#31A8FF' },
  { name: 'Postman', icon: SiPostman, color: '#FF4A00' },
  { name: 'Azure', icon: VscAzure, color: '#31A8FF' },
];

// Cloudinary configuration
const cld = new Cloudinary({
  cloud: {
    cloudName: "dvo1c1tln"
  }
});

// Use this sample image or upload your own via the Media Explorer
const img = cld
  .image('cld-sample-5')
  .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
  .quality('auto')
  .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio



const Home = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/projects/projects');
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-1 overflow-y-auto">
        {/* Main Content */}
        <main className="flex-1 ml-4 p-4 overflow-y-auto">
          {/* Header section */}
          <section className="py-12 grid place-items-center">
            <h1 className="text-4xl font-bold text-xanthous tourney-unique">Crafting </h1>
            <h1 className="text-2xl font-bold text-amber-300  tourney-unique">Scalable Solutions & Seamless User Experiences</h1>
          </section>
          {/* About Section */}
          <section id="about">
            <div className="flex flex-col lg:flex-row items-center justify-center ml-10 mr-10 gap-12">
              <div className="flex-1 lg:pr-8 text-center lg:text-left max-w-2xl">
                <h1 className="text-4xl">
                  Hi, I&apos;m <strong className="p-2">Brandon Baker</strong>
                </h1>
                <h1 className="text-4xl font-bold text-columbia-blue">Software & Web Developer</h1>
                <h1 className="text-4xl">Based in Puerto Rico</h1>
                <p className="text-balance">
                  As a results-driven software and web developer, I specialize in crafting efficient, scalable, and high-quality solutions that drive business success. With expertise in JavaScript, TypeScript, React, Node.js, ASP.NET Core, and cloud technologies like Docker, I create robust applications that enhance user experience and operational efficiency. My background in QA engineering, cybersecurity, and full-stack development allows me to approach projects with precision, security, and performance in mind. I thrive on solving complex problems, improving workflows, and delivering impactful solutions for businesses and users alike.
                </p>
              </div>
              <div className="mt-6 lg:mt-0 shrink-0">
                <img src={selfie2} alt="pro-pic" className="relative z-20" width={512} height={512} />
              </div>
            </div>
          </section>
          {/* Services Section */}
          <section id="services" className="py-24 w-full mt-6">
            <div className="mx-auto px-4">
              <hgroup className="text-center">
                <h2 className="pb-4 text-columbia-blue text-2xl font-semibold">What I do</h2>
                <h1 className="text-primary uppercase text-4xl mb-4">My Services</h1>
              </hgroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Full Stack Development */}
                <div className="flex flex-col items-center p-4 rounded-2xl shadow border-2 border-columbia-blue">
                  <div className="rounded-full border-2 p-4 mb-4 border-columbia-blue">
                    <ImEmbed2 size={48} />
                  </div>
                  <hgroup className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">Full Stack Development</h3>
                    <p>
                      I develop scalable web apps using modern frameworks such as React, Vue, Node.js, and TypeScript.
                    </p>
                  </hgroup>
                </div>
                {/* QA & Code Reviews */}
                <div className="flex flex-col items-center p-4 rounded-2xl shadow border-2 border-columbia-blue">
                  <div className="rounded-full border-2 p-4 mb-4 border-columbia-blue">
                    <IoBriefcaseOutline size={48} />
                  </div>
                  <hgroup className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">QA & Code Reviews</h3>
                    <p>
                      I lead quality assurance, test planning and comprehensive code reviews to deliver bug-free deployments.
                    </p>
                  </hgroup>
                </div>
                {/* Cybersecurity & Audits */}
                <div className="flex flex-col items-center p-4 rounded-2xl shadow border-2 border-columbia-blue">
                  <div className="rounded-full border-2 p-4 mb-4 border-columbia-blue">
                    <IoShield size={48} />
                  </div>
                  <hgroup className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">Cybersecurity & Audits</h3>
                    <p>
                      I perform security audits and vulnerability assessments to protect digital assets.
                    </p>
                  </hgroup>
                </div>
                {/* Containerization & Automation */}
                <div className="flex flex-col items-center p-4 rounded-2xl shadow border-2 border-columbia-blue">
                  <div className="rounded-full border-2 p-4 mb-4 border-columbia-blue">
                    <FaDocker size={48} />
                  </div>
                  <hgroup className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">Containerization & Automation</h3>
                    <p>
                      I containerize applications with Docker and integrate services using Zapier and Mailchimp.
                    </p>
                  </hgroup>
                </div>
                {/* UI/UX & Web Design */}
                <div className="flex flex-col items-center p-4 rounded-2xl shadow border-2 border-columbia-blue">
                  <div className="rounded-full border-2 p-4 mb-4 border-columbia-blue">
                    <BsWindowStack size={48} />
                  </div>
                  <hgroup className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">UI/UX & Web Design</h3>
                    <p>
                      I craft user-friendly, visually appealing websites that enhance usability and drive engagement.
                    </p>
                  </hgroup>
                </div>
                {/* SEO & Content Management */}
                <div className="flex flex-col items-center p-4 rounded-2xl shadow border-2 border-columbia-blue">
                  <div className="rounded-full border-2 p-4 mb-4 border-columbia-blue">
                    <MdOutlineScreenSearchDesktop size={48} />
                  </div>
                  <hgroup className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">SEO & Content Management</h3>
                    <p>
                      I optimize websites for search engines and manage content using platforms like WordPress and Webflow.
                    </p>
                  </hgroup>
                </div>
              </div>
            </div>
          </section>
          {/* Skills Section */}
          <section id="skills" className="py-24 w-full">
            <div className="mx-auto px-4">
              {/* Development Skills */}
              <article className="mb-24">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-columbia-blue">Development Skills</h2>
                    <hr className="border-columbia-blue" />
                    <p className="pt-4 pb-8 lg:py-8">
                      A versatile full-stack developer, I specialize in the MERN stack for frontend development while possessing a comprehensive understanding of backend architecture to build dynamic, scalable web applications. My technical proficiency also includes backend development using Python for Django REST API creation, web scraping, and automation projects, complemented by experience in C# for ASP.NET Core development. I am committed to creating seamless user experiences with high performance and efficiency, employing a diverse set of modern technologies to deliver robust solutions.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {developmentSkills.map((skill, index) => (
                      <div key={index} className="flex flex-col items-center p-4">
                        <skill.icon size={48} style={{ color: skill.color }} className="mb-2" />
                        <p className="text-center text-sm">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              {/* Web Design Skills */}
              <article className="mb-24">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-columbia-blue">Web Design Skills</h2>
                    <hr className="border-columbia-blue" />
                    <p className="pt-4 pb-8 lg:py-8">
                      I focus on creating unique, brand-driven web designs that are not only visually compelling
                      but also optimized for user experience and conversion rates. With a blend of creative tools
                      and intuitive platforms, I craft designs that resonate with target audiences and support
                      business goals.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {designSkills.map((skill, index) => (
                      <div key={index} className="flex flex-col items-center p-4">
                        <skill.icon size={48} style={{ color: skill.color }} className="mb-2" />
                        <p className="text-center text-sm">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              {/* Other Skills */}
              <article>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-columbia-blue">Other Skills</h2>
                    <hr className="border-columbia-blue" />
                    <p className="pt-4 pb-8 lg:py-8">
                      In addition to full-stack development, I utilize a range of tools that enhance productivity,
                      streamline workflows, and optimize digital performance. These tools support efficient project
                      management, automation, and data-driven decision-making.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {otherSkills.map((skill, index) => (
                      <div key={index} className="flex flex-col items-center p-4">
                        <skill.icon size={48} style={{ color: skill.color }} className="mb-2" />
                        <p className="text-center text-sm">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </section>
          {/* Project Section */}
          <section id="projects" className="px-18 w-full">
            <div className="mb-12">
              <span className="text-primary text-lg font-semibold uppercase text-center block">My Work</span>
              <h2 className="text-center text-balance max-md:w-full w-3/4 mx-auto">
                Functionality focused, design driven, and user centric
              </h2>
            </div>
            <div className="grid gap-8">
              {isLoading && <p>Loading Projects...</p>}
              {error && <p>Error: {error}</p>}
              {!isLoading && !error && projects.map(project => (
                <ProjectHero
                  key={project.id} // Might make this into the 'slug' field.
                  title={project.title}
                  description={project.description} // Changed from caption
                  heroImage={project.hero_image_url}
                  logoSrc={project.logo_image_url}
                  // repoLink={project.repo_link} // repoLink is not a prop of ProjectHero
                  viewCaseHref={project.view_case_href}
                  slug={project.slug}
                  link_color={project.link_color} // Pass link_color
                />
              ))}
              {/* <ProjectHero
                title="WarMiniPricer"
                caption="Engineered a web application featuring automated web scraping to gather and track pricing data for miniature figurines across multiple e-commerce sites. This tool, built for local retailer Wargamer's Alley, provides insights into market trends and includes modules for pre-order and delivery management, enhancing their inventory control and pricing decisions."
                heroImage={warMiniHome}
                // If you have a separate logo image, pass it here:
                logoSrc={warMiniLogo} // Replace 'warMiniLogo' with the appropriate asset.
                repoLink="https://github.com/yourgithub/proposal-management"
                liveDemo="https://your-live-demo.com"
                linkColor="#F7BF00" // Replace with the desired link color.
              />
              <ProjectHero
                title="STG-ERP"
                caption="An ERP system, which stands for 'Enterprise Resource Planning', is a software system that integrates and automates a company's core business processes, including finance, human resources, manufacturing, supply chain, sales, and procurement, providing a unified view of all operations and a single source of truth for data across different departments within ShareTechGroup Engineering."
                heroImage={erpHome}
                // If you have a separate logo image, pass it here:
                logoSrc={erpLogo} // Replace 'erpLogo' with the appropriate asset.
                viewCaseHref="https://your-live-demo.com"
                linkColor="#F7BF00" // Replace with the desired link color.
              /> */}
            </div>
            <div className="grid place-items-center">
              <Link
                to="/projects"
                className="font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary hover:brightness-75 h-10 px-4 py-2 mt-8"
                aria-label="View all Projects"
              >
                View all Projects
              </Link>
            </div>
          </section>
          {/* Contact Form */}
          <section id="contact"></section>
          {/* Tesgin */}
          {/* <section id="testing">
          </section> */}
        </main>
      </div>
    </div>
  )
};

export default Home
