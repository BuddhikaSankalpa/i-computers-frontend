import { useState } from "react"
import { addToCart, getCart, getTotal } from "../utils/cart"
import getFormattedPrice from "../utils/price-formatter"
import { Link } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import Footer from "../components/footer"

export default function CartPage(){
    const [cart, setCart] = useState(getCart())

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#050816] flex flex-col pt-10">
            <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingBag className="text-[#00E5FF]" size={32} />
                    <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white">Your Cart</h1>
                </div>

                {cart.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center bg-[#111827]/50 rounded-3xl border border-white/5 p-12 mb-10">
                        <ShoppingBag size={80} className="text-[#A0AEC0] opacity-20 mb-6" />
                        <h2 className="text-2xl text-white font-orbitron font-semibold mb-3">Your cart is empty</h2>
                        <p className="text-[#A0AEC0] mb-8 text-center max-w-md">Looks like you haven't added any products to your cart yet. Discover our premium collection and upgrade your setup today.</p>
                        <Link to="/products" className="px-8 py-4 bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-white rounded-xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:opacity-90 transition-all flex items-center gap-2">
                            Explore Products <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 mb-20">
                        {/* Cart Items */}
                        <div className="flex-grow flex flex-col gap-4">
                            {cart.map((cartItem, index) => (
                                <div key={index} className="bg-[#111827]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center gap-6 relative group hover:border-white/10 transition-colors shadow-lg">
                                    {/* Product Image */}
                                    <div className="w-full sm:w-32 h-32 bg-black/40 rounded-xl p-2 flex justify-center items-center shrink-0">
                                        <img src={cartItem.product.image} className="max-w-full max-h-full object-contain" alt={cartItem.product.name} />
                                    </div>
                                
                                    {/* Product Details */}
                                    <div className="flex-grow flex flex-col justify-center text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{cartItem.product.name}</h3>
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
                                        <div className="flex items-center bg-black/50 border border-white/10 rounded-xl overflow-hidden h-10 w-32">
                                            <button 
                                                className="flex-1 h-full flex justify-center items-center text-[#A0AEC0] hover:text-white hover:bg-white/5 transition-colors"
                                                onClick={() => {
                                                    addToCart(cartItem.product, -1)
                                                    setCart(getCart())
                                                }}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="flex-1 h-full flex justify-center items-center text-white font-semibold">
                                                {cartItem.qty}
                                            </span>
                                            <button 
                                                className="flex-1 h-full flex justify-center items-center text-[#A0AEC0] hover:text-white hover:bg-white/5 transition-colors"
                                                onClick={() => {
                                                    addToCart(cartItem.product, 1)
                                                    setCart(getCart())
                                                }}
                                            >
                                                <Plus size={16} />
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
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-96 shrink-0">
                            <div className="bg-[#111827]/80 backdrop-blur-xl border border-[#00E5FF]/20 rounded-3xl p-8 sticky top-28 shadow-[0_0_30px_rgba(0,229,255,0.05)]">
                                <h3 className="text-xl font-orbitron font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-[#A0AEC0]">
                                        <span>Subtotal ({cart.length} items)</span>
                                        <span className="text-white">{getFormattedPrice(getTotal(cart))}</span>
                                    </div>
                                    <div className="flex justify-between text-[#A0AEC0]">
                                        <span>Shipping</span>
                                        <span className="text-emerald-400">Calculated at checkout</span>
                                    </div>
                                </div>
                                
                                <div className="border-t border-white/10 pt-6 mb-8">
                                    <div className="flex justify-between items-end">
                                        <span className="text-white font-medium">Total</span>
                                        <span className="text-3xl text-[#00E5FF] font-orbitron font-bold drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                                            {getFormattedPrice(getTotal(cart))}
                                        </span>
                                    </div>
                                </div>

                                <Link 
                                    to="/checkout" 
                                    state={cart}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:opacity-90 transition-all flex justify-center items-center gap-2"
                                >
                                    Proceed to Checkout <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}