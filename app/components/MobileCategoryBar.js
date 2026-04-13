"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function MobileCategoryBar() {
  const t = useTranslations("Categories");
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  const [loadingSlug, setLoadingSlug] = useState(null);

  const categories = [
    { slug: "all", image: "/w1.jpg", name: t("all") },
    { slug: "shopper", image: "/w4.jpg", name: t("shopper") },
    { slug: "tote", image: "/w5.jpg", name: t("tote") },
    { slug: "mini", image: "/w2.jpg", name: t("mini") },
  ];

  useEffect(() => {
    if (loadingSlug && loadingSlug === currentCategory) {
      setLoadingSlug(null);
    }
  }, [currentCategory, loadingSlug]);

  const handleClick = (slug) => {
    if (slug === currentCategory) return;
    setLoadingSlug(slug);
    router.push(`/products?category=${slug}&page=1`);
  };

  return (
    <div className="md:hidden mb-6">
      <div
        className="flex gap-4 overflow-x-auto pb-3 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => {
          const isActive = currentCategory === cat.slug;
          const isLoading = loadingSlug === cat.slug;

          return (
            <button
              key={cat.slug}
              onClick={() => handleClick(cat.slug)}
              className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
              style={{ minWidth: 68 }}
            >
              <div
                style={{
                  position: "relative",
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  padding: 2,
                  background: isActive ? "linear-gradient(135deg, #FEB83F, #e09000)" : "transparent",
                  border: isActive ? "none" : "2px solid #e5e7eb",
                  transition: "all 0.25s ease",
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
                  <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
                  </span>
                )}
              </div>

              <span style={{ fontSize: 12, fontWeight: isActive ? 700 : 400, color: isActive ? "#111" : "#6b7280", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                {cat.name}
              </span>

              {isActive && (
                <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#FEB83F", marginTop: -4 }} />
              )}
            </button>
          );
        })}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
