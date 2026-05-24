import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../utils/api"
import LoadingScreen from "../components/loadingScreen"
import ProductImageSlideShow from "../components/productImageSlideShow"
import getFormattedPrice from "../utils/price-formatter"
import { addToCart } from "../utils/cart"
import toast from "react-hot-toast"
import { BiCartAdd, BiCreditCard } from "react-icons/bi" // අලුතෙන් icons 2ක් දැම්මා ලස්සන වෙන්න

export default function ProductOverview(){
    const parameters = useParams()
    const navigate = useNavigate()
    const [product , setProduct] = useState(null)

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
    }, [])

    return (
        /* Transparent container so the main background shows through */
        <div className="w-full min-h-[calc(100vh-96px)] bg-transparent p-6 md:p-10 lg:p-16 flex justify-center items-center">
            {
                product == null && <LoadingScreen/>
            }
            {
                product != null && (
                    /* Main Glassmorphism Wrapper */
                    <div className="max-w-[1200px] w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                        
                        {/* Left Side: Image Slideshow Container */}
                        <div className="w-full md:w-1/2 bg-black/60 p-8 flex justify-center items-center border-b md:border-b-0 md:border-r border-white/5 relative">
                            {/* Optional glowing effect behind the image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#00f2fe]/5 to-purple-500/5 pointer-events-none"></div>
                            
                            <div className="w-full max-w-[450px] relative z-10">
                                <ProductImageSlideShow images={product.images}/>
                            </div>
                        </div>

                        {/* Right Side: Product Details */}
                        <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 justify-center">
                            
                            {/* Product ID & Brand Tag */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe] text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase drop-shadow-[0_0_5px_rgba(0,242,254,0.3)]">
                                    {product.productId}
                                </span>
                                <span className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
                                    {product.brand} {product.model && `• ${product.model}`}
                                </span>
                            </div>
                            
                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                                {product.name}
                            </h1>

                            {/* Alt Names as Cyberpunk Tags */}
                            {product.altNames && product.altNames.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {product.altNames.map((altName, index) => {
                                        return (
                                            <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300 capitalize hover:border-[#00f2fe]/50 transition-colors">
                                                {altName.trim()}
                                            </span>
                                        )
                                    })}
                                </div>
                            )}
                            
                            {/* Pricing Section */}
                            <div className="flex flex-col mb-8 p-5 bg-white/5 border border-white/10 rounded-2xl">
                                {
                                    product.price < product.labelledPrice && (
                                        <p className="text-gray-500 text-sm line-through mb-1 font-medium">
                                            {getFormattedPrice(product.labelledPrice)}
                                        </p>
                                    )
                                }
                                <p className="text-3xl text-emerald-400 font-extrabold drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
                                    {getFormattedPrice(product.price)}
                                </p>
                            </div>
                            
                            {/* Description */}
                            <div className="mb-10 flex-grow">
                                <h3 className="text-gray-200 font-semibold mb-2 text-sm uppercase tracking-wider">Product Overview</h3>
                                <p className="text-gray-400 leading-relaxed text-[15px]">
                                    {product.description}
                                </p>
                            </div>
                            
                            {/* Action Buttons Row */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                {/* Add to Cart Button (Neon Outline) */}
                                <button className="flex-1 flex justify-center items-center gap-2 py-3.5 px-6 bg-transparent border-2 border-[#00f2fe] text-[#00f2fe] rounded-xl font-bold hover:bg-[#00f2fe] hover:text-black hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition-all duration-300" 
                                onClick={
                                    ()=>{
                                        addToCart(product , 1)
                                        toast.success("Product added to cart", {
                                            style: {
                                              background: '#333',
                                              color: '#fff',
                                            },
                                        })
                                    }
                                }>
                                    <BiCartAdd size={22} />
                                    Add to Cart
                                </button>
                                
                                {/* Buy Now Button (Emerald Solid Glow) */}
                                <Link className="flex-1 flex justify-center items-center gap-2 py-3.5 px-6 bg-emerald-500 text-black rounded-xl font-bold hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.6)] transition-all duration-300 text-center"
                                    to="/checkout"
                                    state={
                                    [
                                        {
                                            product : {
                                                productId : product.productId,
                                                name : product.name,
                                                image : product.images[0],
                                                price : product.price,
                                                labelledPrice : product.labelledPrice
                                            },
                                            qty : 1
                                        }
                                    ]
                                    }
                                >
                                    <BiCreditCard size={22} />
                                    Buy Now
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                )
            }
        </div>
    )
}
// import { useEffect, useState } from "react"
// import { Link, useNavigate, useParams } from "react-router-dom"
// import api from "../utils/api"
// import LoadingScreen from "../components/loadingScreen"
// import ProductImageSlideShow from "../components/productImageSlideShow"
// import getFormattedPrice from "../utils/price-formatter"
// import { addToCart } from "../utils/cart"
// import toast from "react-hot-toast"

// export default function ProductOverview(){
//     const parameters = useParams()
//     const navigate = useNavigate()
//     const [product , setProduct] = useState(null)

//     useEffect(()=>{

//         if(parameters.productId==null){
//             navigate("/products")
//         }
//         api.get("/products/"+parameters.productId).then((response)=>{a
//             setProduct(response.data)
//         }).catch((error)=>{
//             console.error("Error fetching product details:", error)
//             navigate("/products")
//         })

//     }, [])


//     return (
//         <div className="w-full h-full flex justify-center items-center">
//             {
//                 product == null&& <LoadingScreen/>
//             }
//             {
//                 product != null && <>

//                     <div className="w-1/2  h-full flex justify-center items-center">
//                         <ProductImageSlideShow images={product.images}/>
//                     </div>
//                     <div className="w-1/2  flex flex-col p-6 h-full">
//                         <span className="text-gray-500 text-sm italic mb-4">{product.productId}</span>
//                         {/* brand and model */}
//                         <p className="text-gray-500 text-sm italic mb-4">{product.brand+" "+product.model}</p>
//                         <h1 className="text-3xl font-semibold mb-6">{product.name}
//                             {
//                                 product.altNames.map(
//                                     (altNames, index) => {
//                                         return (
//                                             <span key={index} className=" text-gray-500 ">{" | "+altNames}</span>
//                                         )
//                                     }
//                                 )
//                             }
//                         </h1>
//                         {
//                             product.price < product.labelledPrice && <p className="text-gray-500 text-lg line-through mb-2">{getFormattedPrice(product.labelledPrice)}</p>
//                         }
//                         <p className="text-xl text-accent font-semibold ">{getFormattedPrice(product.price)}</p>
//                         <p className="text-gray-700 mt-6">{product.description}</p>
//                         <div className="flex">
//                             <button className="w-[220px] p-2 text-white bg-accent rounded-sm hover:bg-accent/90 mt-6" 
//                             onClick={
//                                 ()=>{
//                                     addToCart(product , 1)
//                                     toast.success("Product added to cart")
//                                 }
//                             }>Add to Cart</button>
//                             <Link className="w-[220px] p-2 text-gray-700 bg-gray-300 rounded-sm hover:bg-gray-400 mt-6 ml-4 text-center"
//                                 to="/checkout"
//                                state={
//                                 [
//                                     {
//                                         product : {
//                                             productId : product.productId,
//                                             name : product.name,
//                                             image : product.images[0],
//                                             price : product.price,
//                                             labelledPrice : product.labelledPrice
//                                         },
//                                         qty : 1
//                                     }
//                                 ]
//                                }
//                             >Buy Now</Link>
//                         </div>
//                     </div>

//                 </>
//             }
//         </div>
//     )
// }