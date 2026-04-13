import { getTranslations } from "next-intl/server";
import AddToCartButton from "./AddToCartButton";
import ProductImageSlider from "./ProductImageSlider";
import RevealOnScroll from "./RevealOnScroll";

export default async function ProductDetails({ product, inCart }) {
  const t = await getTranslations("ProductPage");

  const specs = [
    { label: t("height"), value: `${product.height} см` },
    { label: t("width"), value: `${product.width} см` },
    { label: t("depth"), value: `${product.depth} см` },
    { label: t("material"), value: product.material },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Галерея */}
          <div data-reveal className="lg:w-[55%] from-left">
            <ProductImageSlider
              images={product.productImages.map((img) => img.path)}
            />
          </div>

          {/* Інфо */}
          <div data-reveal className="lg:w-[45%] flex flex-col gap-6 from-right pt-2">

            {/* Назва + ціна */}
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#111", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                {product?.title}
              </h1>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111" }}>
                  {product?.price}
                </span>
                <span style={{ fontSize: "1rem", color: "#555" }}>{t("currency")}</span>
              </div>
            </div>

            {/* Розділювач */}
            <div style={{ height: 1, background: "#e5e7eb" }} />

            {/* Кнопка */}
            <AddToCartButton id={product.id} variant="productCard" inCart={inCart} />

            {/* Характеристики */}
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", color: "#888", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                {t("specs")}
              </p>
              <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                {specs.map(({ label, value }, i) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1.5rem",
                      padding: "0.75rem 1rem",
                      background: i % 2 === 0 ? "#fff" : "#faf9f7",
                      borderBottom: i < specs.length - 1 ? "1px solid #e5e7eb" : "none",
                    }}
                  >
                    <span style={{ fontSize: "0.875rem", color: "#555", flexShrink: 0 }}>{label}</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111", textAlign: "right" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Опис */}
            {product.description && (
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", color: "#888", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  {t("description")}
                </p>
                <p style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.7 }}>
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <RevealOnScroll />
    </div>
  );
}
