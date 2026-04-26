"use client";

import { useState } from "react";
import { addOrderAction } from "../../_lib/actions";
import { useRouter } from "next/navigation";
import SpinnerMini from "../../components/SpinnerMini";
import { useTranslations } from "next-intl";
import Link from "next/link";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white border border-[#d2d2d7] text-[#1d1d1f] text-sm placeholder:text-[#aeaeb2] focus:outline-none focus:border-[#1d1d1f] transition-colors";

export default function CheckoutPageClient({ initialCartItems = [], sessionId }) {
  const t = useTranslations("Checkout");
  const [cartItems] = useState(initialCartItems);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", comment: "" });
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
        userId: null, sessionId, cartItems,
        name: formData.name, phone: formData.phone,
        address: formData.address, comment: formData.comment,
        payment: selectedPayment, total,
      });
      router.push(`/orders/${res.orderId}`);
    } catch (err) {
      console.error("Order error:", err);
      alert("Сталася помилка при створенні замовлення");
      setLoading(false);
    }
  }

  const paymentMethods = [
    { name: "card", label: t("cardLabel"), description: t("cardDesc"), icon: "💳" },
    { name: "bank", label: t("bankLabel"), description: t("bankDesc"), icon: "🏦" },
    { name: "cash", label: t("cashLabel"), description: t("cashDesc"), icon: "💵" },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center text-2xl">🛍️</div>
        <h2 className="text-xl font-semibold text-[#1d1d1f]">{t("emptyCart")}</h2>
        <p className="text-sm text-[#86868b]">{t("emptyCartSub")}</p>
        <Link href="/products" className="mt-2 text-sm font-medium text-[#0071e3] hover:underline underline-offset-2">
          Перейти до каталогу &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12">
      {/* Page title */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.15em] text-[#86868b] uppercase mb-2">Ivashko</p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f]">{t("title")}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

        {/* ── Form ── */}
        <form className="space-y-6" onSubmit={handleSubmit} id="checkout-form">

          {/* Contact info */}
          <div className="bg-[#f5f5f7] rounded-2xl p-6 space-y-4">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-[#86868b] uppercase">Контактні дані</p>
            <div>
              <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">{t("nameLabel")}</label>
              <input type="text" className={inputClass} placeholder={t("namePlaceholder")}
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">{t("phoneLabel")}</label>
              <input type="tel" className={inputClass} placeholder={t("phonePlaceholder")}
                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-[#f5f5f7] rounded-2xl p-6 space-y-4">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-[#86868b] uppercase">Доставка</p>
            <div>
              <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">{t("addressLabel")}</label>
              <input className={inputClass} placeholder={t("addressPlaceholder")}
                value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">{t("commentLabel")}</label>
              <textarea rows={3} className={`${inputClass} resize-none`} placeholder={t("commentPlaceholder")}
                value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-[#f5f5f7] rounded-2xl p-6">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-[#86868b] uppercase mb-4">Оплата</p>
            <div className="space-y-2">
              {paymentMethods.map((opt) => {
                const active = selectedPayment === opt.name;
                return (
                  <label key={opt.name}
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all
                      ${active ? "border-[#1d1d1f] bg-white" : "border-transparent bg-white/60 hover:bg-white"}`}
                  >
                    <input type="radio" name="payment" value={opt.name}
                      checked={active} onChange={() => setSelectedPayment(opt.name)} className="hidden" />
                    <span className="text-xl mt-0.5">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#1d1d1f]">{opt.label}</p>
                      <p className={`text-[12px] mt-0.5 leading-relaxed transition-colors duration-200
                        ${active ? "text-[#86868b]" : "text-[#c7c7cc]"}`}>
                        {opt.description}
                      </p>
                    </div>
                    <span className={`mt-1 w-4 h-4 rounded-full border-2 shrink-0 transition-all
                      ${active ? "border-[#1d1d1f] bg-[#1d1d1f]" : "border-[#aeaeb2]"}`} />
                  </label>
                );
              })}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#1d1d1f] hover:bg-[#2d2d2f] disabled:opacity-60 text-white text-sm font-semibold
              py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
            {loading ? <SpinnerMini /> : t("submitBtn")}
          </button>
        </form>

        {/* ── Order summary ── */}
        <div className="bg-[#f5f5f7] rounded-2xl p-6 lg:sticky lg:top-8">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-[#86868b] uppercase mb-4">{t("orderSummary")}</p>

          <ul className="space-y-3 mb-5">
            {cartItems.map((it) => {
              const id = it.products?.id ?? it.id;
              const image = it.products?.image ?? it.image;
              const title = it.products?.title ?? it.name;
              const price = it.products?.price ?? it.price;
              const qty = it.quantity ?? it.qty ?? 1;
              return (
                <li key={id} className="flex items-center gap-3 bg-white rounded-xl p-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#f5f5f7]">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1d1d1f] truncate">{title}</p>
                    {qty > 1 && <p className="text-[12px] text-[#86868b]">× {qty}</p>}
                  </div>
                  <p className="text-[13px] font-semibold text-[#1d1d1f] shrink-0">{price * qty} €</p>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-[#d2d2d7] pt-4 flex items-center justify-between">
            <span className="text-sm text-[#86868b]">{t("total")}</span>
            <span className="text-base font-semibold text-[#1d1d1f]">{total} €</span>
          </div>
        </div>

      </div>
    </div>
  );
}
