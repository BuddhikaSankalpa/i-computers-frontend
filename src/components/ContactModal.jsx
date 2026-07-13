import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin } from "lucide-react";

export default function ContactModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-0">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                        className="relative w-full max-w-md bg-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-[#FF2DA6] to-transparent opacity-50 blur-[2px]" />

                        <div className="p-6 sm:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Contact Us</h2>
                                    <p className="text-sm text-gray-400">Get in touch to customize this build.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF2DA6]/30 hover:bg-[#FF2DA6]/5 transition-all group">
                                    <div className="p-3 bg-[#FF2DA6]/10 rounded-lg group-hover:scale-110 transition-transform">
                                        <Mail className="text-[#FF2DA6]" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium">Email</p>
                                        <a href="mailto:support@quantum.com" className="text-white hover:text-[#FF2DA6] transition-colors font-medium">
                                            support@quantum.com
                                        </a>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all group">
                                    <div className="p-3 bg-[#00E5FF]/10 rounded-lg group-hover:scale-110 transition-transform">
                                        <Phone className="text-[#00E5FF]" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium">Phone</p>
                                        <a href="tel:+1234567890" className="text-white hover:text-[#00E5FF] transition-colors font-medium">
                                            +94 77 123 4567
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#A855F7]/30 hover:bg-[#A855F7]/5 transition-all group">
                                    <div className="p-3 bg-[#A855F7]/10 rounded-lg group-hover:scale-110 transition-transform">
                                        <MapPin className="text-[#A855F7]" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium">Visit Us</p>
                                        <p className="text-white font-medium">
                                            123 Tech Lane,<br />
                                            Colombo, Sri Lanka
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-4 bg-white/5 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-400">Available Monday to Friday, 9am - 6pm</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
