export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8 min-h-screen">
      <div className="max-w-2xl w-full bg-white p-8 rounded shadow animate-pulse">
        {/* Заголовок */}
        <div className="h-6 w-2/3 bg-gray-200 rounded mb-6" />

        {/* Ім'я / Телефон / Статус */}
        <div className="space-y-4 mb-6">
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
        </div>

        {/* Список товарів */}
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-4" />
        <ul className="space-y-3 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex justify-between">
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </li>
          ))}
        </ul>

        {/* Загальна сума */}
        <div className="h-4 w-1/4 bg-gray-200 rounded mb-6" />

        {/* Кнопки */}
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-gray-200 rounded" />
          <div className="h-10 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
