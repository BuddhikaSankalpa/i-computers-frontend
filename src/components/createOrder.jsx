import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreateOrder(props) {
    const [isModalOpen , setIsModalOpen] = useState(false)
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [addressLine1 , setAddressLine1] = useState("")
    const [addressLine2 , setAddressLine2] = useState("")
    const [city , setCity] = useState("")
    const [phone , setPhone] = useState("")
    const navigate = useNavigate()
	const cart = props.cart;

    async function placeOrder(){

        try{

            const body = {
                firstName : firstName,
                lastName : lastName,
                addressLine1 : addressLine1,
                addressLine2 : addressLine2,
                city : city,
                phone : phone,
                items : []
            }

            for(let i = 0 ; i < cart.length ; i++){

                const item = cart[i]
                body.items.push({
                    productId : item.product.productId,
                    quantity : item.qty
                })
            }
            const token = localStorage.getItem("token")
            const response = await api.post("/orders" , body , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            console.log(response.data)
            toast.success("Order placed successfully")
            setIsModalOpen(false)
            navigate("/")

        }catch(error){
            toast.error(error?.response?.data?.message || "An error occurred")
        }

    }
    
	return (
        <>
            {isModalOpen && 
            <div className="w-screen h-screen fixed left-0 top-0 bg-black/70 flex justify-center items-center z-50 px-4">
                <div className="w-full max-w-105 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col items-center justify-center gap-4 p-5 relative">
                    <button onClick={() => setIsModalOpen(false)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 transition-colors text-xl leading-none">
                        X
                    </button>
                    <h2 className="text-2xl font-bold text-slate-900 text-center">Enter Shipping Details</h2>
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"/>
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"/>
                    <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"/>
                    <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"/>
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"/>
                    <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"/>
                    <button onClick={placeOrder} className="w-full p-3 text-white bg-slate-900 rounded-lg font-semibold shadow-lg shadow-slate-900/20 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-colors">
                        Confirm Order
                    </button>
                    



                </div>
            </div>}
            <button onClick={() => setIsModalOpen(true)} className="w-55 p-3 text-white bg-linear-to-r from-sky-600 to-blue-700 rounded-lg font-semibold shadow-lg shadow-blue-700/25 hover:from-sky-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition-all">
                Order Now
            </button>
        </>
	);
}
