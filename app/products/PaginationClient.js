// app/products/PaginationClient.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SpinnerMini from "../components/SpinnerMini";

export default function PaginationClient({ page, totalPages, categorySlug }) {
  const router = useRouter();
  const pages = Array.from({ length: totalPages });
  const [loadingPage, setLoadingPage] = useState(null);

  const goTo = async (p) => {
    setLoadingPage(p);

    const href = `/products?${
      categorySlug ? `category=${categorySlug}&` : ""
    }page=${p}`;

    router.push(href);
    router.refresh();
  };

  // якщо проп `page` змінився — прибираємо спінер
  useEffect(() => {
    setLoadingPage(null);
  }, [page]);

  return (
    <div className="flex gap-2 justify-center mt-8">
      {pages.map((_, i) => {
        const p = i + 1;
        const isActive = page === p;
        const isLoading = loadingPage === p;

        return (
          <button
            key={p}
            disabled={isLoading}
            onClick={() => goTo(p)}
            className={`px-4 py-2 cursor-pointer rounded ${
              page === p
                ? "bg-[#111] text-white"
                : "bg-gray-200 hover:bg-gray-300 text-[#111]"
            }`}
          >
            {isLoading ? <SpinnerMini /> : p}
          </button>
        );
      })}
    </div>
  );
}
