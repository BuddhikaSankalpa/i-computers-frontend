import axios from "axios";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { BiKey } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const googleLogin = useGoogleLogin({
        onSuccess : (response)=>{
            api.post("/users/google-login",{
                accessToken : response.access_token
            }).then((res)=>{
                localStorage.setItem("token" , res.data.token)
                if(res.data.isAdmin){
                    navigate("/admin")
                }else{
                    navigate("/")
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        onError : (err)=>{
            console.log(err);
        }
    })

    async function handleLogin(){
        setLoading(true)
        try{
            const res = await api.post("/users/login",{
                email : email,
                password : password
            })

            toast.success(res.data.message || "Login Successful!", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(0,229,255,0.3)' },
                iconTheme: { primary: '#00E5FF', secondary: '#000' }
            })
            localStorage.setItem("token" , res.data.token)

            if(res.data.isAdmin){
                navigate("/admin")
            }else{
                navigate("/")
            }
        }catch(err){
            toast.error(  err?.response?.data?.message || "Login failed", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            })
        }
        setLoading(false)
    }

    return (
        <div className="w-full h-screen bg-[#050816] flex justify-center items-center relative overflow-hidden">
            
            {/* Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00E5FF]/20 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#A855F7]/20 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="w-[400px] bg-[#111827]/80 backdrop-blur-xl shadow-2xl border border-white/10 rounded-[32px] flex flex-col p-10 z-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[32px] pointer-events-none"></div>

                <h1 className="w-full text-center text-4xl font-orbitron font-bold text-white mb-8 tracking-tight">Login</h1>

                {/* Email Field */}
                <div className="w-full mb-6">
                    <label className="text-[#A0AEC0] text-sm font-medium flex items-center gap-2 mb-2 ml-1">
                        <MdEmail className="text-lg text-[#00E5FF]" /> Email Address
                    </label>
                    <input 
                        className="w-full h-[50px] rounded-xl px-4 border border-white/10 bg-black/40 text-white placeholder:text-gray-600 outline-none focus:border-[#00E5FF] focus:bg-white/5 transition-all" 
                        type="email" 
                        placeholder="example@gmail.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Field */}
                <div className="w-full mb-3">
                    <label className="text-[#A0AEC0] text-sm font-medium flex items-center gap-2 mb-2 ml-1">
                        <BiKey className="text-lg text-[#A855F7]" /> Password
                    </label>
                    <input 
                        className="w-full h-[50px] rounded-xl px-4 border border-white/10 bg-black/40 text-white placeholder:text-gray-600 outline-none focus:border-[#A855F7] focus:bg-white/5 transition-all" 
                        type="password" 
                        placeholder="•••••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Links & Login Button */}
                <div className="w-full flex flex-col gap-4">
                    <Link to="/forget-password" underline="none" className="text-[#A0AEC0] text-xs italic text-right hover:text-[#00E5FF] transition-colors">
                        Forget password?
                    </Link>

                    <button 
                        className={`w-full h-[55px] rounded-xl font-bold text-lg transform active:scale-95 transition-all duration-300 cursor-pointer flex justify-center items-center gap-2
                        ${loading 
                            ? "bg-white/10 text-white/50 cursor-not-allowed" 
                            : "bg-transparent border-2 border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]"
                        }`}
                        disabled={loading}
                        onClick={handleLogin}
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                <span>Processing...</span>
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <p className="text-[#A0AEC0] text-sm text-center mt-2">
                        Don't have an account? <Link to="/signup" className="font-bold text-[#00E5FF] hover:underline ml-1">Register</Link>
                    </p>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-[1px] bg-white/10"></div>
                    <span className="px-3 text-[#A0AEC0] text-xs uppercase">OR</span>
                    <div className="flex-1 h-[1px] bg-white/10"></div>
                </div>

                {/* Google Button */}
                <button 
                    className="w-full h-[55px] bg-black/40 hover:bg-white/5 text-white border border-white/10 rounded-xl flex justify-center items-center gap-3 font-semibold transform active:scale-95 transition-all duration-300 group"
                    onClick={() => googleLogin()}
                >
                    <BsGoogle className="text-red-500 text-lg group-hover:scale-110 transition-transform" />
                    <span className="tracking-wide">Sign In with Google</span>
                </button>
            </div>
        </div>
    );
}