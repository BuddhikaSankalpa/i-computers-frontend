import { motion, useInView, useAnimation } from "framer-motion";
import { ShieldCheck, Cpu, DollarSign, Truck, Headphones, ThumbsUp, ArrowRight, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

// Counter Component for stats
function AnimatedCounter({ value, duration = 2 }) {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);
    const inView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = parseInt(value, 10);
            if (start === end) return;

            let totalMilSecDur = parseInt(duration);
            let incrementTime = (totalMilSecDur * 1000) / end;

            let timer = setInterval(() => {
                start += Math.ceil(end / (totalMilSecDur * 1000 / 16)); // ~60fps
                if (start >= end) {
                    clearInterval(timer);
                    setCount(end);
                } else {
                    setCount(start);
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [value, duration, inView]);

    return <span ref={nodeRef}>{count}</span>;
}

export default function AboutUs() {
    return (
        <div className="w-full min-h-screen bg-[#050816] text-white overflow-hidden pb-2">
            {/* 1. Hero Section */}
            <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/10 via-[#A855F7]/5 to-[#050816] z-0"></div>
                
                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-[#00E5FF] rounded-full blur-[1px]"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: Math.random() * 0.5 + 0.3
                        }}
                        animate={{
                            y: [null, Math.random() * -200],
                            opacity: [null, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 text-center max-w-4xl px-6"
                >
                    <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00E5FF] to-[#A855F7] drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                        About quantum parts
                    </h1>
                    <p className="text-lg md:text-xl text-[#A0AEC0] font-poppins leading-relaxed max-w-3xl mx-auto">
                        Empowering gamers, creators, professionals, and businesses with high performance computer hardware, premium gaming accessories, and exceptional customer service.
                    </p>
                </motion.div>
            </section>

            {/* 2. Our Story */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl overflow-hidden group border border-white/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2DA6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=2070&auto=format&fit=crop" 
                            alt="Premium Gaming Setup" 
                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 font-poppins"
                    >
                        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white">
                            Building Technology That <span className="text-[#00E5FF]">Powers Your Future</span>
                        </h2>
                        <div className="space-y-4 text-[#A0AEC0] leading-relaxed">
                            <p>
                                At <strong className="text-white font-semibold">quantum parts</strong>, we believe technology should be powerful, reliable, and accessible to everyone.
                            </p>
                            <p>
                                Our mission is to provide premium computer hardware, gaming accessories, custom-built PCs, laptops, networking equipment, and the latest technology products from trusted global brands.
                            </p>
                            <p>
                                Whether you're a passionate gamer, creative professional, university student, or business owner, we're dedicated to helping you build the perfect computing experience.
                            </p>
                            <p>
                                We are committed to delivering genuine products, expert advice, competitive pricing, and outstanding customer service to customers across Sri Lanka.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Mission & Vision */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        className="bg-[#111827]/80 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] group"
                    >
                        <div className="w-14 h-14 bg-[#A855F7]/10 rounded-xl flex items-center justify-center mb-6 border border-[#A855F7]/20 group-hover:border-[#A855F7]/50 transition-colors">
                            <ShieldCheck className="text-[#A855F7]" size={28} />
                        </div>
                        <h3 className="text-2xl font-orbitron font-bold mb-4 text-white">Our Mission</h3>
                        <p className="text-[#A0AEC0] font-poppins leading-relaxed">
                            To become Sri Lanka's most trusted destination for premium computer hardware by delivering innovative technology solutions, genuine products, and exceptional customer experiences.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-[#111827]/80 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] group"
                    >
                        <div className="w-14 h-14 bg-[#FF2DA6]/10 rounded-xl flex items-center justify-center mb-6 border border-[#FF2DA6]/20 group-hover:border-[#FF2DA6]/50 transition-colors">
                            <Cpu className="text-[#FF2DA6]" size={28} />
                        </div>
                        <h3 className="text-2xl font-orbitron font-bold mb-4 text-white">Our Vision</h3>
                        <p className="text-[#A0AEC0] font-poppins leading-relaxed">
                            To inspire every gamer, creator, student, and professional by making cutting-edge technology more accessible and helping them achieve their goals through reliable computing solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 4. Why Choose Us */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">Why Choose Us</h2>
                    <div className="w-24 h-1 bg-[#00E5FF] mx-auto rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: ShieldCheck, title: "Genuine Products", desc: "We source authentic products directly from trusted manufacturers and authorized distributors.", color: "#00E5FF" },
                        { icon: Cpu, title: "Premium Hardware", desc: "Discover the latest gaming PCs, graphics cards, processors, monitors, and accessories.", color: "#A855F7" },
                        { icon: DollarSign, title: "Competitive Pricing", desc: "Enjoy affordable pricing without compromising on quality.", color: "#FF2DA6" },
                        { icon: Truck, title: "Fast Islandwide Delivery", desc: "Reliable and secure delivery to customers across Sri Lanka.", color: "#00E5FF" },
                        { icon: Headphones, title: "Technical Expertise", desc: "Receive expert guidance from experienced professionals when selecting your components.", color: "#A855F7" },
                        { icon: ThumbsUp, title: "Customer Satisfaction", desc: "Building long-term customer relationships through outstanding service and reliable support.", color: "#FF2DA6" }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5, borderColor: feature.color }}
                            className="bg-[#111827] border border-white/5 p-6 rounded-xl transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors`} style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                                <feature.icon size={24} />
                            </div>
                            <h4 className="text-lg font-orbitron font-bold text-white mb-2">{feature.title}</h4>
                            <p className="text-[#A0AEC0] text-sm font-poppins leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. Featured Brands */}
            <section className="w-full py-16 border-y border-white/5 bg-[#050816]/50">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-10 text-center">
                    <h2 className="text-2xl font-orbitron font-bold text-white/80 tracking-widest uppercase">Featured Brands</h2>
                </div>
                
                <div className="w-full overflow-hidden flex whitespace-nowrap relative">
                    <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#050816] to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#050816] to-transparent z-10"></div>
                    
                    <motion.div 
                        className="flex gap-16 items-center px-8"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                        style={{ width: "fit-content" }}
                    >
                        {/* Duplicate the list for seamless looping */}
                        {["ASUS", "MSI", "NVIDIA", "AMD", "Intel", "Corsair", "Gigabyte", "Kingston", "Logitech", "Razer", "ASUS", "MSI", "NVIDIA", "AMD", "Intel", "Corsair", "Gigabyte", "Kingston", "Logitech", "Razer"].map((brand, i) => (
                            <div key={i} className="text-3xl md:text-4xl font-orbitron font-black text-white/10 hover:text-white transition-colors duration-300 cursor-pointer hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                {brand}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 6. Company Statistics */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Happy Customers", value: "5000", suffix: "+" },
                        { label: "Products Available", value: "1000", suffix: "+" },
                        { label: "Trusted Brands", value: "25", suffix: "+" },
                        { label: "Customer Satisfaction", value: "99", suffix: "%" }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-orbitron font-bold text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.4)] mb-2">
                                <AnimatedCounter value={stat.value} duration={2} />{stat.suffix}
                            </div>
                            <div className="text-[#A0AEC0] font-poppins uppercase tracking-wider text-xs md:text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 7. Call to Action */}
            <section className="max-w-[1000px] mx-auto px-6 md:px-12 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#111827] via-[#1a2333] to-[#111827] p-10 md:p-16 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,229,255,0.1)]"
                >
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-6">Ready to Upgrade Your Setup?</h2>
                    <p className="text-[#A0AEC0] font-poppins mb-10 max-w-2xl mx-auto">
                        Explore our premium collection of gaming computers, laptops, components, and accessories designed to elevate your computing experience.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/products" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#00E5FF] to-[#00b3cc] text-[#050816] font-bold font-poppins rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group">
                            Shop Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/contact-us" className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold font-poppins rounded-lg hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2">
                            Contact Us <Mail size={18} />
                        </Link>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </div>
    );
}
