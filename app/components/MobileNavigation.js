"use client";

import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
  const navItems = [
    { href: "/", label: "Головна" },
    { href: "/products", label: "Каталог" },
    { href: "/about", label: "Про нас" },
  ];

  const { openCart } = useCart();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Фіксована шапка завжди */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-black h-[80px] px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold font-serif text-white"
        >
          IVASHKO
        </Link>

        <div className="flex items-center gap-4">
          <button onClick={openCart} className="cursor-pointer text-white ">
            <FaShoppingCart size={24} />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: "white" }}
          >
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Повноекранне мобільне меню тільки коли відкрито */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center gap-8 text-xl z-50">
          <ul className="flex flex-col items-center gap-6">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-white hover:text-gray-300 ${
                    pathname === href ? "text-accent-400" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: "white" }}
          >
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      )}
    </div>
  );
}
