"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { addOrderAction, removeFromCartAction } from "../_lib/actions";
import { useRouter } from "next/navigation";

export default function CheckoutPageClient({
  initialCartItems = [],
  sessionId,
}) {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
    payment: "card",
  });
  const [selectedPayment, setSelectedPayment] = useState("card");
  const router = useRouter();

  const total = cartItems.reduce(
    (s, it) =>
      s + (it.quantity ?? it.qty ?? 1) * (it.products?.price ?? it.price ?? 0),
    0
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Кошик порожній");
      return;
    }

    try {
      const res = await addOrderAction({
        userId: null,
        sessionId,
        cartItems,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        comment: formData.comment,
        payment: selectedPayment,
        total, // можна передати або не передавати
      });

      // успіх — очистити UI і перейти на сторінку підтвердження
      setCartItems([]);
      router.push(`/orders/${res.orderId}`);
    } catch (err) {
      console.error("Order error:", err);
      alert("Сталася помилка при створенні замовлення");
    }
  }

  const paymentMethods = [
    {
      name: "card",
      label: "Кредитна картка",
      description:
        "Оплата карткою Visa/MasterCard через захищену платіжну систему.",
    },
    {
      name: "bank",
      label: "Банківський переказ",
      description:
        "Переказ на наш рахунок. Деталі будуть надіслані після оформлення замовлення.",
    },
    {
      name: "cash",
      label: "Готівка при отриманні",
      description:
        "Оплата готівкою кур&apos;єру або у відділенні пошти при отриманні замовлення.",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr] gap-8 p-8  min-h-screen">
      {/* Ліва частина — форма */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Оформлення замовлення</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-semibold">
              Ім&apos;я та прізвище
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Введіть ваше ім&#39;я"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Телефон</label>
            <input
              type="tel"
              className="w-full p-3 border rounded-lg"
              placeholder="+380..."
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Адреса доставки</label>
            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Місто, вулиця, будинок, квартира"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">
              Коментар до замовлення
            </label>
            <textarea
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Додаткова інформація..."
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />
          </div>

          {paymentMethods.map((option, index) => (
            <div key={option.name} className="border-b last:border-b-0">
              <label className="flex items-center gap-3 p-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value={option.name}
                  checked={selectedPayment === option.name}
                  onChange={() => setSelectedPayment(option.name)}
                  className="w-5 h-5 accent-blue-500"
                />
                <span className="font-semibold">{option.label}</span>
              </label>

              <div
                className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${
                  selectedPayment === option.name ? "max-h-40 py-2" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Підтвердити замовлення
          </button>
        </form>
      </div>

      {/* Права частина — кошик */}
      <div className="bg-gray-100 p-6 rounded-lg h-fit sticky top-8">
        <h3 className="text-xl font-bold mb-4">Ваше замовлення</h3>
        <ul className="space-y-4">
          {cartItems.map((it) => {
            const id = it.products?.id ?? it.id;
            const title = it.products?.title ?? it.name;
            const price = it.products?.price ?? it.price;
            const qty = it.quantity ?? it.qty ?? 1;
            return (
              <li
                key={id}
                className="flex justify-between border-b pb-2 text-gray-700"
              >
                <div className="flex w-full justify-between pr-[30px]">
                  <span>
                    {title} x {qty}
                  </span>
                  <span>{price * qty} грн</span>
                </div>
                <button
                  className="text-red-400 cursor-pointer"
                  onClick={() => removeProduct(id)}
                >
                  <FaTrash />
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-between mt-4 text-lg font-semibold">
          <span>Всього:</span>
          <span>{total} грн</span>
        </div>
      </div>
    </div>
  );
}
