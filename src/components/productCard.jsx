import { BiCartAdd } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ProductCard({ product }){

    if (!product) return null;

    return(
        /* Glassmorphism Dark Card */
        <Link 
            to={`/overview/${product.productId}`} 
            className="group flex flex-col bg-black/40 backdrop-blur-md border border-white/10 w-full rounded-2xl shadow-lg hover:shadow-[0_0_25px_rgba(0,242,254,0.15)] hover:border-[#00f2fe]/50 transition-all duration-300 overflow-hidden relative cursor-pointer hover:-translate-y-2"
        >
            
            {/* Image Section (Darker background to make PC parts pop) */}
            <div className="w-full h-48 bg-black/60 flex justify-center items-center overflow-hidden relative p-4 border-b border-white/5">
                <img 
                    src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-500"
                />
                
                {/* Out of Stock Badge */}
                {!product.isAvailable && (
                    <div className="absolute top-3 right-3 bg-red-500/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded shadow-[0_0_10px_rgba(239,68,68,0.5)] border border-red-400/50">
                        Out of Stock
                    </div>
                )}
            </div>

            {/* Details Section */}
            <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <span className="text-[11px] text-[#00f2fe] uppercase tracking-widest font-semibold opacity-80">
                        {product.brand || product.category || 'Component'}
                    </span>
                    
                    <h1 className="text-gray-200 font-bold text-[16px] mt-1 line-clamp-2 leading-snug group-hover:text-white transition-colors">
                        {product.name}
                    </h1>
                </div>
                
                {/* Price and Action */}
                <div className="flex justify-between items-end mt-5">
                    <div className="flex flex-col">
                        {product.labelledPrice > product.price && (
                            <span className="text-xs text-gray-500 line-through mb-0.5">
                                Rs. {product.labelledPrice.toLocaleString()}
                            </span>
                        )}
                        {/* Emerald Green Price similar to Admin Panel */}
                        <p className="text-emerald-400 font-extrabold text-lg tracking-wide drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">
                            Rs. {product.price.toLocaleString()}
                        </p>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                        onClick={(e) => {
                            e.preventDefault(); 
                            // Add to cart logical function
                        }}
                        className="w-10 h-10 bg-white/5 border border-white/10 text-gray-300 rounded-full flex justify-center items-center group-hover:bg-[#00f2fe] group-hover:border-[#00f2fe] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(0,242,254,0.6)] transition-all duration-300"
                        title="Add to Cart"
                    >
                        <BiCartAdd size={22} />
                    </button>
                </div>
            </div>
        </Link>
    )
}