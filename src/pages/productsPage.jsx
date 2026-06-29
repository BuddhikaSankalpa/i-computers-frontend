import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";

export default function ProductsPage(){
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("search") || "";
    const selectedCategories = searchParams.getAll("category");
    const selectedBrands = searchParams.getAll("brand");

    useEffect(()=>{
        api.get("/products")
        .then((response) => {
            setAllProducts(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
            setLoading(false);
        });
    }, []);

    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const searchText = query.trim().toLowerCase();
            const matchesSearch = searchText === "" || (
                (product.name || "").toLowerCase().includes(searchText) ||
                (product.brand || "").toLowerCase().includes(searchText) ||
                (product.category || "").toLowerCase().includes(searchText)
            );

            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

            return matchesSearch && matchesCategory && matchesBrand;
        });
    }, [allProducts, query, selectedCategories, selectedBrands]);

    const handleSearchChange = (e) => {
        const newParams = new URLSearchParams(searchParams);
        if (e.target.value) {
            newParams.set("search", e.target.value);
        } else {
            newParams.delete("search");
        }
        setSearchParams(newParams, { replace: true });
    };

    const handleFilterChange = (type, value) => {
        const newParams = new URLSearchParams(searchParams);
        const currentValues = newParams.getAll(type);
        if (currentValues.includes(value)) {
            newParams.delete(type);
            currentValues.filter(v => v !== value).forEach(v => newParams.append(type, v));
        } else {
            newParams.append(type, value);
        }
        setSearchParams(newParams);
    };

    const resetFilters = () => {
        setSearchParams({});
    };

    const categories = ["Gaming PCs", "Laptops", "Graphics Cards", "Processors", "Monitors", "Accessories"];
    const brands = ["ASUS", "MSI", "Corsair", "NVIDIA", "AMD"];

    return (
        <div className="w-full min-h-screen bg-[#050816] flex flex-col pt-10">
            <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row gap-8 flex-grow">
                
                {/* Mobile Filter Toggle */}
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden flex items-center justify-center gap-2 bg-[#111827] border border-white/10 text-white p-4 rounded-xl"
                >
                    <Filter size={20} />
                    {showFilters ? "Hide Filters" : "Show Filters"}
                </button>

                {/* Sidebar Filters */}
                <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 lg:w-80 shrink-0`}>
                    <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 sticky top-28">
                        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                            <SlidersHorizontal size={20} className="text-[#00E5FF]" />
                            <h2 className="text-xl font-orbitron font-bold text-white">Filters</h2>
                        </div>

                        {/* Search Bar in Sidebar */}
                        <div className="relative mb-8">
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                value={query} 
                                onChange={handleSearchChange}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white focus:border-[#00E5FF] outline-none transition-colors"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]">
                                <Search size={18} />
                            </div>
                        </div>

                        {/* Filter Categories */}
                        <div className="mb-6">
                            <h3 className="text-white font-semibold mb-3 flex justify-between items-center cursor-pointer">
                                Categories <ChevronDown size={16} className="text-[#A0AEC0]" />
                            </h3>
                            <div className="flex flex-col gap-2">
                                {categories.map(cat => {
                                    const isChecked = selectedCategories.includes(cat);
                                    return (
                                        <label key={cat} className="flex items-center gap-3 text-[#A0AEC0] hover:text-white cursor-pointer group">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#00E5FF] border-[#00E5FF]' : 'border-white/20 group-hover:border-[#00E5FF]'}`}>
                                                {isChecked && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                className="hidden" 
                                                checked={isChecked}
                                                onChange={() => handleFilterChange("category", cat)}
                                            />
                                            <span className="text-sm">{cat}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                        
                        {/* Brands */}
                        <div className="mb-6">
                            <h3 className="text-white font-semibold mb-3 flex justify-between items-center cursor-pointer">
                                Brands <ChevronDown size={16} className="text-[#A0AEC0]" />
                            </h3>
                            <div className="flex flex-col gap-2">
                                {brands.map(brand => {
                                    const isChecked = selectedBrands.includes(brand);
                                    return (
                                        <label key={brand} className="flex items-center gap-3 text-[#A0AEC0] hover:text-white cursor-pointer group">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#A855F7] border-[#A855F7]' : 'border-white/20 group-hover:border-[#A855F7]'}`}>
                                                {isChecked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                className="hidden" 
                                                checked={isChecked}
                                                onChange={() => handleFilterChange("brand", brand)}
                                            />
                                            <span className="text-sm">{brand}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <button 
                            onClick={resetFilters}
                            className="w-full py-3 mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors font-medium text-sm"
                        >
                            Reset Filters
                        </button>
                    </div>
                </aside>

                {/* Main Product Grid */}
                <main className="flex-1 pb-20">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-orbitron font-bold text-white">
                            {query ? "Search Results" : "All Products"}
                        </h1>
                        <p className="text-[#A0AEC0] text-sm">
                            Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {loading ? (
                        <div className="w-full flex justify-center items-center py-20">
                            <div className="w-12 h-12 border-4 border-white/10 border-t-[#00E5FF] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product._id || product.productId} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="w-full flex flex-col justify-center items-center py-32 bg-[#111827]/50 rounded-2xl border border-white/5">
                                <Search size={48} className="text-[#A0AEC0] mb-4 opacity-50" />
                                <p className="text-xl text-white font-medium">No products found.</p>
                                <p className="text-[#A0AEC0] mt-2">Try changing your search or filters.</p>
                            </div>
                        )
                    )}
                </main>
            </div>
            <Footer />
        </div>
    )
}