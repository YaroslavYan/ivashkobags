import Link from "next/link";
import NewProductCard from "./NewProductCard";
import { getProducts } from "../_lib/data-service";
import RevealOnScroll from "./RevealOnScroll";

export default async function NewArrivals() {
  const { products } = await getProducts({ isNewOnly: true });

  return (
    <section className="my-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3 pb-8 ">
        <h2 className="text-2xl font-bold mb-4 text-center">Рекомендоване</h2>
        <span className=" h-[22px] border-l-2 w-[1px] border-dotted border-[#0f0f0f]"></span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id}>
            <NewProductCard
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          </div>
        ))}
      </div>
      <RevealOnScroll />
    </section>
  );
}
