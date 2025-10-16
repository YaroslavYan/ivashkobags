import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ image, title, price, id, inCart }) {
  return (
    <article
      data-reveal
      className="relative bg-white rounded overflow-hidden shadow-md from-left"
    >
      <Link href={`/product/${id}`}>
        <div className="aspect-[4/5] w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </div>
      </Link>

      <div className="absolute bottom-0 left-0 w-full bg-white/80 px-4 py-2 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-base text-[#171717]">{title}</h3>
          <p className="text-gray-600 text-sm">{price} €</p>
        </div>
        <AddToCartButton id={id} inCart={inCart} />
      </div>
    </article>
  );
}
