import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ image, title, price, id, inCart }) {
  return (
    <article
      data-reveal
      className="relative group from-left rounded-2xl overflow-hidden"
    >
      <Link href={`/product/${id}`}>
        <div className="aspect-[3/4] w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div className="absolute bottom-3 left-3 right-3">
        <div className="bg-white/75 backdrop-blur-md border border-white/60 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[13px] text-[#1d1d1f] truncate leading-snug">{title}</h3>
            <p className="text-[12px] font-semibold text-[#1d1d1f] mt-1">{price} €</p>
          </div>
          <AddToCartButton id={id} inCart={inCart} />
        </div>
      </div>
    </article>
  );
}
