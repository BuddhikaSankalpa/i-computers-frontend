import { Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import PCBuilderPage from "./PCBuilder";

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full h-full"
    >
        {children}
    </motion.div>
);

export default function HomePage() {
    const location = useLocation();
	return (
		<div className="w-full min-h-screen flex flex-col bg-[#050816]">
			<Header />
			<main className="flex-grow w-full">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<PageWrapper><HomeContent /></PageWrapper>} />
                        
                        <Route path="/products" element={<PageWrapper><ProductsPage /></PageWrapper>} />
                        
                        <Route path="/contact-us" element={<PageWrapper><ContactUs /></PageWrapper>} />
                        
                        <Route path="/about-us" element={<PageWrapper><AboutUs /></PageWrapper>} />
                        
                        <Route path="/overview/:productId" element={<PageWrapper><ProductOverview /></PageWrapper>} /> 

                        <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
                        <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
                        <Route path="/my-orders" element={<PageWrapper><MyOrders/></PageWrapper>} />
                        <Route path="/settings" element={<PageWrapper><Settings/></PageWrapper>} />
                        <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
                        <Route path="/pc-builder" element={<PageWrapper><PCBuilderPage /></PageWrapper>} />
                        <Route path="/warranty-returns" element={<PageWrapper><WarrantyReturnPolicy /></PageWrapper>} />

                        <Route path="/*" element={
                            <PageWrapper>
                                <div className="flex-grow flex flex-col items-center justify-center py-32 min-h-[60vh]">
                                    <h1 className="text-6xl font-orbitron font-bold text-[#FF2DA6] mb-4 drop-shadow-[0_0_15px_rgba(255,45,166,0.5)]">404</h1>
                                    <p className="text-white text-xl">Page Not Found</p>
                                </div>
                            </PageWrapper>
                        } />
                    </Routes>
                </AnimatePresence>
			</main>
		</div>
	);
}
