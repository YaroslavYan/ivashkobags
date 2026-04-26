"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PaginationClient({ page, totalPages, categorySlug }) {
  const router = useRouter();
  const [loadingPage, setLoadingPage] = useState(null);

  const goTo = (p) => {
    if (p === page || p < 1 || p > totalPages) return;
    setLoadingPage(p);
    const href = `/products?${categorySlug ? `category=${categorySlug}&` : ""}page=${p}`;
    router.push(href);
    router.refresh();
  };

  useEffect(() => {
    setLoadingPage(null);
  }, [page]);

  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, "…", totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "…", page - 1, page, page + 1, "…", totalPages);
    }
    return pages;
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-10 select-none"
    >
      {/* Prev */}
      <button
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex items-center justify-center w-9 h-9 rounded-full text-[#1d1d1f] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#f5f5f7] active:bg-[#e8e8ed] transition-colors duration-150 cursor-pointer"
      >
        <ChevronLeft />
      </button>

      {/* Pages */}
      <div className="flex items-center gap-1 mx-1">
        {getPages().map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className="w-9 h-9 flex items-center justify-center text-[#86868b] text-sm font-medium tracking-tight"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p)}
              disabled={loadingPage === p}
              aria-label={`Page ${p}`}
              aria-current={page === p ? "page" : undefined}
              className={`relative w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium tracking-tight transition-all duration-200 cursor-pointer
                ${
                  page === p
                    ? "bg-[#1d1d1f] text-white shadow-sm"
                    : "text-[#1d1d1f] hover:bg-[#f5f5f7] active:bg-[#e8e8ed]"
                }
                ${loadingPage === p ? "opacity-50" : ""}
              `}
            >
              {loadingPage === p ? (
                <span className="w-3.5 h-3.5 border-[1.75px] border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                p
              )}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="flex items-center justify-center w-9 h-9 rounded-full text-[#1d1d1f] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#f5f5f7] active:bg-[#e8e8ed] transition-colors duration-150 cursor-pointer"
      >
        <ChevronRight />
      </button>
    </nav>
  );
}
