"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function BlogPage() {
  const t = useTranslations("Blog");
  const sectionRef = useRef(null);

  const posts = [
    { id: 1, title: t("post1Title"), date: t("post1Date"), excerpt: t("post1Excerpt"), image: "/test2.jpg" },
    { id: 2, title: t("post2Title"), date: t("post2Date"), excerpt: t("post2Excerpt"), image: "/test4.jpg" },
    { id: 3, title: t("post3Title"), date: t("post3Date"), excerpt: t("post3Excerpt"), image: "/test1.jpg" },
  ];

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
        {t("pageTitle")}
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div
            key={post.id}
            style={{ transitionDelay: `${index * 100}ms` }}
            className="fade-up group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-700 opacity-0 translate-y-6 relative"
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
                {t("readMore")}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full" />
              </Link>
            </div>
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FEB83F] transition-all duration-500 group-hover:w-full z-10" />
          </div>
        ))}
      </div>
    </section>
  );
}
