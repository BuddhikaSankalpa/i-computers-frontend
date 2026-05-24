import { BiCart } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

export default function Header(){
    const location = useLocation();

    // Dark theme nav link styles with Neon Cyan hover
    const navLinkStyle = "h-full flex justify-center items-center text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group tracking-wide";
    
    // Neon Cyan underline
    const activeUnderlineStyle = "absolute bottom-0 left-0 w-full h-0.5 bg-[#00f2fe] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_rgba(0,242,254,0.8)]";
    const activeUnderlineStyleStatic = "absolute bottom-0 left-0 w-full h-0.5 bg-[#00f2fe] shadow-[0_0_10px_rgba(0,242,254,0.8)]";

    return(
        /* Glassmorphism Header */
        <header className="w-full h-24 bg-black/40 backdrop-blur-md border-b border-white/10 flex justify-between p-6 items-center sticky top-0 z-50">
            
            {/* Logo */}
            <div className="h-full flex items-center">
                <Link to="/" className="h-full flex items-center">
                    <img src="/companyLogo.png" alt="QuantumParts Logo" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]"/>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="h-full flex justify-center items-center gap-10">
                {[
                    { name: "Home", path: "/" },
                    { name: "Products", path: "/products" },
                    { name: "Contact Us", path: "/contact-us" },
                ].map((link) => (
                    <Link key={link.path} to={link.path} className={navLinkStyle}>
                        {link.name}
                        <div className={location.pathname === link.path ? activeUnderlineStyleStatic : activeUnderlineStyle}></div>
                    </Link>
                ))}
            </nav>

            {/* Cart Button with Neon Glow */}
            <div className="flex items-center">
                <Link 
                    to="/cart" 
                    className="w-12 h-12 flex justify-center items-center bg-white/5 border border-white/10 text-white hover:bg-[#00f2fe]/20 hover:border-[#00f2fe]/50 rounded-full transition-all duration-300 group hover:shadow-[0_0_15px_rgba(0,242,254,0.4)]"
                >
                    <BiCart size={24} className="group-hover:scale-110 transition-transform text-gray-300 group-hover:text-[#00f2fe]"/>
                </Link>
            </div>
        </header>
    )
}