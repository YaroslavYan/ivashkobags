"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CARD_W = 260;
const GAP = 20;
const STEP = CARD_W + GAP;
const SCROLL_MS = 450;
const SECS_PER_CARD = 4;

export default function NewArrivalsSlider({ products, title, seeAllLabel }) {
  const trackRef = useRef(null);
  const hoveringRef = useRef(false);
  const posRef = useRef(0);
  const manualRef = useRef(false);
  const timerRef = useRef(null);
  const [animReady, setAnimReady] = useState(false);

  const n = products.length;
  // 4 copies — animation plays through copies 2→3, copies 1 and 4 are buffers
  // ensures there's always content visible on any screen width up to ~3360px
  const tripled = [...products, ...products, ...products, ...products];
  const loopPx = n * STEP;
  const duration = n * SECS_PER_CARD;

  // Preload all unique images — start animation only when every image is cached
  useEffect(() => {
    let pending = n;
    if (pending === 0) { setAnimReady(true); return; }
    products.forEach(({ image }) => {
      const img = new window.Image();
      img.onload = img.onerror = () => {
        pending--;
        if (pending === 0) setAnimReady(true);
      };
      img.src = image;
    });
  }, []);

  /* Read current visual position from computed style */
  const readX = () => {
    const el = trackRef.current;
    if (!el) return loopPx;
    const m = new DOMMatrix(getComputedStyle(el).transform);
    return -m.m41;
  };

  /* Normalize x into [loopPx, 2*loopPx) — the middle copy's range */
  const normalize = (x) => loopPx + ((x - loopPx) % loopPx + loopPx) % loopPx;

  /* Re-attach CSS animation starting at a given pixel offset */
  const resumeCSS = (fromX) => {
    const el = trackRef.current;
    if (!el) return;
    const px = normalize(fromX);
    // negative delay seeks into the animation timeline
    const delay = -((px - loopPx) / loopPx) * duration;

    el.style.transition = "none";
    el.style.animation = "none";
    el.style.transform = `translateX(-${px}px)`;
    void el.offsetWidth; // flush

    if (animReady) {
      el.style.animation = `new-arrivals-scroll ${duration}s linear infinite`;
      el.style.animationDelay = `${delay}s`;
      el.style.animationPlayState = hoveringRef.current ? "paused" : "running";
    }
    manualRef.current = false;
  };

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    const rawX = manualRef.current ? posRef.current : readX();
    // Keep current position in the middle copy's range
    const currentX = normalize(rawX);
    // targetX is NOT normalized — transitions freely into copy 1 or copy 3 territory
    // (both exist in the DOM so there's always real content to show)
    const targetX = currentX + dir * STEP;

    posRef.current = targetX;
    manualRef.current = true;

    el.style.animation = "none";
    el.style.transition = "none";
    el.style.transform = `translateX(-${currentX}px)`;
    void el.offsetWidth;

    el.style.transition = `transform ${SCROLL_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
    el.style.transform = `translateX(-${targetX}px)`;

    timerRef.current = setTimeout(() => resumeCSS(targetX), SCROLL_MS + 30);
  };

  const onEnter = () => {
    hoveringRef.current = true;
    const el = trackRef.current;
    if (el && !manualRef.current) el.style.animationPlayState = "paused";
  };

  const onLeave = () => {
    hoveringRef.current = false;
    const el = trackRef.current;
    if (el && !manualRef.current) el.style.animationPlayState = "running";
  };

  return (
    <>
      <style>{`
        @keyframes new-arrivals-scroll {
          from { transform: translateX(-${loopPx}px); }
          to   { transform: translateX(-${loopPx * 2}px); }
        }
      `}</style>

      <section className="py-14 overflow-hidden max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between px-6 sm:px-10 lg:px-16 mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.15em] text-[#FEB83F] uppercase mb-1.5">
              Колекція
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f] leading-none">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll(-1)}
                aria-label="Previous"
                className="w-9 h-9 rounded-full bg-[#f5f5f7] flex items-center justify-center
                  text-[#1d1d1f] transition-all duration-150 cursor-pointer
                  hover:bg-[#e8e8ed] active:scale-90"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Next"
                className="w-9 h-9 rounded-full bg-[#f5f5f7] flex items-center justify-center
                  text-[#1d1d1f] transition-all duration-150 cursor-pointer
                  hover:bg-[#e8e8ed] active:scale-90"
              >
                <ChevronRight />
              </button>
            </div>

          </div>
        </div>

        {/* Track */}
        <div className="overflow-hidden px-6 sm:px-10 lg:px-16">
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{
              gap: `${GAP}px`,
              width: "max-content",
              animation: animReady ? `new-arrivals-scroll ${duration}s linear infinite` : "none",
            }}
          >
            {tripled.map((product, i) => (
              <article
                key={`${product.id}-${i}`}
                style={{ width: `${CARD_W}px` }}
                className="shrink-0 relative group"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#f0ede8]">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </Link>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/75 backdrop-blur-md border border-white/60 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[13px] text-[#1d1d1f] truncate leading-snug">
                        {product.title}
                      </h3>
                      <p className="text-[12px] font-semibold text-[#1d1d1f] mt-1">
                        {product.price} €
                      </p>
                    </div>
                    <AddToCartButton id={product.id} inCart={product.inCart} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
