"use client";

import { usePathname } from "next/navigation";
import HeaderOverlay from "./HeaderOverlay";
import ImageBanner from "./ImageBanner";
import VideoBanner from "./VideoBanner";

export default function Hero({ productsCartCount }) {
  const pathName = usePathname();

  const isHome = pathName === "/";

  return (
    <section className="relative w-full">
      {/* Відео займає всю ширину з класом aspect-video */}

      {isHome ? <VideoBanner /> : <ImageBanner />}

      {/* Header як абсолютний оверлей зверху відео.
          inset-0 = top/right/bottom/left: 0, h-full буде рівною висоті відео */}
      <HeaderOverlay productsCartCount={productsCartCount} />
    </section>
  );
}
