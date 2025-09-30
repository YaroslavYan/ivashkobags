import CartDrawerServer from "./components/CartDrawerServer";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

export const metadata = {
  title: {
    default: "Магазин сумок | Ivashko",
    template: "%s | Ivashko", // підставить назву сторінки
  },
  description:
    "Інтернет-магазин стильних жіночих і чоловічих сумок з доставкою по Україні.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Магазин сумок Ivashko",
    description: "Купуйте стильні сумки онлайн з доставкою.",
    url: "https://example.com",
    siteName: "Ivashko",
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f8f5f0] antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col">
        <CartProvider>
          {/* Скролити в верх при відкритті нової сторінки */}
          <ScrollToTop />
          <Hero />

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
      </body>
    </html>
  );
}
