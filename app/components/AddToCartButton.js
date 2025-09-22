"use client";

import React from "react";
import { getOrCreateSessionId } from "../_lib/getOrCreateSessionId";
import { addToCartAction, removeFromCartAction } from "../_lib/actions";

export default function AddToCartButton({ id, variant, inCart }) {
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const sessionId = getOrCreateSessionId();

    try {
      if (inCart) {
        // якщо товар вже у кошику → видаляємо
        await removeFromCartAction({ productId: id, sessionId });
      } else {
        // якщо товару ще нема → додаємо
        await addToCartAction(id, null, sessionId);
      }
    } catch (err) {
      console.error("Помилка:", err.message);
    }
  };

  if (variant === "productCard") {
    return (
      <button
        onClick={handleClick}
        className={`w-80 p-4 rounded cursor-pointer transition duration-300 ease-in-out ${
          inCart
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-[#111] text-white hover:bg-gray-500"
        }`}
        aria-label={inCart ? "Видалити з кошика" : "Додати в кошик"}
        title={inCart ? "Видалити з кошика" : "Додати в кошик"}
      >
        {inCart ? "ВИДАЛИТИ З КОШИКА" : "ДОДАТИ В КОШИК"}
      </button>
    );
  }

  // варіант для маленької кнопки (+ / -)
  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center px-4 py-2 text-xl cursor-pointer"
      aria-label={inCart ? "Видалити з кошика" : "Додати в кошик"}
      title={inCart ? "Видалити з кошика" : "Додати в кошик"}
    >
      {inCart ? (
        <span className="text-red-600 hover:text-red-800">-</span>
      ) : (
        <span className="text-gray-500 hover:text-gray-700">+</span>
      )}
    </button>
  );
}
