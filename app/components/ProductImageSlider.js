"use client";

import { useState } from "react";

const BASE = "https://fsuiirlhbkviyvmjkpql.supabase.co/storage/v1/object/public/product-img/";

export default function ProductGallery({ images }) {
  const [mainIndex, setMainIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsAnimating(false);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    setTranslateX(e.touches[0].clientX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    setIsAnimating(true);
    if (translateX < -50) setMainIndex((p) => (p + 1) % images.length);
    else if (translateX > 50) setMainIndex((p) => (p - 1 + images.length) % images.length);
    setTranslateX(0);
    setTouchStartX(null);
  };

  return (
    <div className="flex gap-3 w-full h-full">
      {/* Мініатюри — вертикально справа від головного фото */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 order-last">
          {images.map((img, idx) => (
            <button
              key={img}
              onClick={() => setMainIndex(idx)}
              style={{
                width: 72,
                height: 72,
                flexShrink: 0,
                borderRadius: 8,
                overflow: "hidden",
                border: mainIndex === idx ? "2px solid #FEB83F" : "2px solid transparent",
                outline: mainIndex === idx ? "1px solid #FEB83F" : "1px solid #e5e7eb",
                transition: "border-color 0.2s, outline-color 0.2s",
                cursor: "pointer",
                padding: 0,
                background: "none",
              }}
            >
              <img
                src={`${BASE}${img}`}
                alt={`Thumbnail-${idx}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  opacity: mainIndex === idx ? 1 : 0.65,
                  transition: "opacity 0.2s",
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Головна картинка */}
      <div
        className="flex-1 overflow-hidden rounded-xl"
        style={{ aspectRatio: "3/4", background: "#f5f5f5" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={`${BASE}${images[mainIndex]}`}
          alt="main"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: `translateX(${translateX}px)`,
            transition: isAnimating ? "transform 0.3s ease" : "none",
          }}
        />
      </div>
    </div>
  );
}
