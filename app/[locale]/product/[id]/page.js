import { getCartItems, getProductById, getProducts } from "@/app/_lib/data-service";
import ProductDetails from "@/app/components/ProductDetails";
import { cookies } from "next/headers";

export default async function ProductDetailsWrapper({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!product) {
    return <p>Товар не знайдено</p>;
  }

  const [productsCart, { products: related }] = await Promise.all([
    getCartItems({ sessionId }),
    getProducts({ categorySlug: product.categories?.slug || "all", limit: 5 }),
  ]);

  const inCart = productsCart.some((item) => item.products.id === product.id);
  const relatedFiltered = related
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return <ProductDetails product={product} inCart={inCart} related={relatedFiltered} />;
}
