import { getTranslations } from "next-intl/server";
import RevealOnScroll from "../../components/RevealOnScroll";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("pageTitle") };
}

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <section className="px-4 md:px-12 lg:px-24 py-20 bg-[#faf9f7] text-[#171717]">
      {/* Hero */}
      <div data-reveal className="from-up max-w-5xl mx-auto text-center space-y-6 mb-24">
        <h1 className="text-5xl md:text-6xl font-semibold font-serif tracking-tight text-[#111]">
          {t("pageTitle")}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Block 1: photo + text */}
      <div data-reveal className="max-w-6xl mx-auto mb-28 space-y-10 from-up">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <img
            src="/27.jpg"
            alt={t("pageTitle")}
            className="w-full h-[400px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 data-reveal className="text-3xl md:text-4xl font-medium text-[#171717] from-up">
            {t("workshopTitle")}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-l-[#FEB83F] border-r-4 border-r-[#FEB83F] pl-1.5">
            {t("workshopText")}
          </p>
        </div>
      </div>

      {/* Block 2: materials */}
      <div className="max-w-6xl mx-auto mb-28 space-y-10">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <img
            src="/12.jpeg"
            alt={t("materialsTitle")}
            className="w-full h-[400px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-medium text-[#171717]">
            {t("materialsTitle")}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-l-[#FEB83F] border-r-4 border-r-[#FEB83F] pl-1.5">
            {t("materialsText")}
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="max-w-4xl mx-auto text-center mt-24">
        <p className="text-xl text-gray-600 italic">&ldquo;{t("quote")}&rdquo;</p>
      </div>

      <RevealOnScroll immediate />
    </section>
  );
}
