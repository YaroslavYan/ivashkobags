"use client";

import React, { useState } from "react";
import { getOrCreateSessionId } from "../_lib/getOrCreateSessionId";
import { addToCartAction, removeFromCartAction } from "../_lib/actions";

export default function AddToCartButton({ id, variant, inCart }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const sessionId = getOrCreateSessionId();
    setLoading(true);

    try {
      if (inCart) {
        await removeFromCartAction({ productId: id, sessionId });
      } else {
        await addToCartAction(id, null, sessionId);
      }
    } catch (err) {
      console.error("Помилка:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Маленький спінер (tailwind)
  const Spinner = () => (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );

  if (variant === "productCard") {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-80 p-4 rounded cursor-pointer transition duration-300 ease-in-out flex items-center justify-center ${
          inCart
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-[#111] text-white hover:bg-gray-500"
        } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        aria-label={inCart ? "Видалити з кошика" : "Додати в кошик"}
        title={inCart ? "Видалити з кошика" : "Додати в кошик"}
      >
        {loading ? (
          <Spinner />
        ) : inCart ? (
          "ВИДАЛИТИ З КОШИКА"
        ) : (
          "ДОДАТИ В КОШИК"
        )}
      </button>
    );
  }

  // варіант маленької кнопки (+ / -)
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center justify-center px-4 py-2 text-xl cursor-pointer"
      aria-label={inCart ? "Видалити з кошика" : "Додати в кошик"}
      title={inCart ? "Видалити з кошика" : "Додати в кошик"}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      ) : inCart ? (
        <span className="text-red-600 hover:text-red-800">-</span>
      ) : (
        <span className="text-gray-500 hover:text-gray-700">+</span>
      )}
    </button>
  );
}
