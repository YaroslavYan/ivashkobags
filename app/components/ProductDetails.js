import AddToCartButton from "./AddToCartButton";
import ProductImageSlider from "./ProductImageSlider";
import RevealOnScroll from "./RevealOnScroll";

export default async function ProductDetails({ product, inCart }) {
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div data-reveal className="flex-1 from-left">
        <ProductImageSlider
          images={product.productImages.map((img) => img.path)}
        />
      </div>

      <div
        data-reveal
        className="flex-1 flex flex-col gap-4 from-right items-center "
      >
        <h1 className="text-2xl font-bold text-[#111]">{product?.title}</h1>
        <p className="text-xl font-semibold text-[#111]">
          {product?.price} грн
        </p>
        {/* <button className="w-80 p-4 bg-[#111] text-white  rounded hover:bg-gray-500 cursor-pointer transition duration-300 ease-in-out">
          ДОДАТИ В КОШИК
        </button> */}
        <AddToCartButton
          id={product.id}
          variant="productCard"
          inCart={inCart}
        />

        <div className="mt-6 w-80">
          <h2 className="pb-3 text-lg font-semibold mb-2 text-[#111]">
            ХАРАКТЕРИСТИКИ:
          </h2>
          <span className="block border-b border-black w-full"></span>
          <ul className="space-y-1 text-gray-700">
            <li className="pt-3 pb-3">ВИСОТА: {product.height}</li>
            <span className="block border-b border-black w-full"></span>
            <li className="pt-3 pb-3">ШИРИНА: {product.width}</li>
            <span className="block border-b border-black w-full"></span>
            <li className="pt-3 pb-3">ГЛИБИНА: {product.depth}</li>
            <span className="block border-b border-black w-full"></span>
            <li className="pt-3">МАТЕРІАЛ: {product.material}</li>
          </ul>
        </div>

        <div className="mt-6 w-80">
          <h2 className="pb-3 text-lg font-semibold mb-2">ОПИС ТОВАРУ:</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
      <RevealOnScroll />
    </div>
  );
}
