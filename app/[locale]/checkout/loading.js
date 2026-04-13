export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr] gap-8 p-8 min-h-screen animate-pulse">
      {/* Ліва частина — форма */}
      <div>
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-6" />
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
          ))}

          {/* Радіокнопки оплати */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
            </div>
          ))}

          <div className="h-12 w-48 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Права частина — кошик */}
      <div className="bg-gray-100 p-6 rounded-lg h-fit sticky top-8">
        <div className="h-5 w-1/3 bg-gray-200 rounded mb-4" />
        <ul className="space-y-4">
          {Array.from({ length: 1 }).map((_, i) => (
            <li key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-10 bg-gray-200 rounded" />
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/6 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
