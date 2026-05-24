import { useEffect, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import ProductCard from "../components/productCard";

export default function ProductsPage(){
    const [products , setProducts] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        if(loading){
            api.get("/products")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
        }
    }, [loading]);

    return(
        /* Transparent container so your global background image shows through */
        <div className="w-full min-h-[calc(100vh-96px)] bg-transparent p-10 lg:p-16">
            {
                loading && <LoadingScreen/>
            }
            {
                !loading && (
                    <div className="max-w-[1400px] mx-auto">
                        {/* Glowing Header Area */}
                        <div className="mb-10 border-b border-white/10 pb-6 flex items-center justify-between bg-black/20 p-6 rounded-2xl backdrop-blur-sm">
                            <div>
                                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-purple-500 tracking-wide">Explore Our Collection</h1>
                                <p className="text-gray-400 mt-2 text-sm">High-performance components for your next build</p>
                            </div>
                            <div className="px-4 py-2 bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-lg text-[#00f2fe] font-medium shadow-[0_0_10px_rgba(0,242,254,0.1)]">
                                {products.length} Products
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {
                                products.map((product)=>{
                                    return (
                                        <ProductCard key={product.productId} product={product} />
                                    )
                                })
                            }
                        </div>

                        {/* Empty State matching Dark Theme */}
                        {products.length === 0 && (
                            <div className="w-full text-center py-24 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center gap-4 shadow-2xl">
                                <span className="text-6xl opacity-50">📦</span>
                                <h2 className="text-2xl font-bold text-white">No products found.</h2>
                                <p className="text-gray-400">Check back later or try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}