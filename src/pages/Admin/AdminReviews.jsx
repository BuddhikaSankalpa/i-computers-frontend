import { useEffect, useState } from "react";
import api from "../../utils/api";
import LoadingScreen from "../../components/loadingScreen";
import formatTimestamp from "../../utils/date-formatter";
import getFormattedPrice from "../../utils/price-formatter";
import { Check, Trash2, Star } from "lucide-react";
import toast from "react-hot-toast";

function StarDisplay({ value }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={14}
                    className={s <= value ? "text-[#FFD700] fill-[#FFD700]" : "text-white/15"}
                />
            ))}
        </div>
    );
}

export default function AdminReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem("token");
            api.get(`/reviews/${pageNumber}/${pageSize}`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                setReviews(res.data.reviews);
                setTotalReviews(res.data.totalReviews);
                setTotalPages(res.data.totalPages);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [loading, pageNumber, pageSize]);

    const handleApprove = async (reviewId) => {
        const token = localStorage.getItem("token");
        try {
            await api.put(`/reviews/${reviewId}`, { status: "approved" }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Review approved!", {
                style: { background: "#111827", color: "#00E5FF", border: "1px solid rgba(0,229,255,0.3)" },
            });
            setLoading(true);
        } catch (err) {
            toast.error("Failed to approve review.", {
                style: { background: "#111827", color: "#fff", border: "1px solid rgba(239,68,68,0.3)" },
            });
        }
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        const token = localStorage.getItem("token");
        try {
            await api.delete(`/reviews/${reviewId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Review deleted.", {
                style: { background: "#111827", color: "#fff", border: "1px solid rgba(239,68,68,0.3)" },
            });
            setLoading(true);
        } catch (err) {
            toast.error("Failed to delete review.", {
                style: { background: "#111827", color: "#fff", border: "1px solid rgba(239,68,68,0.3)" },
            });
        }
    };

    return (
        <div className="w-full h-full flex flex-col pb-24">
            {/* Header */}
            <div className="w-full bg-black/40 backdrop-blur-md border border-white/10 mb-8 rounded-xl flex p-6 items-center justify-between text-white shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold tracking-wide">Customer Reviews</h1>
                    <p className="text-sm text-gray-400 mt-1">Moderate and manage customer reviews</p>
                </div>
                <div className="bg-purple-900/40 text-purple-300 border border-purple-500/30 px-5 py-2.5 rounded-lg font-medium text-sm tracking-wide">
                    {totalReviews} Reviews
                </div>
            </div>

            {loading && <LoadingScreen />}

            {/* Table */}
            <div className="w-full flex-1 overflow-y-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl custom-scrollbar">
                <table className="w-full text-left text-sm text-gray-300 border-collapse whitespace-nowrap">
                    <thead className="bg-black/60 text-gray-400 text-xs uppercase tracking-wider sticky top-0 z-10 border-b border-white/10">
                        <tr>
                            <th className="px-4 py-4 font-semibold">Name</th>
                            <th className="px-4 py-4 font-semibold">Rating</th>
                            <th className="px-4 py-4 font-semibold max-w-xs">Comment</th>
                            <th className="px-4 py-4 font-semibold">Status</th>
                            <th className="px-4 py-4 font-semibold">Date</th>
                            <th className="px-4 py-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {reviews.map((review) => (
                            <tr className="hover:bg-white/5 transition-colors duration-200" key={review._id}>
                                <td className="px-4 py-4 font-medium text-white">{review.name}</td>
                                <td className="px-4 py-4">
                                    <StarDisplay value={review.rating} />
                                </td>
                                <td className="px-4 py-4 max-w-xs truncate text-[#A0AEC0]">
                                    {review.comment}
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${review.status === "approved"
                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                        }`}>
                                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-[#A0AEC0]">{formatTimestamp(review.createdAt)}</td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        {review.status !== "approved" && (
                                            <button
                                                onClick={() => handleApprove(review._id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 rounded-lg text-xs font-medium transition-all"
                                            >
                                                <Check size={14} />
                                                Approve
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-medium transition-all"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="fixed bottom-6 left-[280px] right-0 flex justify-center items-center pointer-events-none z-20">
                <div className="bg-black/70 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center rounded-xl overflow-hidden pointer-events-auto">
                    <select
                        value={pageSize}
                        onChange={(e) => { setPageSize(Number(e.target.value)); setPageNumber(1); setLoading(true); }}
                        className="h-full py-3 px-4 bg-transparent text-gray-300 border-r border-white/10 outline-none hover:bg-white/5 cursor-pointer appearance-none"
                    >
                        <option className="bg-gray-900" value={5}>5 per page</option>
                        <option className="bg-gray-900" value={10}>10 per page</option>
                        <option className="bg-gray-900" value={20}>20 per page</option>
                    </select>
                    <div className="flex items-center justify-center gap-2 px-4 py-2">
                        <button
                            disabled={pageNumber === 1}
                            onClick={() => { setPageNumber(pageNumber - 1); setLoading(true); }}
                            className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded border border-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>
                        <span className="text-gray-400 text-sm px-2">
                            Page <span className="text-white font-medium">{pageNumber}</span> of {totalPages}
                        </span>
                        <button
                            disabled={pageNumber === totalPages}
                            onClick={() => { setPageNumber(pageNumber + 1); setLoading(true); }}
                            className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded border border-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
