import { getCartItems, getProducts } from "../_lib/data-service";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import NewArrivalsSlider from "./NewArrivalsSlider";

export default async function NewArrivals() {
  const t = await getTranslations("NewArrivals");
  const { products } = await getProducts({ isNewOnly: true });

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  const productsCart = await getCartItems({ sessionId });

  const enriched = products.map((p) => ({
    ...p,
    inCart: productsCart.some((item) => item.products.id === p.id),
  }));

  return (
    <NewArrivalsSlider
      products={enriched}
      title={t("title")}
      seeAllLabel={t("seeAll")}
    />
  );
}
