import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { LogIn, User, Settings, Package, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserData() {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null) {
            api.get("/users/me", {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((res) => {
                setUser(res.data);
            }).catch((err) => {
                console.log(err);
                setUser(null);
            });
        }

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsOpen(false);
        navigate("/");
    };

    if (user == null) {
        return (
            <div className="flex items-center gap-4 ml-4">
                <Link to="/signin" className="hidden lg:block text-sm font-medium text-[#A0AEC0] hover:text-[#00E5FF] transition-colors">Login</Link>
                <div className="hidden lg:block w-px h-4 bg-white/20"></div>
                <Link to="/signup" className="hidden lg:block text-sm font-medium text-[#A0AEC0] hover:text-[#00E5FF] transition-colors">Register</Link>
                <Link to="/signin" className="lg:hidden w-10 h-10 flex justify-center items-center bg-white/5 border border-white/10 rounded-full text-[#A0AEC0] hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all">
                    <LogIn size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="relative ml-2 lg:ml-4" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-1 pr-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
            >
                {user.image ? (
                    <img src={user.image} alt={user.firstName} className="w-8 h-8 rounded-full border border-[#00E5FF]/30 object-cover" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] border border-[#00E5FF]/30">
                        <User size={16} />
                    </div>
                )}
                <span className="hidden md:block text-sm font-medium text-white">{user.firstName}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-56 bg-[#111827] border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                    >
                        <div className="px-4 py-3 border-b border-white/5 mb-2">
                            <p className="text-sm text-white font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-[#A0AEC0] truncate">{user.email}</p>
                        </div>
                        
                        <button onClick={() => { setIsOpen(false); navigate("/my-orders"); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#A0AEC0] hover:text-white hover:bg-white/5 transition-colors">
                            <Package size={16} className="text-[#A855F7]" />
                            My Orders
                        </button>
                        
                        <button onClick={() => { setIsOpen(false); navigate("/settings"); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#A0AEC0] hover:text-white hover:bg-white/5 transition-colors">
                            <Settings size={16} className="text-[#00E5FF]" />
                            Settings
                        </button>

                        <div className="h-px bg-white/5 my-2"></div>
                        
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                            <LogOut size={16} />
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}