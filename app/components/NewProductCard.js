import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function NewProductCard({ image, title, price, id, inCart }) {
  return (
    <div
      className="group w-full max-w-full sm:max-w-[350px] block bg-white shadow-md overflow-visible
                    transition-shadow duration-700 ease-out hover:shadow-xl"
    >
      <Link href={`/product/${id}`}>
        <div className="block overflow-hidden ">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="relative flex pb-[10px] pl-[30px] w-full justify-between bg-white/80 border-b border-gray-300 ">
        <div className="flex-1">
          <h3 className="mt-2 font-semibold text-[#171717]">{title}</h3>
          <p className="text-gray-600 mt-1">{price} €</p>
        </div>

        <div className="flex items-center justify-end pr-3">
          <AddToCartButton id={id} inCart={inCart} />
        </div>

        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[gold] transition-all duration-500 group-hover:w-full z-10  " />
      </div>
    </div>
  );
}
