import { Link } from "react-router";
import ReactSVG from "../assets/react.svg"
import { HomeIcon, InformationCircleIcon, ScaleIcon, ClockIcon } from "@heroicons/react/16/solid"
import {BsLinkedin, BsGithub} from "react-icons/bs"
import { FaUpwork } from "react-icons/fa6";

const Navbar = () => {
    return (
        <nav className="sticky top-0 w-full p-4 flex justify-between gap-4 shadow-lg border-b">
            <div className="navbar-brand">
                <Link to="/" className="text-xl 
                                        font-bold 
                                        flex
                                        gap-2
                                        justify-center
                                        hover:text-[var(--color-neon-green)]
                                        transition-colors">
                    {/* MainLogo */}
                    <img src={ReactSVG} alt="WarLogo" className="max-w-20" />
                    <h1 className="uppercase font-semibold">Brandon</h1>
                </Link>
            </div>
            <div className="flex gap-4">
                <Link to="/linkedin" className="w-10 
                                        h-10 
                                        rounded 
                                        bg-[var(--color-imperial-gold)] 
                                        p-2 hover:bg-[var(--color-neon-green)] 
                                        transition-colors">
                <BsLinkedin />
                </Link>
                <Link to="/github" className="w-10 
                                        h-10 
                                        rounded 
                                        bg-[var(--color-imperial-gold)] 
                                        p-2 hover:bg-[var(--color-neon-green)] 
                                        transition-colors">
                    <BsGithub />
                </Link>
                <Link to="/upwork" className="w-10 
                                        h-10 
                                        rounded 
                                        bg-[var(--color-imperial-gold)] 
                                        p-2 hover:bg-[var(--color-neon-green)] 
                                        transition-colors">
                    <FaUpwork />
                </Link>
                <Link to="/" className="">
                    <HomeIcon className="w-10 
                                        h-10 
                                        rounded 
                                        bg-[var(--color-imperial-gold)] 
                                        p-2 hover:bg-[var(--color-neon-green)] 
                                        transition-colors" />
                </Link>
                <Link to="/about" className="">
                    <InformationCircleIcon className="w-10 h-10 rounded p-2" />
                </Link>
                <Link to="/projects" className="">
                    <ScaleIcon className="w-10 h-10 rounded p-2" />
                </Link>
            </div>
        </nav>
    )
};

export default Navbar
