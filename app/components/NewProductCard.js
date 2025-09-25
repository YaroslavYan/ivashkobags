import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function NewProductCard({ image, title, price, id, inCart }) {
  return (
    <div data-reveal className="from-down w-full max-w-full sm:max-w-[350px]">
      <Link href={`/product/${id}`} key={id}>
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover rounded"
        />
      </Link>

      {/* Карточка з текстом і кнопкою */}
      <div className="flex pb-[10px] pl-[30px] w-full justify-between bg-white/80 border-b border-gray-300">
        <div>
          <h3 className="mt-2 font-semibold text-[#171717]">{title}</h3>
          <p className="text-gray-600 mt-1">{price} €</p>
        </div>

        <div className="flex items-center justify-end pr-3">
          <AddToCartButton id={id} inCart={inCart} />
        </div>
      </div>
    </div>
  );
}
