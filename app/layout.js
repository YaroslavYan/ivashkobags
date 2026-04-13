import "./globals.css";
import { Poppins, Montserrat } from "next/font/google";
import { getLocale } from "next-intl/server";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
});

export default async function RootLayout({ children }) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${montserrat.variable}`}
    >
      <body className="bg-[#f8f5f0] antialiased text-primary-100 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
