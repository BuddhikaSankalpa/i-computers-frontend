import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { Model } from './computer_01'; 

export default function App() {
  const words = ["PC", "SETUP", "RIG", "MACHINE", "CONSOLE", "SYSTEM"];
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typewriter Effect Logic
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        // Backspace effect: remove last character
        setText(prev => prev.substring(0, prev.length - 1));
        setTypingSpeed(50); // Faster speed when deleting
      } else {
        // Typing effect: add next character
        setText(prev => currentWord.substring(0, prev.length + 1));
        setTypingSpeed(150); // Normal typing speed
      }

      // Check if word is complete
      if (!isDeleting && text === currentWord) {
        // Pause at the end of the word before starting to delete
        setTimeout(() => setIsDeleting(true), 2000);
      } 
      // Check if word is fully deleted
      else if (isDeleting && text === "") {
        setIsDeleting(false);
        // Move to the next word
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, typingSpeed]);

  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 text-white font-sans">
      
      <div className="absolute inset-0 bg-[url('/homePage.png')] bg-cover bg-center z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent z-0" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="w-full lg:w-1/2 z-10 pl-20 flex flex-col gap-8 max-w-2xl lg:pr-10 mt-10 lg:mt-0 order-2 lg:order-1">

        <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[52px] md:text-[68px] lg:text-[70px] font-black text-white font-orbitron leading-[1.2] tracking-wide"
        >
            BUILD YOUR <br />
            <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                ULTIMATE GAMING
            </span>  <br className="hidden md:block" /> 
            
            {/* Typewriter Text Area */}
            <span className="inline-block relative">
                <span className="text-white">{text}</span>
                {/* Blinking Cursor */}
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block text-[#00E5FF] ml-1 font-light"
                >
                    |
                </motion.span>
            </span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[16px] md:text-[17px] text-[#A0AEC0] max-w-xl leading-relaxed"
        >
            Experience unparalleled performance and zero latency. We provide Premium Gaming PCs, high end Components, Accessories, and elite Gaming Gear. Custom built for maximum FPS and delivered safely across Sri Lanka.
        </motion.p>
        
        <br/>
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-4"
        >
            <Link 
                to="/complete-builds" 
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