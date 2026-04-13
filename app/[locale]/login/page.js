"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Login");
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegister ? t("registerTitle") : t("loginTitle")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-black rounded-md hover:bg-black transition cursor-pointer"
          >
            {isRegister ? t("registerBtn") : t("loginBtn")}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isRegister ? t("hasAccount") : t("noAccount")}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-800 hover:underline cursor-pointer"
          >
            {isRegister ? t("loginBtn") : t("registerBtn")}
          </button>
        </p>
      </div>
    </div>
  );
}
