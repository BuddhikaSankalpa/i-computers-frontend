import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductImageSlideShow({ images = [] }) {
  const [index, setIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  if (!images || images.length === 0) {
    return <div className="w-full h-80 bg-[#111827]/50 rounded-2xl flex items-center justify-center text-gray-500">No images</div>;
  }

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image Container */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-square md:aspect-video lg:aspect-square xl:aspect-video rounded-2xl flex items-center justify-center overflow-hidden group cursor-crosshair bg-[#111827]/30 border border-white/5"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Zoom Hint */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white/70 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 opacity-100 group-hover:opacity-0 transition-opacity z-30 pointer-events-none">
          <ZoomIn size={14} /> Hover to zoom
        </div>

        <AnimatePresence mode="wait">
            <motion.img
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: isZooming ? 2 : 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ 
                duration: isZooming ? 0 : 0.3, // Instant track when zooming, smooth otherwise
                opacity: { duration: 0.3 }
              }}
              src={images[index]}
              alt={`img-${index}`}
              className={`max-h-[80%] max-w-[80%] object-contain drop-shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all z-10 ${isZooming ? '' : 'group-hover:drop-shadow-[0_0_30px_rgba(0,229,255,0.4)]'}`}
              style={{ 
                mixBlendMode: 'normal',
                transformOrigin: isZooming ? `${mousePos.x}% ${mousePos.y}%` : 'center center'
              }}
            />
        </AnimatePresence>

        {/* Next/Prev Buttons */}
        {images.length > 1 && (
            <>
                <button 
                    onClick={(e) => { e.stopPropagation(); prev(); }} 
                    className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#FF2DA6] text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 z-20 shadow-lg ${isZooming ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); next(); }} 
                    className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#FF2DA6] text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 z-20 shadow-lg ${isZooming ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}
                >
                    <ChevronRight size={24} />
                </button>
            </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 justify-center overflow-x-auto py-2 custom-scrollbar">
            {images.map((src, i) => (
            <button 
                key={i} 
                onClick={() => setIndex(i)} 
                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-black/20 border-2 transition-all duration-300 p-2 flex items-center justify-center ${
                    i === index 
                        ? "border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-105" 
                        : "border-white/10 hover:border-white/30 hover:scale-105 opacity-60 hover:opacity-100"
                }`}
            >
                <img src={src} alt={`thumb-${i}`} className="max-w-full max-h-full object-contain" />
            </button>
            ))}
        </div>
      )}
    </div>
  );
}
