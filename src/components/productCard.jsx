import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }){
    if (!product) return null;

    return(
        <Link 
            to={`/overview/${product.productId}`} 
            className="group flex flex-col bg-[#111827] border border-white/5 w-full rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] hover:border-[#00E5FF]/40 transition-all duration-500 overflow-hidden relative cursor-pointer hover:-translate-y-2"
        >
            {/* Background Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/0 to-[#00E5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Image Section */}
            <div className="w-full h-56 bg-[#050816]/50 flex justify-center items-center overflow-hidden relative p-6">
                <img 
                    src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-700 ease-out"
                />
                
                {/* Out of Stock Badge */}
                {!product.isAvailable && (
                    <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded shadow-[0_0_15px_rgba(239,68,68,0.4)] border border-red-400/30">
                        Out of Stock
                    </div>
                )}
            </div>

            {/* Details Section */}
            <div className="p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-transparent to-[#050816]/50">
                <div>
                    <span className="text-[11px] text-[#00E5FF] uppercase tracking-widest font-semibold opacity-90 block mb-2">
                        {product.brand || product.category || 'Component'}
                    </span>
                    
                    <h1 className="text-white font-medium text-[15px] line-clamp-2 leading-relaxed group-hover:text-[#00E5FF] transition-colors duration-300">
                        {product.name}
                    </h1>
                </div>
                
                {/* Price and Action */}
                <div className="flex justify-between items-end mt-6 pt-4 border-t border-white/5">
                    <div className="flex flex-col">
                        {product.labelledPrice > product.price && (
                            <span className="text-xs text-[#A0AEC0] line-through mb-1">
                                Rs. {product.labelledPrice.toLocaleString()}
                            </span>
                        )}
                        <p className="text-[#FFFFFF] font-orbitron font-bold text-lg tracking-wide group-hover:text-[#00E5FF] transition-colors duration-300">
                            Rs. {product.price.toLocaleString()}
                        </p>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                        onClick={(e) => {
                            e.preventDefault(); 
                            // Add to cart logical function
                        }}
                        className="w-12 h-12 bg-white/5 border border-white/10 text-[#A0AEC0] rounded-xl flex justify-center items-center group-hover:bg-[#00E5FF] group-hover:border-[#00E5FF] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={20} className="group-hover:-translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </Link>
    )
}