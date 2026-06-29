import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserData from "./userData";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Header(){
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [headerSearch, setHeaderSearch] = useState("");

    useEffect(() => {
        if (location.pathname === "/products") {
            setHeaderSearch(searchParams.get("search") || "");
        } else {
            setHeaderSearch("");
        }
    }, [location.pathname, searchParams]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = headerSearch.trim();
        if (query) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
        } else {
            navigate(`/products`);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setHeaderSearch(value);
        if (location.pathname === "/products") {
            const newParams = new URLSearchParams(searchParams);
            if (value) {
                newParams.set("search", value);
            } else {
                newParams.delete("search");
            }
            setSearchParams(newParams, { replace: true });
        }
    };

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
                <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 h-10 focus-within:border-[#00E5FF]/50 focus-within:bg-[#00E5FF]/5 transition-all duration-300">
                    <input 
                        type="text"
                        placeholder="Search products..."
                        value={headerSearch}
                        onChange={handleSearchChange}
                        className="bg-transparent text-white text-sm outline-none w-24 lg:w-48 focus:w-48 lg:focus:w-64 transition-all duration-300 placeholder:text-white/30"
                    />
                    <button type="submit" className="text-[#A0AEC0] hover:text-[#00E5FF] transition-colors ml-2">
                        <Search size={16} />
                    </button>
                </form>
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