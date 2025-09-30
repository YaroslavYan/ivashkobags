"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // якщо є хеш (#checkout-form) – не скролимо на верх
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        // гарантуємо, що DOM змонтувався перед скролом
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "auto", block: "start" });
        });
      }
      return;
    }

    // інакше завжди на верх

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
