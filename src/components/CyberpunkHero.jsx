import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// ඔයාගේ VS Code එකේ components ෆෝල්ඩරයේ හැදුනු computer_01.jsx ෆයිල් එක මෙතනින් import කරගන්නවා
import { Model } from './computer_01'; 

export default function App() {
  return (
    // Main Hero Section Container (bg-[#050505] අයින් කරලා තියෙන්නේ background image එක පේන්න ඕනේ නිසා)
    <section className="relative w-full min-h-[90vh] overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 text-white font-sans">
      
      {/* --- අලුතෙන් එකතු කරපු Background Image එක --- */}
      {/* ඔයාගේ public folder එකේ තියෙන පින්තූරයේ නම මෙතන 'homePage.png' වෙනුවට දෙන්න */}
      <div className="absolute inset-0 bg-[url('/homePage.png')] bg-cover bg-center z-0" />
      
      {/* Background එක උඩින් දාන අඳුරු Gradient එක (අකුරු පැහැදිලිව පේන්න) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent z-0" />

      {/* 3D Model එකට ගැලපෙන Ambient Glow එක (මෙකෙනුත් ලස්සන Neon ගතියක් එනවා) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Left Content Area (Text & Button) */}
      {/* z-10 දාලා තියෙන්නේ මේවා background එකට වඩා උඩින් පේන්න ඕනේ නිසා */}
      <div className="w-full lg:w-1/2 z-10 flex flex-col gap-6 max-w-2xl lg:pr-10 mt-10 lg:mt-0 order-2 lg:order-1">
        <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[40px] md:text-[54px] font-black text-white font-orbitron leading-tight"
        >
            BUILD YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7]">ULTIMATE</span> GAMING PC
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[18px] md:text-[14px] text-[#A0AEC0] max-w-xl"
        >
            Premium Gaming PCs, Components, Accessories, and Gaming Gear Delivered Across Sri Lanka.
        </motion.p>
        
        <br/>
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-4"
        >
            <Link 
                to="/products" 
                className="relative overflow-hidden px-8 py-3 bg-[#00E5FF] text-black hover:text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(115,136,255,0.8)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out group flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] via-[#7388FF] to-[#B266FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-0" />
                
                <span className="relative z-10 flex items-center gap-2">
                    Explore Builds
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
            </Link>
        </motion.div>
      </div>

      {/* Right Content Area - 3D Canvas */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative z-10 order-1 lg:order-2 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [5, 2, 5], fov: 45 }}>
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          
          <Suspense fallback={null}>
              <Center position={[0, 0, 0]}>
                  <Model scale={0.2} />
              </Center>
              <Environment preset="city" />
          </Suspense>

          <OrbitControls autoRotate />
          
          <ContactShadows position={[0, -1.05, 0]} opacity={0.7} scale={5} blur={2} />
        </Canvas>
      </div>

    </section>
  );
}