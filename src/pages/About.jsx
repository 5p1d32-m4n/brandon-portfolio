import React from 'react';
import selfie2 from "../assets/BrandonCircled.jpg"; // Assuming you want to use the same image
import { developmentSkills, designSkills, otherSkills } from "../data/skills"; // Import skills

const About = () => {
  return (
    <div className="flex flex-col">
      <main className="flex-1 p-4 overflow-y-auto">
        {/* Hero Section */}
        <section className="py-12 bg-gray-50 text-center">
          <h1 className="text-5xl font-bold text-xanthous tourney-unique">About Me</h1>
          <p className="text-xl text-gray-700 mt-4">Software & Web Developer | QA Engineer | Cybersecurity Enthusiast</p>
        </section>

        {/* Main Content Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
              <div className="md:w-1/3 flex-shrink-0">
                <img
                  src={selfie2}
                  alt="Brandon Baker"
                  className="rounded-full shadow-xl mx-auto"
                  width={256}
                  height={256}
                />
              </div>
              <div className="md:w-2/3 text-lg text-gray-700 space-y-4">
                <h2 className="text-3xl font-semibold text-columbia-blue mb-4">Hi, I'm Brandon Baker.</h2>
                <p>
                  I'm a passionate and results-driven Software and Web Developer based in Puerto Rico, dedicated to crafting efficient, scalable, and high-quality digital solutions. My journey in tech has equipped me with a robust skill set spanning full-stack development, quality assurance, and cybersecurity.
                </p>
                <p>
                  With a strong foundation in JavaScript, React, Node.js, and ASP.NET Core, complemented by experience with cloud technologies like Docker and Azure, I specialize in building applications that not only meet technical requirements but also provide seamless and engaging user experiences.
                </p>
                <p>
                  My background as a QA Engineer has instilled in me a meticulous approach to development, ensuring precision, security, and optimal performance in every project. I thrive on tackling complex challenges, continuously learning new technologies, and collaborating to transform innovative ideas into impactful realities.
                </p>
              </div>
            </div>

            {/* Skills Display */}
            <div className="mt-16">
              <h2 className="text-3xl font-semibold text-columbia-blue text-center mb-10">My Expertise</h2>

              {/* Development Skills */}
              <article className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Development Skills</h3>
                <hr className="border-columbia-blue mb-6" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {developmentSkills.map((skill, index) => (
                    <div key={index} className="flex flex-col items-center p-3 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow">
                      <skill.icon size={40} style={{ color: skill.color }} className="mb-2" />
                      <p className="text-center text-sm font-medium">{skill.name}</p>
                    </div>
                  ))}
                </div>
              </article>

              {/* Web Design Skills */}
              <article className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Web Design Skills</h3>
                <hr className="border-columbia-blue mb-6" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {designSkills.map((skill, index) => (
                    <div key={index} className="flex flex-col items-center p-3 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow">
                      <skill.icon size={40} style={{ color: skill.color }} className="mb-2" />
                      <p className="text-center text-sm font-medium">{skill.name}</p>
                    </div>
                  ))}
                </div>
              </article>

              {/* You can add 'Other Skills' similarly if desired */}

            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;