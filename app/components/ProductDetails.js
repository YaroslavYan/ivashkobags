import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import AddToCartButton from "./AddToCartButton";
import ProductImageSlider from "./ProductImageSlider";
import RevealOnScroll from "./RevealOnScroll";

export default async function ProductDetails({ product, inCart, related = [] }) {
  const t = await getTranslations("ProductPage");

  const specs = [
    { label: t("height"), value: `${product.height} см` },
    { label: t("width"), value: `${product.width} см` },
    { label: t("depth"), value: `${product.depth} см` },
    { label: t("material"), value: product.material },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-14">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[13px] text-[#86868b] mb-8">
          <Link href="/" className="hover:text-[#1d1d1f] transition-colors">Головна</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#1d1d1f] transition-colors">Каталог</Link>
          {product.categories?.name && (
            <>
              <span>/</span>
              <Link
                href={`/products?category=${product.categories.slug}`}
                className="hover:text-[#1d1d1f] transition-colors"
              >
                {product.categories.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#1d1d1f] font-medium truncate max-w-[160px]">{product.title}</span>
        </nav>

        {/* Main */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Gallery */}
          <div data-reveal className="lg:w-[55%] from-left">
            <ProductImageSlider images={product.productImages.map((img) => img.path)} />
          </div>

          {/* Info */}
          <div data-reveal className="lg:w-[45%] flex flex-col gap-6 from-right pt-2">

            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] text-[#FEB83F] uppercase mb-3">
                Ivashko
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] leading-tight mb-3">
                {product.title}
              </h1>
              <p className="text-2xl font-semibold text-[#1d1d1f]">
                {product.price} €
              </p>
            </div>

            <div className="h-px bg-[#e5e7eb]" />

            <AddToCartButton id={product.id} variant="productCard" inCart={inCart} />

            {/* Specs */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.12em] text-[#86868b] uppercase mb-3">
                {t("specs")}
              </p>
              <div className="rounded-2xl overflow-hidden border border-[#e5e7eb]">
                {specs.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className={`flex justify-between items-center gap-6 px-4 py-3 text-sm
                      ${i < specs.length - 1 ? "border-b border-[#e5e7eb]" : ""}
                      ${i % 2 === 0 ? "bg-white" : "bg-[#faf9f7]"}`}
                  >
                    <span className="text-[#86868b]">{label}</span>
                    <span className="font-semibold text-[#1d1d1f] text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] text-[#86868b] uppercase mb-3">
                  {t("description")}
                </p>
                <p className="text-sm text-[#555] leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* You might also like */}
        {related.length > 0 && (
          <div className="mt-20 sm:mt-24">
            <div className="mb-8">
              <p className="text-[11px] font-semibold tracking-[0.15em] text-[#FEB83F] uppercase mb-2">
                Ivashko
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                Може зацікавити
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="group relative block"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl">
                    <img
                      src={p.image || p.productImages?.[0]?.path || "/placeholder.jpg"}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/75 backdrop-blur-md border border-white/60 rounded-xl px-3 py-2.5">
                      <p className="font-semibold text-[12px] text-[#1d1d1f] truncate">{p.title}</p>
                      <p className="text-[11px] font-semibold text-[#1d1d1f] mt-0.5">{p.price} €</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <RevealOnScroll />
    </div>
  );
}
