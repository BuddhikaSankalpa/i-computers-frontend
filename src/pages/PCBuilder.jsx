import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cpu, CircuitBoard, MemoryStick, MonitorCheck, HardDrive, Zap, Monitor, Check, ShoppingCart, ChevronRight, ChevronLeft, Trash2, Package } from "lucide-react";
import { addToCart } from "../utils/cart";
import api from "../utils/api";
import Footer from "../components/footer";
import toast from "react-hot-toast";

const BUILD_STEPS = [
    { key: "CPU", label: "Processor", icon: Cpu, category: "CPU", color: "#00E5FF", desc: "The brain of your build" },
    { key: "Motherboard", label: "Motherboard", icon: CircuitBoard, category: "Motherboard", color: "#A855F7", desc: "Connects all components" },
    { key: "RAM", label: "Memory (RAM)", icon: MemoryStick, category: "RAM", color: "#FF2DA6", desc: "Your system's working memory" },
    { key: "GPU", label: "Graphics Card", icon: MonitorCheck, category: "GPU", color: "#00E5FF", desc: "Powers your visuals" },
    { key: "Storage", label: "Storage (SSD)", icon: HardDrive, category: "Storage", color: "#A855F7", desc: "Where your data lives" },
    { key: "PSU", label: "Power Supply", icon: Zap, category: "PSU", color: "#FF2DA6", desc: "Powers your entire rig" },
    { key: "Monitor", label: "Monitor", icon: Monitor, category: "Monitor", color: "#00E5FF", desc: "Your window to the game" },
];

function formatPrice(price) {
    return new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(price);
}

export default function PCBuilderPage() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [products, setProducts] = useState({});
    const [loadingCategory, setLoadingCategory] = useState(false);
    const [currentBuild, setCurrentBuild] = useState({});

    const step = BUILD_STEPS[activeStep];

    // Fetch products for the current category
    useEffect(() => {
        if (products[step.category]) return; // already fetched
        setLoadingCategory(true);
        api.get(`/products?category=${encodeURIComponent(step.category)}`)
            .then((res) => {
                setProducts((prev) => ({ ...prev, [step.category]: res.data }));
            })
            .catch((err) => console.error(err))
            .finally(() => setLoadingCategory(false));
    }, [activeStep]);

    const selectProduct = (product) => {
        setCurrentBuild((prev) => ({ ...prev, [step.key]: product }));
    };

    const removeFromBuild = (key) => {
        setCurrentBuild((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const totalPrice = Object.values(currentBuild).reduce((sum, p) => sum + p.price, 0);
    const selectedCount = Object.keys(currentBuild).length;

    const handleAddToCart = () => {
        if (selectedCount === 0) {
            toast.error("Please select at least one component.", {
                style: { background: "#111827", color: "#fff", border: "1px solid rgba(239,68,68,0.3)" },
            });
            return;
        }
        // Add all build items to cart with qty 1
        Object.values(currentBuild).forEach((product) => {
            addToCart(product, 1);
        });
        // Flag this as a custom build for the checkout
        localStorage.setItem("orderType", "custom_build");
        toast.success(`${selectedCount} component(s) added to cart!`, {
            style: { background: "#111827", color: "#00E5FF", border: "1px solid rgba(0,229,255,0.3)" },
        });
        navigate("/cart");
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white font-sans">
            {/* Background Orbs */}
            <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-[#00E5FF]/5 rounded-full blur-[200px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#A855F7]/5 rounded-full blur-[200px] pointer-events-none" />

            <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-12">
                {/* Page Header */}
                <div className="mb-10">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-full w-fit text-xs text-[#00E5FF] font-semibold uppercase tracking-wider">
                            <Cpu size={14} /> Build Your Dream PC
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black font-orbitron leading-tight">
                            CUSTOM <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7]">PC BUILDER</span>
                        </h1>
                        <p className="text-[#A0AEC0] max-w-xl">Select components step by step, review your build, and add everything to your cart in one click.</p>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Panel: Step Builder */}
                    <div className="flex-1 flex flex-col gap-6">
                        {/* Step Progress Bar */}
                        <div className="flex gap-2 flex-wrap">
                            {BUILD_STEPS.map((s, idx) => {
                                const StepIcon = s.icon;
                                const isSelected = !!currentBuild[s.key];
                                const isActive = activeStep === idx;
                                return (
                                    <button
                                        key={s.key}
                                        onClick={() => setActiveStep(idx)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${isActive
                                                ? "bg-[#00E5FF]/20 border-[#00E5FF]/50 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                                                : isSelected
                                                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                                                    : "bg-white/5 border-white/10 text-[#A0AEC0] hover:bg-white/10"
                                            }`}
                                    >
                                        {isSelected ? <Check size={14} /> : <StepIcon size={14} />}
                                        {s.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Current Step Panel */}
                        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ background: `${step.color}15`, borderColor: `${step.color}40` }}>
                                    <step.icon size={24} style={{ color: step.color }} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        Step {activeStep + 1}: {step.label}
                                    </h2>
                                    <p className="text-sm text-[#A0AEC0]">{step.desc}</p>
                                </div>
                                {currentBuild[step.key] && (
                                    <span className="ml-auto flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1.5 rounded-full font-medium">
                                        <Check size={12} /> Selected
                                    </span>
                                )}
                            </div>

                            {/* Product Grid */}
                            {loadingCategory ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {Array(4).fill(0).map((_, i) => (
                                        <div key={i} className="h-28 bg-white/5 animate-pulse rounded-xl" />
                                    ))}
                                </div>
                            ) : !products[step.category] || products[step.category].length === 0 ? (
                                <div className="flex flex-col items-center py-12 text-[#A0AEC0]">
                                    <Package size={48} className="mb-3 opacity-30" />
                                    <p>No {step.label} products found.</p>
                                    <p className="text-xs mt-1 opacity-60">Ensure products in DB have category: "{step.category}"</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                                    {products[step.category].map((product) => {
                                        const isChosen = currentBuild[step.key]?.productId === product.productId;
                                        return (
                                            <motion.button
                                                key={product.productId}
                                                onClick={() => selectProduct(product)}
                                                whileTap={{ scale: 0.98 }}
                                                className={`text-left p-4 rounded-xl border transition-all duration-200 flex gap-3 items-start group ${isChosen
                                                        ? "border-[#00E5FF]/60 bg-[#00E5FF]/10 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                                                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                                                    }`}
                                            >
                                                <img
                                                    src={product.images?.[0] || "/default-product-1.png"}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-contain rounded-lg bg-black/30 shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-white leading-tight line-clamp-2 mb-1">{product.name}</p>
                                                    <p className="text-[#00E5FF] font-bold text-sm">{formatPrice(product.price)}</p>
                                                    {product.brand && <p className="text-[#A0AEC0] text-xs mt-0.5">{product.brand}</p>}
                                                </div>
                                                {isChosen && (
                                                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00E5FF] flex items-center justify-center">
                                                        <Check size={12} className="text-black" />
                                                    </div>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Step Navigation */}
                        <div className="flex justify-between">
                            <button
                                onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                                disabled={activeStep === 0}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-[#A0AEC0] hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft size={18} /> Previous
                            </button>
                            <button
                                onClick={() => setActiveStep((p) => Math.min(BUILD_STEPS.length - 1, p + 1))}
                                disabled={activeStep === BUILD_STEPS.length - 1}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-[#A0AEC0] hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                Next <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Build Summary */}
                    <div className="lg:w-[360px] shrink-0">
                        <div className="sticky top-24 bg-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-lg font-bold text-white font-orbitron tracking-wide">YOUR BUILD</h3>
                                <p className="text-xs text-[#A0AEC0] mt-1">{selectedCount} / {BUILD_STEPS.length} components selected</p>
                                {/* Progress bar */}
                                <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#00E5FF] to-[#A855F7] rounded-full transition-all duration-500"
                                        style={{ width: `${(selectedCount / BUILD_STEPS.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="divide-y divide-white/5">
                                {BUILD_STEPS.map((s) => {
                                    const product = currentBuild[s.key];
                                    const StepIcon = s.icon;
                                    return (
                                        <div key={s.key} className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${product ? "bg-white/[0.02]" : ""}`}>
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.color}15` }}>
                                                <StepIcon size={16} style={{ color: s.color }} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-[#A0AEC0] font-medium">{s.label}</p>
                                                {product ? (
                                                    <p className="text-sm text-white font-semibold truncate">{product.name}</p>
                                                ) : (
                                                    <p className="text-sm text-white/20 italic">Not selected</p>
                                                )}
                                            </div>
                                            {product ? (
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className="text-sm text-[#00E5FF] font-bold">{formatPrice(product.price)}</span>
                                                    <button
                                                        onClick={() => removeFromBuild(s.key)}
                                                        className="p-1 text-white/30 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setActiveStep(BUILD_STEPS.findIndex((x) => x.key === s.key))}
                                                    className="text-xs text-[#00E5FF]/50 hover:text-[#00E5FF] transition-colors font-medium shrink-0"
                                                >
                                                    Select
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="p-6 border-t border-white/10">
                                <div className="flex justify-between items-center mb-5">
                                    <span className="text-[#A0AEC0] font-medium">Total</span>
                                    <span className="text-2xl font-black text-white">{formatPrice(totalPrice)}</span>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#00E5FF] to-[#A855F7] text-black font-bold text-lg rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(0,229,255,0.3)]"
                                >
                                    <ShoppingCart size={22} />
                                    Add Build to Cart
                                </button>
                                <p className="text-xs text-center text-[#A0AEC0] mt-3">You can adjust quantities in the cart</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
