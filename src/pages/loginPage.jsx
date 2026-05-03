import axios from "axios";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { BiKey } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

        async function handleLogin(){
        
        setLoading(true)

        try{
            const res = await api.post("/users/login",{
                email : email,
                password : password
            })

            toast.success(res.data.message || "Login Successful!")

            localStorage.setItem("token" , res.data.token)

            if(res.data.isAdmin){

                navigate("/admin")

            }else{
                
                navigate("/")
            }

        }catch(err){

            toast.error(  err?.response?.data?.message || "Login failed" )

        }
        setLoading(false)
    }

    return (
        <div className="w-full h-screen bg-[url(/bgpic.jpg)] bg-cover bg-no-repeat flex justify-center items-center font-sans bg-black/20 bg-blend-overlay">

            <div className="w-[400px] h-[650px] backdrop-blur-3xl shadow-2xl border border-white/20 rounded-[40px] flex flex-col p-10 shadow-black/50">
                
                <h1 className="w-full text-center text-4xl font-extrabold text-white mb-10 tracking-tight">Login</h1>

                {/* Email Field */}
                <div className="w-full mb-6">
                    <label className="text-white/90 text-sm font-medium flex items-center gap-2 mb-2 ml-1">
                        <MdEmail className="text-xl" /> Email Address
                    </label>
                    <input 
                        className="w-full h-[50px] rounded-xl px-4 border border-white/30 bg-white/10 text-white placeholder:text-white/40 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" 
                        type="email" 
                        placeholder="example@gmail.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Field */}
                <div className="w-full mb-3">
                    <label className="text-white/90 text-sm font-medium flex items-center gap-2 mb-2 ml-1">
                        <BiKey className="text-xl" /> Password
                    </label>
                    <input 
                        className="w-full h-[50px] rounded-xl px-4 border border-white/30 bg-white/10 text-white placeholder:text-white/40 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" 
                        type="password" 
                        placeholder="•••••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Links & Login Button */}
                <div className="w-full flex flex-col gap-4">
                    <Link to="/forget-password" underline="none" className="text-white/70 text-xs italic text-right hover:text-accent transition-colors">
                        Forget password?
                    </Link>

                    {/*handleLogin function run*/}
                    <button 
                    className={`w-full h-[55px] rounded-xl font-bold text-lg shadow-2xl transform active:scale-95 transition-all duration-300 cursor-pointer flex justify-center items-center gap-2
                    ${loading 
                        ? "bg-gray-600 cursor-not-allowed opacity-70" 
                        : "bg-gradient-to-r from-accent via-[#00f2fe] to-accent bg-[length:200%_auto] hover:bg-right text-white shadow-accent/40 border border-white/20"
                    }`}
                    disabled={loading}
                    onClick={handleLogin}
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Processing...</span>
                        </>
                    ) : (
                        "Login"
                    )}
                </button>

                    <p className="text-white/80 text-sm text-center mt-2">
                        Don't have an account? <Link to="/register" className="font-bold text-accent hover:underline ml-1">Register</Link>
                    </p>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-[1px] bg-white/20"></div>
                    <span className="px-3 text-white/40 text-xs uppercase">OR</span>
                    <div className="flex-1 h-[1px] bg-white/20"></div>
                </div>

                {/* Google Button */}
                <button className="w-full h-[55px] bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md rounded-xl flex justify-center items-center gap-3 font-semibold shadow-xl transform active:scale-95 transition-all duration-300 mt-auto group">
                    <div className="bg-white p-1.5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <BsGoogle className="text-red-500 text-lg" />
                    </div>
                    <span className="tracking-wide">Sign In with Google</span>
                </button>
            </div>
        </div>
    );
}