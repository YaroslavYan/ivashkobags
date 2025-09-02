import ProductImageSlider from "./ProductImageSlider";
import RevealOnScroll from "./RevealOnScroll";

export default async function ProductDetails({ product }) {
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div data-reveal className="flex-1 from-left">
        <ProductImageSlider
          images={product.productImages.map((img) => img.path)}
        />
      </div>

      <div data-reveal className="flex-1 flex flex-col gap-4 from-right">
        <h1 className="text-2xl font-bold">{product?.title}</h1>
        <p className="text-xl font-semibold">{product?.price} грн</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-40">
          Додати в кошик
        </button>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Характеристики:</h2>
          <ul className="space-y-1">
            <li>Висота: {product.height}</li>
            <li>Ширинра: {product.width}</li>
            <li>Глибина: {product.depth}</li>
            <li>Матеріал: {product.material}</li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Опис товару:</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
      <RevealOnScroll />
    </div>
  );
}
