"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const categories = [
  { name: "Wszystkie", slug: "all", image: "w1.jpg" },
  { name: "Shopper", slug: "shopper", image: "w4.jpg" },
  { name: "Torby typu tote", slug: "tote", image: "w5.jpg" },
  { name: "Małe torebki", slug: "mini", image: "w2.jpg" },
];

export default function SidebarMenu({ variant = "products" }) {
  const [loadingSlug, setLoadingSlug] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleClick = (slug) => {
    setLoadingSlug(slug); // показуємо спінер
    router.push(`/products?category=${slug}&page=1`);
  };

  // 👇 Якщо завантажений category = тому, який ми клікнули → ховаємо спінер
  useEffect(() => {
    if (loadingSlug && loadingSlug === currentCategory) {
      setLoadingSlug(null);
    }
  }, [currentCategory, loadingSlug]);

  const asideClasses =
    variant === "main"
      ? "p-4 rounded text-gray-800 pb-[0px]"
      : "w-64 p-6 bg-white rounded text-gray-800 from-left";

  const listClasses =
    variant === "main"
      ? "grid grid-cols-2 gap-4 p-0 m-0 list-none"
      : "space-y-2 list-none p-0 m-0 w-[320px]";

  const imgClasses =
    variant === "main"
      ? "w-30 h-30 md:w-20 md:h-20 rounded-full object-cover aspect-square"
      : "w-12 h-12 rounded-full object-cover aspect-square";

  return (
    <aside data-reveal className={asideClasses}>
      {variant !== "main" && (
        <h2 className="text-lg font-bold mb-4">Категорії</h2>
      )}

      <ul className={listClasses}>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <button
              onClick={() => handleClick(cat.slug)}
              className={`group flex items-center gap-2 w-full text-left pr-4 py-2 rounded cursor-pointer transition-colors hover:text-gray-300
  ${variant === "main" ? "flex-col lg:flex-row" : "flex-row"}`}
            >
              <div className="relative">
                <img src={cat.image} alt={cat.name} className={imgClasses} />
                {loadingSlug === cat.slug && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-8 h-8 border-4 border-gray-300 border-t-black/80 rounded-full animate-spin"></span>
                  </span>
                )}
              </div>
              <span
                className={`relative ml-[10px] lg:ml-[15px] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[gold] after:transition-all after:duration-300 group-hover:after:w-full`}
              >
                {cat.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
