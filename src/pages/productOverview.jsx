import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../utils/api"
import LoadingScreen from "../components/loadingScreen"
import ProductImageSlideShow from "../components/productImageSlideShow"
import getFormattedPrice from "../utils/price-formatter"
import { addToCart } from "../utils/cart"
import toast from "react-hot-toast"
import { ShoppingCart, CreditCard, Shield, Truck, RotateCcw } from "lucide-react"

export default function ProductOverview(){
    const parameters = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [isNavigating, setIsNavigating] = useState(false)

    useEffect(()=>{
        if(parameters.productId==null){
            navigate("/products")
        }
        api.get("/products/"+parameters.productId).then((response)=>{
            setProduct(response.data)
        }).catch((error)=>{
            console.error("Error fetching product details:", error)
            navigate("/products")
        })
    }, [parameters.productId, navigate])

    if (product == null) {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center bg-[#050816]">
                <div className="w-16 h-16 border-4 border-white/10 border-t-[#00E5FF] rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#050816] p-6 md:p-10 lg:p-16 flex justify-center items-start">
            <div className="max-w-[1400px] w-full bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col lg:flex-row relative">
                
                {/* Glow effect */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#A855F7]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

                {/* Left Side: Image Slideshow Container */}
                <div className="w-full lg:w-1/2 bg-black/40 p-8 md:p-12 flex justify-center items-center border-b lg:border-b-0 lg:border-r border-white/5 relative min-h-[400px] lg:min-h-[600px]">
                    <div className="w-full max-w-[500px] relative z-10">
                        <ProductImageSlideShow images={product.images}/>
                    </div>
                </div>

                {/* Right Side: Product Details */}
                <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 xl:p-16">
                    
                    {/* Brand & ID */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                            {product.brand}
                        </span>
                        {product.model && (
                            <span className="text-[#A0AEC0] text-sm font-semibold uppercase tracking-widest">
                                • {product.model}
                            </span>
                        )}
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-black text-white font-orbitron mb-4 leading-tight">
                        {product.name}
                    </h1>

                    {/* Stock Status */}
                    <div className="mb-8 flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${product.isAvailable ? 'bg-emerald-400' : 'bg-red-500'} shadow-[0_0_10px_currentColor]`}></div>
                        <span className={`text-sm font-medium ${product.isAvailable ? 'text-emerald-400' : 'text-red-500'}`}>
                            {product.isAvailable ? 'In Stock & Ready to Ship' : 'Currently Out of Stock'}
                        </span>
                    </div>
                    
                    {/* Pricing */}
                    <div className="flex flex-col mb-10 p-6 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF2DA6]/20 to-transparent blur-[30px] rounded-bl-full pointer-events-none"></div>
                        {product.price < product.labelledPrice && (
                            <p className="text-[#A0AEC0] text-sm line-through mb-1 font-medium">
                                {getFormattedPrice(product.labelledPrice)}
                            </p>
                        )}
                        <p className="text-4xl text-[#FFFFFF] font-orbitron font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            {getFormattedPrice(product.price)}
                        </p>
                    </div>
                    
                    {/* Description */}
                    <div className="mb-12 flex-grow">
                        <h3 className="text-white font-orbitron font-semibold mb-3 text-sm uppercase tracking-widest border-b border-white/10 pb-2 inline-block">Overview</h3>
                        <p className="text-[#A0AEC0] leading-relaxed text-[15px]">
                            {product.description}
                        </p>
                    </div>

                    {/* Value Props */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        <div className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                            <Shield size={24} className="text-[#00E5FF] mb-2" />
                            <span className="text-xs text-[#A0AEC0] font-medium">Official Warranty</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                            <Truck size={24} className="text-[#A855F7] mb-2" />
                            <span className="text-xs text-[#A0AEC0] font-medium">Fast Delivery</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                            <RotateCcw size={24} className="text-[#FF2DA6] mb-2" />
                            <span className="text-xs text-[#A0AEC0] font-medium">Easy Returns</span>
                        </div>
                    </div>
                    
                    {/* Action Buttons Row */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <button 
                            disabled={!product.isAvailable}
                            className={`flex-1 flex justify-center items-center gap-3 py-4 px-6 bg-transparent border-2 border-[#00E5FF] text-[#00E5FF] rounded-xl font-bold transition-all duration-300 ${product.isAvailable ? 'hover:bg-[#00E5FF] hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] cursor-pointer' : 'opacity-50 cursor-not-allowed border-gray-600 text-gray-500'}`}
                            onClick={() => {
                                addToCart(product, 1)
                                toast.success("Added to Cart", {
                                    style: { background: '#111827', color: '#fff', border: '1px solid rgba(0,229,255,0.3)' },
                                    iconTheme: { primary: '#00E5FF', secondary: '#000' }
                                })
                            }}
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                        
                        <button 
                            disabled={!product.isAvailable || isNavigating}
                            onClick={() => {
                                setIsNavigating(true);
                                navigate("/checkout", {
                                    state: [
                                        {
                                            product: {
                                                productId: product.productId,
                                                name: product.name,
                                                image: product.images[0],
                                                price: product.price,
                                                labelledPrice: product.labelledPrice
                                            },
                                            qty: 1
                                        }
                                    ]
                                });
                            }}
                            className={`flex-1 flex justify-center items-center gap-3 py-4 px-6 rounded-xl font-bold transition-all duration-300 text-center ${product.isAvailable && !isNavigating ? 'bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-white hover:opacity-90 shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer' : 'bg-gray-800 text-gray-500 cursor-not-allowed pointer-events-none'}`}
                        >
                            <CreditCard size={20} />
                            {isNavigating ? "Processing..." : "Buy It Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}