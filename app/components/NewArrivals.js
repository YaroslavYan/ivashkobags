import NewProductCard from "./NewProductCard";
import { getCartItems, getProducts } from "../_lib/data-service";
import RevealOnScroll from "./RevealOnScroll";
import { cookies } from "next/headers";

export default async function NewArrivals() {
  const { products } = await getProducts({ isNewOnly: true });

  const cookieStore = await cookies(); // це вже можна викликати синхронно в серверній компоненті
  const sessionId = cookieStore.get("sessionId")?.value;

  const productsCart = await getCartItems({ sessionId });

  return (
    <section className="my-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3 pb-8 ">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#171717]">
          Рекомендоване
        </h2>
        <span className=" h-[22px] border-l-2 w-[1px] border-dotted border-[#0f0f0f]"></span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-[10px] sm:px-0">
        {products.map((product) => {
          const inCart = productsCart.some(
            (item) => item.products.id === product.id
          );

          return (
            <NewProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              inCart={inCart} //  передаємо прапорець
            />
          );
        })}
      </div>
      <RevealOnScroll />
    </section>
  );
}
