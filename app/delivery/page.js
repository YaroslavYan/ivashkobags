import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Оплата і доставка | Інтернет-магазин</title>
        <meta
          name="description"
          content="Інформація про оплату та доставку в нашому інтернет-магазині"
        />
      </Head>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Оплата і доставка
        </h1>

        <section className="bg-white shadow-md rounded-xl p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white bg-black p-2">
            🚚 Доставка
          </h2>
          <ul className="space-y-4 text-gray-700 leading-relaxed">
            <li className="border-l-4 border-blue-400 pl-4">
              <span className="font-semibold">Пошта по всій Польщі</span> —
              доставка за тарифами поштових служб.
            </li>
            <li className="border-l-4 border-green-400 pl-4">
              <span className="font-semibold">Безкоштовно у Вроцлаві</span> —
              узгодимо зручний час і місце вручення.
            </li>
          </ul>
        </section>

        <section className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-white bg-black p-2r">
            💳 Оплата
          </h2>
          <ul className="space-y-4 text-gray-700 leading-relaxed">
            <li className="border-l-4 border-purple-400 pl-4">
              <span className="font-semibold">Карткою через PayU</span> — швидко
              та безпечно.
            </li>
            <li className="border-l-4 border-yellow-400 pl-4">
              <span className="font-semibold">Готівкою при отриманні</span> —
              зручно для замовлень через пошту.
            </li>
            <li className="border-l-4 border-pink-400 pl-4">
              <span className="font-semibold">Оплата за реквізитами</span> —
              після оформлення замовлення надішлемо реквізити для оплати.
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
