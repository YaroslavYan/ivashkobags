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
