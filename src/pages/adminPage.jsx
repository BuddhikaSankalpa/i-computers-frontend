import { Link, Route, Routes } from 'react-router-dom'
import { FaShopify } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

export default function AdminPage() {
  return (
    // Main Background (Matching the login page)
    <div className="w-full h-screen bg-[url('/adminpageBG.jpg')] bg-cover bg-center bg-no-repeat flex font-sans text-white">
      
      {/* Sidebar - Glassmorphism Effect */}
      <div className="h-full w-[280px] backdrop-blur-2xl bg-black/40 border-r border-white/20 flex flex-col shadow-2xl z-10">

        {/* Sidebar Header */}
        <div className="h-auto w-full flex flex-col items-center justify-center px-4 py-10">
          <div className="bg-contain w-64 h-30 bg-[url('/companyLogo.png')] bg-contain bg-no-repeat bg-center mb-2 "></div>
          <h1 className="text-[26px] font-black tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-purple-400 text-center uppercase">
            ADMIN PANEL
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 px-5">
          <Link 
            className="w-full h-[55px] rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/30 backdrop-blur-md font-semibold flex items-center gap-4 px-5 transition-all duration-300 group shadow-lg" 
            to="/admin"
          >
            <FaShopify className="text-2xl text-[#00f2fe] group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">Orders</span>
          </Link>

          <Link 
            className="w-full h-[55px] rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/30 backdrop-blur-md font-semibold flex items-center gap-4 px-5 transition-all duration-300 group shadow-lg" 
            to="/admin/products"
          >
            <AiFillProduct className="text-2xl text-[#00f2fe] group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">Products</span>
          </Link>

          <Link 
            className="w-full h-[55px] rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/30 backdrop-blur-md font-semibold flex items-center gap-4 px-5 transition-all duration-300 group shadow-lg" 
            to="/admin/users"
          >
            <FaUsers className="text-2xl text-[#00f2fe] group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">Users</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto backdrop-blur-[20px] bg-black/50 p-8">
        <Routes>
          <Route path='/' element={<h1 className="text-3xl font-bold text-white/90">Order Page</h1>} />
          <Route path='/products' element={<h1 className="text-3xl font-bold text-white/90">Admin Product Page</h1>} />
          <Route path='/users' element={<h1 className="text-3xl font-bold text-white/90">Users Page</h1>} />
          <Route path='/' element={<h1 className="text-3xl font-bold text-white/90">Order Page</h1>} />
          <Route path='/products' element={<h1 className="text-3xl font-bold text-white/90">Admin Product Page</h1>} />
          <Route path='/users' element={<h1 className="text-3xl font-bold text-white/90">Users Page</h1>} />
          <Route path='/add-product' element={<h1 className="text-3xl font-bold text-white/90">Add Product</h1>} />
        </Routes>
      </div>

    </div>
  );
}