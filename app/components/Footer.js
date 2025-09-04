import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-8 mt-24">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between gap-4 px-16">
        {/* Лого */}
        <div className="text-xl font-bold">IVASHKO</div>

        {/* Центр: соцмережі + телефон */}
        <div className="flex flex-col gap-3 ml-auto">
          {/* Іконки соцмереж */}
          <div className="flex gap-4 ml-auto">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="w-6 h-6 hover:text-gray-400 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="w-6 h-6 hover:text-gray-400 transition" />
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer">
              <FaTelegram className="w-6 h-6 hover:text-gray-400 transition" />
            </a>
          </div>

          {/* Телефон */}
          <a href="tel:+380970000000" className="text-sm">
            +38 (097) 00-00-00
          </a>
        </div>
      </div>

      {/* Лінія */}
      <div
        className="border-t  my-4 mt-[50px]"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      ></div>

      {/* Нижні посилання */}
      <div className="max-w-8xl mx-auto flex justify-end gap-6 text-sm mt-[50px] px-16">
        <Link href="/delivery" className="hover:text-gray-400 transition">
          Оплата та доставка
        </Link>
        <Link href="/privacy" className="hover:text-gray-400 transition">
          Політика конфіденційності
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
