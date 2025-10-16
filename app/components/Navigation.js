"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
  FaTelegram,
  // FaUser,
} from "react-icons/fa";
// import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function Navigation({ productsCartCount }) {
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: "/", label: "Strona główna" },
    { href: "/products", label: "Katalog" },
    { href: "/about", label: "O nas" },
  ];

  const { openCart } = useCart();

  const pathname = usePathname();

  // Відстеження скролу
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full h-full z-10 text-[#fff] m-0 p-0 hidden md:block">
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
          className="flex items-center gap-2 tracking-widest text-2xl ml-[9px] "
        >
          {/* IVASHKO */}
          <img src="logo-left.png" className="w-[200px]" />
          {/* <FaShoppingBag size={24} /> */}
        </Link>
        <div className="flex items-center gap-4 mr-[72px] ">
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

      {/* Обгортка для горизонтального вирівнювання */}
      <div
        className="flex border  items-start h-full"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      >
        {/* Лого зліва */}
        <div
          className="flex-1 flex items-center px-6 h-[100px] border-b"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 tracking-widest text-2xl font-serif font-semibold"
          >
            {/* IVASHKO */}
            <img src="logo-left.png" className="w-[230px]" />
            {/* <FaShoppingBag size={24} /> */}
          </Link>
        </div>

        {/* Правий блок */}
        <div className="flex flex-col items-end h-full">
          {/* Верхній рядок: соцмережі + кошик/юзер */}
          <div className="flex">
            {/* Соцмережі */}
            <div
              className="flex items-center justify-center gap-4 w-[200px] h-[100px] border-b border-l"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <Link
                href="#"
                className="hover:text-accent-400 hover:text-gray-400 transition"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/ivashko_bags/"
                className="hover:text-accent-400 hover:text-gray-400 transition"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-accent-400 hover:text-gray-400 transition"
              >
                <FaTelegram size={20} />
              </Link>
            </div>

            {/* Кошик + користувач */}
            <div
              className="flex items-center justify-center gap-6 w-[200px] h-[100px] border-b border-l hover:text-gray-400 transition"
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
              {/* <Link href="/login" className="hover:text-accent-400">
                <FaUser size={24} />
              </Link> */}
            </div>
          </div>

          {/* Вертикальне меню під "кошиком + користувачем" */}
          <ul
            className="relative flex flex-col items-center justify-center gap-6 w-[200px] min-h-[300px] border-l border-b text-xl px-4"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            {["/", "/products", "/about"].includes(pathname) && (
              <span
                className="absolute left-[-15px] border-t-2 border-dotted border-white w-[45px] transition-all duration-500 ease-in-out"
                style={{
                  top: (() => {
                    switch (pathname) {
                      case "/":
                        return "4.8rem";
                      case "/products":
                        return "9.3rem";
                      case "/about":
                        return "14rem";
                    }
                  })(),
                }}
              />
            )}

            {navItems.map(({ href, label }) => (
              <li
                key={href}
                className="w-full flex items-center justify-center h-[3rem]"
              >
                <Link
                  href={href}
                  className={`transition-transform duration-500 ease-in-out hover:text-gray-300`}
                  style={{
                    transform:
                      pathname === href ? "translateX(10px)" : "translateX(0)",
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="flex flex-col items-center justify-center gap-6 w-[200px] h-[100vh] border-l text-xl px-4"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          ></div>
        </div>
      </div>
    </nav>
  );
}
