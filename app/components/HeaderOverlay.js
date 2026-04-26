"use client";

import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import RevealOnScroll from "./RevealOnScroll";
import { useTranslations } from "next-intl";

export default function HeaderOverlay({ productsCartCount }) {
  const t = useTranslations("Hero");

  return (
    <header className="top-0 left-0 w-full h-full z-50 m-0 p-0 absolute">
      <div className="flex justify-between h-full mx-auto w-full m-0 p-0 relative">
        <Navigation productsCartCount={productsCartCount} />
        <MobileNavigation productsCartCount={productsCartCount} />

        <div className="absolute left-[20px] sm:left-[50px] bottom-[10%] sm:bottom-[15%] md:bottom-1/4 max-w-[75vw] sm:max-w-[60vw] md:max-w-[calc(100%-280px)]">
          <h1
            data-reveal
            className="text-white font-semibold tracking-tight leading-none text-xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 from-right"
          >
            {t("tagline")}
          </h1>
          <p
            data-reveal
            className="text-[#FEB83F] text-[11px] font-semibold tracking-[0.15em] uppercase from-left"
          >
            {t("subtitle")}
          </p>
        </div>

        <RevealOnScroll />
      </div>
    </header>
  );
}
