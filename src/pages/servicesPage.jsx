import { motion } from "framer-motion";
import {
    Wrench, Cpu, HardDrive, Wifi, ShieldCheck, Truck,
    RefreshCw, Headphones, Building2, ArrowRight, Mail, Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const services = [
    {
        icon: Cpu,
        title: "Custom PC Building",
        desc: "Tell us your budget and use case gaming, editing, or workstation and we'll hand-pick and assemble the perfect build for you.",
        color: "#00E5FF"
    },
    {
        icon: Wrench,
        title: "Hardware Repair & Diagnostics",
        desc: "Fast, accurate diagnostics for desktops and laptops. From power issues to component failures, we find and fix the problem.",
        color: "#A855F7"
    },
    {
        icon: RefreshCw,
        title: "Upgrades & Performance Tuning",
        desc: "RAM, storage, GPU, or cooling upgrades to breathe new life into your existing setup without a full rebuild.",
        color: "#FF2DA6"
    },
    {
        icon: HardDrive,
        title: "Data Recovery & Backup",
        desc: "Lost files after a crash or corrupted drive? Our recovery process helps retrieve what matters most, plus backup setup to prevent it happening again.",
        color: "#00E5FF"
    },
    {
        icon: Wifi,
        title: "Networking & Wi-Fi Setup",
        desc: "Home or office network setup, router configuration, and Wi-Fi optimization for stable, fast connections.",
        color: "#A855F7"
    },
    {
        icon: Building2,
        title: "Corporate & Bulk IT Supply",
        desc: "Volume pricing and dedicated support for businesses, schools, and offices needing multiple systems or IT infrastructure.",
        color: "#FF2DA6"
    },
    {
        icon: ShieldCheck,
        title: "Warranty & After-Sales Support",
        desc: "Every product comes with genuine manufacturer warranty, and our team stays with you long after the sale.",
        color: "#00E5FF"
    },
    {
        icon: Truck,
        title: "On-Site & Home Service",
        desc: "Can't bring your PC in? Our technicians can visit for setup, repairs, or troubleshooting at your location.",
        color: "#A855F7"
    },
    {
        icon: Headphones,
        title: "Free Consultation",
        desc: "Not sure what you need? Chat with our experts before you buy no pressure, just honest advice.",
        color: "#FF2DA6"
    }
];

const process = [
    { step: "01", title: "Reach Out", desc: "Contact us via call, WhatsApp, or visit our store with your requirement." },
    { step: "02", title: "Diagnosis / Consultation", desc: "We assess your needs or inspect your device and give you a clear quote." },
    { step: "03", title: "We Get to Work", desc: "Our certified technicians handle the build, repair, or setup with care." },
    { step: "04", title: "Quality Check & Delivery", desc: "Every job is tested before handover, with warranty and support included." }
];

export default function ServicesPage() {
    return (
        <div className="w-full min-h-screen bg-[#050816] text-white overflow-hidden pb-2">
            {/* 1. Hero Section */}
            <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#A855F7]/10 via-[#00E5FF]/5 to-[#050816] z-0"></div>

                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-[#A855F7] rounded-full blur-[1px]"
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
                    <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A855F7] to-[#00E5FF] drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        Our Services
                    </h1>
                    <p className="text-lg md:text-xl text-[#A0AEC0] font-poppins leading-relaxed max-w-3xl mx-auto">
                        Beyond selling hardware we build, repair, upgrade, and support the technology that powers your world.
                    </p>
                </motion.div>
            </section>

            {/* 2. Services Grid */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">What We Offer</h2>
                    <div className="w-24 h-1 bg-[#A855F7] mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 3) * 0.1 }}
                            whileHover={{ y: -5, borderColor: service.color }}
                            className="bg-[#111827]/80 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 group"
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 border transition-colors"
                                style={{ backgroundColor: `${service.color}15`, borderColor: `${service.color}30`, color: service.color }}
                            >
                                <service.icon size={26} />
                            </div>
                            <h3 className="text-xl font-orbitron font-bold mb-3 text-white">{service.title}</h3>
                            <p className="text-[#A0AEC0] font-poppins text-sm leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. How It Works */}
            <section className="w-full py-20 border-y border-white/5 bg-[#050816]/50">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">How It Works</h2>
                        <div className="w-24 h-1 bg-[#00E5FF] mx-auto rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {process.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="relative text-center font-poppins"
                            >
                                <div className="text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7] mb-4 opacity-80">
                                    {item.step}
                                </div>
                                <h4 className="text-lg font-orbitron font-bold text-white mb-2">{item.title}</h4>
                                <p className="text-[#A0AEC0] text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Call to Action */}
            <section className="max-w-[1000px] mx-auto px-6 md:px-12 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#111827] via-[#1a2333] to-[#111827] p-10 md:p-16 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.1)]"
                >
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-6">Need a Hand With Your Setup?</h2>
                    <p className="text-[#A0AEC0] font-poppins mb-10 max-w-2xl mx-auto">
                        Whether it's a repair, a custom build, or expert advice our team is ready to help.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact-us" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#A855F7] to-[#7c3aed] text-white font-bold font-poppins rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group">
                            Book a Service <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="tel:+94000000000" className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold font-poppins rounded-lg hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2">
                            Call Us <Phone size={18} />
                        </a>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </div>
    );
}