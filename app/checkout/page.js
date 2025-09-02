"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
    payment: "card",
  });

  const [selectedPayment, setSelectedPayment] = useState("card");

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
        "Оплата готівкою кур'єру або у відділенні пошти при отриманні замовлення.",
    },
  ];

  const cartItems = [
    { id: 1, name: "Сумка W", price: 250, qty: 1 },
    { id: 2, name: "Сумка L", price: 480, qty: 1 },
    { id: 3, name: "Сумка D", price: 180, qty: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr] gap-8 p-8  min-h-screen">
      {/* Ліва частина — форма */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Оформлення замовлення</h2>
        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Ім'я та прізвище</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Введіть ваше ім'я"
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
          {cartItems.map((item) => (
            <li
              key={item.name}
              className="flex justify-between border-b pb-2 text-gray-700"
            >
              <div className="flex w-full justify-between pr-[30px]">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>{item.price * item.qty} грн</span>
              </div>

              <button className="text-red-400 cursor-pointer">
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4 text-lg font-semibold">
          <span>Всього:</span>
          <span>{total} грн</span>
        </div>
      </div>
    </div>
  );
}
