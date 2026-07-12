import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { X, MapPin, Phone, User, CheckCircle2 } from "lucide-react";

export default function CreateOrder(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const navigate = useNavigate()
    const cart = props.cart;

    async function placeOrder() {
        try {
            const body = {
                firstName: firstName,
                lastName: lastName,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city,
                phone: phone,
                items: []
            }

            // If the user came from the PC Builder, mark as custom_build
            const savedOrderType = localStorage.getItem("orderType");
            if (savedOrderType === "custom_build") {
                body.orderType = "custom_build";
            }

            for (let i = 0; i < cart.length; i++) {
                const item = cart[i]
                body.items.push({
                    productId: item.product.productId,
                    quantity: item.qty
                })
            }
            const token = localStorage.getItem("token")
            const response = await api.post("/orders", body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            // Clear the custom build flag after successful order
            localStorage.removeItem("orderType");
            toast.success("Order placed successfully!", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
                iconTheme: { primary: '#A855F7', secondary: '#000' }
            })
            setIsModalOpen(false)
            navigate("/")
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            })
        }
    }

    return (
        <>
            {isModalOpen &&
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="w-full max-w-2xl bg-[#111827] rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative animate-in fade-in zoom-in duration-300">

                        {/* Glowing Orbs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

                        {/* Header */}
                        <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5 bg-white/5">
                            <div className="flex items-center gap-3">
                                <MapPin className="text-[#A855F7]" size={28} />
                                <h2 className="text-2xl font-orbitron font-bold text-white">Shipping Details</h2>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-10 h-10 flex justify-center items-center bg-black/40 text-[#A0AEC0] hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form Fields */}
                        <div className="p-6 md:p-8 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0AEC0]" size={18} />
                                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-[#A0AEC0]/50 outline-none focus:border-[#A855F7] focus:bg-white/5 transition-colors" />
                                </div>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0AEC0]" size={18} />
                                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-[#A0AEC0]/50 outline-none focus:border-[#A855F7] focus:bg-white/5 transition-colors" />
                                </div>
                            </div>

                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0AEC0]" size={18} />
                                <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-[#A0AEC0]/50 outline-none focus:border-[#A855F7] focus:bg-white/5 transition-colors" />
                            </div>

                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0AEC0]" size={18} />
                                <input type="text" placeholder="Address Line 2 (Optional)" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-[#A0AEC0]/50 outline-none focus:border-[#A855F7] focus:bg-white/5 transition-colors" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0AEC0]" size={18} />
                                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-[#A0AEC0]/50 outline-none focus:border-[#A855F7] focus:bg-white/5 transition-colors" />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0AEC0]" size={18} />
                                    <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-[#A0AEC0]/50 outline-none focus:border-[#A855F7] focus:bg-white/5 transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 md:p-8 border-t border-white/5 bg-white/5 mt-auto flex gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-4 px-6 bg-black/40 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={placeOrder}
                                className="flex-1 py-4 px-6 bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-white rounded-xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:opacity-90 transition-all flex justify-center items-center gap-2"
                            >
                                <CheckCircle2 size={20} />
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>}

            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:opacity-90 transition-all flex justify-center items-center gap-2"
            >
                Continue to Payment
            </button>
        </>
    );
}
