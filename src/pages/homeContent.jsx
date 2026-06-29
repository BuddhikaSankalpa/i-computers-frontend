import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, Truck, CreditCard, ChevronRight, Monitor, Cpu, HardDrive, Headphones } from "lucide-react";
import api from "../utils/api";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";

export default function HomeContent() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        // Fetch a few products for the featured section
        api.get("/products")
            .then((res) => {
                setFeaturedProducts(res.data.slice(0, 4));
            })
            .catch((err) => console.error("Error fetching featured products:", err));
    }, []);

    const categories = [
        { name: "Gaming PCs", icon: <Monitor size={32} />, path: "/products?category=gaming-pcs" },
        { name: "Processors", icon: <Cpu size={32} />, path: "/products?category=processors" },
        { name: "Graphics Cards", icon: <HardDrive size={32} />, path: "/products?category=graphics-cards" },
        { name: "Accessories", icon: <Headphones size={32} />, path: "/products?category=accessories" },
    ];

    const features = [
        { title: "Fast Delivery", desc: "Island-wide express shipping", icon: <Truck size={32} className="text-[#00E5FF]" /> },
        { title: "Genuine Products", desc: "100% authentic gear", icon: <Shield size={32} className="text-[#FF2DA6]" /> },
        { title: "Warranty", desc: "Comprehensive coverage", icon: <Zap size={32} className="text-[#A855F7]" /> },
        { title: "Secure Payments", desc: "Safe & encrypted", icon: <CreditCard size={32} className="text-[#00E5FF]" /> },
    ];

    const brands = ["ASUS ROG", "MSI", "CORSAIR", "NVIDIA", "AMD", "GIGABYTE", "RAZER", "LOGITECH"];

    return (
        <div className="w-full flex flex-col items-center">
            {/* Hero Section */}
            <section className="relative w-full h-[80vh] min-h-[600px] flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/homePage.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent" />
                
                <div className="relative z-10 max-w-3xl flex flex-col gap-6">
                    <motion.h1 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-white font-orbitron leading-tight"
                    >
                        BUILD YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7]">ULTIMATE</span> GAMING PC
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-[#A0AEC0] max-w-xl"
                    >
                        Premium Gaming PCs, Components, Accessories, and Gaming Gear Delivered Across Sri Lanka.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap gap-4 mt-4"
                    >
                        <Link to="/products" className="px-8 py-4 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center gap-2 group">
                            Shop Now
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/products" className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl backdrop-blur-md transition-all">
                            Explore Builds
                        </Link>
                    </motion.div>
                </div>
            </section>

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
                        <h2 className="text-3xl font-orbitron font-bold text-white mb-2">SHOP BY CATEGORY</h2>
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

            {/* Featured Products */}
            <section className="w-full max-w-[1400px] px-6 md:px-12 py-16 flex flex-col gap-10">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-3xl font-orbitron font-bold text-white mb-2">TOP RATED PRODUCTS</h2>
                        <div className="h-1 w-20 bg-[#00E5FF] rounded-full"></div>
                    </div>
                    <Link to="/products" className="text-[#00E5FF] hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
                        View All <ChevronRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map(product => (
                            <ProductCard key={product.productId} product={product} />
                        ))
                    ) : (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="h-80 bg-[#111827] animate-pulse rounded-2xl border border-white/5"></div>
                        ))
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="w-full max-w-[1400px] px-6 md:px-12 py-16 mt-10">
                <div className="w-full bg-gradient-to-r from-[#00E5FF]/20 via-[#A855F7]/20 to-[#FF2DA6]/20 border border-white/10 rounded-3xl p-10 flex flex-col items-center text-center gap-6 relative overflow-hidden">
                    <div className="absolute inset-0 backdrop-blur-3xl -z-10" />
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-orbitron">Join The Elite</h2>
                    <p className="text-[#A0AEC0] max-w-lg">
                        Subscribe to our newsletter and get exclusive offers, early access to new drops, and premium gaming builds.
                    </p>
                    
                    <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="flex-1 bg-black/40 border border-white/20 rounded-xl px-5 py-4 text-white outline-none focus:border-[#00E5FF] transition-colors placeholder:text-gray-500"
                        />
                        <button className="bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
