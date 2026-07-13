import { motion } from "framer-motion";
import {
    ShieldCheck, RotateCcw, Clock, XCircle, PackageCheck,
    FileText, AlertTriangle, CheckCircle2, ArrowRight, Mail, Phone
} from "lucide-react";
import { Link } from "react-router-dom";

const warrantyCoverage = [
    {
        icon: ShieldCheck,
        title: "Manufacturer Warranty",
        desc: "All products come with genuine manufacturer warranty, ranging from 1 to 5 years depending on the brand and category.",
        color: "#00E5FF"
    },
    {
        icon: PackageCheck,
        title: "Local Support",
        desc: "Warranty claims are handled locally in Sri Lanka — no need to deal with overseas support directly.",
        color: "#A855F7"
    },
    {
        icon: Clock,
        title: "Fast Turnaround",
        desc: "Most warranty repairs or replacements are processed within 7–14 business days of approval.",
        color: "#FF2DA6"
    }
];

const returnConditions = [
    { valid: true, text: "Item is unused, in original packaging, with all accessories included" },
    { valid: true, text: "Return requested within 7 days of delivery" },
    { valid: true, text: "Product is defective, damaged in transit, or not as described" },
    { valid: false, text: "Item shows signs of physical damage caused after delivery" },
    { valid: false, text: "Software, licenses, or digital products once activated" },
    { valid: false, text: "Custom-built PCs after assembly has started" },
];

const process = [
    { step: "01", title: "Contact Us", desc: "Reach out within 7 days with your order number and reason for return or warranty claim." },
    { step: "02", title: "Inspection", desc: "Our team reviews the product to confirm eligibility under warranty or return policy." },
    { step: "03", title: "Approval", desc: "Once approved, we arrange pickup, repair, replacement, or refund as applicable." },
    { step: "04", title: "Resolution", desc: "Refunds are processed within 5–7 business days; replacements are shipped right away." }
];

export default function WarrantyReturnPolicy() {
    return (
        <div className="w-full min-h-screen bg-[#050816] text-white overflow-hidden pb-20">
            {/* 1. Hero Section */}
            <section className="relative w-full h-[55vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/10 via-[#A855F7]/5 to-[#050816] z-0"></div>

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
                        Warranty & Returns
                    </h1>
                    <p className="text-lg md:text-xl text-[#A0AEC0] font-poppins leading-relaxed max-w-3xl mx-auto">
                        Shop with confidence genuine warranty on every product and a clear, fair return process.
                    </p>
                </motion.div>
            </section>

            {/* 2. Warranty Coverage */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">Warranty Coverage</h2>
                    <div className="w-24 h-1 bg-[#00E5FF] mx-auto rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {warrantyCoverage.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5, borderColor: item.color }}
                            className="bg-[#111827]/80 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 group"
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 border transition-colors"
                                style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}30`, color: item.color }}
                            >
                                <item.icon size={26} />
                            </div>
                            <h3 className="text-xl font-orbitron font-bold mb-3 text-white">{item.title}</h3>
                            <p className="text-[#A0AEC0] font-poppins text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. Return Conditions */}
            <section className="w-full py-20 border-y border-white/5 bg-[#050816]/50">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">Return Eligibility</h2>
                        <div className="w-24 h-1 bg-[#A855F7] mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                        <p className="text-[#A0AEC0] font-poppins mt-4 max-w-2xl mx-auto">
                            Returns are accepted within 7 days of delivery under the following conditions.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {returnConditions.map((cond, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className={`flex items-start gap-3 p-5 rounded-xl border font-poppins text-sm leading-relaxed ${
                                    cond.valid
                                        ? "bg-[#00E5FF]/5 border-[#00E5FF]/20 text-[#E2E8F0]"
                                        : "bg-[#FF2DA6]/5 border-[#FF2DA6]/20 text-[#E2E8F0]"
                                }`}
                            >
                                {cond.valid ? (
                                    <CheckCircle2 size={20} className="text-[#00E5FF] flex-shrink-0 mt-0.5" />
                                ) : (
                                    <XCircle size={20} className="text-[#FF2DA6] flex-shrink-0 mt-0.5" />
                                )}
                                <span>{cond.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Process */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">How Claims Work</h2>
                    <div className="w-24 h-1 bg-[#FF2DA6] mx-auto rounded-full shadow-[0_0_10px_rgba(255,45,166,0.5)]"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            </section>

            {/* 5. Important Notes */}
            <section className="max-w-[1000px] mx-auto px-6 md:px-12 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#111827]/80 backdrop-blur-md border border-[#FF2DA6]/20 p-8 rounded-2xl flex gap-4"
                >
                    <AlertTriangle className="text-[#FF2DA6] flex-shrink-0" size={28} />
                    <div className="font-poppins text-sm text-[#A0AEC0] leading-relaxed">
                        <h4 className="text-white font-orbitron font-bold text-base mb-2">Please Note</h4>
                        Shipping costs for returns due to change of mind are covered by the customer. Items returned due to our error, defect, or transit damage are covered by us in full, including return shipping. Refunds are issued to the original payment method used at checkout.
                    </div>
                </motion.div>
            </section>

            {/* 6. Call to Action */}
            <section className="max-w-[1000px] mx-auto px-6 md:px-12 py-16 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#111827] via-[#1a2333] to-[#111827] p-10 md:p-16 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,229,255,0.1)]"
                >
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-6">Need to Start a Claim?</h2>
                    <p className="text-[#A0AEC0] font-poppins mb-10 max-w-2xl mx-auto">
                        Get in touch with your order number and we'll guide you through the next steps.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact-us" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#00E5FF] to-[#00b3cc] text-[#050816] font-bold font-poppins rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group">
                            Start a Claim <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="mailto:support@quantumparts.lk" className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold font-poppins rounded-lg hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2">
                            Email Us <Mail size={18} />
                        </a>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}