import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadMedia from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function AdminAddCompleteBuildForm() {
    const [buildId, setBuildId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [images, setImages] = useState([]);
    const [isAvailable, setIsAvailable] = useState(true);
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    
    // PC Specs
    const [cpu, setCpu] = useState("");
    const [gpu, setGpu] = useState("");
    const [motherboard, setMotherboard] = useState("");
    const [ram, setRam] = useState("");
    const [storage, setStorage] = useState("");
    const [cpuCooler, setCpuCooler] = useState("");
    const [powerSupply, setPowerSupply] = useState("");
    const [pcCase, setPcCase] = useState("");
    const [operatingSystem, setOperatingSystem] = useState("");
    const [wifiBluetooth, setWifiBluetooth] = useState("");
    const [rgbSupport, setRgbSupport] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function addBuild() {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("You must be logged in");
            navigate("/signin");
            return;
        }

        const imageUploadPromises = [];
        for (let i = 0; i < images.length; i++) {
            imageUploadPromises.push(uploadMedia(images[i]));
        }

        try {
            const imageUrls = await Promise.all(imageUploadPromises);
            const altNamesArray = altNames.split(",").map(name => name.trim()).filter(name => name);

            const requestBody = {
                buildId, name, altNames: altNamesArray, description, price, labelledPrice, images: imageUrls,
                isAvailable, category: "Complete Build", stock, brand, model,
                cpu, gpu, motherboard, ram, storage, cpuCooler, powerSupply, pcCase, operatingSystem, wifiBluetooth, rgbSupport
            };

            await api.post("/complete-builds", requestBody, {
                headers: { Authorization: "Bearer " + token }
            });

            toast.success("Complete Build added successfully");
            navigate("/admin/complete-builds");
            setIsLoading(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add build");
            setIsLoading(false);
        }
    }

    const inputClassName = "w-full h-[40px] bg-white/10 border border-white/20 rounded-lg px-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF2DA6] focus:ring-1 focus:ring-[#FF2DA6] transition-all backdrop-blur-sm";
    const labelClassName = "font-semibold text-white/90 mb-1 text-sm tracking-wide";

    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            {/* Header Section */}
            <div className="w-full h-[90px] backdrop-blur-md bg-white/5 border border-white/10 shadow-lg rounded-xl flex px-6 items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF2DA6] to-purple-400">Add New Complete Build</h1>
                <div className="h-full gap-4 flex items-center">
                    <Link
                        to="/admin/complete-builds"
                        className="bg-white/10 hover:bg-white/20 text-white w-[100px] text-center py-2.5 rounded-lg border border-white/20 transition-all font-medium"
                    >
                        Cancel
                    </Link>
                    <button
                        disabled={isLoading}
                        className="bg-gradient-to-r from-[#FF2DA6] to-purple-600 hover:from-purple-500 hover:to-[#FF2DA6] text-white w-[140px] py-2.5 rounded-lg font-bold shadow-[0_0_15px_rgba(255,45,166,0.4)] hover:shadow-[0_0_20px_rgba(255,45,166,0.6)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={addBuild}
                    >
                        {isLoading ? "Saving..." : "Save Build"}
                    </button>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full flex flex-wrap gap-y-6 backdrop-blur-sm bg-black/20 p-6 rounded-xl border border-white/5 shadow-2xl mb-12">
                {/* Standard Product Fields */}
                <h2 className="w-full text-xl font-bold text-white border-b border-white/10 pb-2 mb-2">Basic Details</h2>
                
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>Build ID</label>
                    <input value={buildId} onChange={(e) => setBuildId(e.target.value)} className={inputClassName} placeholder="e.g. CB-001" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>Build Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className={inputClassName} placeholder="e.g. The Nebula" />
                </div>
                <div className="w-full md:w-[34%] flex flex-col px-2">
                    <label className={labelClassName}>Alternative Names (comma-separated)</label>
                    <input value={altNames} onChange={(e) => setAltNames(e.target.value)} className={inputClassName} placeholder="Gaming PC, Desktop" />
                </div>
                <div className="w-full md:w-[24%] flex flex-col px-2">
                    <label className={labelClassName}>Price (Rs.)</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClassName} placeholder="0.00" />
                </div>
                <div className="w-full md:w-[24%] flex flex-col px-2">
                    <label className={labelClassName}>Labelled Price (Rs.)</label>
                    <input type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className={inputClassName} placeholder="0.00" />
                </div>
                <div className="w-full flex flex-col px-2">
                    <label className={labelClassName}>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClassName} h-[120px] py-2 resize-none`} placeholder="Enter detailed build description..." />
                </div>
                <div className="w-full md:w-[24%] flex flex-col px-2">
                    <label className={labelClassName}>Product Images</label>
                    <input multiple={true} onChange={(e) => { setImages(e.target.files) }} type="file" className={`${inputClassName} py-1.5 cursor-pointer`} />
                </div>
                <div className="w-full md:w-[24%] flex flex-col px-2">
                    <label className={labelClassName}>Availability</label>
                    <select value={isAvailable} onChange={(e) => { setIsAvailable(e.target.value === 'true') }} className={`${inputClassName} text-white/80 [&>option]:bg-gray-900 [&>option]:text-white outline-none cursor-pointer`}>
                        <option value={true}>Available</option>
                        <option value={false}>Unavailable</option>
                    </select>
                </div>
                <div className="w-full md:w-[24%] flex flex-col px-2">
                    <label className={labelClassName}>Stock Quantity</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className={inputClassName} style={{ colorScheme: "dark" }} placeholder="0" />
                </div>
                <div className="w-full md:w-[24%] flex flex-col px-2">
                    <label className={labelClassName}>Brand (optional)</label>
                    <input value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClassName} placeholder="e.g. Custom" />
                </div>

                {/* PC Specifications Section */}
                <h2 className="w-full text-xl font-bold text-white border-b border-white/10 pb-2 mt-6 mb-2">PC Specifications</h2>
                
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>CPU (Processor)</label>
                    <input value={cpu} onChange={(e) => setCpu(e.target.value)} className={inputClassName} placeholder="e.g. Intel Core i9-14900K" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>GPU (Graphics Card)</label>
                    <input value={gpu} onChange={(e) => setGpu(e.target.value)} className={inputClassName} placeholder="e.g. NVIDIA RTX 4090 24GB" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>Motherboard</label>
                    <input value={motherboard} onChange={(e) => setMotherboard(e.target.value)} className={inputClassName} placeholder="e.g. ASUS ROG MAXIMUS Z790" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>RAM</label>
                    <input value={ram} onChange={(e) => setRam(e.target.value)} className={inputClassName} placeholder="e.g. 64GB DDR5 6000MHz" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>Storage (SSD/HDD)</label>
                    <input value={storage} onChange={(e) => setStorage(e.target.value)} className={inputClassName} placeholder="e.g. 2TB NVMe M.2 Gen4" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>CPU Cooler</label>
                    <input value={cpuCooler} onChange={(e) => setCpuCooler(e.target.value)} className={inputClassName} placeholder="e.g. NZXT Kraken Elite 360" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>Power Supply (PSU)</label>
                    <input value={powerSupply} onChange={(e) => setPowerSupply(e.target.value)} className={inputClassName} placeholder="e.g. Corsair RM1000x 1000W 80+ Gold" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>PC Case</label>
                    <input value={pcCase} onChange={(e) => setPcCase(e.target.value)} className={inputClassName} placeholder="e.g. Lian Li O11 Dynamic EVO" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>Operating System</label>
                    <input value={operatingSystem} onChange={(e) => setOperatingSystem(e.target.value)} className={inputClassName} placeholder="e.g. Windows 11 Pro" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>WiFi / Bluetooth</label>
                    <input value={wifiBluetooth} onChange={(e) => setWifiBluetooth(e.target.value)} className={inputClassName} placeholder="e.g. WiFi 6E & Bluetooth 5.3" />
                </div>
                <div className="w-full md:w-[32%] flex flex-col px-2">
                    <label className={labelClassName}>RGB Support</label>
                    <input value={rgbSupport} onChange={(e) => setRgbSupport(e.target.value)} className={inputClassName} placeholder="e.g. ARGB Fans with Controller" />
                </div>
            </div>
        </div>
    );
}
