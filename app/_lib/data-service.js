import { supabase } from "./supabase";

export async function getProducts({
  page = 1,
  limit = 4,
  categorySlug = "",
  isNewOnly = false,
} = {}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select(`*, productImages(id, path, isPrimary, position), categories(*)`, {
      count: "exact",
    })
    .range(from, to);

  if (categorySlug && categorySlug !== "all") {
    // знаходимо categoryId
    const { data: catData, error: catError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();

    if (catError) {
      console.error(catError);
    } else if (catData?.id) {
      query = query.eq("categoryid", catData.id); // нижній регістр, як у твоїй БД
    }
  }

  if (isNewOnly) {
    query = query.eq("isNew", true).limit(4); // кількість новинок
  }

  const { data, error, count } = await query;
  if (error) console.error(error);

  return { products: data || [], total: count || 0 };
}

export async function getCartItems({ userId, sessionId }) {
  const filterKey = userId ? "userId" : "sessionId";
  const filterValue = userId ?? sessionId;

  if (!filterValue) return [];

  const { data, error } = await supabase
    .from("cartItems")
    .select(
      `
      id,
      quantity,
      productId,
      products (
        id,
        title,
        price,
        image
      )
    `
    )
    .eq(filterKey, filterValue);

  if (error) {
    console.error("Помилка при отриманні кошика:", error.message);
    return [];
  }

  return data;
}

export async function getProductById(id, locale = "pl") {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      productImages (id, path, isPrimary, position),
      product_translations:product_translations!product_id (
        description,
        size,
        weight,
        material,
        meta_title,
        meta_description,
        locale
      )
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  // Вибираємо переклад, якщо він є
  let translated = {};
  if (locale !== "pl" && data.product_translations?.length) {
    const t = data.product_translations.find((tr) => tr.locale === locale);
    if (t) {
      translated = {
        description: t.description ?? data.description,
        size: t.size ?? data.size,
        weight: t.weight ?? data.weight,
        material: t.material ?? data.material,
        metaTitle: t.meta_title ?? data.metaTitle,
        metaDescription: t.meta_description ?? data.metaDescription,
      };
    }
  }

  const images = data?.productImages?.map((img) => img.path) || [];

  return {
    ...data,
    ...translated,
    images,
  };
}

export async function getOrderById({ orderId, userId, sessionId }) {
  if (!orderId) return null;

  const filterKey = userId ? "userId" : "sessionId";
  const filterValue = userId ?? sessionId;

  if (!filterValue) return [];

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      userId,
      sessionId,
      totalAmount,
      contactName,
      contactPhone,
      contactAddress,
      paymentType,
      status,
      created_at,
      orderItems (
        id,
        quantity,
        price, 
        product: products (
          id,
          title,
          price
        )
      )
    `
    )
    .eq("id", orderId)
    // Перевірка власника: userId або sessionId
    .eq(filterKey, filterValue)
    .maybeSingle();

  if (error) {
    console.error("Помилка при отриманні замовлення:", error.message);
    return null;
  }

  return data;
}
