import { Link, useLocation } from "react-router-dom";
import UserData from "./userData";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Header(){
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "About", path: "/about-us" },
        { name: "Contact", path: "/contact-us" },
    ];

    return(
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="w-full h-20 bg-[#111827]/80 backdrop-blur-xl border-b border-white/5 flex justify-between px-6 md:px-12 items-center sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
            <div className="h-full flex items-center">
                <Link to="/" className="h-full flex items-center relative group">
                    <img src="/logo.png" alt="i-Computers Logo" className="h-20 md:h-44 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-transform duration-300 group-hover:scale-105"/>
                </Link>
            </div>

            <nav className="hidden md:flex h-full items-center gap-8">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link key={link.path} to={link.path} className="relative h-full flex items-center group">
                            <span className={`text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]' : 'text-[#A0AEC0] group-hover:text-white'}`}>
                                {link.name}
                            </span>
                            {isActive && (
                                <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,1)]" />
                            )}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00E5FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_rgba(0,229,255,1)] origin-left" />
                        </Link>
                    );
                })}
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
                <button className="hidden md:flex w-10 h-10 justify-center items-center text-[#A0AEC0] hover:text-[#00E5FF] transition-colors">
                    <Search size={20} />
                </button>
                <Link 
                    to="/cart" 
                    className="w-10 h-10 flex justify-center items-center bg-white/5 border border-white/10 rounded-full hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/50 transition-all duration-300 group relative hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                >
                    <ShoppingCart size={18} className="text-[#A0AEC0] group-hover:text-[#00E5FF] transition-colors" />
                </Link>

                <UserData/>

                <button className="md:hidden w-10 h-10 flex justify-center items-center text-[#A0AEC0] hover:text-[#00E5FF] transition-colors">
                    <Menu size={24} />
                </button>
            </div>
        </motion.header>
    )
}