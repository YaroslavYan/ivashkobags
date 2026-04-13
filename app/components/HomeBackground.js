"use client";

import { usePathname } from "@/i18n/routing";

export default function HomeBackground() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <img
        src="/27.jpg"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          filter: "grayscale(100%)",
          opacity: 0.07,
        }}
      />
    </div>
  );
}
