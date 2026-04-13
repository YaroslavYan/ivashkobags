import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return { title: t("pageTitle") };
}

export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");

  const s2Items = t.raw("s2Items");
  const s3Items = t.raw("s3Items");
  const s5Items = t.raw("s5Items");
  const s7Items = t.raw("s7Items");

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-extrabold mb-10 text-center">
        {t("pageTitle")}
      </h1>

      <section className="space-y-6">
        <p>{t("intro")}</p>

        <h2 className="text-2xl font-bold text-black">{t("s1Title")}</h2>
        <p>{t("s1Text")}</p>

        <h2 className="text-2xl font-bold text-black">{t("s2Title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {s2Items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>

        <h2 className="text-2xl font-bold text-black">{t("s3Title")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {s3Items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>

        <h2 className="text-2xl font-bold text-black">{t("s4Title")}</h2>
        <p>{t("s4Text")}</p>

        <h2 className="text-2xl font-bold text-black">{t("s5Title")}</h2>
        <p>{t("s5Intro")}</p>
        <ul className="list-disc pl-6 space-y-1">
          {s5Items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>

        <h2 className="text-2xl font-bold text-black">{t("s6Title")}</h2>
        <p>{t("s6Text")}</p>

        <h2 className="text-2xl font-bold text-black">{t("s7Title")}</h2>
        <p>{t("s7Intro")}</p>
        <ul className="list-disc pl-6 space-y-1">
          {s7Items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>

        <p className="pt-6 text-sm text-gray-500">{t("updated")}</p>
      </section>
    </main>
  );
}
