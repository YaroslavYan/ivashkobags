import { getProductById } from "@/app/_lib/data-service";
import ProductDetails from "@/app/components/ProductDetails";

export default async function ProductDetailsWrapper({ params }) {
  const { id } = await params; // отримуємо id з URL
  // отримання даних продукту, наприклад з API
  const product = await getProductById(id);

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  return <ProductDetails product={product} />;
}
