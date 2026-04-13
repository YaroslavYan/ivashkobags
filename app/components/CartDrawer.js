"use client";

import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { removeFromCartAction } from "../_lib/actions";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export default function CartDrawer({ products, sessionId }) {
  const { isCartOpen, closeCart } = useCart();

  function removeProduct(productId) {
    removeFromCartAction({ productId, sessionId });
  }

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "auto";

    // const sessionId = getOrCreateSessionId();

    // const cartItems = await getCartItems({ sessionId });
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
      }`}
    >
      {/* Задній фон */}
      <div
        onClick={closeCart}
        className="flex-1 bg-black/30 backdrop-blur-sm"
      ></div>

      {/* Сам кошик */}
      <div className="w-[400px] flex bg-white text-black shadow-lg h-full p-6 overflow-y-auto flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">🛒 Ваш кошик</h2>
          <button onClick={closeCart} className="cursor-pointer">
            <FaTimes />
          </button>
        </div>

        {!products || products.length === 0 ? (
          <div className="h-[100vh] flex justify-center items-center">
            <p>Кошик порожній</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {products.map((item, index) => (
              <li
                key={index}
                className="border-b pb-2 flex justify-between items-center last:border-b-0"
              >
                <img src={item.products?.image} className="w-20" />

                <span className="mb-10 mr-20 font-semibold">
                  {item.products?.title}
                </span>
                <span className="text-sm mt-auto">
                  {item.products?.price} грн
                </span>

                <button
                  onClick={() => removeProduct(item.products.id)}
                  className="cursor-pointer mt-auto "
                >
                  <FaTimes className="text-red-400 hover:text-red-500 transition" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {products.length === 0 ? null : (
          <Link
            href="/checkout#checkout-form"
            onClick={closeCart}
            className="mt-auto bg-yellow-500 text-white text-center py-2 rounded sticky bottom-0 "
          >
            Оформити замовлення
          </Link>
        )}
      </div>
    </div>
  );
}
