import { supabase } from "./supabase";

export async function getProducts({ isNewOnly = false } = {}) {
  let query = supabase.from("products").select(`
    *,
    productImages ( id, path, isPrimary, position )
  `);
  // const { data, error } = await supabase.from("products").select("*");

  if (isNewOnly) {
    query = query.eq("isNew", true).limit(3); // фільтруємо і обмежуємо
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
  }

  return data;
}

// export async function getProducts({ categorySlug, isNewOnly = false } = {}) {
//   let query = supabase.from("products").select(`
//     *,
//     categories (slug)
//   `);

//   if (categorySlug && categorySlug !== "all") {
//     query = query.eq("categories.slug", categorySlug);
//   }

//   if (isNewOnly) {
//     query = query.eq("isNew", true).limit(3); // фільтруємо і обмежуємо
//   }

//   const { data, error } = await query;
//   if (error) throw error;
//   return data;
// }

// export async function getProductById(id) {
//   console.log("Одиничний id Товару", id);
//   const { data, error } = await supabase
//     .from("products")
//     .select(
//       `
//     *,
//     productImages ( id, path, isPrimary, position )
//   `
//     )
//     .eq("id", id)
//     .single(); // отримати лише один запис

//   if (error) {
//     console.error(error);
//     return null;
//   }

//   // Розпаковуємо масив об'єктів у масив рядків (шляхів до фото)
//   const images = data.productImages?.map((img) => img.path) || [];

//   // Повертаємо об'єкт з товаром + готовий масив images
//   console.log(data);
//   return {
//     ...data,
//     images,
//   };
// }

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

//////////////////////////////////////////

// export async function getProductById(id, locale = "pl") {
//   const { data, error } = await supabase
//     .from("products")
//     .select(
//       `
//       *,
//       productImages ( id, path, isPrimary, position ),
//       product_translations:product_translations!inner (
//         description,
//         size,
//         weight,
//         material,
//         meta_title,
//         meta_description,
//         locale
//       )
//     `
//     )
//     .eq("id", id)
//     .maybeSingle(); // якщо хочемо один запис

//   if (error) {
//     console.error(error);
//     return null;
//   }

//   console.log(data);
//   // Вибираємо переклад за потрібною мовою
//   let translated = {};
//   if (locale !== "pl" && data.product_translations?.length) {
//     const t = data.product_translations.find((tr) => tr.locale === locale);
//     if (t) {
//       translated = {
//         description: t.description ?? data.description,
//         size: t.size ?? data.size,
//         weight: t.weight ?? data.weight,
//         material: t.material ?? data.material,
//         metaTitle: t.meta_title ?? data.metaTitle,
//         metaDescription: t.meta_description ?? data.metaDescription,
//       };
//     }
//   }

//   // Розпаковуємо масив об'єктів у масив рядків (шляхів до фото)
//   const images = data?.productImages?.map((img) => img.path) || [];

//   console.log(data);

//   return {
//     ...data,
//     ...translated,
//     images,
//   };
// }

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
