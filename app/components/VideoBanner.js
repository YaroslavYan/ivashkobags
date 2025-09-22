// export default function VideoBanner() {
//   return (
//     <div className="w-full aspect-video relative">
//       <iframe
//         className="w-full h-full object-cover pointer-events-none"
//         src="https://www.youtube.com/embed/KL0ALLWT32s?autoplay=1&mute=1&controls=0&loop=1&playlist=KL0ALLWT32s"
//         title="YouTube video player"
//         frameBorder="0"
//         allow="autoplay; encrypted-media"
//         allowFullScreen
//       />
//       {/* затемнення */}
//       <div className="absolute inset-0 bg-black/40 z-10" />
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";

export default function ImageSlider() {
  const images = ["s4.webp", "s3.webp", "s2.webp", "1.jpg"];

  const [current, setCurrent] = useState(0);

  // автоматична зміна слайдів
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full aspect-video relative overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* затемнення */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* точки перемикачі */}
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full  ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
