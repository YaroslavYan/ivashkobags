"use client";

import { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { usePathname, Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "../../public/logo-left.png";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileNavigation({ productsCartCount }) {
  const t = useTranslations("Nav");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("catalog") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
  ];

  const { openCart } = useCart();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Block scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="md:hidden">
      {/* Fixed header */}
      <div
        className={`
          fixed top-0 left-0 w-full z-50 flex justify-between items-center h-[80px] px-4
          bg-black transition-all duration-300
          ${isScrolled ? "bg-black/100" : "bg-black/60"}
        `}
      >
        <Link href="/" className="flex items-center gap-2 text-2xl font-semibold font-serif text-white">
          <Image src={logo} alt="IVASHKO Logo" width={200} height={50} />
        </Link>

        <div className="flex items-center gap-4">
          <button onClick={openCart} className="cursor-pointer text-white relative">
            <FaShoppingCart size={24} />
            {productsCartCount > 0 && (
              <span
                className="absolute -top-[-18px] -right-[-45px] bg-red-300 text-white text-xs w-5 h-5 flex items-center justify-center rounded-sm font-semibold"
                aria-label={`${productsCartCount} items in cart`}
              >
                {productsCartCount > 99 ? "99+" : productsCartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: "white" }}
          >
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Fullscreen mobile menu */}
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
                className={`text-white hover:text-gray-300 transition-colors ${
                  pathname === href ? "text-[#FEB83F]" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Language switcher in mobile menu */}
        <div className="mt-2 border-t border-white/20 pt-6 w-40 flex justify-center">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
