
import { IoLogoJavascript, IoLogoReact, IoLogoHtml5, IoLogoNodejs, IoLogoCss3 } from "react-icons/io5";
import { FaFigma, FaWordpress, FaGithub, FaPython } from "react-icons/fa";
import { SiExpress, SiMongodb, SiTailwindcss, SiAdobephotoshop, SiCanva, SiZapier, SiDocker, SiPostman, SiDotnet } from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { DiMsqlServer } from "react-icons/di";
import { VscAzure } from "react-icons/vsc";

export const developmentSkills = [
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
];

export const designSkills = [
    { name: 'Figma', icon: FaFigma, color: '#0ACF83' },
    { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
    { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
    { name: 'Wordpress', icon: FaWordpress, color: '#21759B' },
];

export const otherSkills = [
    { name: 'Github', icon: FaGithub, color: '#181717' },
    { name: 'Zapier', icon: SiZapier, color: '#FF4A00' },
    { name: 'Docker', icon: SiDocker, color: '#31A8FF' },
    { name: 'Postman', icon: SiPostman, color: '#FF4A00' },
    { name: 'Azure', icon: VscAzure, color: '#31A8FF' },
];