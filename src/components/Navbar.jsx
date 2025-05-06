import { Link } from "react-router";
import devLogo from "../../public/assets/devLogo.png";
import { BsLinkedin, BsGithub } from "react-icons/bs"
import { FaUpwork } from "react-icons/fa6";

const Navbar = () => {
    return (
        <nav className="sticky top-0 w-full p-2 flex justify-between gap-4 shadow-lg border-b">
            <div className="navbar-brand">
                <Link to="/" className="text-xl 
                                        font-bold 
                                        flex
                                        gap-2
                                        justify-center
                                        hover:text-[var(--color-neon-green)]
                                        transition-colors">
                    {/* MainLogo */}
                    <img src={devLogo} alt="WarLogo" className="max-w-15" />
                    <h1 className="uppercase font-semibold mt-4 italic">Brandon Baker</h1>
                </Link>
            </div>
            <div className="flex gap-4 justify-center items-center">
                <Link to="/linkedin" className="w-10 
                                        h-10 
                                        rounded 
                                        bg-[var(--color-imperial-gold)] 
                                        p-2
                                        mt-2 
                                        hover:bg-[var(--color-neon-green)] 
                                        transition-colors">
                    <BsLinkedin />
                </Link>
                <Link to="/github" className="w-10 
                                        h-10 
                                        rounded 
                                        bg-[var(--color-imperial-gold)] 
                                        mt-2 
                                        p-2
                                        hover:bg-[var(--color-neon-green)] 
                                        transition-colors">
                    <BsGithub />
                </Link>
                <Link to="/upwork" className="w-10 
                                        h-10 
                                        rounded 
                                        bg-[var(--color-imperial-gold)] 
                                        mt-2 
                                        p-2
                                        hover:bg-[var(--color-neon-green)] 
                                        transition-colors">
                    <FaUpwork />
                </Link>
                <Link to="/" className="">
                    <p>Home</p>
                </Link>
                <Link to="/about" className="">
                    <p>About</p>
                </Link>
                <Link to="/projects" className="">
                    <p>Projects</p>
                </Link>
            </div>
        </nav>
    )
};

export default Navbar
