import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4 sm:px-8 mt-24">
      <div className="max-w-8xl mx-auto flex flex-row justify-between gap-4 px-0 sm:px-16">
        {/* Лого */}
        <div className="text-xl font-bold">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-semibold font-serif text-white"
          >
            {/* IVASHKO */}
            {/* <img
              src="logo.png"
              className="md:w-[200px] sm:w-[180px] w-[150px]"
            /> */}
            <Image src={logo} alt="IVASHKO Logo" width={200} height={50} />
          </Link>
        </div>
        {/* Центр: соцмережі + телефон */}
        <div className="flex flex-col gap-3 ml-auto">
          {/* Іконки соцмереж */}
          <div className="flex gap-4 ml-auto">
            <Link
              href="https://www.facebook.com/profile.php?id=61582651386669&rdid=tgFOsNZgQyRVZc4s&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GnMy5cW8B%2F#"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook className="w-6 h-6 hover:text-gray-400 transition" />
            </Link>
            <Link
              href="https://www.instagram.com/ivashko.store/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="w-6 h-6 hover:text-gray-400 transition" />
            </Link>
            <Link href="https://t.me" target="_blank" rel="noreferrer">
              <FaTelegram className="w-6 h-6 hover:text-gray-400 transition" />
            </Link>
          </div>

          {/* Телефон */}
          <Link
            href="tel:+48513285071"
            className="text-sm ml-auto hover:text-gray-400 transition"
          >
            +48 513 285 071
          </Link>

          <Link
            href="mailto:ivashkobags@gmail.com"
            className="text-sm hover:text-gray-400 transition"
          >
            ivashkobags@gmail.com
          </Link>
        </div>
      </div>

      {/* Лінія */}
      <div
        className="border-t my-4 mt-[50px]"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      ></div>

      {/* Нижні посилання */}
      <div className="max-w-8xl mx-auto flex justify-end gap-6 text-sm mt-[50px] px-0 sm:px-16">
        <Link href="/delivery" className="hover:text-gray-400 transition">
          Płatność i dostawa
        </Link>
        <Link href="/privacy" className="hover:text-gray-400 transition">
          Polityka prywatności
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
