export default function Loading() {
  return (
    <div className="flex gap-8 px-8 py-12 w-full max-w-[1600px] mx-auto animate-pulse">
      {/* Сайдбар */}
      <aside className="w-72 shrink-0 hidden md:block">
        <div className="bg-gray-200 h-6 w-1/2 rounded mb-6" />
        <ul className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </li>
          ))}
        </ul>
      </aside>

      {/* Секція з товарами */}
      <section className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            className="relative bg-white rounded overflow-hidden shadow-md"
          >
            <div className="aspect-[4/5] w-full bg-gray-200" />

            <div className="absolute bottom-0 left-0 w-full bg-white/70 px-4 py-2 flex justify-between items-center">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-12 bg-gray-200 rounded" />
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded" />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
