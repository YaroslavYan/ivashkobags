"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { FaGlobe } from "react-icons/fa";

const languages = [
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "uk", label: "Українська", flag: "🇺🇦" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(nextLocale) {
    router.replace(pathname, { locale: nextLocale });
    setIsOpen(false);
  }

  const current = languages.find((l) => l.code === locale);

  return (
    <div className="relative flex justify-center" ref={ref}>
      {/* Кнопка — іконка планети */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: "#fff" }}
        className="flex items-center gap-2 hover:opacity-75 transition-opacity duration-200 cursor-pointer"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <FaGlobe
          size={18}
          style={{
            transform: isOpen ? "rotate(12deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "#FEB83F",
          }}
        >
          {current?.flag} {locale.toUpperCase()}
        </span>
      </button>

      {/* Випадаючий список — відкривається вліво */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "calc(100% + 10px)",
          zIndex: 100,
          backgroundColor: "#000",
          border: "1px solid rgba(255,255,255,0.2)",
          minWidth: "175px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          transition: "opacity 0.2s, transform 0.2s",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          transformOrigin: "top right",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Стрілка */}
        <div
          style={{
            position: "absolute",
            top: -6,
            right: 12,
            width: 12,
            height: 12,
            backgroundColor: "#000",
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            transform: "rotate(45deg)",
          }}
        />

        {languages.map(({ code, label, flag }) => {
          const isActive = locale === code;
          return (
            <button
              key={code}
              onClick={() => switchLocale(code)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                padding: "12px 16px",
                fontSize: "14px",
                textAlign: "left",
                cursor: "pointer",
                color: isActive ? "#FEB83F" : "#ffffff",
                fontWeight: isActive ? 600 : 400,
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.05)"
                  : "transparent",
                transition: "background-color 0.15s",
                border: "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span style={{ fontSize: "16px", color: "#fff" }}>{flag}</span>
              <span style={{ letterSpacing: "0.03em", color: "#fff" }}>
                {label}
              </span>
              {isActive && (
                <span
                  style={{
                    marginLeft: "auto",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#FEB83F",
                    flexShrink: 0,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
