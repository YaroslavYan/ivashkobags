import { cookies } from "next/headers";
import CartDrawerServer from "../components/CartDrawerServer";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ScrollToTop from "../components/ScrollToTop";
import { CartProvider } from "../context/CartContext";
import { getCartCount } from "../_lib/data-service";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "../../i18n/routing";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const titles = {
    pl: "Sklep z torebkami | Ivashko",
    uk: "Магазин сумок | Ivashko",
    en: "Bag Store | Ivashko",
  };
  const descriptions = {
    pl: "Sklep internetowy z eleganckimi torebkami damskimi i męskimi z dostawą po Polsce.",
    uk: "Інтернет-магазин стильних жіночих і чоловічих сумок з доставкою по Польщі.",
    en: "Online store with stylish women's and men's bags with delivery across Poland.",
  };

  return {
    title: {
      default: titles[locale] ?? titles.pl,
      template: "%s | Ivashko",
    },
    description: descriptions[locale] ?? descriptions.pl,
    metadataBase: new URL("https://ivashko.pl"),
    alternates: {
      canonical: "/",
      languages: {
        pl: "/",
        uk: "/uk",
        en: "/en",
      },
    },
    openGraph: {
      title: "Ivashko",
      description: descriptions[locale] ?? descriptions.pl,
      url: "https://ivashko.pl",
      siteName: "Ivashko",
      locale: locale === "uk" ? "uk_UA" : locale === "en" ? "en_US" : "pl_PL",
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  const productsCartCount = await getCartCount({ sessionId });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <CartProvider>
        <ScrollToTop />
        <Hero productsCartCount={productsCartCount} />

        <div className="flex-1 px-0 md:px-8 py-12 grid">
          <main
            className="max-w-7xl mx-auto w-full"
            style={{ maxWidth: "1600px" }}
          >
            {children}
          </main>
        </div>

        <CartDrawerServer />
      </CartProvider>

      <Footer />
    </NextIntlClientProvider>
  );
}
