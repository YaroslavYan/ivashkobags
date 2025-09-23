import { getCartItems } from "@/app/_lib/data-service";
import CartDrawer from "./CartDrawer";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CartDrawerServer() {
  // const products = await getProducts();
  const cookieStore = await cookies(); // це вже можна викликати синхронно в серверній компоненті
  const sessionId = cookieStore.get("sessionId")?.value;

  const products = await getCartItems({ sessionId });

  return <CartDrawer products={products} sessionId={sessionId} />;
}
