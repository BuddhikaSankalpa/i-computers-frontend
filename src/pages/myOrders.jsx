import { useEffect, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import getFormattedPrice from "../utils/price-formatter";
import formatTimestamp from "../utils/date-formatter";
import AdminOrderDataModal from "../components/orderDataModal";
import { Package, ChevronLeft, ChevronRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import Footer from "../components/footer";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem("token");
            api
                .get("/orders/"+pageNumber+"/"+pageSize, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setOrders(res.data.orders);
                    setTotalOrders(res.data.totalOrders);
                    setTotalPages(res.data.totalPages);
                    setLoading(false);
                });
        }
    }, [loading]);

    const getStatusStyle = (status) => {
        switch(status?.toLowerCase()) {
            case 'completed':
            case 'delivered':
                return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
            case 'cancelled':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'processing':
            default:
                return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#050816] flex flex-col pt-10">
            <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex-grow flex flex-col mb-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <Package className="text-[#00E5FF]" size={32} />
                        <h1 className="text-3xl font-orbitron font-bold text-white">Order History</h1>
                    </div>
                    <div className="bg-[#111827] border border-white/10 px-4 py-2 rounded-xl">
                        <span className="text-[#A0AEC0] mr-2">Total Orders:</span>
                        <span className="text-white font-bold">{totalOrders}</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex-grow flex justify-center items-center">
                        <div className="w-12 h-12 border-4 border-white/10 border-t-[#00E5FF] rounded-full animate-spin"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center bg-[#111827]/50 rounded-3xl border border-white/5 p-12">
                        <Package size={80} className="text-[#A0AEC0] opacity-20 mb-6" />
                        <h2 className="text-2xl text-white font-orbitron font-semibold mb-3">No orders found</h2>
                        <p className="text-[#A0AEC0]">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="flex flex-col flex-grow">
                        {/* Table Container */}
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex-grow mb-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead className="bg-black/60 border-b border-white/10">
                                        <tr>
                                            <th className="p-4 text-xs font-semibold text-[#A0AEC0] uppercase tracking-wider">Order ID</th>
                                            <th className="p-4 text-xs font-semibold text-[#A0AEC0] uppercase tracking-wider">Date</th>
                                            <th className="p-4 text-xs font-semibold text-[#A0AEC0] uppercase tracking-wider">Customer</th>
                                            <th className="p-4 text-xs font-semibold text-[#A0AEC0] uppercase tracking-wider">City</th>
                                            <th className="p-4 text-xs font-semibold text-[#A0AEC0] uppercase tracking-wider">Status</th>
                                            <th className="p-4 text-xs font-semibold text-[#A0AEC0] uppercase tracking-wider">Total Amount</th>
                                            <th className="p-4 text-xs font-semibold text-[#A0AEC0] uppercase tracking-wider text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {orders.map((order) => (
                                            <tr key={order.orderId} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-4">
                                                    <span className="font-mono text-sm text-[#00E5FF]">{order.orderId.substring(0,8)}...</span>
                                                </td>
                                                <td className="p-4 text-sm text-gray-300 whitespace-nowrap">
                                                    {formatTimestamp(order.date)}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-white font-medium">{order.firstName} {order.lastName}</span>
                                                        <span className="text-xs text-[#A0AEC0]">{order.email}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm text-gray-300">
                                                    {order.city}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-bold text-white whitespace-nowrap">
                                                    {getFormattedPrice(order.totalAmount)}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex justify-center items-center">
                                                        <AdminOrderDataModal isAdmin={false} order={order} refresh={() => setLoading(true)}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
                            <div className="flex items-center gap-3">
                                <label className="text-sm text-[#A0AEC0]">Rows per page:</label>
                                <select 
                                    value={pageSize} 
                                    onChange={(e) => {setPageSize(Number(e.target.value)); setLoading(true)}} 
                                    className="bg-black/40 border border-white/10 text-white text-sm rounded-lg py-1 px-3 outline-none focus:border-[#00E5FF]"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <button 
                                    disabled={pageNumber === 1} 
                                    onClick={() => {setPageNumber(pageNumber - 1); setLoading(true)}} 
                                    className="w-10 h-10 flex justify-center items-center bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="text-sm text-[#A0AEC0]">
                                    Page <span className="font-semibold text-white">{pageNumber}</span> of <span className="font-semibold text-white">{totalPages}</span>
                                </span>
                                <button 
                                    disabled={pageNumber === totalPages} 
                                    onClick={() => {setPageNumber(pageNumber + 1); setLoading(true)}} 
                                    className="w-10 h-10 flex justify-center items-center bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
