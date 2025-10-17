"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "Як народжуються наші унікальні сумки ♻️",
    date: "10 жовтня 2025",
    excerpt:
      "Ми розповідаємо, як старий одяг отримує друге життя — від підбору тканин до створення стильних хендмейд-сумок.",
    image: "test2.jpg",
  },
  {
    id: 2,
    title: "5 причин обрати сумку з перешитого одягу 🌿",
    date: "2 жовтня 2025",
    excerpt:
      "Екологічність, унікальність, стиль і турбота про планету — дізнайтесь, чому апсайклінг стає трендом сучасної моди.",
    image: "test4.jpg",
  },
  {
    id: 3,
    title: "Як ми створюємо дизайн кожної моделі 🎨",
    date: "25 вересня 2025",
    excerpt:
      "Зазирніть за лаштунки нашої майстерні — як народжуються ідеї, підбираються матеріали й поєднуються кольори. ",
    image: "test1.jpg",
  },
];

export default function BlogPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="fade-up text-4xl font-bold mb-10 text-center opacity-0 translate-y-6 transition-all duration-700">
        Наш Блог
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div
            key={post.id}
            style={{ transitionDelay: `${index * 100}ms` }}
            className="fade-up group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-700 opacity-0 translate-y-6"
          >
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            <div className="p-5">
              <p className="text-sm text-gray-500 mb-1">{post.date}</p>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                {post.excerpt.length > 110
                  ? post.excerpt.slice(0, 115) + "..."
                  : post.excerpt}
              </p>

              <Link
                href={`/blog/${post.id}`}
                className="relative inline-block text-blue-600 font-medium group"
              >
                Читати далі →
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </div>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[gold] transition-all duration-500 group-hover:w-full z-10" />
          </div>
        ))}
      </div>
    </section>
  );
}
