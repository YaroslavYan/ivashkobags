import Head from "next/head";

export default function PolitykaPrywatnosci() {
  return (
    <>
      <Head>
        <title>Політика конфіденційності | Інтернет-магазин сумок</title>
        <meta
          name="description"
          content="Політика конфіденційності нашого інтернет-магазину сумок у Польщі"
        />
      </Head>

      <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-4xl font-extrabold mb-10 text-center">
          Політика конфіденційності
        </h1>

        <section className="space-y-6">
          <p>
            Ця Політика конфіденційності описує, як ми збираємо, використовуємо
            та захищаємо ваші персональні дані при використанні нашого
            інтернет-магазину сумок у Польщі.
          </p>

          <h2 className="text-2xl font-bold text-black">
            1. Адміністратор даних
          </h2>
          <p>
            Адміністратором ваших персональних даних є{" "}
            <strong>[Назва компанії]</strong> з місцезнаходженням у{" "}
            <strong>[Адреса у Польщі]</strong>. Зв’язатися з нами можна за
            адресою електронної пошти: <strong>[email]</strong>.
          </p>

          <h2 className="text-2xl font-bold text-black">
            2. Які дані ми збираємо
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Ім’я та прізвище</li>
            <li>Адреса доставки</li>
            <li>Номер телефону та адреса електронної пошти</li>
            <li>
              Дані для оплати (не зберігаються на нашому сайті, обробляються
              платіжною системою PayU)
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-black">
            3. Мета обробки даних
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Обробка замовлень і доставка товарів</li>
            <li>Виставлення рахунків та облік платежів</li>
            <li>Надсилання інформації про статус замовлення</li>
            <li>Виконання юридичних зобов’язань (RODO / GDPR)</li>
          </ul>

          <h2 className="text-2xl font-bold text-black">
            4. Термін зберігання даних
          </h2>
          <p>
            Ми зберігаємо ваші персональні дані лише стільки, скільки це
            необхідно для виконання цілей, для яких вони були зібрані, або
            відповідно до вимог законодавства Польщі та ЄС.
          </p>

          <h2 className="text-2xl font-bold text-black">
            5. Права користувача
          </h2>
          <p>Ви маєте право:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Отримати доступ до своїх даних</li>
            <li>Виправити або видалити свої дані</li>
            <li>Обмежити обробку або заперечити проти неї</li>
            <li>
              Подати скаргу до органу з питань захисту даних (UODO у Польщі)
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-black">6. Файли cookie</h2>
          <p>
            Наш сайт використовує файли cookie для покращення роботи та аналізу
            трафіку. Ви можете вимкнути cookie у налаштуваннях свого браузера.
          </p>

          <h2 className="text-2xl font-bold text-black">
            7. Передача даних третім сторонам
          </h2>
          <p>Ми не передаємо ваші дані стороннім компаніям, за винятком:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Поштових та кур’єрських служб (для доставки)</li>
            <li>Платіжної системи PayU (для оплати)</li>
          </ul>

          <p className="pt-6 text-sm text-gray-500">
            Останнє оновлення: [дата]
          </p>
        </section>
      </main>
    </>
  );
}
