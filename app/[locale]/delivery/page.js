import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Delivery" });
  return { title: t("pageTitle") };
}

export default async function DeliveryPage() {
  const t = await getTranslations("Delivery");

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        {t("pageTitle")}
      </h1>

      <section className="bg-white shadow-md rounded-xl p-8 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-white bg-black p-2">
          {t("deliveryTitle")}
        </h2>
        <ul className="space-y-4 text-gray-700 leading-relaxed">
          <li className="border-l-4 border-blue-400 pl-4">
            <span className="font-semibold">{t("deliveryItem1Label")}</span>{" "}
            — {t("deliveryItem1Text")}
          </li>
          <li className="border-l-4 border-green-400 pl-4">
            <span className="font-semibold">{t("deliveryItem2Label")}</span>{" "}
            — {t("deliveryItem2Text")}
          </li>
        </ul>
      </section>

      <section className="bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-white bg-black p-2">
          {t("paymentTitle")}
        </h2>
        <ul className="space-y-4 text-gray-700 leading-relaxed">
          <li className="border-l-4 border-purple-400 pl-4">
            <span className="font-semibold">{t("paymentItem1Label")}</span>{" "}
            — {t("paymentItem1Text")}
          </li>
          <li className="border-l-4 border-yellow-400 pl-4">
            <span className="font-semibold">{t("paymentItem2Label")}</span>{" "}
            — {t("paymentItem2Text")}
          </li>
          <li className="border-l-4 border-pink-400 pl-4">
            <span className="font-semibold">{t("paymentItem3Label")}</span>{" "}
            — {t("paymentItem3Text")}
          </li>
        </ul>
      </section>
    </main>
  );
}
