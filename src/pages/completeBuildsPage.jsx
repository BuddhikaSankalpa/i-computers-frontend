import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import getFormattedPrice from "../utils/price-formatter";
import { Cpu, Gpu, LayoutGrid, MemoryStick } from "lucide-react"; // Wait, lucide-react doesn't have Gpu and MemoryStick. Let me use alternative icons or text.
// Let's use Cpu, MonitorPlay, Server, CircuitBoard
import { MonitorPlay, CircuitBoard, Server } from "lucide-react";
import Footer from "../components/footer";

export default function CompleteBuildsPage() {
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        api.get("/complete-builds")
            .then((res) => {
                setBuilds(res.data.builds);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load builds", err);
                setLoading(false);
            });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white pt-[100px] pb-2 px-4 sm:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#FF2DA6]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF2DA6] to-[#00E5FF] mb-4 drop-shadow-[0_0_15px_rgba(255,45,166,0.3)]"
                    >
                        Complete Builds
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Pre configured, professionally assembled, and tested by our experts. Ready to plug and play out of the box.
                    </motion.p>
                </div>

                {loading ? (
                    <div className="w-full flex justify-center py-20">
                        <div className="w-16 h-16 border-4 border-white/10 border-t-[#FF2DA6] rounded-full animate-spin"></div>
                    </div>
                ) : builds.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl text-gray-500 font-medium">No complete builds available at the moment.</h2>
                    </div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {builds.map((build) => (
                            <motion.div key={build.buildId} variants={itemVariants} className="group h-full">
                                <Link to={`/complete-builds/${build.buildId}`} className="block h-full">
                                    <div className="bg-[#111827]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(255,45,166,0.2)] hover:border-[#FF2DA6]/40 transition-all duration-300 h-full flex flex-col group-hover:-translate-y-2">
                                        
                                        {/* Image Container */}
                                        <div className="relative w-full h-[250px] bg-black/40 overflow-hidden flex items-center justify-center p-6">
                                            {/* Glow behind image */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111827]/80 z-10" />
                                            <img 
                                                src={build.images[0]} 
                                                alt={build.name} 
                                                className="w-full h-full object-contain relative z-0 group-hover:scale-110 transition-transform duration-500"
                                            />
                                            {/* Stock badge */}
                                            <div className="absolute top-4 right-4 z-20">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${
                                                    build.isAvailable && build.stock > 0
                                                        ? "bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/30 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                                                        : "bg-red-500/20 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                                                }`}>
                                                    {build.isAvailable && build.stock > 0 ? "In Stock" : "Out of Stock"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-grow flex flex-col relative z-20 bg-gradient-to-b from-transparent to-[#111827]">
                                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF2DA6] transition-colors line-clamp-1">{build.name}</h2>
                                            
                                            <div className="flex items-end gap-3 mb-6">
                                                <span className="text-2xl font-bold text-[#00E5FF]">{getFormattedPrice(build.price)}</span>
                                                {build.labelledPrice > build.price && (
                                                    <span className="text-sm text-gray-500 line-through mb-1">{getFormattedPrice(build.labelledPrice)}</span>
                                                )}
                                            </div>

                                            {/* Key Specs */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 flex-grow">
                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                    <Cpu size={16} className="text-[#FF2DA6]" />
                                                    <span className="truncate">{build.cpu.split(" ").slice(0, 3).join(" ")}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                    <MonitorPlay size={16} className="text-[#00E5FF]" />
                                                    <span className="truncate">{build.gpu.split(" ").slice(0, 3).join(" ")}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                    <CircuitBoard size={16} className="text-[#A855F7]" />
                                                    <span className="truncate">{build.ram.split(" ")[0]}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                    <Server size={16} className="text-emerald-400" />
                                                    <span className="truncate">{build.storage.split(" ")[0]}</span>
                                                </div>
                                            </div>

                                            {/* View Details Button */}
                                            <div className="w-full mt-auto">
                                                <div className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-center font-medium text-white group-hover:bg-[#FF2DA6] group-hover:border-[#FF2DA6] group-hover:shadow-[0_0_15px_rgba(255,45,166,0.5)] transition-all duration-300">
                                                    View Details
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
            <Footer />
        </div>
    );
}
