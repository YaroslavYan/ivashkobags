export const metadata = {
  title: "Про нас | IVASHKO",
};

export default function AboutPage() {
  return (
    <section className="px-4 md:px-12 lg:px-24 py-20 bg-[#faf9f7] text-[#171717]">
      {/* 1. Hero block */}
      <div className="max-w-5xl mx-auto text-center space-y-6 mb-24">
        <h1 className="text-5xl md:text-6xl font-semibold font-serif tracking-tight text-[#111]">
          Про нас
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Ми створюємо сумки, які мають свою історію. Кожен виріб — це поєднання
          турботи, естетики та поваги до матеріалів, що вже мали життя.
        </p>
      </div>

      {/* 2. Block: Фото зверху + текст */}
      <div className="max-w-6xl mx-auto mb-28 space-y-10">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <img
            src="27.jpg"
            alt="Про нас"
            className="w-full h-[400px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-medium text-[#171717]">
            Ми — майстерня IVASHKO
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-l-[#FEB83F] border-r-4 border-r-[#FEB83F] pl-1.5">
            Ми віримо в красу простих речей і силу другого шансу. Наші вироби —
            це не просто аксесуари, а стильні та практичні предмети, створені з
            турботою про людей і планету. Кожна сумка має власну історію — і
            стає частиною вашої.
          </p>
        </div>
      </div>

      {/* 3. Block: Матеріали */}
      <div className="max-w-6xl mx-auto mb-28 space-y-10">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <img
            src="/12.jpeg"
            alt="Матеріали"
            className="w-full h-[400px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-medium text-[#171717]">
            Матеріали, яким ми даємо друге життя
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-l-[#FEB83F] border-r-4 border-r-[#FEB83F] pl-1.5">
            Ми шиємо з того, що вже було кимось колись обране: старі джинси,
            куртки, тканини з секонд-хенду. Ретельно відбираємо матеріали, щоб
            дати їм нове життя — у вигляді унікальних сумок із характером. Це
            естетика усвідомленого споживання, де кожна річ має значення.
          </p>
        </div>
      </div>

      {/* 4. Завершення */}
      <div className="max-w-4xl mx-auto text-center mt-24">
        <p className="text-xl text-gray-600 italic">
          “Ми не просто шиємо сумки. Ми створюємо речі, які нагадують — другий
          шанс може бути красивим.”
        </p>
      </div>
    </section>
  );
}
