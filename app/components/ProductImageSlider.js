"use client";

import { useState } from "react";

const ProductGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]); // головна картинка

  return (
    <div className="w-full h-full max-w-md mx-auto">
      {/* Головна велика картинка */}
      <img
        src={`https://fsuiirlhbkviyvmjkpql.supabase.co/storage/v1/object/public/product-img/${mainImage}`}
        alt="main"
        className="w-full h-full object-cover mb-4"
      />

      {/* Менші картинки */}
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <img
            key={img}
            src={`https://fsuiirlhbkviyvmjkpql.supabase.co/storage/v1/object/public/product-img/${img}`}
            alt={`Thumbnail-${idx}`}
            className={`h-20 w-20 object-cover rounded cursor-pointer border-2 
              ${mainImage === img ? "border-blue-500" : "border-transparent"} 
              hover:border-blue-400`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
