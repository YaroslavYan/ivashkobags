// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
import Link from "next/link";

export default function BlogPostPage({ post }) {
  // if (!post) {
  //   return (
  //     <section className="max-w-3xl mx-auto px-4 py-20 text-center">
  //       <h2 className="text-3xl font-semibold mb-6">
  //         Такого блогу не існує 😔
  //       </h2>
  //       <Link
  //         href="/blog"
  //         className="text-blue-600 font-medium hover:underline"
  //       >
  //         ← Повернутися до блогу
  //       </Link>
  //     </section>
  //   );
  // }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="relative text-blue-600 font-medium inline-block mb-6 group"
      >
        ← Назад до блогу
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
      </Link>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>

      <div className="overflow-hidden rounded-2xl shadow-md mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-72 object-cover"
        />
      </div>

      <div
        className="text-gray-700 leading-relaxed text-lg space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
