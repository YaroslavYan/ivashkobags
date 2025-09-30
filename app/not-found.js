import Link from "next/link";

function NotFound() {
  //Якщо такого посилання не існує
  //Також викликаємо додаткову функцію там де оримуємо дані notFound()

  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">Такої сторінки не знайдено :(</h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Повернутись назад
      </Link>
    </main>
  );
}

export default NotFound;
