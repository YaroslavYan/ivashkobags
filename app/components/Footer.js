import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import logo from "../../public/logo.png";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-black text-white py-10 px-4 sm:px-8 mt-24">
      <div className="max-w-8xl mx-auto flex flex-row justify-between gap-4 px-0 sm:px-16">
        <div className="text-xl font-bold">
          <Link href="/" className="flex items-center gap-2 text-2xl font-semibold font-serif text-white">
            <Image src={logo} alt="IVASHKO Logo" width={200} height={50} />
          </Link>
        </div>

        <div className="flex flex-col gap-3 ml-auto">
          <div className="flex gap-4 ml-auto">
            <Link href="https://www.facebook.com/profile.php?id=61582651386669" target="_blank" rel="noreferrer">
              <FaFacebook className="w-6 h-6 hover:text-gray-400 transition" />
            </Link>
            <Link href="https://www.instagram.com/ivashko.store/" target="_blank" rel="noreferrer">
              <FaInstagram className="w-6 h-6 hover:text-gray-400 transition" />
            </Link>
            <Link href="https://t.me" target="_blank" rel="noreferrer">
              <FaTelegram className="w-6 h-6 hover:text-gray-400 transition" />
            </Link>
          </div>
          <Link href="tel:+48513285071" className="text-sm ml-auto hover:text-gray-400 transition">
            +48 513 285 071
          </Link>
          <Link href="mailto:ivashkobags@gmail.com" className="text-sm hover:text-gray-400 transition">
            ivashkobags@gmail.com
          </Link>
        </div>
      </div>

      <div className="border-t my-4 mt-[50px]" style={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <div className="max-w-8xl mx-auto flex justify-end gap-6 text-sm mt-[50px] px-0 sm:px-16">
        <Link href="/delivery" className="hover:text-gray-400 transition">
          {t("delivery")}
        </Link>
        <Link href="/privacy" className="hover:text-gray-400 transition">
          {t("privacy")}
        </Link>
      </div>
    </footer>
  );
}
