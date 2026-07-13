import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import getFormattedPrice from "../utils/price-formatter";
import ContactModal from "../components/ContactModal";
import { Cpu, MonitorPlay, CircuitBoard, Server, Fan, BatteryCharging, Box, Terminal, Wifi, Palette, MessageSquare, ArrowLeft } from "lucide-react";

export default function CompleteBuildDetailsPage() {
    const { id } = useParams(); // buildId
    const [build, setBuild] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        api.get(`/complete-builds/${id}`)
            .then((res) => {
                setBuild(res.data.build);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load build details", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050816] flex justify-center items-center">
                <div className="w-16 h-16 border-4 border-white/10 border-t-[#FF2DA6] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!build) {
        return (
            <div className="min-h-screen bg-[#050816] flex flex-col justify-center items-center text-white">
                <h1 className="text-4xl font-bold mb-4">Build Not Found</h1>
                <Link to="/complete-builds" className="text-[#00E5FF] hover:underline">Back to Complete Builds</Link>
            </div>
        );
    }

    const specs = [
        { label: "Processor (CPU)", value: build.cpu, icon: <Cpu size={20} className="text-[#FF2DA6]" /> },
        { label: "Graphics Card (GPU)", value: build.gpu, icon: <MonitorPlay size={20} className="text-[#00E5FF]" /> },
        { label: "Motherboard", value: build.motherboard, icon: <CircuitBoard size={20} className="text-[#A855F7]" /> },
        { label: "Memory (RAM)", value: build.ram, icon: <CircuitBoard size={20} className="text-emerald-400" /> },
        { label: "Storage", value: build.storage, icon: <Server size={20} className="text-yellow-400" /> },
        { label: "CPU Cooler", value: build.cpuCooler, icon: <Fan size={20} className="text-blue-400" /> },
        { label: "Power Supply", value: build.powerSupply, icon: <BatteryCharging size={20} className="text-red-400" /> },
        { label: "PC Case", value: build.pcCase, icon: <Box size={20} className="text-gray-400" /> },
        { label: "Operating System", value: build.operatingSystem, icon: <Terminal size={20} className="text-white" /> },
        { label: "Connectivity", value: build.wifiBluetooth, icon: <Wifi size={20} className="text-[#00E5FF]" /> },
        { label: "RGB Lighting", value: build.rgbSupport, icon: <Palette size={20} className="text-[#FF2DA6]" /> },
    ];

    return (
        <div className="min-h-screen bg-[#050816] text-white pt-28 pb-24 px-4 sm:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#FF2DA6]/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[#00E5FF]/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Back Navigation */}
                <Link to="/complete-builds" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Complete Builds
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Left Column: Images */}
                    <div className="flex flex-col gap-4">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="w-full aspect-square bg-[#111827]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2DA6]/5 to-[#00E5FF]/5 z-0" />
                            <img 
                                src={build.images[activeImage]} 
                                alt={build.name} 
                                className="w-full h-full object-contain relative z-10 hover:scale-105 transition-transform duration-500"
                            />
                        </motion.div>

                        {build.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                                {build.images.map((img, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`w-24 h-24 shrink-0 rounded-xl bg-[#111827] border p-2 overflow-hidden transition-all duration-300 ${activeImage === idx ? 'border-[#FF2DA6] shadow-[0_0_15px_rgba(255,45,166,0.4)]' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`${build.name} view ${idx+1}`} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Details */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <div className="mb-2">
                            <span className="text-[#00E5FF] font-orbitron font-medium tracking-wider uppercase text-sm">{build.buildId}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 leading-tight">
                            {build.name}
                        </h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-[#FF2DA6] drop-shadow-[0_0_10px_rgba(255,45,166,0.3)]">
                                {getFormattedPrice(build.price)}
                            </span>
                            {build.labelledPrice > build.price && (
                                <span className="text-lg text-gray-500 line-through">
                                    {getFormattedPrice(build.labelledPrice)}
                                </span>
                            )}
                        </div>

                        <div className={`inline-block mb-8 px-4 py-1.5 rounded-full text-sm font-bold border backdrop-blur-md w-max ${
                            build.isAvailable && build.stock > 0
                                ? "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30"
                                : "bg-red-500/10 text-red-400 border-red-500/30"
                        }`}>
                            {build.isAvailable && build.stock > 0 ? "In Stock & Ready to Build" : "Currently Out of Stock"}
                        </div>

                        <p className="text-gray-300 leading-relaxed mb-8">
                            {build.description}
                        </p>

                        <div className="flex gap-4 mb-12">
                            <button 
                                onClick={() => setIsContactModalOpen(true)}
                                className="flex-1 bg-gradient-to-r from-[#FF2DA6] to-purple-600 hover:from-purple-500 hover:to-[#FF2DA6] text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(255,45,166,0.4)] hover:shadow-[0_0_30px_rgba(255,45,166,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                                Contact Us
                            </button>
                        </div>

                        {/* Specifications List */}
                        <div className="bg-[#111827]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                            <h3 className="text-2xl font-orbitron font-bold text-white mb-6 flex items-center gap-3">
                                <Server className="text-[#00E5FF]" />
                                System Specifications
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-y-4">
                                {specs.map((spec, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="mt-1 bg-black/40 p-2 rounded-lg border border-white/5">
                                            {spec.icon}
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-400 font-medium mb-1">{spec.label}</div>
                                            <div className="text-white font-medium">{spec.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>

            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </div>
    );
}
