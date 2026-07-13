import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full bg-[#050816] border-t border-white/10 pt-16 pb-8 px-6 md:px-12 mt-20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent"></div>
            
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand Info */}
                <div className="flex flex-col gap-6">
                    <img src="/logo.png" alt="i-Computers" className="h-20 md:h-28 w-auto object-contain origin-left" />
                    <p className="text-[#A0AEC0] text-sm leading-relaxed">
                        The ultimate destination for premium gaming PCs, high-end components, and professional gear. Build your dream rig today.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A0AEC0] hover:text-[#FF2DA6] hover:border-[#FF2DA6] hover:bg-[#FF2DA6]/10 transition-all duration-300">
                            <FaFacebook size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A0AEC0] hover:text-[#00E5FF] hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300">
                            <FaTwitter size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A0AEC0] hover:text-[#A855F7] hover:border-[#A855F7] hover:bg-[#A855F7]/10 transition-all duration-300">
                            <FaInstagram size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A0AEC0] hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300">
                            <FaYoutube size={18} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-bold font-orbitron tracking-wider text-lg mb-2">Quick Links</h3>
                    <Link to="/" className="text-[#A0AEC0] hover:text-[#00E5FF] transition-colors text-sm flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/0 group-hover:bg-[#00E5FF] transition-all"></span> Home
                    </Link>
                    <Link to="/products" className="text-[#A0AEC0] hover:text-[#00E5FF] transition-colors text-sm flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/0 group-hover:bg-[#00E5FF] transition-all"></span> Products
                    </Link>
                    <Link to="/about-us" className="text-[#A0AEC0] hover:text-[#00E5FF] transition-colors text-sm flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/0 group-hover:bg-[#00E5FF] transition-all"></span> About Us
                    </Link>
                    <Link to="/contact-us" className="text-[#A0AEC0] hover:text-[#00E5FF] transition-colors text-sm flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/0 group-hover:bg-[#00E5FF] transition-all"></span> Contact Us
                    </Link>
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-bold font-orbitron tracking-wider text-lg mb-2">Categories</h3>
                    <Link to="/products?category=gaming-pcs" className="text-[#A0AEC0] hover:text-[#A855F7] transition-colors text-sm flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]/0 group-hover:bg-[#A855F7] transition-all"></span> Gaming PCs
                    </Link>
                    <Link to="/products?category=laptops" className="text-[#A0AEC0] hover:text-[#A855F7] transition-colors text-sm flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]/0 group-hover:bg-[#A855F7] transition-all"></span> Laptops
                    </Link>
                    <Link to="/products?category=components" className="text-[#A0AEC0] hover:text-[#A855F7] transition-colors text-sm flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]/0 group-hover:bg-[#A855F7] transition-all"></span> Components
                    </Link>
                    <Link to="/products?category=accessories" className="text-[#A0AEC0] hover:text-[#A855F7] transition-colors text-sm flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]/0 group-hover:bg-[#A855F7] transition-all"></span> Accessories
                    </Link>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-bold font-orbitron tracking-wider text-lg mb-2">Contact Us</h3>
                    <div className="flex items-start gap-3 text-[#A0AEC0] text-sm">
                        <MapPin size={18} className="text-[#FF2DA6] mt-0.5 flex-shrink-0" />
                        <p>123 Gaming Street, Tech City, Colombo, Sri Lanka</p>
                    </div>
                    <div className="flex items-center gap-3 text-[#A0AEC0] text-sm">
                        <Phone size={18} className="text-[#FF2DA6] flex-shrink-0" />
                        <p>+94 77 123 4567</p>
                    </div>
                    <div className="flex items-center gap-3 text-[#A0AEC0] text-sm">
                        <Mail size={18} className="text-[#FF2DA6] flex-shrink-0" />
                        <p>support@icomputers.lk</p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[#A0AEC0] text-xs">
                    &copy; {new Date().getFullYear()} quantumpart. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" alt="Mastercard" />
                </div>
            </div>
        </footer>
    );
}
