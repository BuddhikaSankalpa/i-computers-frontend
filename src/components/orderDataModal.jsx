import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdEye } from "react-icons/io";
import getFormattedPrice from "../utils/price-formatter";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function AdminOrderDataModal(props) {
    const [isOpen, setIsOpen] = useState(false);
    const order = props.order;
    const refresh = props.refresh;

    function updateOrderStatus(newStatus) {
        const token = localStorage.getItem("token");

        api.put("/orders/" + order.orderId, {
            status: newStatus
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            toast.success("Order status updated to " + newStatus);
            refresh();
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to update order status");
        });
    }

    return (
        <>
            {/* View Button */}
            <button 
                onClick={() => setIsOpen(true)}
                className="w-9 h-9 rounded-lg bg-blue-500/10 hover:bg-[#00f2fe]/20 border border-blue-500/30 hover:border-[#00f2fe]/50 flex justify-center items-center transition-all duration-300 group shadow-lg"
                title="View Order Details"
            >
                <IoMdEye className="text-[#00f2fe] text-xl group-hover:scale-110 transition-transform" />
            </button>

            {/* Modal Overlay */}
            {isOpen && createPortal(
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in m-0">
                    
                    {/* Modal Container */}
                    <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0b0f19]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,242,254,0.25)] overflow-hidden">
                        
                        {/* Header & Customer Details Section */}
                        <div className="flex-none bg-gradient-to-r from-white/5 to-transparent border-b border-white/10 p-6 sm:p-8">
                            
                            {/* Close Button */}
                            <button
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>

                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                {/* Left: Info */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-3xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                            {order.orderId}
                                        </h2>
                                        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                                            Order Details
                                        </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                        <p className="flex items-center gap-2"><span className="text-gray-500 w-16">Name:</span> <span className="text-gray-200 font-medium">{order.firstName} {order.lastName}</span></p>
                                        <p className="flex items-center gap-2"><span className="text-gray-500 w-16">Phone:</span> <span className="text-gray-200 font-medium">{order.phone}</span></p>
                                        <p className="flex items-center gap-2"><span className="text-gray-500 w-16">Email:</span> <span className="text-gray-200 font-medium">{order.email}</span></p>
                                        <p className="flex items-start gap-2"><span className="text-gray-500 w-16 mt-0.5">Address:</span> <span className="text-gray-200 font-medium leading-relaxed">{order.addressLine1} {order.addressLine2 && `, ${order.addressLine2}`}, {order.city}</span></p>
                                    </div>
                                </div>

                                {/* Right: Action & Total */}
                                <div className="flex flex-col gap-4 md:items-end min-w-[200px] bg-black/20 p-4 rounded-xl border border-white/5">
                                    <div className="w-full text-left md:text-right">
                                        <label className="text-gray-500 text-xs uppercase tracking-wider mb-1 block">Status</label>
                                        <select 
                                            className="w-full md:w-auto appearance-none bg-white/5 border border-white/20 text-white px-4 py-2 pr-8 rounded-lg outline-none focus:border-[#00f2fe] hover:bg-white/10 transition-colors cursor-pointer text-sm font-medium" 
                                            defaultValue={order.status}
                                            onChange={(e) => updateOrderStatus(e.target.value)}
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                                        >
                                            <option className="bg-gray-900" value="Pending">Pending</option>
                                            <option className="bg-gray-900" value="Processing">Processing</option>
                                            <option className="bg-gray-900" value="Shipped">Shipped</option>
                                            <option className="bg-gray-900" value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                    
                                    <div className="w-full text-left md:text-right mt-auto">
                                        <label className="text-gray-500 text-xs uppercase tracking-wider mb-1 block">Total Amount</label>
                                        <p className="text-2xl font-bold text-[#00E676] drop-shadow-[0_0_10px_rgba(0,230,118,0.3)]">
                                            {getFormattedPrice(order.totalAmount)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                Purchased Items 
                                <span className="bg-white/10 text-white px-2 py-0.5 rounded-md text-xs">{order.items.length}</span>
                            </h3>
                            
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div
                                        className="group relative w-full bg-white/[0.02] border border-white/5 hover:border-[#00f2fe]/30 hover:bg-white/[0.04] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all duration-300"
                                        key={index}
                                    >
                                        {/* Product Image */}
                                        <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden shrink-0 border border-white/5 flex justify-center items-center group-hover:scale-105 transition-transform duration-300">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-full h-full object-contain p-2 drop-shadow-lg"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h3 className="text-base font-semibold text-gray-200 mb-1 group-hover:text-white transition-colors">
                                                {item.product.name}
                                            </h3>
                                            
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                                <p className="text-[#00f2fe] font-medium text-sm">
                                                    {getFormattedPrice(item.product.price)}
                                                </p>
                                                {item.product.labelledPrice > item.product.price && (
                                                    <p className="text-gray-500 text-xs line-through">
                                                        {getFormattedPrice(item.product.labelledPrice)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Qty & Subtotal */}
                                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:gap-8 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-white/5 sm:border-none">
                                            <div className="flex flex-col items-center">
                                                <span className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Qty</span>
                                                <div className="h-7 min-w-[36px] px-2 bg-black/40 border border-white/10 rounded text-gray-300 flex items-center justify-center text-sm font-medium">
                                                    {item.quantity}
                                                </div>
                                            </div>
                                            
                                            <div className="text-right">
                                                <span className="text-gray-500 text-[10px] uppercase tracking-wider mb-1 block">Subtotal</span>
                                                <span className="text-lg text-white font-semibold">
                                                    {getFormattedPrice(item.product.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>, document.body
            )}
        </>
    );
}