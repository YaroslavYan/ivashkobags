"use client";
import { useEffect } from "react";

export default function RevealOnScroll({
  selector = "[data-reveal]",
  direction = "down", // "up" | "down" | "left" | "right"
  stagger = 30,
  threshold = 0.08,
  immediate = false, // новий пропс
}) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(selector));
    if (!nodes.length) return;

    if (immediate) {
      // просто додаємо всім клас відразу з затримкою по черзі
      nodes.forEach((node, index) => {
        const delay = index * stagger;
        setTimeout(() => {
          node.classList.add("revealed");
          node.classList.add(`from-${direction}`);
        }, delay);
      });
      return;
    }

    // стандартний варіант зі скролом
    const timers = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = nodes.indexOf(entry.target);
            const delay = index * stagger;

            timers.push(
              setTimeout(() => {
                entry.target.classList.add("revealed");
                entry.target.classList.add(`from-${direction}`);
              }, delay)
            );

            io.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    nodes.forEach((n) => io.observe(n));

    return () => {
      io.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, [selector, direction, stagger, threshold, immediate]);

  return null;
}
