import React from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AutoGravity } from "@cloudinary/url-gen/qualifiers/gravity/autoGravity/AutoGravity";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API
  }
})


const ProjectHero = ({
  title,
  description,
  logoSrc,
  heroImage,
  viewCaseHref,
  linkColor
}) => {
  const heroCldImage = cld.image(ProjectHero.hero_image_url)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] border rounded-xl border-columbia-blue w-full text-center lg:text-left">
      {/* Left Column */}
      <div className="grid place-content-center gap-4 text-center lg:text-left pl-6">
        <div className="relative mx-auto lg:mx-0 w-24 h-24 flex items-center justify-center overflow-hidden">
          <img
            alt={title}
            src={logoSrc}
            loading="lazy"
            className="object-contain max-w-full max-h-full"
          />
        </div>
        <div className="px-8 lg:px-0 space-y-4">
          <h3 className="text-2xl lg:text-4xl">
            {title}
            <hr className="mt-4" />
          </h3>
          <p className="text-balance py-4">{description}</p>
          <a
            className="hover:brightness-75 text-lg"
            href={viewCaseHref}
            style={{ color: linkColor }}
          >
            View Case
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-right inline-block"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </a>
        </div>
      </div>
      {/* Right Column */}
      <div className="px-8 lg:-right-32 lg:-top-14 lg:h-[500px] overflow-hidden">
        <img
          alt={title}
          src={heroImage}
          className="object-contain object-center w-full h-full"
        />
      </div>
    </div>
  );
};

export default ProjectHero;