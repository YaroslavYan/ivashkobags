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

        <div className="absolute left-[50px] bottom-1/4">
          <h1
            data-reveal
            className="text-white font-bold text-xl md:text-2xl lg:text-3xl [@media(max-width:360px)]:text-sm from-right"
          >
            {t("tagline")}
          </h1>
          <p
            data-reveal
            className="text-[#FEB83F] text-sm md:text-base lg:text-lg [@media(max-width:360px)]:text-xs from-left"
          >
            {t("subtitle")}
          </p>
        </div>

        <RevealOnScroll />
      </div>
    </header>
  );
}
