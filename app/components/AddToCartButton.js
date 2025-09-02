"use client";

import React from "react";
import { getOrCreateSessionId } from "../_lib/getOrCreateSessionId";
import { addToCartAction } from "../_lib/actions";

export default function AddToCartButton({ id }) {
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // if (onClick) onClick();

    //const sessionId = localStorage.getItem("sessionId");

    const sessionId = getOrCreateSessionId();

    // Виклик через server action
    try {
      await addToCartAction(id, null, sessionId);
    } catch (err) {
      console.error("Помилка:", err.message);
    }

    // await addToCart("111183fb-eff4-4aed-bbc0-c84ed16f95d1", sessionId); // чекаємо виконання
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center px-4 py-2 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
      aria-label="Додати в кошик"
      title="Додати в кошик"
    >
      +
    </button>
  );
}
