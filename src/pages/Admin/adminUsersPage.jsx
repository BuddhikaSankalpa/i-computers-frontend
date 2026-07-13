import { useEffect, useState } from "react";
import api from "../../utils/api";
import LoadingScreen from "../../components/loadingScreen";
import { BiRefresh } from "react-icons/bi";
import toast from "react-hot-toast";
import { Users, Shield, ShieldAlert, CheckCircle2, XCircle, Trash2 } from "lucide-react";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem("token");
            api
                .get("/users/all/"+pageNumber+"/"+pageSize, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setUsers(res.data.users);
                    setTotalUsers(res.data.totalUsers);
                    setTotalPages(res.data.totalPages);
                    setLoading(false);
                });
        }
    }, [loading, pageNumber, pageSize]);

    function handleBlockToggle(email) {
        const token = localStorage.getItem("token");
        api.put("/users/state/"+email, {} , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            toast.success("User blocked status updated successfully", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(0,229,255,0.3)' }
            });
            setLoading(true);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || "Action failed", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            });
        });
    }

    function handleRoleToggle(email) {
        const token = localStorage.getItem("token");
        api.put("/users/role/"+email, {} , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            toast.success("User role updated successfully", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' }
            });
            setLoading(true);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || "Action failed", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            });
        });
    }

    function handleDeleteUser(email) {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        const token = localStorage.getItem("token");
        api.delete("/users/"+email, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            toast.success("User deleted successfully", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            });
            setLoading(true);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || "Action failed", {
                style: { background: '#111827', color: '#fff', border: '1px solid rgba(239,68,68,0.3)' }
            });
        });
    }

    return (
        <div className="w-full h-full flex flex-col pb-24 text-gray-100">
            {/* Header Section */}
            <div className="w-full bg-black/40 backdrop-blur-md border border-white/10 mb-8 rounded-xl flex p-6 items-center justify-between shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#FF2DA6]/20 rounded-xl border border-[#FF2DA6]/30">
                        <Users className="text-[#FF2DA6]" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-wide text-white">All Users</h1>
                        <p className="text-sm text-gray-400 mt-1">Manage customers and admin roles</p>
                    </div>
                </div>
                <div className="bg-[#FF2DA6]/10 text-[#FF2DA6] border border-[#FF2DA6]/30 px-5 py-2.5 rounded-lg font-medium text-sm tracking-wide">
                    {totalUsers} Users
                </div>
            </div>

            {loading && <LoadingScreen />}

            {/* Table Section */}
            <div className="w-full flex-1 overflow-y-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl custom-scrollbar">
                <table className="w-full text-left text-sm text-gray-300 border-collapse whitespace-nowrap">
                    <thead className="bg-black/60 text-gray-400 text-xs uppercase tracking-wider sticky top-0 z-10 border-b border-white/10">
                        <tr>
                            <th className="px-6 py-4 font-semibold w-16">Avatar</th>
                            <th className="px-4 py-4 font-semibold">Email</th>
                            <th className="px-4 py-4 font-semibold">Name</th>
                            <th className="px-4 py-4 font-semibold">Role</th>
                            <th className="px-4 py-4 font-semibold text-center">Verified</th>
                            <th className="px-4 py-4 font-semibold text-center">Status</th>
                            <th className="px-4 py-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user) => (
                            <tr className="hover:bg-white/5 transition-colors duration-200" key={user.email}>
                                <td className="px-6 py-3">
                                    <img
                                        src={user.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover border border-white/10 bg-black/50"
                                    />
                                </td>
                                <td className="px-4 py-3 font-medium text-white">{user.email}</td>
                                <td className="px-4 py-3 capitalize">{user.firstName} {user.lastName}</td>
                                
                                {/* Role */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                                            user.isAdmin 
                                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        }`}>
                                            {user.isAdmin ? <Shield size={12} /> : <Users size={12} />}
                                            {user.isAdmin ? "Admin" : "Customer"}
                                        </span>
                                        <button 
                                            onClick={() => handleRoleToggle(user.email)}
                                            className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition-all"
                                            title="Toggle Role"
                                        >
                                            <BiRefresh size={16} />
                                        </button>
                                    </div>
                                </td>

                                {/* Verified */}
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center">
                                        {user.isEmailVerified ? (
                                            <CheckCircle2 className="text-[#00E676]" size={18} />
                                        ) : (
                                            <XCircle className="text-gray-500" size={18} />
                                        )}
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-3">
                                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                                            user.isBlocked 
                                                ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        }`}>
                                            {user.isBlocked ? <ShieldAlert size={12} /> : <CheckCircle2 size={12} />}
                                            {user.isBlocked ? "Blocked" : "Active"}
                                        </span>
                                        <button 
                                            onClick={() => handleBlockToggle(user.email)}
                                            className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition-all"
                                            title={user.isBlocked ? "Unblock User" : "Block User"}
                                        >
                                            <BiRefresh size={16} />
                                        </button>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center">
                                        <button 
                                            onClick={() => handleDeleteUser(user.email)}
                                            className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all"
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            <div className="fixed bottom-6 left-[280px] right-0 flex justify-center items-center pointer-events-none z-20">
                <div className="bg-black/70 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center rounded-xl overflow-hidden pointer-events-auto">
                    <select 
                        value={pageSize} 
                        onChange={(e) => { setPageSize(Number(e.target.value)); setPageNumber(1); setLoading(true) }} 
                        className="h-full py-3 px-4 bg-transparent text-gray-300 border-r border-white/10 outline-none hover:bg-white/5 cursor-pointer appearance-none"
                    >
                        <option className="bg-gray-900" value={2}>2 per page</option>
                        <option className="bg-gray-900" value={5}>5 per page</option>
                        <option className="bg-gray-900" value={10}>10 per page</option>
                        <option className="bg-gray-900" value={20}>20 per page</option>
                    </select>
                    
                    <div className="flex items-center justify-center gap-2 px-4 py-2">
                        <button 
                            disabled={pageNumber === 1} 
                            onClick={() => { setPageNumber(pageNumber - 1); setLoading(true) }} 
                            className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded border border-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>
                        <span className="text-gray-400 text-sm px-2">Page <span className="text-white font-medium">{pageNumber}</span> of {totalPages}</span>
                        <button 
                            disabled={pageNumber === totalPages} 
                            onClick={() => { setPageNumber(pageNumber + 1); setLoading(true) }} 
                            className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded border border-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
