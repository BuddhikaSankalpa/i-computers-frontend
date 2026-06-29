import { useEffect, useState } from "react";
import api from "../utils/api";
import uploadMedia from "../utils/mediaUpload";
import toast from "react-hot-toast";
import LoadingScreen from "../components/loadingScreen";
import { User, Lock, Save, Camera, ShieldCheck } from "lucide-react";
import Footer from "../components/footer";

export default function Settings() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token != null) {
            api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
            });
        } else {
            window.location.href = "/login";
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    async function handleUpdateProfile() {
        setLoading(true);
        let imageUrl = user?.image || ""; 
        
        try {
            if (image != null) {
                imageUrl = await uploadMedia(image);
            }
            const token = localStorage.getItem("token");
            await api.put("/users",
                {
                    firstName: firstName,
                    lastName: lastName,
                    image: imageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setLoading(false);
            toast.success("Profile updated successfully!", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(0,229,255,0.3)' },
                iconTheme: { primary: '#00E5FF', secondary: '#000' }
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            console.log(err);
            toast.error("Profile update failed", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            });
            setLoading(false);
        }
    }

    async function handleChangePassword() {
        if(password !== confirmPassword){
            toast.error("Passwords do not match", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            });
            return;
        }
        
        if(password.length < 6){
            toast.error("Password must be at least 6 characters", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            });
            return;
        }

        setLoading(true);
        try{
            const token = localStorage.getItem("token");
            await api.post("/users/password",{
                password: password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setLoading(false);
            setPassword("");
            setConfirmPassword("");
            toast.success("Password changed successfully", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
                iconTheme: { primary: '#A855F7', secondary: '#000' }
            });
        } catch (err) {
            console.log(err);
            toast.error("Failed to change password", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            });
            setLoading(false);
        }
    }

    if (!user) {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center bg-[#050816]">
                <div className="w-16 h-16 border-4 border-white/10 border-t-[#00E5FF] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#050816] flex flex-col pt-10 relative overflow-hidden">
            
            {/* Background Glows */}
            <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[#A855F7]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12 flex-grow flex flex-col mb-20 z-10">
                <div className="flex items-center gap-3 mb-10">
                    <User className="text-[#00E5FF]" size={36} />
                    <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white">Account Settings</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Profile Information Card */}
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00E5FF]/20 to-transparent blur-[30px] rounded-bl-full pointer-events-none"></div>
                        
                        <div className="flex items-center gap-3 mb-8">
                            <ShieldCheck className="text-[#00E5FF]" size={24} />
                            <h2 className="text-2xl font-orbitron font-semibold text-white">Profile Information</h2>
                        </div>
                        
                        {/* Avatar Upload */}
                        <div className="flex justify-center mb-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#00E5FF] transition-colors bg-black/50">
                                    <img 
                                        src={imagePreview || user.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label className="absolute bottom-0 right-0 w-10 h-10 bg-black/80 border border-white/10 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#00E5FF] hover:text-black transition-colors shadow-lg">
                                    <Camera size={18} />
                                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                </label>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-medium text-[#A0AEC0] mb-1.5 block">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] focus:bg-white/5 transition-colors outline-none"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#A0AEC0] mb-1.5 block">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] focus:bg-white/5 transition-colors outline-none"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-[#A0AEC0] mb-1.5 block">Email Address (Read-only)</label>
                                <input
                                    type="email"
                                    className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 text-gray-500 cursor-not-allowed outline-none"
                                    value={user.email}
                                    readOnly
                                />
                            </div>

                            <button
                                className="w-full mt-4 py-4 px-6 bg-transparent border-2 border-[#00E5FF] text-[#00E5FF] rounded-xl font-bold transition-all duration-300 hover:bg-[#00E5FF] hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] flex justify-center items-center gap-2"
                                onClick={handleUpdateProfile}
                                disabled={loading}
                            >
                                {loading ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : <><Save size={20} /> Save Changes</>}
                            </button>
                        </div>
                    </div>

                    {/* Security Settings Card */}
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden h-fit">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#A855F7]/20 to-transparent blur-[30px] rounded-bl-full pointer-events-none"></div>
                        
                        <div className="flex items-center gap-3 mb-8">
                            <Lock className="text-[#A855F7]" size={24} />
                            <h2 className="text-2xl font-orbitron font-semibold text-white">Security Settings</h2>
                        </div>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="text-sm font-medium text-[#A0AEC0] mb-1.5 block">New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#A855F7] focus:bg-white/5 transition-colors outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#A0AEC0] mb-1.5 block">Confirm New Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#A855F7] focus:bg-white/5 transition-colors outline-none"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button
                                className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-white rounded-xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:opacity-90 transition-all flex justify-center items-center gap-2"
                                onClick={handleChangePassword}
                                disabled={loading}
                            >
                                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Lock size={20} /> Update Password</>}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}