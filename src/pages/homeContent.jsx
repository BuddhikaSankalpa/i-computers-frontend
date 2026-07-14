import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, Truck, CreditCard, ChevronRight, ChevronLeft, Monitor, Cpu, HardDrive, Headphones, Mail, Check, Wrench, Laptop } from "lucide-react";
import api from "../utils/api";
import getFormattedPrice from "../utils/price-formatter";
import Footer from "../components/footer";
import CustomerReviews from "../components/CustomerReviews";
import CyberpunkHero from "../components/CyberpunkHero";

export default function HomeContent() {
    const [featuredBuilds, setFeaturedBuilds] = useState([]);
    
    // Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselImages = [
        "https://vygslztoywtzdpltsnnk.supabase.co/storage/v1/object/public/otherImages/images/home_Carousel/1.webp",
        "https://vygslztoywtzdpltsnnk.supabase.co/storage/v1/object/public/otherImages/images/home_Carousel/2.webp",
        "https://vygslztoywtzdpltsnnk.supabase.co/storage/v1/object/public/otherImages/images/home_Carousel/3.webp",
        "https://vygslztoywtzdpltsnnk.supabase.co/storage/v1/object/public/otherImages/images/home_Carousel/4.webp",
        "https://vygslztoywtzdpltsnnk.supabase.co/storage/v1/object/public/otherImages/images/home_Carousel/5.webp",
        "https://vygslztoywtzdpltsnnk.supabase.co/storage/v1/object/public/otherImages/images/home_Carousel/6.webp"
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));

    useEffect(() => {
        // Fetch a few complete builds for the featured section
        api.get("/complete-builds")
            .then((res) => {
                setFeaturedBuilds(res.data.builds.slice(0, 4));
            })
            .catch((err) => console.error("Error fetching featured builds:", err));
    }, []);

    const categories = [
        { name: "Custom PC Builder", icon: <Wrench size={32} />, path: "/pc-builder" },
        { name: "Complete Builds", icon: <Monitor size={32} />, path: "/complete-builds" },
        { name: "Gaming Laptops", icon: <Laptop size={32} />, path: "/products?category=laptops" },
        { name: "PC Components", icon: <Cpu size={32} />, path: "/products?category=graphic card" },
    ];

    const features = [
        { title: "Fast Delivery", desc: "Island wide express shipping", icon: <Truck size={32} className="text-[#00E5FF]" /> },
        { title: "Genuine Products", desc: "100% authentic gear", icon: <Shield size={32} className="text-[#FF2DA6]" /> },
        { title: "Warranty", desc: "Comprehensive coverage", icon: <Zap size={32} className="text-[#A855F7]" /> },
        { title: "Secure Payments", desc: "Safe & encrypted", icon: <CreditCard size={32} className="text-[#00E5FF]" /> },
    ];

    return (
        <div className="w-full flex flex-col items-center">
            {/* Hero Section */}
            <CyberpunkHero />

            {/* Why Choose Us Features */}
            <section className="w-full max-w-[1400px] px-6 md:px-12 py-16 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#111827]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-transform shadow-xl"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex justify-center items-center">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">{feature.title}</h3>
                                <p className="text-[#A0AEC0] text-sm">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            

            {/* Categories Section */}
            <section className="w-full max-w-[1400px] px-6 md:px-12 py-16 flex flex-col gap-10">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-3xl font-orbitron font-bold text-white mb-2">EXPLORE OUR STORE</h2>
                        <div className="h-1 w-20 bg-[#FF2DA6] rounded-full"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <Link 
                            key={idx}
                            to={cat.path}
                            className="group relative h-48 bg-[#111827] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-center items-center gap-4 hover:border-[#A855F7]/50 transition-colors"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <div className="relative z-20 text-[#A0AEC0] group-hover:text-[#A855F7] group-hover:scale-110 transition-all duration-300">
                                {cat.icon}
                            </div>
                            <h3 className="relative z-20 text-white font-bold text-xl tracking-wider group-hover:-translate-y-1 transition-transform">
                                {cat.name}
                            </h3>
                            <div className="absolute inset-0 bg-[#A855F7]/5 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                        </Link>
                    ))}
                </div>
            </section>

            {/* Image Carousel Section (Full Width) */}
            <section className="w-full mt-16 mb-8 flex flex-col items-center">
                <div className="relative w-full overflow-hidden bg-[#050816] group border-y border-white/10">
                    
                    {/* Images Container */}
                    <div 
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {carouselImages.map((src, idx) => (
                            <img 
                                key={idx} 
                                src={src} 
                                alt={`Carousel Slide ${idx + 1}`} 
                                className="w-full object-cover flex-shrink-0"
                                style={{ maxHeight: "700px", minHeight: "400px", objectPosition: "center" }}
                            />
                        ))}
                    </div>

                    {/* Previous Button */}
                    <button 
                        onClick={prevSlide}
                        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#FF2DA6] text-white p-4 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    {/* Next Button */}
                    <button 
                        onClick={nextSlide}
                        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#FF2DA6] text-white p-4 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                        aria-label="Next Slide"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                        {carouselImages.map((_, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-2.5 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] ${currentSlide === idx ? "w-10 bg-[#FF2DA6]" : "w-3 bg-white/60 hover:bg-white"}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Builds */}
            <section className="w-full max-w-[1400px] px-6 md:px-12 py-16 flex flex-col gap-10">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-3xl font-orbitron font-bold text-white mb-2">ELITE GAMING BUILDS</h2>
                        <div className="h-1 w-20 bg-[#00E5FF] rounded-full"></div>
                    </div>
                    <Link to="/complete-builds" className="text-[#00E5FF] hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
                        View All <ChevronRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredBuilds.length > 0 ? (
                        featuredBuilds.map(build => (
                            <Link key={build.buildId} to={`/complete-builds/${build.buildId}`} className="group relative bg-[#111827] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-[#FF2DA6]/50 hover:shadow-[0_0_20px_rgba(255,45,166,0.2)] transition-all">
                                <div className="h-56 w-full bg-black/40 p-6 flex justify-center items-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111827]/80 z-10" />
                                    <img src={build.images[0]} alt={build.name} className="w-full h-full object-contain relative z-0 group-hover:scale-110 transition-transform duration-500" />
                                    {/* Stock badge */}
                                    <div className="absolute top-3 right-3 z-20">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold border backdrop-blur-md ${
                                            build.isAvailable && build.stock > 0
                                                ? "bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/30"
                                                : "bg-red-500/20 text-red-400 border-red-500/30"
                                        }`}>
                                            {build.isAvailable && build.stock > 0 ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col gap-2 flex-grow relative z-20 bg-gradient-to-b from-transparent to-[#111827]">
                                    <h3 className="text-lg font-bold text-white group-hover:text-[#FF2DA6] transition-colors line-clamp-1">{build.name}</h3>
                                    <div className="flex gap-2 text-xs text-gray-400 mt-1">
                                        <Cpu size={14} className="text-[#FF2DA6] shrink-0" />
                                        <span className="truncate">{build.cpu.split(" ").slice(0, 3).join(" ")}</span>
                                    </div>
                                    <div className="flex gap-2 text-xs text-gray-400">
                                        <Monitor size={14} className="text-[#00E5FF] shrink-0" />
                                        <span className="truncate">{build.gpu.split(" ").slice(0, 3).join(" ")}</span>
                                    </div>
                                    <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/10">
                                        <span className="text-xl font-bold text-[#00E5FF]">{getFormattedPrice(build.price)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="h-80 bg-[#111827] animate-pulse rounded-2xl border border-white/5"></div>
                        ))
                    )}
                </div>
            </section>

            {/* Showcase Video Section */}
            <section className="w-full max-w-[1400px] px-6 md:px-12 py-8 flex flex-col items-center">
                <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,229,255,0.1)] relative bg-[#050816]">
                    <video 
                        className="w-full h-auto max-h-[700px] object-cover"
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                    >
                        <source src="https://vygslztoywtzdpltsnnk.supabase.co/storage/v1/object/public/otherImages/images/vid_sample_2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="w-full max-w-[1400px] px-6 md:px-12 py-16 mt-10">
                <div className="relative w-full bg-[#111827] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-12 shadow-2xl">
                    
                    {/* Background Glowing Orbs */}
                    <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#00E5FF]/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#FF2DA6]/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-transparent via-[#A855F7]/5 to-transparent -rotate-12 pointer-events-none" />

                    {/* Left Side: Content */}
                    <div className="relative z-10 w-full md:w-1/2 flex flex-col gap-6 text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">
                            <Zap size={16} className="text-[#00E5FF]" />
                            <span className="text-xs font-bold text-[#A0AEC0] uppercase tracking-wider">Level Up Your Inbox</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-orbitron text-white leading-tight">
                            JOIN THE <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#FF2DA6]">ELITE</span>
                        </h2>
                        
                        <p className="text-[#A0AEC0] text-lg max-w-md">
                            Subscribe to our newsletter and get exclusive offers, early access to new drops, and premium gaming builds delivered straight to you.
                        </p>
                        
                        {/* Perks */}
                        <div className="flex flex-col sm:flex-row gap-6 mt-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex justify-center items-center">
                                    <Check size={16} className="text-[#00E5FF]" />
                                </div>
                                <span className="text-sm font-medium text-gray-300">Weekly Deals</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#FF2DA6]/10 border border-[#FF2DA6]/20 flex justify-center items-center">
                                    <Check size={16} className="text-[#FF2DA6]" />
                                </div>
                                <span className="text-sm font-medium text-gray-300">Early Access</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form Card */}
                    <div className="relative z-10 w-full md:w-5/12 max-w-md">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col gap-5">
                            <h3 className="text-xl text-white font-semibold mb-2">Claim Your Benefits</h3>
                            
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    className="w-full bg-[#050816] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all placeholder:text-gray-600"
                                />
                            </div>
                            
                            <button className="w-full bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-black font-bold text-lg px-8 py-4 rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] mt-2">
                                Subscribe Now
                            </button>
                            
                            <p className="text-xs text-gray-500 text-center mt-2">
                                No spam, just gaming goodness. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                    
                </div>
            </section>

            

            <CustomerReviews />

            <Footer />
        </div>
    );
}