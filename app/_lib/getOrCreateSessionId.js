"use client";

// export function getOrCreateSessionId() {
//   if (typeof window === "undefined") return null; // Безпечна перевірка для SSR

//   let sessionId = localStorage.getItem("sessionId");
//   if (!sessionId) {
//     sessionId = crypto.randomUUID();
//     localStorage.setItem("sessionId", sessionId);
//   }
//   return sessionId;
// }

import Cookies from "js-cookie";

export function getOrCreateSessionId() {
  let sessionId = Cookies.get("sessionId");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    Cookies.set("sessionId", sessionId, {
      expires: 30, // зберігати 30 днів
      path: "/",
    });
  }

  return sessionId;
}

// Видаляти товар з кошика

// Створити окрему сторінку для товару

// Створити сторінку замовлення і сформувати в бд
