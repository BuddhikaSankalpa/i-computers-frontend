import { useEffect, useState } from "react";
import api from "../../utils/api";
import LoadingScreen from "../../components/loadingScreen";
import getFormattedPrice from "../../utils/price-formatter";
import formatTimestamp from "../../utils/date-formatter";
import AdminOrderDataModal from "../../components/orderDataModal";

export default function AdminCustomBuilds() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem("token");
            api.get(`/orders/custom-builds/${pageNumber}/${pageSize}`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                setOrders(res.data.orders);
                setTotalOrders(res.data.totalOrders);
                setTotalPages(res.data.totalPages);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [loading, pageNumber, pageSize]);

    return (
        <div className="w-full h-full flex flex-col pb-24">
            {/* Header Section */}
            <div className="w-full bg-black/40 backdrop-blur-md border border-white/10 mb-8 rounded-xl flex p-6 items-center justify-between text-white shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold tracking-wide">Custom PC Builds</h1>
                    <p className="text-sm text-gray-400 mt-1">Orders placed through the PC Builder</p>
                </div>
                <div className="bg-cyan-900/40 text-cyan-300 border border-cyan-500/30 px-5 py-2.5 rounded-lg font-medium text-sm tracking-wide">
                    {totalOrders} Builds
                </div>
            </div>

            {loading && <LoadingScreen />}

            {/* Table Section */}
            <div className="w-full flex-1 overflow-y-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl custom-scrollbar">
                <table className="w-full text-left text-sm text-gray-300 border-collapse whitespace-nowrap">
                    <thead className="bg-black/60 text-gray-400 text-xs uppercase tracking-wider sticky top-0 z-10 border-b border-white/10">
                        <tr>
                            <th className="px-4 py-4 font-semibold">Order ID</th>
                            <th className="px-4 py-4 font-semibold">Email</th>
                            <th className="px-4 py-4 font-semibold">Name</th>
                            <th className="px-4 py-4 font-semibold">City</th>
                            <th className="px-4 py-4 font-semibold">Phone</th>
                            <th className="px-4 py-4 font-semibold">Status</th>
                            <th className="px-4 py-4 font-semibold">Date</th>
                            <th className="px-4 py-4 font-semibold text-right">Total Amount</th>
                            <th className="px-4 py-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {orders.length === 0 && !loading ? (
                            <tr>
                                <td colSpan={9} className="text-center py-16 text-[#A0AEC0]">
                                    No custom build orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr className="hover:bg-white/5 transition-colors duration-200" key={order.orderId}>
                                    <td className="px-4 py-4 font-medium text-white">{order.orderId}</td>
                                    <td className="px-4 py-4">{order.email}</td>
                                    <td className="px-4 py-4">{order.firstName} {order.lastName}</td>
                                    <td className="px-4 py-4">{order.city}</td>
                                    <td className="px-4 py-4">{order.phone}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${order.status === "Delivered" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                order.status === "Shipped" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                    order.status === "Processing" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                                                        "bg-gray-500/10 text-gray-400 border-gray-500/20"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">{formatTimestamp(order.date)}</td>
                                    <td className="px-4 py-4 text-right text-[#00E676] font-semibold">
                                        {getFormattedPrice(order.totalAmount)}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="w-full flex justify-center items-center">
                                            <AdminOrderDataModal isAdmin={true} order={order} refresh={() => setLoading(true)} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
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
