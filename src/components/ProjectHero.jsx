import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { BsLink45Deg } from "react-icons/bs";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { scale, limitFit } from "@cloudinary/url-gen/actions/resize";

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
  slug,
  linkColor,
  // If you later add an array of additional images for a gallery:
  // additionalImages = [] // e.g., [{ public_id: '...', caption: '...' }, ...]
}) => {
  const heroCldImage = heroImage
    ? cld.image(heroImage)
      // Option 1: Scale to a sensible max width, let CSS handle aspect ratio.
      .resize(scale().width(1200)) // Or limitFit().width(1200).height(1200) to not upscale
      .delivery(format('auto'))
      .delivery(quality('auto'))
    : null;

  const logoCldImage = logoSrc
    ? cld.image(logoSrc)
      .resize(scale().width(200)) // Scale logo to a reasonable max, CSS will handle display in its small box
      .delivery(format('auto'))
      .delivery(quality('auto'))
    : null;
  const caseStudyPath = viewCaseHref || (slug ? `/project/${slug}` : null)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] shadow-xl border-2 rounded-2xl border-columbia-blue w-full text-center lg:text-left p-2">
      {/* Left Column */}
      <div className="grid place-content-center gap-4 text-center lg:text-left pl-6">
        <div className="relative mx-auto lg:mx-0 w-24 h-24 flex items-center justify-center overflow-hidden">
          {logoCldImage ? (
            <AdvancedImage
              cldImg={logoCldImage}
              alt={`${title} logo`}
              // These classes make the Cloudinary image fit within the 24x24 (w-24 h-24) container
              className="object-contain max-w-full max-h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">Logo</div>
          )}

        </div>
        <div className="px-8 lg:px-0 space-y-4"> {/* Adjust padding */}
          <h3 className="text-2xl lg:text-4xl">
            {title}
            <hr className="mt-4" />
          </h3>
          <p className="text-balance py-4">{description}</p>
          {slug ? ( // Check if slug is provided
            <RouterLink
              to={`/project/${slug}`} // Use the project's slug
              className="hover:brightness-75 text-lg inline-flex items-center text-amber-400"
              style={{ color: linkColor }}
            >
              View Case
              <BsLink45Deg className="ml-2 transition-transform duration-150 ease-in-out group-hover:translate-x-1" /> {/* Icon with spacing and hover animation */}
            </RouterLink>
          ) : viewCaseHref ? ( // Fallback to external link if no slug but viewCaseHref exists
            <a href={viewCaseHref}>
              View Case
              <BsLink45Deg className="ml-2 transition-transform duration-150 ease-in-out group-hover:translate-x-1" /> {/* Icon with spacing and hover animation */}
            </a>
          ) : null}
        </div>
      </div>
      {/* Right Column */}
      <div className="px-8 lg:-right-32 lg:-top-14 lg:h-[500px] overflow-hidden">
        {heroCldImage ? (
          <AdvancedImage
            cldImg={heroCldImage}
            alt={title || 'Project hero image'}
            // Apply your desired Tailwind classes for sizing and object-fit here.
            // This was your original for the hero image, let's try restoring `h-full`
            // The interaction of w-full, h-full and object-contain in a flex container
            // with a fixed height (lg:h-[500px]) needs careful checking.
            className="object-contain object-center w-full h-full rounded-md"
          // Alternative if you want it to cover the area (might crop):
          // className="object-cover object-center w-full h-full rounded-md"
          />
        ) : (
          <div className="w-full lg:h-[450px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">Hero Image</div>
        )}
      </div>
    </div>
  );
};

export default ProjectHero;