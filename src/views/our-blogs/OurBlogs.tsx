"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs, type BlogCategory } from "@/lib/blogs";

type Category = BlogCategory;

const categoryStyles: Record<Category, string> = {
  "Academic Writing": "bg-[#2F5DA8]/10 text-[#2F5DA8]",
  Destinations: "bg-[#1366E0]/10 text-[#1366E0]",
  "Visas & Applications": "bg-[#F58B0F]/10 text-[#F58B0F]",
};

const categories: Array<"All" | Category> = [
  "All",
  "Academic Writing",
  "Destinations",
  "Visas & Applications",
];

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#9A9A9A"
      className="shrink-0"
    >
      <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7ZM5 9h14v11H5V9Z" />
    </svg>
  );
}

export default function OurBlogs() {
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? blogs
        : blogs.filter((b) => b.category === activeCategory),
    [activeCategory],
  );

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1366E0]">
            Blog
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            Insights &amp; Guides For Your Study Abroad Journey
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B6B6B] sm:text-base">
            Practical advice on choosing a university, writing standout
            applications, and navigating visas, straight from our team.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-[#1B1B1B] bg-[#1B1B1B] text-white"
                    : "border-[#ECECEC] bg-white text-[#1B1B1B] hover:border-[#1B1B1B]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Blog grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((blog) => (
            <Link
              key={blog.slug}
              href={`/our-blogs/${blog.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#1B1B1B] backdrop-blur-sm">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="#1366E0"
                  >
                    <path d="M12 2 2 8l10 5 8-4v6h2V8L12 2Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
                  </svg>
                  Admission OnBoard
                </span>
              </div>

              <span
                className={`mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${categoryStyles[blog.category]}`}
              >
                {blog.category}
              </span>

              <h3 className="mt-3 text-lg font-semibold leading-snug text-[#1B1B1B] transition-colors group-hover:text-[#1366E0]">
                {blog.title}
              </h3>

              <p className="mt-2 text-sm text-[#6B6B6B]">{blog.excerpt}</p>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#9A9A9A]">
                <CalendarIcon />
                {blog.date}
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-sm text-[#6B6B6B]">
              No articles in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
