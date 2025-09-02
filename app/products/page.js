import Link from "next/link";
import ProductCard from "../components/ProductCard";
import SidebarMenu from "../components/SidebarMenu";
import { addToCart, getProducts } from "../_lib/data-service";
import RevealOnScroll from "../components/RevealOnScroll";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="flex gap-8 px-8 py-12 w-full max-w-[1600px] mx-auto">
      {/* Сайдбар — показується тільки на md і вище */}
      <aside className="w-72 shrink-0 hidden md:block">
        <SidebarMenu />
      </aside>
      {/* Контейнер для товарів, що займає решту ширини */}
      <section className="flex-1">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </section>
      <RevealOnScroll immediate />
      {/* client script, додає клас revealed на клієнті */}
    </div>
  );
}
