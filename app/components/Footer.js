import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import logo from "../../public/logo.png";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Main */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-2 md:flex md:flex-row md:items-start justify-between gap-10 md:gap-12">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image src={logo} alt="IVASHKO Logo" width={160} height={40} className="opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-[#86868b] text-sm max-w-[240px] leading-relaxed">
              Сумки з душею. Друге життя одягу — перше кохання до стилю.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold tracking-[0.15em] text-[#86868b] uppercase mb-1">
              Навігація
            </p>
            <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">Головна</Link>
            <Link href="/products" className="text-sm text-white/80 hover:text-white transition-colors">Каталог</Link>
            <Link href="/blog" className="text-sm text-white/80 hover:text-white transition-colors">Блог</Link>
            <Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors">Про нас</Link>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold tracking-[0.15em] text-[#86868b] uppercase mb-1">
              Інформація
            </p>
            <Link href="/delivery" className="text-sm text-white/80 hover:text-white transition-colors">
              {t("delivery")}
            </Link>
            <Link href="/privacy" className="text-sm text-white/80 hover:text-white transition-colors">
              {t("privacy")}
            </Link>
          </div>

          {/* Contacts + social */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold tracking-[0.15em] text-[#86868b] uppercase mb-1">
              Контакти
            </p>
            <Link href="tel:+48513285071" className="text-sm text-white/80 hover:text-white transition-colors">
              +48 513 285 071
            </Link>
            <Link href="mailto:ivashkobags@gmail.com" className="text-sm text-white/80 hover:text-white transition-colors">
              ivashkobags@gmail.com
            </Link>

            <div className="flex gap-4 mt-3">
              <Link href="https://www.facebook.com/profile.php?id=61582651386669" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaFacebook size={15} />
              </Link>
              <Link href="https://www.instagram.com/ivashko.store/" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaInstagram size={15} />
              </Link>
              <Link href="https://t.me" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaTelegram size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#86868b] text-xs">
            © {new Date().getFullYear()} Ivashko. Всі права захищені.
          </p>
          <p className="text-[#86868b] text-xs">
            Handmade in Poland ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
