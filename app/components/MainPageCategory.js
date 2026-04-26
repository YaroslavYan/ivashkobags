"use client";

import { useTranslations } from "next-intl";
import RevealOnScroll from "./RevealOnScroll";
import SidebarMenu from "./SidebarMenu";

export default function MainPageCategory() {
  const t = useTranslations("MainCategory");

  return (
    <div className="container mx-auto px-6 py-20 sm:py-24 flex flex-col md:flex-row md:items-center gap-12">

      {/* Left */}
      <div data-reveal className="from-left flex-1 flex flex-col gap-8">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.15em] text-[#FEB83F] uppercase mb-3">
            Ivashko
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
            {t("title")}
          </h2>
        </div>

        <ul className="space-y-5">
          <li className="border-l-4 border-[#FEB83F] pl-4">
            <p className="text-[14px] font-semibold text-[#1d1d1f]">{t("toteTitle")}</p>
            <p className="text-[13px] text-[#86868b] mt-0.5 leading-relaxed">{t("toteDesc")}</p>
          </li>
          <li className="border-l-4 border-[#FEB83F] pl-4">
            <p className="text-[14px] font-semibold text-[#1d1d1f]">{t("shopperTitle")}</p>
            <p className="text-[13px] text-[#86868b] mt-0.5 leading-relaxed">{t("shopperDesc")}</p>
          </li>
          <li className="border-l-4 border-[#FEB83F] pl-4">
            <p className="text-[14px] font-semibold text-[#1d1d1f]">{t("miniTitle")}</p>
            <p className="text-[13px] text-[#86868b] mt-0.5 leading-relaxed">{t("miniDesc")}</p>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div data-reveal className="from-right flex-1">
        <SidebarMenu variant="main" />
      </div>

      <RevealOnScroll />
    </div>
  );
}
