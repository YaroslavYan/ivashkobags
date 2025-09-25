// "use client";

// import React, { useState } from "react";
// import { getOrCreateSessionId } from "../_lib/getOrCreateSessionId";
// import { addToCartAction, removeFromCartAction } from "../_lib/actions";
// import SpinnerMini from "./SpinnerMini";

// export default function AddToCartButton({ id, variant, inCart }) {
//   const [loading, setLoading] = useState(false);

//   const handleClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const sessionId = getOrCreateSessionId();
//     setLoading(true);

//     try {
//       if (inCart) {
//         await removeFromCartAction({ productId: id, sessionId });
//       } else {
//         await addToCartAction(id, null, sessionId);
//       }
//     } catch (err) {
//       console.error("Помилка:", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (variant === "productCard") {
//     return (
//       <button
//         onClick={handleClick}
//         disabled={loading}
//         className={`w-80 p-4 rounded cursor-pointer transition duration-300 ease-in-out flex items-center justify-center ${
//           inCart
//             ? "bg-red-600 text-white hover:bg-red-700"
//             : "bg-[#111] text-white hover:bg-gray-500"
//         } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
//         aria-label={inCart ? "Видалити з кошика" : "Додати в кошик"}
//         title={inCart ? "Видалити з кошика" : "Додати в кошик"}
//       >
//         {loading ? (
//           <SpinnerMini />
//         ) : inCart ? (
//           "ВИДАЛИТИ З КОШИКА"
//         ) : (
//           "ДОДАТИ В КОШИК"
//         )}
//       </button>
//     );
//   }

//   // варіант маленької кнопки (+ / -)
//   return (
//     <button
//       onClick={handleClick}
//       disabled={loading}
//       className="inline-flex items-center justify-center px-4 py-2 text-xl cursor-pointer"
//       aria-label={inCart ? "Видалити з кошика" : "Додати в кошик"}
//       title={inCart ? "Видалити з кошика" : "Додати в кошик"}
//     >
//       {loading ? (
//         <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
//       ) : inCart ? (
//         <span className="text-red-600 hover:text-red-800">-</span>
//       ) : (
//         <span className="text-gray-500 hover:text-gray-700">+</span>
//       )}
//     </button>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { getOrCreateSessionId } from "../_lib/getOrCreateSessionId";
import { addToCartAction, removeFromCartAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

export default function AddToCartButton({ id, variant, inCart }) {
  // локальний індикатор обробки
  const [loading, setLoading] = useState(false);

  // оптимістичний локальний стан кошика — синхронізується з пропсом
  const [optimisticInCart, setOptimisticInCart] = useState(Boolean(inCart));
  useEffect(() => {
    setOptimisticInCart(Boolean(inCart));
  }, [inCart]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const sessionId = getOrCreateSessionId();

    // Очікуване нове значення
    const target = !optimisticInCart;
    // Встановлюємо оптимістично — користувач бачить миттєву зміну
    setOptimisticInCart(target);
    setLoading(true);

    try {
      if (target) {
        // додаємо
        await addToCartAction(id, null, sessionId);
      } else {
        // видаляємо
        await removeFromCartAction({ productId: id, sessionId });
      }
      // успіх — батько/сервер теж має оновити, але локально вже показуємо зміни
    } catch (err) {
      // помилка — відкотимо оптимістичну зміну
      console.error("Помилка:", err?.message ?? err);
      setOptimisticInCart((prev) => !prev);
      // опціонально: показати toast/alert
    } finally {
      setLoading(false);
    }
  };

  if (variant === "productCard") {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-80 p-4 rounded cursor-pointer transition duration-300 ease-in-out flex items-center justify-center ${
          optimisticInCart
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-[#111] text-white hover:bg-gray-500"
        } ${loading ? "opacity-80 cursor-not-allowed" : ""}`}
        aria-label={optimisticInCart ? "Видалити з кошика" : "Додати в кошик"}
        title={optimisticInCart ? "Видалити з кошика" : "Додати в кошик"}
      >
        {/* w-80 гарантує, що ширина не змінюється — спінер буде центруватись */}
        {loading ? (
          <SpinnerMini />
        ) : optimisticInCart ? (
          "ВИДАЛИТИ З КОШИКА"
        ) : (
          "ДОДАТИ В КОШИК"
        )}
      </button>
    );
  }

  // маленька кнопка: важливо резервувати простір для спінера, щоб не "стрибав"
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center justify-center px-3 py-2 text-xl cursor-pointer"
      aria-label={optimisticInCart ? "Видалити з кошика" : "Додати в кошик"}
      title={optimisticInCart ? "Видалити з кошика" : "Додати в кошик"}
    >
      {/* фіксований квадратик для іконки/спінера щоб не змінювалась ширина */}
      <span className="relative inline-flex items-center justify-center w-6 h-6">
        {loading ? (
          // спінер у фіксованому контейнері (не видаляє символ)
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : null}

        {/* символ видно завжди (щоб layout не перескакував), але коли loading - можна зменшити непрозорість */}
        <span
          className={`relative z-10 transition-opacity duration-150 ${
            loading ? "opacity-40" : "opacity-100"
          } ${optimisticInCart ? "text-red-600" : "text-gray-500"}`}
          aria-hidden
        >
          {optimisticInCart ? "-" : "+"}
        </span>
      </span>
    </button>
  );
}
