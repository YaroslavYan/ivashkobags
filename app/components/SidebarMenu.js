"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SidebarMenu({ variant = "products" }) {
  const t = useTranslations("Categories");
  const tp = useTranslations("Products");

  const categories = [
    { name: variant === "main" ? t("allMain") : t("all"), slug: "all", image: "/w1.jpg" },
    { name: t("shopper"), slug: "shopper", image: "/w4.jpg" },
    { name: t("tote"), slug: "tote", image: "/w5.jpg" },
    { name: t("mini"), slug: "mini", image: "/w2.jpg" },
  ];

  const [loadingSlug, setLoadingSlug] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleClick = (slug) => {
    setLoadingSlug(slug);
    router.push(`/products?category=${slug}&page=1`);
  };

  useEffect(() => {
    if (loadingSlug && loadingSlug === currentCategory) {
      setLoadingSlug(null);
    }
  }, [currentCategory, loadingSlug]);

  /* ── variant="main" — grid on the homepage ── */
  if (variant === "main") {
    return (
      <aside data-reveal className="p-4 rounded text-gray-800 pb-[0px]">
        <ul className="grid grid-cols-2 gap-4 p-0 m-0 list-none">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => handleClick(cat.slug)}
                className="group flex flex-col lg:flex-row items-center gap-2 w-full text-left pr-4 py-2 rounded cursor-pointer transition-colors hover:text-gray-300"
              >
                <div className="relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-30 h-30 md:w-20 md:h-20 rounded-full object-cover aspect-square"
                  />
                  {loadingSlug === cat.slug && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-8 h-8 border-4 border-gray-300 border-t-black/80 rounded-full animate-spin" />
                    </span>
                  )}
                </div>
                <span className="relative ml-[10px] lg:ml-[15px] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FEB83F] after:transition-all after:duration-300 group-hover:after:w-full">
                  {cat.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  /* ── variant="products" — sidebar on catalog page ── */
  return (
    <aside data-reveal className="w-64 p-6 bg-white rounded text-gray-800 from-left">
      <h2 className="text-lg font-bold mb-4">{tp("categoriesTitle")}</h2>

      <ul className="space-y-3 list-none p-0 m-0">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.slug;
          const isLoading = loadingSlug === cat.slug;

          return (
            <li key={cat.slug}>
              <button
                onClick={() => handleClick(cat.slug)}
                className="group flex flex-row items-center gap-3 w-full text-left py-2 px-3 rounded-lg cursor-pointer transition-colors hover:text-gray-500"
              >
                {/* Round image with border */}
                <div
                  className="relative flex-shrink-0"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    padding: 2,
                    border: isActive ? "2px solid #FEB83F" : "2px solid #e5e7eb",
                    transition: "border-color 0.25s",
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      opacity: isLoading ? 0.5 : 1,
                      transition: "opacity 0.2s",
                    }}
                  />
                  {isLoading && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-6 h-6 border-4 border-gray-300 border-t-black/80 rounded-full animate-spin" />
                    </span>
                  )}
                </div>

                {/* Name + dot */}
                <span className="flex items-center gap-1.5 flex-1 min-w-0">
                  <span
                    className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#FEB83F] after:transition-all after:duration-300 group-hover:after:w-full"
                    style={{
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#111" : "#374151",
                    }}
                  >
                    {cat.name}
                  </span>

                  {/* Yellow dot */}
                  {isActive && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#FEB83F",
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
