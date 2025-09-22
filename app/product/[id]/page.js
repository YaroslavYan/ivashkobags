import { getCartItems, getProductById } from "@/app/_lib/data-service";
import ProductDetails from "@/app/components/ProductDetails";
import { cookies } from "next/headers";

export default async function ProductDetailsWrapper({ params }) {
  const { id } = await params; // отримуємо id з URL
  // отримання даних продукту, наприклад з API
  const product = await getProductById(id);

  const cookieStore = await cookies(); // це вже можна викликати синхронно в серверній компоненті
  const sessionId = cookieStore.get("sessionId")?.value;

  const productsCart = await getCartItems({ sessionId });

  if (!product) {
    return <p>Товар не знайдено</p>;
  }
  // визначаємо чи продукт у кошику
  const inCart = productsCart.some((item) => item.products.id === product.id);

  return <ProductDetails product={product} inCart={inCart} />;
}
