"use client";

import { useTranslations } from "next-intl";
import RevealOnScroll from "./RevealOnScroll";
import SidebarMenu from "./SidebarMenu";

export default function MainPageCategory() {
  const t = useTranslations("MainCategory");

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8 mt-24">
      <div
        data-reveal
        className="flex-1 from-left flex flex-col justify-between h-[300px]"
      >
        {/* Верх */}
        <div className="flex flex-col items-center gap-3 pb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#171717]">
            {t("title")}
          </h2>
          <span className="h-[22px] border-l-2 w-[1px] border-dotted border-[#0f0f0f]"></span>
        </div>

        {/* Центр */}
        <div className="flex flex-1 items-center justify-center">
          <ul className="md:max-w-[400px] space-y-4 text-[#171717]">
            <li className="border-l-4 border-l-[#FEB83F] pl-1.5">
              <strong>{t("toteTitle")}</strong> — {t("toteDesc")}
            </li>
            <li className="border-l-4 border-l-[#FEB83F] pl-1.5">
              <strong>{t("shopperTitle")}</strong> — {t("shopperDesc")}
            </li>
            <li className="border-l-4 border-l-[#FEB83F] pl-1.5">
              <strong>{t("miniTitle")}</strong> — {t("miniDesc")}
            </li>
          </ul>
        </div>
      </div>

      <div
        data-reveal
        className="flex-1 justify-end flex flex-col gap-4 from-right"
      >
        <SidebarMenu variant="main" />
      </div>
      <RevealOnScroll />
    </div>
  );
}
