"use client";

import { useState } from "react";

const categories = [
  {
    name: "Усі",
    slug: "",
    image: "w1.jpg",
  },
  {
    name: "Тоут сумки",
    slug: "tote",
    image: "w5.jpg",
  },
  {
    name: "Шопер/Торба",
    slug: "shopper",
    image: "w4.jpg",
  },
  {
    name: "Міні сумочки/Хінкальні Куб",
    slug: "mini",
    image: "w2.jpg",
  },
];

export default function SidebarMenu({ onSelectCategory }) {
  const [active, setActive] = useState("all");

  const handleClick = (slug) => {
    setActive(slug);
    onSelectCategory?.(slug);
  };

  return (
    <aside
      data-reveal
      className="w-64 p-6 bg-white rounded text-gray-800 from-left"
    >
      <h2 className="text-lg font-bold mb-4">Категорії</h2>
      <ul className="space-y-2 list-none p-0 m-0 w-[320px]">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <button
              onClick={() => handleClick(cat.slug)}
              className="flex items-center gap-2 w-full text-left pr-4 py-2 rounded cursor-pointer transition-colors hover:text-gray-400"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <span>{cat.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
