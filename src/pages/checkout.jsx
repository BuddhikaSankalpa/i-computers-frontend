import { useState } from "react"
import { addToCart, getCart, getTotal } from "../utils/cart"
import getFormattedPrice from "../utils/price-formatter"
import { useLocation } from "react-router-dom"
import CreateOrder from "../components/createOrder"

export default function CheckoutPage(){

    const location = useLocation()
    const data = location.state
    const [cart , setCart] = useState(data)

    return (
        <div className="w-full h-full overflow-y-scroll flex items-center flex-col">
            {
                cart.map(
                    (cartItem, index) => {
                        return (
                            <div className="w-150 h-37.5 shadow-2xl bg-white my-4 flex flex-row relative" key={index}>
                                <img src={cartItem.product.image} className="h-full aspect-square"/>
                            
                                <div className="h-full w-112.5 flex flex-col p-4">
                                    <h3 className="text-lg font-bold">{cartItem.product.name}</h3>
                                    {/* labelled price */}
                                    <p className="text-gray-500 text-sm line-through">{getFormattedPrice(cartItem.product.labelledPrice)}</p>
                                    <p className="text-accent font-semibold">{getFormattedPrice(cartItem.product.price)}</p>
                                    <div className="h-7.5 w-25 mt-2 border border-accent rounded-4xl flex flex-row items-center justify-center overflow-hidden">
                                        <button className="w-7.5 h-full hover:bg-accent hover:text-white"
                                        onClick={
                                            ()=>{
                                                addToCart(cartItem.product , -1)
                                                setCart(getCart())
                                            }
                                        }>
                                            -
                                        </button>
                                        <span className="w-10 h-full flex justify-center items-center">
                                            {cartItem.qty}
                                        </span>
                                        <button className="w-7.5 h-full hover:bg-accent hover:text-white"
                                        onClick={
                                            ()=>{
                                                addToCart(cartItem.product , 1)
                                                setCart(getCart())
                                            }
                                        }>
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                type="button"
                                aria-label={`Remove ${cartItem.product.name}`}
                                className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-red-700 transition-colors"
                                onClick={
                                    ()=>{
                                        addToCart(cartItem.product , -cartItem.qty)
                                        setCart(getCart())
                                    }
                                }>
                                    X
                                </button>
                                
                                {/* total price */}
                                <span className="absolute bottom-2 text-xl right-2 text-accent font-semibold">
                                    {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                                </span>
                            </div>
                        )
                    }
                )
            }

            <div className="w-150 h-37.5 sticky bottom-0 shadow-2xl bg-white my-4 flex flex-row items-center justify-between p-4">
                <CreateOrder cart={cart} />
                <div className="flex justify-end h-full items-center">
                    <span className="text-gray-500 text-lg mr-4">Total:</span>
                    <span className="text-accent text-2xl font-bold ">
                        {getFormattedPrice(getTotal(cart))}
                    </span>
                </div>
            </div>
        </div>
    )
}