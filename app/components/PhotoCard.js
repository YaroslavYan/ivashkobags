"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import RevealOnScroll from "./RevealOnScroll";

export default function PhotoCard() {
  const t = useTranslations("PhotoCard");
  const images = ["w2.jpg", "s2.webp", "s3.webp"];

  return (
    <>
      {/* ── НОВИЙ ДИЗАЙН ── */}
      <section style={{ background: "#faf9f7", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

          {/* Заголовок секції */}
          <div data-reveal className="from-up" style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", color: "#FEB83F", textTransform: "uppercase", marginBottom: 12 }}>
              {t("title")}
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#111", lineHeight: 1.2 }}>
              {t("heading")}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: 48, alignItems: "center", flexWrap: "wrap" }}>

            {/* Фото — сітка 3 фото з різними розмірами */}
            <div data-reveal className="from-left photo-grid-wrap" style={{ flex: "1 1 480px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "260px 260px", gap: 12 }}>

              {/* Велике фото — займає 2 рядки зліва */}
              <div className="photo-grid-item" style={{ gridRow: "1 / 3", overflow: "hidden", borderRadius: 16 }}>
                <img
                  src={images[0]}
                  alt="photo 1"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Маленьке фото — верхній правий */}
              <div className="photo-grid-item" style={{ overflow: "hidden", borderRadius: 16 }}>
                <img
                  src={images[1]}
                  alt="photo 2"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Маленьке фото — нижній правий */}
              <div className="photo-grid-item" style={{ overflow: "hidden", borderRadius: 16, position: "relative" }}>
                <img
                  src={images[2]}
                  alt="photo 3"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Декоративна плашка */}
                <div style={{
                  position: "absolute", bottom: 12, left: 12,
                  background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
                  borderRadius: 8, padding: "6px 12px",
                  color: "#FEB83F", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em"
                }}>
                  Handmade ✦
                </div>
              </div>
            </div>

            {/* Текст */}
            <div data-reveal className="from-right" style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 24 }}>
              <p style={{ fontSize: "1rem", color: "#555", lineHeight: 1.8 }}>
                {t("text")}
              </p>

              {/* Цифра-факт */}
              <div style={{ display: "flex", gap: 32 }}>
                <div>
                  <p style={{ fontSize: "2rem", fontWeight: 700, color: "#111", lineHeight: 1 }}>100%</p>
                  <p style={{ fontSize: "0.8rem", color: "#888", marginTop: 4 }}>{t("factEco")}</p>
                </div>
                <div style={{ width: 1, background: "#e5e7eb" }} />
                <div>
                  <p style={{ fontSize: "2rem", fontWeight: 700, color: "#111", lineHeight: 1 }}>↻</p>
                  <p style={{ fontSize: "0.8rem", color: "#888", marginTop: 4 }}>{t("factHandmade")}</p>
                </div>
              </div>

              <Link
                href="/about"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#111", color: "#fff",
                  padding: "14px 28px", borderRadius: 8,
                  fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.05em",
                  textDecoration: "none", alignSelf: "flex-start",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#FEB83F"}
                onMouseLeave={e => e.currentTarget.style.background = "#111"}
              >
                {t("readMore")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RevealOnScroll />

      <style>{`
        .photo-grid-item {
          transition: transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .photo-grid-item:hover {
          transform: scale(1.03);
          box-shadow: 0 24px 48px rgba(0,0,0,0.18);
          z-index: 2;
        }
        .photo-grid-item img {
          transition: transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .photo-grid-item:hover img {
          transform: scale(1.06);
        }
        @media (max-width: 640px) {
          .photo-grid-wrap {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 180px 180px !important;
          }
        }
      `}</style>

      {/*
      ── СТАРА ВЕРСІЯ (закоментована) ──

      <div className="flex flex-col lg:flex-row items-center gap-8 p-8 mt-[80px] lg:mt-[170px]">
        <div className="flex-1 relative w-full h-64 lg:h-80 flex justify-center">
          <div
            data-reveal
            className="from-up relative
            w-[250px] h-[250px]
            sm:w-[320px] sm:h-[320px] sm:aspect-[1/1]"
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Фото ${index + 1}`}
                className="photo-card-img absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg transition-transform"
                data-photo-index={index}
              />
            ))}
          </div>
        </div>

        <div data-reveal className="flex-1 text-center lg:text-left mt-[40px] md:mt-[80px] z-40">
          <div className="flex items-center">
            <h2 className="text-3xl font-bold mb-4 text-[#171717]">{t("title")}</h2>
            <span className="h-[1px] border-t-2 w-[34px] border-dotted border-[#0f0f0f] mt-[-10px] ml-[15px]"></span>
          </div>
          <p className="text-gray-700 text-lg border-l-4 border-l-[#FEB83F] pl-1.5">
            {t("text")}{" "}
            <Link href="/about" className="relative inline-block text-blue-600 font-medium group">
              {t("readMore")}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </p>
        </div>
      </div>

      <style>{\`
        .photo-card-img {
          transition: transform 300ms cubic-bezier(.4,0,.2,1), box-shadow 300ms;
          transform-origin: center;
          will-change: transform;
        }
        .photo-card-img[data-photo-index="0"] { left: -80px; top: 100px; }
        .photo-card-img[data-photo-index="1"] { left: 1rem; top: -5rem; }
        .photo-card-img[data-photo-index="2"] { left: 8rem; top: 2rem; }
        .photo-card-img[data-photo-index="0"]:hover { transform: scale(1.03); z-index: 40; box-shadow: 0 20px 40px rgba(0,0,0,0.25); }
        .photo-card-img[data-photo-index="1"]:hover { transform: scale(1.03); z-index: 40; box-shadow: 0 20px 40px rgba(0,0,0,0.25); }
        .photo-card-img[data-photo-index="2"]:hover { transform: scale(1.03); z-index: 40; box-shadow: 0 20px 40px rgba(0,0,0,0.25); }
      \`}</style>
      */}
    </>
  );
}
