"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Блокування скролу коли меню відкрите
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Відстеження скролу
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="md:hidden">
      {/* Фіксована шапка завжди */}
      <div
        className={`
      fixed top-0 left-0 w-full z-50 flex justify-between items-center h-[80px] px-4
    bg-black transition-all duration-300 
      ${isScrolled ? "bg-black/100" : "bg-black/60"}
      `}
      >
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

      {/* Анімоване повноекранне мобільне меню */}
      <div
        className={`
          fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center gap-8 text-xl z-40
          transform transition-transform duration-500 ease-in-out
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
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
    </div>
  );
}
