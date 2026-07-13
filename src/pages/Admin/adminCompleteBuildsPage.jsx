import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import LoadingScreen from "../../components/loadingScreen";
import CompleteBuildDeleteButton from "../../components/CompleteBuildDeleteButton";
import { CiEdit } from "react-icons/ci";
import getFormattedPrice from "../../utils/price-formatter";

export default function AdminCompleteBuildsPage() {
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        if (loading) {
            const token = localStorage.getItem("token");
            api
                .get("/complete-builds", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setBuilds(res.data.builds);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching builds", err);
                    setLoading(false);
                });
        }
    }, [loading]);

    return (
        <div className="w-full h-full p-6 text-gray-100">
            {/* Header Section - Glass Effect */}
            <div className="w-full bg-black/30 backdrop-blur-lg border border-white/10 mb-8 rounded-xl flex p-6 items-center justify-between shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold text-white">Complete Builds</h1>
                    <p className="text-sm text-gray-400 mt-1">Manage your pre-configured complete PC builds</p>
                </div>
                <div className="px-4 py-2 bg-[#FF2DA6]/20 text-[#FF2DA6] font-semibold rounded-lg border border-[#FF2DA6]/30 backdrop-blur-md">
                    {builds.length} Builds
                </div>                
            </div>
            
            {
                loading && <LoadingScreen/>
            }
            
            {/* Table Section - Glass Effect */}
            <div className="w-full bg-black/30 backdrop-blur-lg rounded-xl overflow-x-auto border border-white/10 shadow-2xl pb-20">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-black/40 text-gray-300 text-sm uppercase tracking-wider border-b border-white/10">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Image</th>
                            <th className="px-6 py-4 font-semibold">Build ID</th>
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Price</th>
                            <th className="px-6 py-4 font-semibold">CPU</th>
                            <th className="px-6 py-4 font-semibold">GPU</th>
                            <th className="px-6 py-4 font-semibold text-center">Availability</th>
                            <th className="px-6 py-4 font-semibold text-center">Stock</th>
                            <th className="px-6 py-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-200">
                        {builds.map((build) => {
                            return (
                                <tr className="hover:bg-white/5 transition-colors duration-200" key={build.buildId}>
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 rounded-lg bg-black/50 flex items-center justify-center overflow-hidden border border-white/10">
                                            <img
                                                src={build.images[0]}
                                                alt={build.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">{build.buildId}</td>
                                    <td className="px-6 py-4">{build.name}</td>
                                    <td className="px-6 py-4 font-semibold text-emerald-400">{getFormattedPrice(build.price)}</td>
                                    <td className="px-6 py-4">{build.cpu}</td>
                                    <td className="px-6 py-4">{build.gpu}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                            build.isAvailable
                                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                                : "bg-red-500/20 text-red-300 border-red-500/30"
                                        }`}>
                                            {build.isAvailable ? "Available" : "Out of Stock"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-medium">{build.stock}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center gap-3">
                                            <Link 
                                                to="/admin/edit-complete-build" 
                                                state={build} 
                                                className="p-2 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-all duration-200"
                                                title="Edit Build"
                                            >
                                                <CiEdit className="text-xl" />
                                            </Link>
                                            <div className="p-2 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer">
                                                <CompleteBuildDeleteButton buildId={build.buildId} refresh={()=>setLoading(true)} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Floating Action Button - Glass Effect */}
            <Link
                to="/admin/add-complete-build"
                className="bg-[#FF2DA6]/90 backdrop-blur-md border border-white/20 w-16 h-16 rounded-full text-white text-2xl flex justify-center items-center fixed bottom-8 right-8 shadow-[0_0_20px_rgba(255,45,166,0.4)] hover:bg-[#FF2DA6] hover:scale-105 transition-all duration-300 z-50"
                title="Add New Complete Build"
            >
                <FaPlus />
            </Link>
        </div>
    );
}
