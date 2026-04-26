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
    return () => { document.body.style.overflow = "auto"; };
  }, [isCartOpen]);

  const total = products?.reduce((sum, item) => sum + (item.products?.price || 0), 0) ?? 0;
  const isEmpty = !products || products.length === 0;

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-all duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="flex-1 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="w-full max-w-[420px] flex flex-col bg-[#fafafa] h-full shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e8ed]">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-[#86868b] uppercase mb-0.5">
              Ivashko
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-[#1d1d1f]">
              Ваш кошик
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center
              text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors cursor-pointer"
          >
            <FaTimes size={12} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center text-2xl">
                🛍️
              </div>
              <p className="text-[#1d1d1f] font-medium">Кошик порожній</p>
              <p className="text-[#86868b] text-sm">Додайте товари щоб продовжити</p>
              <button
                onClick={closeCart}
                className="mt-2 text-sm font-medium text-[#0071e3] hover:underline underline-offset-2 cursor-pointer"
              >
                Перейти до каталогу &rarr;
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {products.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 bg-white rounded-2xl p-3 shadow-sm"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#f5f5f7]">
                    <img
                      src={item.products?.image}
                      alt={item.products?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1d1d1f] truncate leading-snug">
                      {item.products?.title}
                    </p>
                    <p className="text-[13px] font-semibold text-[#1d1d1f] mt-1">
                      {item.products?.price} €
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeProduct(item.products.id)}
                    className="w-7 h-7 rounded-full bg-[#f5f5f7] flex items-center justify-center
                      text-[#86868b] hover:bg-red-50 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                  >
                    <FaTimes size={10} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="px-6 py-5 border-t border-[#e8e8ed] bg-[#fafafa]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#86868b]">Разом</span>
              <span className="text-base font-semibold text-[#1d1d1f]">{total} €</span>
            </div>
            <Link
              href="/checkout#checkout-form"
              onClick={closeCart}
              className="block w-full bg-[#1d1d1f] hover:bg-[#2d2d2f] text-white text-sm font-semibold
                text-center py-3.5 rounded-xl transition-colors"
            >
              Оформити замовлення
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
