// app/products/PaginationClient.js
"use client";

import { useRouter } from "next/navigation";

export default function PaginationClient({ page, totalPages, categorySlug }) {
  const router = useRouter();
  const pages = Array.from({ length: totalPages });

  const goTo = async (p) => {
    const href = `/products?${
      categorySlug ? `category=${categorySlug}&` : ""
    }page=${p}`;

    router.push(href);
    router.refresh();
  };

  return (
    <div className="flex gap-2 justify-center mt-8">
      {pages.map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => goTo(p)}
            className={`px-4 py-2 cursor-pointer rounded ${
              page === p
                ? "bg-[#111] text-white"
                : "bg-gray-200 hover:bg-gray-300 text-[#111]"
            }`}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}
