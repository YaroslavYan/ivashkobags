"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <Link
        href="/"
        className="inline-block bg-black text-white px-6 py-3 text-lg hover:bg-gray-800 transition"
      >
        {t("back")}
      </Link>
    </main>
  );
}
