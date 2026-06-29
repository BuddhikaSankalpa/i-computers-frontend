import { useState } from "react"
import { addToCart, getCart, getTotal } from "../utils/cart"
import getFormattedPrice from "../utils/price-formatter"
import { useLocation, useNavigate } from "react-router-dom"
import CreateOrder from "../components/createOrder"
import { CreditCard, Trash2, Plus, Minus, ArrowLeft } from "lucide-react"
import Footer from "../components/footer"

export default function CheckoutPage(){
    const location = useLocation()
    const navigate = useNavigate()
    const data = location.state
    const [cart, setCart] = useState(data || [])

    if (!data || cart.length === 0) {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] bg-[#050816] flex flex-col items-center justify-center p-6">
                <CreditCard size={64} className="text-[#A0AEC0] opacity-30 mb-6" />
                <h2 className="text-2xl text-white font-orbitron font-semibold mb-4">No items to checkout</h2>
                <button 
                    onClick={() => navigate('/products')}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-colors"
                >
                    Return to Shop
                </button>
            </div>
        )
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#050816] flex flex-col pt-10">
            <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12 flex-grow flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 bg-black/40 border border-white/10 rounded-xl text-[#A0AEC0] hover:text-white transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex items-center gap-3">
                        <CreditCard className="text-[#A855F7]" size={32} />
                        <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white">Checkout</h1>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 mb-20">
                    {/* Items Review */}
                    <div className="flex-grow flex flex-col gap-4">
                        <h2 className="text-xl font-semibold text-white mb-2">Review Your Items</h2>
                        {cart.map((cartItem, index) => (
                            <div key={index} className="bg-[#111827]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center gap-6 relative group hover:border-white/10 transition-colors">
                                {/* Product Image */}
                                <div className="w-full sm:w-28 h-28 bg-black/40 rounded-xl p-2 flex justify-center items-center shrink-0">
                                    <img src={cartItem.product.image} className="max-w-full max-h-full object-contain" alt={cartItem.product.name} />
                                </div>
                            
                                {/* Product Details */}
                                <div className="flex-grow flex flex-col justify-center text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{cartItem.product.name}</h3>
                                    {cartItem.product.price < cartItem.product.labelledPrice && (
                                        <p className="text-[#A0AEC0] text-sm line-through">
                                            {getFormattedPrice(cartItem.product.labelledPrice)}
                                        </p>
                                    )}
                                    <p className="text-[#00E5FF] font-orbitron font-semibold text-xl mt-1 drop-shadow-[0_0_5px_rgba(0,229,255,0.3)]">
                                        {getFormattedPrice(cartItem.product.price)}
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex flex-col items-center gap-4 shrink-0">
                                    <div className="flex items-center bg-black/50 border border-white/10 rounded-xl overflow-hidden h-10 w-28">
                                        <button 
                                            className="flex-1 h-full flex justify-center items-center text-[#A0AEC0] hover:text-white hover:bg-white/5 transition-colors"
                                            onClick={() => {
                                                addToCart(cartItem.product, -1)
                                                setCart(getCart())
                                            }}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="flex-1 h-full flex justify-center items-center text-white font-semibold text-sm">
                                            {cartItem.qty}
                                        </span>
                                        <button 
                                            className="flex-1 h-full flex justify-center items-center text-[#A0AEC0] hover:text-white hover:bg-white/5 transition-colors"
                                            onClick={() => {
                                                addToCart(cartItem.product, 1)
                                                setCart(getCart())
                                            }}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    <p className="text-white font-orbitron font-bold text-lg hidden sm:block">
                                        {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                                    </p>
                                </div>

                                {/* Remove Button */}
                                <button
                                    title="Remove item"
                                    className="absolute top-4 right-4 sm:top-auto sm:right-auto sm:relative p-2 text-[#A0AEC0] hover:text-[#FF2DA6] hover:bg-[#FF2DA6]/10 rounded-lg transition-colors shrink-0"
                                    onClick={() => {
                                        addToCart(cartItem.product, -cartItem.qty)
                                        setCart(getCart())
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary & Checkout Form */}
                    <div className="w-full lg:w-[450px] shrink-0">
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-[#A855F7]/20 rounded-3xl p-8 sticky top-28 shadow-[0_0_30px_rgba(168,85,247,0.05)]">
                            <h3 className="text-xl font-orbitron font-bold text-white mb-6 border-b border-white/10 pb-4">Checkout Summary</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-[#A0AEC0]">
                                    <span>Subtotal ({cart.length} items)</span>
                                    <span className="text-white">{getFormattedPrice(getTotal(cart))}</span>
                                </div>
                                <div className="flex justify-between text-[#A0AEC0]">
                                    <span>Shipping</span>
                                    <span className="text-emerald-400">Free</span>
                                </div>
                                <div className="flex justify-between text-[#A0AEC0]">
                                    <span>Taxes</span>
                                    <span className="text-white">Calculated at payment</span>
                                </div>
                            </div>
                            
                            <div className="border-t border-white/10 pt-6 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-white font-medium">Total To Pay</span>
                                    <span className="text-3xl text-[#A855F7] font-orbitron font-bold drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                                        {getFormattedPrice(getTotal(cart))}
                                    </span>
                                </div>
                            </div>

                            <CreateOrder cart={cart} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}