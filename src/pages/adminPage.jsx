import { BsGift } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import AdminProductsPage from "./Admin/adminProductPage";
import AdminAddProductForm from "./Admin/adminAddProductForm";
import AdminEditProductForm from "./Admin/adminEditProductForm";
import AdminOrdersPage from "./Admin/adminOrdersPage";
import AdminUsersPage from "./Admin/adminUsersPage";
import AdminReviews from "./Admin/AdminReviews";
import AdminCustomBuilds from "./Admin/AdminCustomBuilds";
import AdminCompleteBuildsPage from "./Admin/adminCompleteBuildsPage";
import AdminAddCompleteBuildForm from "./Admin/adminAddCompleteBuildForm";
import AdminEditCompleteBuildForm from "./Admin/adminEditCompleteBuildForm";
import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingScreen from "../components/loadingScreen";
import { PackageOpen, LogOut, ShieldCheck, Home, MessageSquare, Cpu, Server } from "lucide-react";

export default function AdminPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token != null) {
            api.get("/users/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => {
                if (res.data.isAdmin) {
                    setUser(res.data);
                } else {
                    toast.error("You are not authorized to access this page", {
                        style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
                    });
                    navigate("/");
                }
            }).catch((err) => {
                console.log(err);
                setUser(null);
            });
        } else {
            toast.error("You are not authorized to access this page", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            });
            navigate("/login");
        }
    }, [navigate])

    const isActive = (path) => {
        return location.pathname === path || (path !== "/admin" && location.pathname.startsWith(path));
    };

    return (
        <div className="w-full h-screen bg-[#050816] flex font-sans text-white overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#00E5FF]/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#A855F7]/10 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Sidebar */}
            <div className="h-full w-[280px] bg-[#111827]/80 backdrop-blur-2xl border-r border-white/10 flex flex-col shadow-2xl z-20 shrink-0">

                {/* Logo Area */}
                <div className="h-[100px] w-full flex items-center px-6 border-b border-white/10">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-[#00E5FF]/20 rounded-xl flex items-center justify-center border border-[#00E5FF]/50 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all">
                            <ShieldCheck className="text-[#00E5FF]" size={24} />
                        </div>
                        <span className="text-xl font-orbitron font-bold text-white tracking-widest uppercase">Admin</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-3 px-4 py-8 flex-grow">
                    <div className="text-xs font-semibold text-[#A0AEC0] uppercase tracking-wider mb-2 px-2">Management</div>

                    <Link
                        to="/admin"
                        className={`w-full h-[50px] rounded-xl font-medium flex items-center gap-4 px-4 transition-all duration-300 group
                        ${isActive("/admin") && location.pathname === "/admin" ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'text-[#A0AEC0] hover:bg-white/5 hover:text-white'}`}
                    >
                        <FiShoppingCart className={`text-xl ${isActive("/admin") && location.pathname === "/admin" ? 'text-[#00E5FF]' : 'group-hover:text-white transition-colors'}`} />
                        <span className="tracking-wide">Orders</span>
                    </Link>

                    <Link
                        to="/admin/custom-builds"
                        className={`w-full h-[50px] rounded-xl font-medium flex items-center gap-4 px-4 transition-all duration-300 group
                        ${isActive("/admin/custom-builds") ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'text-[#A0AEC0] hover:bg-white/5 hover:text-white'}`}
                    >
                        <Cpu className={`text-xl ${isActive("/admin/custom-builds") ? 'text-[#00E5FF]' : 'group-hover:text-white transition-colors'}`} />
                        <span className="tracking-wide">Custom Builds</span>
                    </Link>

                    <Link
                        to="/admin/complete-builds"
                        className={`w-full h-[50px] rounded-xl font-medium flex items-center gap-4 px-4 transition-all duration-300 group
                        ${isActive("/admin/complete-builds") || isActive("/admin/add-complete-build") || isActive("/admin/edit-complete-build") ? 'bg-[#FF2DA6]/20 text-[#FF2DA6] border border-[#FF2DA6]/30 shadow-[0_0_15px_rgba(255,45,166,0.1)]' : 'text-[#A0AEC0] hover:bg-white/5 hover:text-white'}`}
                    >
                        <Server className={`text-xl ${isActive("/admin/complete-builds") || isActive("/admin/add-complete-build") || isActive("/admin/edit-complete-build") ? 'text-[#FF2DA6]' : 'group-hover:text-white transition-colors'}`} />
                        <span className="tracking-wide">Complete Builds</span>
                    </Link>

                    <Link
                        to="/admin/products"
                        className={`w-full h-[50px] rounded-xl font-medium flex items-center gap-4 px-4 transition-all duration-300 group
                        ${isActive("/admin/products") || isActive("/admin/add-product") || isActive("/admin/edit-product") ? 'bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-[#A0AEC0] hover:bg-white/5 hover:text-white'}`}
                    >
                        <PackageOpen className={`text-xl ${isActive("/admin/products") || isActive("/admin/add-product") || isActive("/admin/edit-product") ? 'text-[#A855F7]' : 'group-hover:text-white transition-colors'}`} />
                        <span className="tracking-wide">Products</span>
                    </Link>

                    <Link
                        to="/admin/users"
                        className={`w-full h-[50px] rounded-xl font-medium flex items-center gap-4 px-4 transition-all duration-300 group
                        ${isActive("/admin/users") ? 'bg-[#FF2DA6]/20 text-[#FF2DA6] border border-[#FF2DA6]/30 shadow-[0_0_15px_rgba(255,45,166,0.1)]' : 'text-[#A0AEC0] hover:bg-white/5 hover:text-white'}`}
                    >
                        <TbUsers className={`text-xl ${isActive("/admin/users") ? 'text-[#FF2DA6]' : 'group-hover:text-white transition-colors'}`} />
                        <span className="tracking-wide">Users</span>
                    </Link>

                    <Link
                        to="/admin/reviews"
                        className={`w-full h-[50px] rounded-xl font-medium flex items-center gap-4 px-4 transition-all duration-300 group
                        ${isActive("/admin/reviews") ? 'bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-[#A0AEC0] hover:bg-white/5 hover:text-white'}`}
                    >
                        <MessageSquare className={`text-xl ${isActive("/admin/reviews") ? 'text-[#A855F7]' : 'group-hover:text-white transition-colors'}`} />
                        <span className="tracking-wide">Reviews</span>
                    </Link>

                    

                    
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        to="/"
                        className="w-full h-[45px] rounded-xl font-medium flex items-center gap-3 px-4 text-[#A0AEC0] hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                        <Home size={18} />
                        <span className="tracking-wide">Back to Store</span>
                    </Link>
                    <button
                        onClick={() => {
                            if (window.confirm("Are you sure you want to logout?")) {
                                localStorage.removeItem("token");
                                window.location.href = "/";
                            }
                        }}
                        className="w-full h-[45px] rounded-xl font-medium flex items-center gap-3 px-4 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
                    >
                        <LogOut size={18} />
                        <span className="tracking-wide">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 h-full overflow-y-auto z-10 relative">
                {user == null ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-16 h-16 border-4 border-white/10 border-t-[#00E5FF] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="p-8 min-h-full">
                        <Routes>
                            <Route path="/" element={<AdminOrdersPage />} />
                            <Route path="/products" element={<AdminProductsPage />} />
                            <Route path="/users" element={<AdminUsersPage />} />
                            <Route path="/add-product" element={<AdminAddProductForm />} />
                            <Route path="/edit-product" element={<AdminEditProductForm />} />
                            <Route path="/reviews" element={<AdminReviews />} />
                            <Route path="/custom-builds" element={<AdminCustomBuilds />} />
                            <Route path="/complete-builds" element={<AdminCompleteBuildsPage />} />
                            <Route path="/add-complete-build" element={<AdminAddCompleteBuildForm />} />
                            <Route path="/edit-complete-build" element={<AdminEditCompleteBuildForm />} />
                        </Routes>
                    </div>
                )}
            </div>
        </div>
    )
}