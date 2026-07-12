import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquarePlus, X, Send, Loader2 } from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";

function StarRating({ value, onChange }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange && onChange(star)}
                    onMouseEnter={() => onChange && setHovered(star)}
                    onMouseLeave={() => onChange && setHovered(0)}
                    className="transition-transform hover:scale-110"
                >
                    <Star
                        size={24}
                        className={`transition-colors ${star <= (hovered || value)
                                ? "text-[#FFD700] fill-[#FFD700]"
                                : "text-white/20"
                            }`}
                    />
                </button>
            ))}
        </div>
    );
}

export default function CustomerReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        api.get("/reviews/approved")
            .then((res) => setReviews(res.data))
            .catch((err) => console.error("Error fetching reviews:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            toast.error("Please write a comment.", {
                style: { background: "#111827", color: "#fff", border: "1px solid rgba(239,68,68,0.3)" },
            });
            return;
        }
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            await api.post("/reviews", { rating, comment }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Review submitted! It will appear after approval.", {
                style: { background: "#111827", color: "#00E5FF", border: "1px solid rgba(0,229,255,0.3)" },
            });
            setComment("");
            setRating(5);
            setShowForm(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to submit review.", {
                style: { background: "#111827", color: "#fff", border: "1px solid rgba(239,68,68,0.3)" },
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="w-full max-w-[1400px] px-6 md:px-12 py-16 flex flex-col gap-10">
            {/* Section Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-3xl font-orbitron font-bold text-white mb-2">WHAT CUSTOMERS SAY</h2>
                    <div className="h-1 w-20 bg-[#A855F7] rounded-full"></div>
                </div>
                {isLoggedIn && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#A855F7] rounded-xl hover:bg-[#A855F7]/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 text-sm font-semibold"
                    >
                        <MessageSquarePlus size={18} />
                        Write a Review
                    </button>
                )}
            </div>

            {/* Review Submit Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl p-8 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white font-orbitron tracking-wide">Leave a Review</h3>
                                <button onClick={() => setShowForm(false)} className="text-[#A0AEC0] hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div>
                                    <label className="block text-sm text-[#A0AEC0] mb-2 font-medium">Your Rating</label>
                                    <StarRating value={rating} onChange={setRating} />
                                </div>
                                <div>
                                    <label className="block text-sm text-[#A0AEC0] mb-2 font-medium">Your Review</label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        rows={4}
                                        placeholder="Share your experience with QuantumParts..."
                                        className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all placeholder:text-gray-600 resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#A855F7] to-[#00E5FF] text-black font-bold rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                                    {submitting ? "Submitting..." : "Submit Review"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reviews Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="h-48 bg-[#111827] animate-pulse rounded-2xl border border-white/5" />
                    ))}
                </div>
            ) : reviews.length === 0 ? (
                <div className="flex flex-col items-center py-16 text-[#A0AEC0]">
                    <MessageSquarePlus size={48} className="mb-4 opacity-30" />
                    <p className="text-lg">No reviews yet. Be the first to leave one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className="relative bg-[#111827]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform shadow-xl group overflow-hidden"
                        >
                            {/* Glow accent */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#A855F7]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            {/* Stars */}
                            <StarRating value={review.rating} />

                            {/* Comment */}
                            <p className="text-[#A0AEC0] text-sm leading-relaxed flex-1">
                                "{review.comment}"
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#A855F7] to-[#00E5FF] flex items-center justify-center text-black font-bold text-sm">
                                        {review.name?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">{review.name}</p>
                                        <p className="text-[#A0AEC0] text-xs">
                                            {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-[#00E5FF] font-medium bg-[#00E5FF]/10 border border-[#00E5FF]/20 px-2 py-1 rounded-full">
                                    Verified
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}
