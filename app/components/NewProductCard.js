import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function NewProductCard({ image, title, price, id, inCart }) {
  return (
    <div
      data-reveal
      className="relative from-down w-full max-w-full sm:max-w-[350px]"
    >
      <Link href={`/product/${id}`} key={id}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded"
        />
      </Link>
      <div className="flex -mt-[70px] pb-[10px] pl-[30px] flex w-full justify-between bg-white/80 absolute ">
        <div>
          <h3 className="mt-2 font-semibold">{title}</h3>
          <p className="text-gray-600 mt-1">{price} €</p>
        </div>

        <div className="flex justify-end">
          <AddToCartButton id={id} inCart={inCart} />
        </div>
      </div>
    </div>
  );
}
