"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import RevealOnScroll from "./RevealOnScroll";

export default function PhotoCard() {
  const t = useTranslations("PhotoCard");
  const images = ["w2.jpg", "s2.webp", "s3.webp"];

  return (
    <>
      <section className="bg-[#faf9f7] py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">

          {/* Header */}
          <div data-reveal className="from-up text-center mb-10 sm:mb-14">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-[#FEB83F] uppercase mb-3">
              {t("title")}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111] leading-tight">
              {t("heading")}
            </h2>
          </div>

          {/* Body */}
          <div className="flex flex-col md:flex-row gap-10 lg:gap-12 items-center">

            {/* Photo grid */}
            <div
              data-reveal
              className="from-left w-full md:flex-1 grid grid-cols-2 gap-3"
            >
              {/* Large photo — spans 2 rows */}
              <div className="row-span-2 overflow-hidden rounded-2xl photo-grid-item">
                <img
                  src={images[0]}
                  alt="photo 1"
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Top-right */}
              <div className="overflow-hidden rounded-2xl photo-grid-item aspect-square">
                <img
                  src={images[1]}
                  alt="photo 2"
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Bottom-right */}
              <div className="overflow-hidden rounded-2xl photo-grid-item aspect-square relative">
                <img
                  src={images[2]}
                  alt="photo 3"
                  className="w-full h-full object-cover block"
                />
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/55 backdrop-blur-sm rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 text-[#FEB83F] text-[10px] sm:text-xs font-semibold tracking-wide">
                  Handmade ✦
                </div>
              </div>
            </div>

            {/* Text block */}
            <div
              data-reveal
              className="from-right w-full md:flex-1 flex flex-col gap-6"
            >
              <p className="text-sm sm:text-base text-[#555] leading-relaxed">
                {t("text")}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 sm:gap-8">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-[#111] leading-none">100%</p>
                  <p className="text-xs text-[#888] mt-1">{t("factEco")}</p>
                </div>
                <div className="w-px self-stretch bg-[#e5e7eb]" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-[#111] leading-none">↻</p>
                  <p className="text-xs text-[#888] mt-1">{t("factHandmade")}</p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 self-start bg-[#111] hover:bg-[#FEB83F] text-white text-sm font-semibold tracking-wide px-6 py-3 rounded-lg transition-colors duration-200"
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
        }
        .photo-grid-item:hover {
          transform: scale(1.03);
          box-shadow: 0 24px 48px rgba(0,0,0,0.18);
          z-index: 2;
        }
        .photo-grid-item:hover img {
          transform: scale(1.06);
        }
        .photo-grid-item img {
          transition: transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </>
  );
}
