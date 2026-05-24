import { useState } from "react";

export default function ProductImageSlideShow({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="w-full h-64 bg-gray-100 flex items-center justify-center">No images</div>;
  }

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="w-full">
      <div className="relative w-full h-80 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src={images[index]} alt={`img-${index}`} className="max-h-full max-w-full object-contain" />
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded">‹</button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded">›</button>
      </div>
      <div className="mt-2 flex gap-2 justify-center">
        {images.map((src, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-14 h-14 border ${i === index ? "border-accent" : "border-gray-300"}`}>
            <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
