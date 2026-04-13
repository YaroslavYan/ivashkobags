export default function Loading() {
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8 animate-pulse">
      {/* Ліва частина — зображення */}
      <div className="flex-1 space-y-4">
        <div className="w-full aspect-square bg-gray-200 rounded-xl" />
        <div className="w-full aspect-square bg-gray-200 rounded-xl" />
      </div>

      {/* Права частина — текстові блоки */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="h-8 w-2/3 bg-gray-200 rounded" />
        <div className="h-6 w-1/3 bg-gray-200 rounded" />

        <div className="h-12 w-80 bg-gray-200 rounded mt-2" />

        <div className="mt-6 w-80 space-y-3">
          <div className="h-5 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
        </div>

        <div className="mt-6 w-80 space-y-3">
          <div className="h-5 w-1/2 bg-gray-200 rounded" />
          <div className="h-20 w-full bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
