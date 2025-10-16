import { getCartItems } from "../_lib/data-service";
import CheckoutPageClient from "./CheckoutPageClient";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies(); // це вже можна викликати синхронно в серверній компоненті
  const sessionId = cookieStore.get("sessionId")?.value;

  const products = await getCartItems({ sessionId });

  return (
    <CheckoutPageClient
      initialCartItems={products}
      sessionId={sessionId}
      id="checkout-form"
    />
  );
}
