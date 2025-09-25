import { getOrderById } from "@/app/_lib/data-service";
import { cookies } from "next/headers";
import Link from "next/link";
// import { supabase } from "@/app/_lib/supabase"; // або де в тебе серверний supabase client

export const metadata = {
  robots: { index: false, follow: false }, // noindex
};

export default async function OrderPage({ params }) {
  const { id: orderId } = await params;

  const cookieStore = await cookies(); // це вже можна викликати синхронно в серверній компоненті
  const sessionId = cookieStore.get("sessionId")?.value;

  const order = await getOrderById({ orderId, sessionId });

  if (!orderId) {
    return <p>Невірний номер замовлення.</p>;
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="max-w-xl w-full bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Замовлення не знайдено</h1>
          <Link href="/">На головну</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-[#171717]">
          Дякуємо за ваше замовлення!
        </h1>

        {/* <p className="mb-2">
          Номер замовлення: <strong>{order.id}</strong>
        </p> */}
        <p className="mb-4 text-[#171717]">
          Імя: <strong>{order.contactName}</strong>
        </p>
        <p className="mb-4 text-[#171717]">
          Телефон: <strong>{order.contactPhone}</strong>
        </p>
        <p className="mb-4 text-[#171717]">
          Статус:
          <strong className="inline-block bg-yellow-500 text-white px-3 py-1 rounded ml-1">
            {order.status}
          </strong>
        </p>

        <h2 className="font-semibold mt-4 mb-2 text-[#171717]">Товари</h2>
        <ul className="mb-4 space-y-2 text-[#171717]">
          {order.orderItems?.map((it) => (
            <li key={it.id} className="flex justify-between">
              <span>{it.product.title} × 1</span>
              <span>{it.product.price} грн</span>
            </li>
          ))}
        </ul>
        <p className="mb-4 text-[#171717]">
          Загальна сума: <strong>{order.totalAmount} грн</strong>
        </p>

        <div className="flex gap-3 text-[#171717]">
          <Link href="/" className="px-4 py-2 bg-gray-200 rounded">
            На головну
          </Link>
          {/* <Link
            href="/orders"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Мої замовлення
          </Link> */}
        </div>
      </div>
    </div>
  );
}
