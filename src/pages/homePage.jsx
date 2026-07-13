import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./productsPage";
import ProductOverview from "./productOverview";
import CartPage from "./cartPage";
import CheckoutPage from "./checkout";
import MyOrders from "./myOrders";
import Settings from "./settings";
import HomeContent from "./homeContent";
import Footer from "../components/footer";
import AboutUs from "./aboutUs";
import ContactUs from "./contactUs";
import ServicesPage from "./servicesPage";
import WarrantyReturnPolicy from "./warrantyReturnPolicy";

export default function HomePage() {
	return (
		<div className="w-full min-h-screen flex flex-col">
			<Header />
			<main className="flex-grow w-full">
                <Routes>
                    <Route path="/" element={<HomeContent />} />
                    {/* products */}
                    <Route path="/products" element={<ProductsPage />} />
                    {/* contact-us */}
                    <Route path="/contact-us" element={<ContactUs />} />
                    {/* about-us */}
                    <Route path="/about-us" element={<AboutUs />} />
                    {/* product-overview */}
                    <Route path="/overview/:productId" element={<ProductOverview />} /> 

                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/my-orders" element={<MyOrders/>} />
                    <Route path="/settings" element={<Settings/>} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/warranty-returns" element={<WarrantyReturnPolicy />} />

                    <Route path="/*" element={
                        <div className="flex-grow flex flex-col items-center justify-center py-32 min-h-[60vh]">
                            <h1 className="text-6xl font-orbitron font-bold text-[#FF2DA6] mb-4 drop-shadow-[0_0_15px_rgba(255,45,166,0.5)]">404</h1>
                            <p className="text-white text-xl">Page Not Found</p>
                        </div>
                    } />
                </Routes>
			</main>
		</div>
	);
}
