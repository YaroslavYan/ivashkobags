export const metadata = {
  title: "About",
};

export default async function Page() {
  return (
    <div className="space-y-32 text-lg">
      {/* Блок "Про нас" з фото зліва */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Фото зліва */}
        <div className="w-full lg:w-3/5">
          <img
            src="w5.jpg" // заміни на актуальний шлях до фото
            alt="Про нас"
            className="w-full h-auto object-cover shadow-md"
            placeholder="blur"
          />
        </div>

        {/* Текст справа */}
        <div className="w-full lg:w-3/5">
          <h1 className="text-4xl mb-10 text-accent-400 font-medium">
            Про нас
          </h1>
          <div className="space-y-8">
            <p>
              Ми — майстерня IVASHKO, де кожна сумка має свою історію. Ми віримо
              в красу простих речей і силу другого шансу. Наші вироби — це не
              просто аксесуари, а стильні та практичні предмети, створені з
              турботою про людей і планету.
            </p>
          </div>
        </div>
      </div>

      {/* Блок "Матеріали" з фото справа */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:flex-row-reverse">
        {/* Фото справа */}
        <div className="w-full lg:w-3/5">
          <img
            src="12.jpeg" // заміни на актуальний шлях до фото
            alt="Матеріали"
            className="w-full h-auto object-cover shadow-md"
            placeholder="blur"
          />
        </div>

        {/* Текст зліва */}
        <div className="w-full lg:w-2/5">
          <h1 className="text-4xl mb-10 text-accent-400 font-medium">
            Матеріали які ми використовуємо
          </h1>
          <div className="space-y-8">
            <p>
              Ми шиємо з того, що вже було кимось колись обране: старі джинси,
              куртки, тканини з секонд-хенду. Ми ретельно відбираємо матеріали,
              щоб дати їм нове життя — перетворюємо в унікальні сумки з
              характером. Це естетика усвідомленого споживання, де кожна річ має
              значення.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
