import ProductCard from "../components/ProductCard";
import SidebarMenu from "./SidebarMenu";
import { getCartItems, getProducts } from "../_lib/data-service";
import RevealOnScroll from "../components/RevealOnScroll";
import PaginationClient from "./PaginationClient";
import { cookies } from "next/headers";

export const metadata = {
  title: "Guest area",
};

export default async function Page(props) {
  const searchParams = await props.searchParams;

  const cookieStore = await cookies(); // це вже можна викликати синхронно в серверній компоненті
  const sessionId = cookieStore.get("sessionId")?.value;

  const productsCart = await getCartItems({ sessionId });

  let page = 1;
  if (searchParams?.page) {
    const p = searchParams.page;
    page = Array.isArray(p) ? Number(p[0]) || 1 : Number(p) || 1;
  }

  let categorySlug = "";
  if (searchParams?.category) {
    const c = searchParams.category;
    categorySlug = Array.isArray(c) ? c[0] : c;
  }

  const limit = 3;
  const { products = [], total = 0 } = await getProducts({
    page,
    limit,
    categorySlug,
  });

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="flex gap-8 px-8 py-12 w-full max-w-[1600px] mx-auto">
      <aside className="w-72 shrink-0 hidden md:block">
        <SidebarMenu />
      </aside>

      <section className="flex-1">
        <div key={page} className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Товари не знайдені для цієї сторінки.
            </div>
          ) : (
            products.map((product) => {
              const inCart = productsCart.some(
                (item) => item.products.id === product.id
              );

              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={
                    product.image ||
                    (product.productImages && product.productImages[0]?.path) ||
                    "/placeholder.jpg"
                  }
                  title={product.title}
                  price={product.price}
                  inCart={inCart} //  сюди передаємо результат перевірки
                />
              );
            })
          )}
        </div>

        <PaginationClient
          page={page}
          totalPages={totalPages}
          categorySlug={categorySlug}
        />
      </section>

      <RevealOnScroll immediate page={page} categorySlug={categorySlug} />
    </div>
  );
}

// import Link from "next/link";
// import ProductCard from "../components/ProductCard";
// import SidebarMenu from "../components/SidebarMenu";
// import { addToCart, getProducts } from "../_lib/data-service";
// import RevealOnScroll from "../components/RevealOnScroll";

// export const metadata = {
//   title: "Guest area",
// };

// export default async function Page() {
//   const products = await getProducts();

//   return (
//     <div className="flex gap-8 px-8 py-12 w-full max-w-[1600px] mx-auto">
//       {/* Сайдбар — показується тільки на md і вище */}
//       <aside className="w-72 shrink-0 hidden md:block">
//         <SidebarMenu />
//       </aside>
//       {/* Контейнер для товарів, що займає решту ширини */}
//       <section className="flex-1">
//         <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <ProductCard
//               key={product.id}
//               id={product.id}
//               image={product.image}
//               title={product.title}
//               price={product.price}
//             />
//           ))}
//         </div>
//       </section>
//       <RevealOnScroll immediate />
//       {/* client script, додає клас revealed на клієнті */}
//     </div>
//   );
// }
