import selfie from "../assets/Brandon.jpg"
import selfie2 from "../assets/BrandonCircled.jpg"
import { ImEmbed2 } from "react-icons/im";
import { IoBriefcaseOutline, IoShield, IoLogoJavascript, IoLogoReact, IoLogoHtml5, IoLogoNodejs, IoLogoCss3 } from "react-icons/io5";
import { FaDocker, FaFigma, FaWordpress, FaGithub, FaGoogle } from "react-icons/fa";
import { BsWindowStack } from "react-icons/bs";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { SiExpress, SiMongodb, SiTailwindcss, SiAdobephotoshop, SiAdobeillustrator, SiCanva, SiElementor, SiWix, SiSemrush, SiZapier } from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { DiMsqlServer } from "react-icons/di";


// Add this near the top of your file with other imports
const developmentSkills = [
  { name: 'Javascript', icon: IoLogoJavascript },
  { name: 'React', icon: IoLogoReact },
  { name: 'HTML', icon: IoLogoHtml5 },
  { name: 'NodeJS', icon: IoLogoNodejs },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'CSS', icon: IoLogoCss3 },
  { name: 'Next.js', icon: RiNextjsLine },
  { name: 'Express', icon: SiExpress },
  { name: 'Mongodb', icon: SiMongodb },
  { name: 'Microsoft SQL', icon: DiMsqlServer },
  // Add more skills...
];

// Update the design skills array
const designSkills = [
  { name: 'Figma', icon: FaFigma },
  { name: 'Photoshop', icon: SiAdobephotoshop },
  { name: 'Illustrator', icon: SiAdobeillustrator },
  { name: 'Canva', icon: SiCanva },
  { name: 'Elementor', icon: SiElementor },
  { name: 'Wordpress', icon: FaWordpress },
  { name: 'Wix', icon: SiWix },
];

// Update the other skills array
const otherSkills = [
  { name: 'Github', icon: FaGithub },
  { name: 'Zapier', icon: SiZapier },
  { name: 'Analytics', icon: FaGoogle },
  { name: 'SEMRush', icon: SiSemrush },
];


const Home = () => {
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
          {/* Skills Section */}
          <section id="skills" className="py-24 w-full">
            <div className="mx-auto px-4">
              {/* Development Skills */}
              <article className="mb-24">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-columbia-blue">Development Skills</h2>
                    <hr className="border-columbia-blue" />
                    <p className="pt-4 pb-8 lg:py-8 text-gray-300">
                      As a MERN stack developer specializing in frontend development with a strong understanding
                      of backend architecture, I build dynamic, scalable web applications. My focus is on creating
                      seamless user experiences with high performance and efficiency, leveraging modern technologies
                      to deliver robust, full-stack solutions.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {developmentSkills.map((skill, index) => (
                      <div key={index} className="flex flex-col items-center p-4">
                        <skill.icon size={48} className="mb-2" />
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
                    <p className="pt-4 pb-8 lg:py-8 text-gray-300">
                      I focus on creating unique, brand-driven web designs that are not only visually compelling
                      but also optimized for user experience and conversion rates. With a blend of creative tools
                      and intuitive platforms, I craft designs that resonate with target audiences and support
                      business goals.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {designSkills.map((skill, index) => (
                      <div key={index} className="flex flex-col items-center p-4">
                        <skill.icon size={48} className="mb-2" />
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
                    <p className="pt-4 pb-8 lg:py-8 text-gray-300">
                      In addition to full-stack development, I utilize a range of tools that enhance productivity,
                      streamline workflows, and optimize digital performance. These tools support efficient project
                      management, automation, and data-driven decision-making.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {otherSkills.map((skill, index) => (
                      <div key={index} className="flex flex-col items-center p-4">
                        <skill.icon size={48} className="mb-2" />
                        <p className="text-center text-sm">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
};

export default Home
