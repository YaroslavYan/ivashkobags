"use client";

import { useState } from "react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (isRegister) {
    //   console.log("Реєстрація:", { email, password });
    //   // TODO: виклик API для реєстрації
    // } else {
    //   console.log("Вхід:", { email, password });
    //   // TODO: виклик API для входу
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-scree">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegister ? "Реєстрація" : "Вхід до кабінету"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Електронна пошта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-black rounded-md hover:bg-black transition cursor-pointer"
          >
            {isRegister ? "Зареєструватися" : "Увійти"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isRegister ? "Вже маєш акаунт?" : "Ще не маєш акаунту?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-800 hover:underline cursor-pointer"
          >
            {isRegister ? "Увійти" : "Зареєструватися"}
          </button>
        </p>
      </div>
    </div>
  );
}
