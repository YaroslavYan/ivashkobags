"use client";

// import Cookies from "js-cookie";

// export function getOrCreateSessionId() {
//   let sessionId = Cookies.get("sessionId");

//   if (!sessionId) {
//     sessionId = crypto.randomUUID();
//     Cookies.set("sessionId", sessionId, {
//       expires: 30, // зберігати 30 днів
//       path: "/",
//     });
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
      path: "/", // доступна на всьому сайті
      sameSite: "Lax", // мінімізує попередження конфіденційності
      secure: true, // працює лише по HTTPS
    });
  }

  return sessionId;
}
