"use server";

import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function addToCartAction(productId, userId, sessionId) {
  const { error } = await supabase.from("cartItems").insert({
    productId,
    userId: userId || null,
    sessionId: userId ? null : sessionId,
    sessionId,
    quantity: 1,
  });

  if (error) {
    console.error("Помилка при додаванні в кошик:", error);
    throw new Error("Не вдалося додати товар до кошика");
  }

  revalidatePath("/cart"); // якщо потрібно оновити сторінку кошика
}

export async function removeFromCartAction({ productId, userId, sessionId }) {
  const matchData = { productId };

  if (userId) {
    matchData.userId = userId;
  } else if (sessionId) {
    matchData.sessionId = sessionId;
  }

  const { error } = await supabase.from("cartItems").delete().match(matchData);

  if (error) {
    console.error("Помилка при видаленні з кошика:", error);
    throw new Error("Не вдалося видалити товар з кошика");
  }

  revalidatePath("/cart");
}

// Додавання замовлення
export async function addOrderAction({
  userId = null,
  sessionId = null,
  cartItems = [],
  name,
  phone,
  address,
  comment,
  payment,
  total = null,
}) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  // Якщо total не передали — порахуємо
  const computedTotal =
    total ??
    cartItems.reduce(
      (sum, item) =>
        sum + (item.quantity ?? 1) * (item.products?.price ?? item.price ?? 0),
      0
    );

  // 1) створюємо запис в orders
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        userId: userId,
        sessionId: userId ? null : sessionId,
        contactName: name,
        contactPhone: phone,
        contactAddress: address,
        comment,
        paymentType: payment,
        totalAmount: computedTotal,
        status: "Обробляється",
      },
    ])
    .select()
    .single();

  if (orderError) {
    console.error("Order insert error:", orderError);
    throw new Error("Не вдалося створити замовлення");
  }

  // 2) підготуємо items для вставки в order_items
  const itemsToInsert = cartItems.map((item) => ({
    orderId: order.id,
    productId: item.products?.id ?? item.productId ?? null,
    price: item.products?.price ?? item.price ?? 0,
    quantity: item.quantity ?? 1,
  }));

  const { error: itemsError } = await supabase
    .from("orderItems")
    .insert(itemsToInsert);

  if (itemsError) {
    console.error("Order items insert error:", itemsError);
    // Можна додати rollback якщо потрібно (але простий supabase client не має транзакцій тут)
    throw new Error("Не вдалося додати товари до замовлення");
  }

  // 3) очистити cartItems (якщо в масиві є id рядків корзини)
  const cartIds = cartItems.map((c) => c.id).filter(Boolean);
  if (cartIds.length) {
    const { error: delError } = await supabase
      .from("cartItems")
      .delete()
      .in("id", cartIds);
    if (delError) {
      console.error("Failed to clear cart items:", delError);
      // не кидаємо помилку обов'язково — замовлення вже створено
    }
  }

  // 4) ревайдейт кешу / сторінок
  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/orders");

  return { orderId: order.id };
}
