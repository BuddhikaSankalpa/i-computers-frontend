import { useState } from "react";
import { createPortal } from "react-dom";
import { CiTrash } from "react-icons/ci";
import { IoClose, IoWarningOutline } from "react-icons/io5"; 
import api from "../utils/api";
import toast from "react-hot-toast";

export default function ProductDeleteButton(props){

    const [isModalVisible, setIsModalVisible] = useState(false);

    const refresh = props.refresh;
    const productId = props.productId;

    const modalContent = (
        <div className="fixed top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm m-0 p-0">
            
            {/* Glassmorphism Modal Box */}
            <div className="w-[420px] max-w-[90%] bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
                
                {/* Header */}
                <div className="w-full flex justify-between items-center p-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/20 rounded-full border border-red-500/30">
                            <IoWarningOutline className="text-red-400 text-xl" />
                        </div>
                        <h1 className="text-white text-lg font-bold tracking-wide">Confirm Deletion</h1>
                    </div>
                    <button 
                        className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                        onClick={() => setIsModalVisible(false)}
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Body Text */}
                <div className="p-6 flex flex-col items-center justify-center text-center text-gray-300 gap-3">
                    <p className="w-full break-words">Are you sure you want to delete the product with ID:</p>
                    <span className="text-white font-bold bg-white/10 px-4 py-1.5 rounded-md text-lg shadow-inner">{productId}</span>
                    <p className="text-sm text-red-400 mt-1">This action cannot be undone.</p>
                </div>

                {/* Footer Buttons */}
                <div className="w-full flex p-5 justify-end items-center gap-3 bg-white/5 border-t border-white/10">
                    <button 
                        className="px-5 py-2 text-gray-300 bg-transparent border border-gray-600 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200 font-medium" 
                        onClick={() => setIsModalVisible(false)}
                    >
                        Cancel
                    </button>
                    <button 
                        className="px-5 py-2 text-white bg-red-600/90 rounded-lg hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all duration-200 font-medium flex items-center justify-center min-w-[100px]" 
                        onClick={() => {
                            const toastId = toast.loading("Deleting product...");
                            const token = localStorage.getItem("token");
                            
                            api.delete("/products/" + productId, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }).then(() => {
                                toast.success("Product deleted successfully!", { id: toastId });
                                refresh();
                                setIsModalVisible(false);
                            }).catch(() => {
                                toast.error("Error deleting product", { id: toastId });
                            });
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <CiTrash 
                className="text-red-400 text-2xl hover:text-red-300 hover:scale-110 transition-all duration-200 cursor-pointer" 
                onClick={() => setIsModalVisible(true)} 
            />
            
            {isModalVisible && createPortal(modalContent, document.body)}
        </>
    )
}