import React from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
    apiKey: import.meta.env.VITE_CLOUDINARY_API
  }
})


const ProjectHero = ({
  title,
  description,
  logoSrc,
  heroImage,
  viewCaseHref,
  linkColor,
  // If you later add an array of additional images for a gallery:
  // additionalImages = [] // e.g., [{ public_id: '...', caption: '...' }, ...]
}) => {
  const heroCldImage = heroImage
    ? cld.image(heroImage) // heroImage is the Cloudinary Public ID
      .resize(fill().width(800).height(500).gravity(autoGravity()))
      .delivery(format('auto')) // Auto format selection (webp, avif, etc.)
      .delivery(quality('auto')) // Auto quality selection
    : null;

  const logoCldImage = logoSrc
    ? cld.image(logoSrc) // logoSrc is the Cloudinary Public ID
      .resize(fill().width(100).height(100).gravity(autoGravity())) // Adjusted size for logo
      .delivery(format('auto'))
      .delivery(quality('auto'))
    : null;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] border rounded-xl border-columbia-blue w-full text-center lg:text-left">
      {/* Left Column */}
      <div className="grid place-content-center gap-4 text-center lg:text-left pl-6">
        <div className="relative mx-auto lg:mx-0 w-24 h-24 flex items-center justify-center overflow-hidden">
          {logoCldImage ? (
            <AdvancedImage cldImg={logoCldImage} alt={`${title} logo`} className="object-contain max-w-full max-h-full" />
          ) : (
            // Optional: Placeholder if logoSrc is not available
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">Logo</div>
          )}
        </div>
        <div className="px-8 lg:px-0 space-y-4"> {/* Adjust padding */}
          <h3 className="text-2xl lg:text-4xl">
            {title}
            <hr className="mt-4" />
          </h3>
          <p className="text-balance py-4">{description}</p>
          {viewCaseHref && ( // Conditionally render the link if href is provided
            <a
              className="hover:brightness-75 text-lg inline-flex items-center" // Added inline-flex and items-center
              href={viewCaseHref}
              target="_blank" // Open in new tab for external links
              rel="noopener noreferrer" // Security for new tabs
              style={{ color: linkColor }}
            >
              View Case
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20" // Slightly smaller icon
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-right ml-1" // Added margin-left
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
          )}
        </div>
      </div>
      {/* Right Column */}
      <div className="px-8 lg:-right-32 lg:-top-14 lg:h-[500px] overflow-hidden">
        {heroCldImage ? (
          <AdvancedImage cldImg={heroCldImage} alt={title || 'Project hero image'} className="object-contain object-center w-full h-auto max-h-full rounded-md" />
        ) : (
          // Optional: Placeholder if heroImage is not available
          <div className="w-full lg:h-[450px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">Hero Image</div>
        )}
      </div>
    </div>
  );
};

export default ProjectHero;