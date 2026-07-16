import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ShoppingBag, Wrench, Shield, Briefcase, ChevronDown, Send, CheckCircle2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import { useState } from "react";
import Footer from "../components/footer";

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-white/10 bg-[#111827]/50 backdrop-blur-md rounded-xl overflow-hidden mb-4">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
                <span className="text-white font-orbitron font-semibold text-lg">{question}</span>
                <ChevronDown className={`text-[#00E5FF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-5 pb-5 text-[#A0AEC0] font-poppins">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function ContactUs() {
    const [formState, setFormState] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    return (
        <div className="w-full min-h-screen bg-[#050816] text-white overflow-hidden pb-2">
            {/* 1. Hero Section */}
            <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden mb-40">
                <div className="absolute inset-0 bg-gradient-to-b from-[#A855F7]/10 via-[#FF2DA6]/5 to-[#050816] z-0"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                
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
                    className="relative z-10 text-center max-w-3xl px-6"
                >
                    <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A855F7] to-[#FF2DA6] drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        Contact Us
                    </h1>
                    <p className="text-lg md:text-xl text-[#A0AEC0] font-poppins leading-relaxed ">
                        Have questions about our products, custom PC builds, warranties, or orders? Our team is always ready to help you.
                    </p>
                </motion.div>
            </section>

            {/* 2. Contact Information Cards */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 -mt-16 relative z-20 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: MapPin, title: "Store Address", content: "123 Main Street<br/>Colombo<br/>Sri Lanka", color: "#00E5FF" },
                        { icon: Phone, title: "Phone", content: "+94 71 234 5678", color: "#A855F7" },
                        { icon: Mail, title: "Email", content: "<a href='mailto:support@quantumparts.lk' class='hover:text-[#FF2DA6] transition-colors'>support@quantumparts.lk</a>", color: "#FF2DA6" },
                        { icon: Clock, title: "Business Hours", content: "Mon : Fri: 9:00 AM – 6:00 PM<br/>Sat : 9:00 AM – 4:00 PM<br/>Sun : Closed", color: "#00E5FF" }
                    ].map((info, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-[#111827]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] group"
                        >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ backgroundColor: `${info.color}15`, color: info.color }}>
                                <info.icon size={24} />
                            </div>
                            <h3 className="text-xl font-orbitron font-bold text-white mb-3">{info.title}</h3>
                            <p className="text-[#A0AEC0] font-poppins text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: info.content }}></p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Main Content: Form & Categories */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left: Contact Form */}
                    <div className="lg:col-span-7">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#111827] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 rounded-full blur-3xl"></div>
                            
                            <h2 className="text-3xl font-orbitron font-bold text-white mb-8 relative z-10">Send Us a Message</h2>
                            
                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <input 
                                            type="text" 
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({...formState, name: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-poppins outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all peer"
                                            placeholder=" "
                                        />
                                        <label className="absolute left-4 top-4 text-[#A0AEC0] pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00E5FF] peer-focus:bg-[#111827] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#111827] peer-[:not(:placeholder-shown)]:px-1">Full Name</label>
                                    </div>
                                    <div className="relative group">
                                        <input 
                                            type="email" 
                                            required
                                            value={formState.email}
                                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-poppins outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all peer"
                                            placeholder=" "
                                        />
                                        <label className="absolute left-4 top-4 text-[#A0AEC0] pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#A855F7] peer-focus:bg-[#111827] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#111827] peer-[:not(:placeholder-shown)]:px-1">Email Address</label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <input 
                                            type="tel" 
                                            required
                                            value={formState.phone}
                                            onChange={(e) => setFormState({...formState, phone: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-poppins outline-none focus:border-[#FF2DA6] focus:ring-1 focus:ring-[#FF2DA6] transition-all peer"
                                            placeholder=" "
                                        />
                                        <label className="absolute left-4 top-4 text-[#A0AEC0] pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FF2DA6] peer-focus:bg-[#111827] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#111827] peer-[:not(:placeholder-shown)]:px-1">Phone Number</label>
                                    </div>
                                    <div className="relative group">
                                        <input 
                                            type="text" 
                                            required
                                            value={formState.subject}
                                            onChange={(e) => setFormState({...formState, subject: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-poppins outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all peer"
                                            placeholder=" "
                                        />
                                        <label className="absolute left-4 top-4 text-[#A0AEC0] pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00E5FF] peer-focus:bg-[#111827] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#111827] peer-[:not(:placeholder-shown)]:px-1">Subject</label>
                                    </div>
                                </div>
                                
                                <div className="relative group">
                                    <textarea 
                                        required
                                        rows="5"
                                        value={formState.message}
                                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-poppins outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all peer resize-none"
                                        placeholder=" "
                                    ></textarea>
                                    <label className="absolute left-4 top-4 text-[#A0AEC0] pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#A855F7] peer-focus:bg-[#111827] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-[#111827] peer-[:not(:placeholder-shown)]:px-1">Message</label>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting || isSuccess}
                                    type="submit"
                                    className={`w-full py-4 rounded-xl font-bold font-orbitron tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${isSuccess ? 'bg-[#00E676] text-black shadow-[0_0_20px_rgba(0,230,118,0.4)]' : 'bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-white shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'}`}
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : isSuccess ? (
                                        <>Message Sent <CheckCircle2 size={20} /></>
                                    ) : (
                                        <>Send Message <Send size={18} /></>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right: Support Categories */}
                    <div className="lg:col-span-5 space-y-6">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl font-orbitron font-bold text-white mb-6"
                        >
                            Support Categories
                        </motion.h2>
                        
                        {[
                            { icon: ShoppingBag, title: "Sales", desc: "Need help choosing the right product? Our sales team is here to guide you." },
                            { icon: Wrench, title: "Technical Support", desc: "Experiencing technical issues? Our experts are ready to assist." },
                            { icon: Shield, title: "Warranty Claims", desc: "Questions regarding warranties, repairs, or replacements." },
                            { icon: Briefcase, title: "Business Inquiries", desc: "Corporate solutions, partnerships, and wholesale opportunities." }
                        ].map((cat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                                className="bg-[#111827] border border-white/5 p-5 rounded-xl flex items-start gap-5 cursor-pointer transition-colors group"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#00E5FF]/20 group-hover:text-[#00E5FF] text-[#A0AEC0] transition-colors border border-white/5 group-hover:border-[#00E5FF]/30">
                                    <cat.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-orbitron font-bold mb-1">{cat.title}</h4>
                                    <p className="text-[#A0AEC0] text-sm font-poppins">{cat.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ & Map Section */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    {/* FAQ */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-orbitron font-bold text-white mb-8">Frequently Asked Questions</h2>
                        <FAQItem 
                            question="Do you offer islandwide delivery?" 
                            answer="Yes. We deliver products safely across Sri Lanka."
                        />
                        <FAQItem 
                            question="Can I build a custom gaming PC?" 
                            answer="Absolutely. We specialize in fully customized gaming PCs tailored to your requirements."
                        />
                        <FAQItem 
                            question="Are your products genuine?" 
                            answer="Yes. All products are sourced from trusted manufacturers and authorized distributors."
                        />
                        <FAQItem 
                            question="How can I track my order?" 
                            answer="Tracking information will be provided once your order has been dispatched."
                        />
                    </motion.div>

                    {/* Google Maps & Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col h-full"
                    >
                        <h2 className="text-3xl font-orbitron font-bold text-white mb-8">Find Us</h2>
                        <div className="w-full flex-grow min-h-[300px] rounded-2xl overflow-hidden border border-white/10 relative group">
                            {/* Map overlay gradient */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF2DA6]/30 rounded-2xl transition-colors pointer-events-none z-10"></div>
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585977934!2d79.78616422177372!3d6.921922576131464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1698240000000!5m2!1sen!2sus" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                            ></iframe>
                        </div>

                        {/* Social Media */}
                        <div className="mt-8">
                            <h3 className="text-lg font-orbitron font-bold text-[#A0AEC0] mb-4">Connect With Us</h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: FaFacebook, color: "hover:text-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.5)]", link: "https://www.facebook.com/" },
                                    { icon: FaInstagram, color: "hover:text-[#E1306C] hover:border-[#E1306C] hover:shadow-[0_0_15px_rgba(225,48,108,0.5)]", link: "https://www.instagram.com/" },
                                    { icon: FaLinkedin, color: "hover:text-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.5)]", link: "https://www.linkedin.com/" },
                                    { icon: FaYoutube, color: "hover:text-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]", link: "https://www.youtube.com/" },
                                    { icon: FaTiktok, color: "hover:text-[#00E5FF] hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.5)]", link: "https://www.tiktok.com/" }
                                ].map((social, idx) => (
                                    <a 
                                        key={idx} 
                                        href={social.link} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color}`}
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
