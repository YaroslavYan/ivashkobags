"use client";

import Image from "next/image";
import { usePathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import {
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
  FaTelegram,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

import logo from "../../public/logo-left.png";

export default function Navigation({ productsCartCount }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("Nav");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("catalog") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
  ];

  const { openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full h-full z-10 text-[#fff] m-0 p-0 hidden md:block">
      {/* Sticky top bar on scroll */}
      <div
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center h-[80px] px-4 bg-black transform-gpu transition-all duration-500 ease-in-out ${
          isScrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 tracking-widest text-2xl ml-[9px]"
        >
          <Image src={logo} alt="Logo" width={200} height={50} className="w-[200px]" />
        </Link>
        <div className="flex items-center gap-6 mr-[72px]">
          <LanguageSwitcher />
          <button onClick={openCart} className="relative cursor-pointer">
            <FaShoppingCart className="hover:text-accent-400" size={24} />
            {productsCartCount > 0 && (
              <span
                className="absolute -top-2 -right-4 bg-red-300 text-white text-xs w-5 h-5 flex items-center justify-center rounded-sm font-semibold"
                aria-label={`${productsCartCount} items in cart`}
              >
                {productsCartCount > 99 ? "99+" : productsCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div
        className="flex border items-start h-full"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      >
        {/* Logo left */}
        <div
          className="flex-1 flex items-center px-6 h-[100px] border-b"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 tracking-widest text-2xl font-serif font-semibold"
          >
            <img src="/logo-left.png" className="w-[230px]" alt="Ivashko" />
          </Link>
        </div>

        {/* Right block */}
        <div className="flex flex-col items-end h-full">
          {/* Top row: social + cart */}
          <div className="flex">
            {/* Social icons */}
            <div
              className="flex items-center justify-center gap-4 w-[200px] h-[100px] border-b border-l"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <Link
                href="https://www.facebook.com/profile.php?id=61582651386669"
                className="hover:text-gray-300 transition"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/ivashko.store/"
                className="hover:text-gray-300 transition"
              >
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="hover:text-gray-300 transition">
                <FaTelegram size={20} />
              </Link>
            </div>

            {/* Cart */}
            <div
              className="flex items-center justify-center gap-6 w-[200px] h-[100px] border-b border-l hover:text-gray-300 transition"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <button onClick={openCart} className="relative cursor-pointer">
                <FaShoppingCart className="hover:text-accent-400" size={24} />
                {productsCartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-4 bg-red-300 text-white text-xs w-5 h-5 flex items-center justify-center rounded-sm font-semibold"
                    aria-label={`${productsCartCount} items in cart`}
                  >
                    {productsCartCount > 99 ? "99+" : productsCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Vertical nav items */}
          <ul
            className="relative flex flex-col items-center justify-center gap-6 w-[200px] min-h-[300px] border-l border-b text-xl px-4"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            {["/", "/products", "/about", "/blog"].includes(pathname) && (
              <span
                className="absolute left-[-15px] border-t-2 border-dotted border-white w-[45px] transition-all duration-500 ease-in-out"
                style={{
                  top: (() => {
                    switch (pathname) {
                      case "/": return "2.5rem";
                      case "/products": return "7.1rem";
                      case "/blog": return "11.5rem";
                      case "/about": return "16rem";
                      default: return "2.5rem";
                    }
                  })(),
                }}
              />
            )}

            {navItems.map(({ href, label }) => (
              <li key={href} className="w-full flex items-center justify-center h-[3rem]">
                <Link
                  href={href}
                  className="transition-transform duration-500 ease-in-out hover:text-gray-300"
                  style={{
                    transform: pathname === href ? "translateX(10px)" : "translateX(0)",
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language switcher section */}
          <div
            className="flex items-center justify-center w-[200px] h-[80px] border-l border-b"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            <LanguageSwitcher />
          </div>

          {/* Remaining space */}
          <div
            className="flex flex-col items-center justify-center gap-6 w-[200px] flex-1 border-l text-xl px-4"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          />
        </div>
      </div>
    </nav>
  );
}
