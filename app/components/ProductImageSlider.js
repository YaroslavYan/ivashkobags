"use client";

import { useState } from "react";

const ProductGallery = ({ images }) => {
  const [mainIndex, setMainIndex] = useState(0); // зберігаємо індекс, а не саму картинку
  const [touchStartX, setTouchStartX] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsAnimating(false);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTranslateX(currentX - touchStartX); // рухаємо картинку
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;

    setIsAnimating(true);

    if (translateX < -50) {
      // свайп вліво → наступна
      setMainIndex((prev) => (prev + 1) % images.length);
    } else if (translateX > 50) {
      // свайп вправо → попередня
      setMainIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    setTranslateX(0);
    setTouchStartX(null);
  };

  return (
    <div className="w-full h-full mx-auto">
      {/* Головна картинка */}
      <div
        className="w-full h-full mb-4 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={`https://fsuiirlhbkviyvmjkpql.supabase.co/storage/v1/object/public/product-img/${images[mainIndex]}`}
          alt="main"
          className="w-full h-full object-cover"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isAnimating ? "transform 0.3s ease" : "none",
          }}
        />
      </div>

      {/* Превʼю */}
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <img
            key={img}
            src={`https://fsuiirlhbkviyvmjkpql.supabase.co/storage/v1/object/public/product-img/${img}`}
            alt={`Thumbnail-${idx}`}
            className={`h-20 w-20 object-cover rounded cursor-pointer border-2 
              ${mainIndex === idx ? "border-black" : "border-transparent"} 
              hover:border-black`}
            onClick={() => setMainIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
