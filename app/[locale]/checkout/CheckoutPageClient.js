"use client";

import { useState } from "react";
import { addOrderAction } from "../../_lib/actions";
import { useRouter } from "next/navigation";
import SpinnerMini from "../../components/SpinnerMini";
import { useTranslations } from "next-intl";

export default function CheckoutPageClient({ initialCartItems = [], sessionId }) {
  const t = useTranslations("Checkout");
  const [cartItems] = useState(initialCartItems);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", comment: "", payment: "card" });
  const [selectedPayment, setSelectedPayment] = useState("card");
  const router = useRouter();

  const total = cartItems.reduce(
    (s, it) => s + (it.quantity ?? it.qty ?? 1) * (it.products?.price ?? it.price ?? 0),
    0
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
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
        total,
      });
      router.push(`/orders/${res.orderId}`);
    } catch (err) {
      console.error("Order error:", err);
      alert("Сталася помилка при створенні замовлення");
      setLoading(false);
    }
  }

  const paymentMethods = [
    { name: "card", label: t("cardLabel"), description: t("cardDesc") },
    { name: "bank", label: t("bankLabel"), description: t("bankDesc") },
    { name: "cash", label: t("cashLabel"), description: t("cashDesc") },
  ];

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center flex-col p-8">
          <h2 className="text-gray-500 text-4xl">{t("emptyCart")}</h2>
          <p className="text-gray-500 text-2xl">{t("emptyCartSub")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr] gap-8 p-8 min-h-screen scroll-mt-24">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#171717]">{t("title")}</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 font-semibold">{t("nameLabel")}</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder={t("namePlaceholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">{t("phoneLabel")}</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder={t("phonePlaceholder")}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">{t("addressLabel")}</label>
                <input
                  className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder={t("addressPlaceholder")}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">{t("commentLabel")}</label>
                <textarea
                  className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder={t("commentPlaceholder")}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                />
              </div>

              {paymentMethods.map((option) => (
                <div key={option.name} className="border-b last:border-b-0">
                  <label className="flex items-center gap-3 p-4 cursor-pointer pl-0">
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
                  <div className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${selectedPayment === option.name ? "max-h-40 py-2" : "max-h-0"}`}>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </div>
              ))}

              <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                {loading ? <SpinnerMini /> : t("submitBtn")}
              </button>
            </form>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg h-fit sticky top-8">
            <h3 className="text-xl font-bold mb-4 text-[#171717]">{t("orderSummary")}</h3>
            <ul className="space-y-4">
              {cartItems.map((it) => {
                const id = it.products?.id ?? it.id;
                const image = it.products?.image ?? it.image;
                const title = it.products?.title ?? it.name;
                const price = it.products?.price ?? it.price;
                const qty = it.quantity ?? it.qty ?? 1;
                return (
                  <li key={id} className="flex justify-between border-b pb-2 text-gray-700">
                    <div className="flex w-full justify-between pr-[30px]">
                      <div className="flex items-center">
                        <img src={image} className="w-20" alt={title} />
                        <span className="ml-2.5">{title} x {qty}</span>
                      </div>
                      <span>{price * qty} zł</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between mt-4 text-lg font-semibold">
              <span>{t("total")}</span>
              <span>{total} zł</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
