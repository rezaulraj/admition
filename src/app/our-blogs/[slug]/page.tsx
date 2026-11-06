import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { blogs, getBlogBySlug } from "@/lib/blogs";
import ContactCta from "@/components/common/ContactCta";

const categoryStyles: Record<string, string> = {
  "Academic Writing": "bg-[#2F5DA8]/10 text-[#2F5DA8]",
  Destinations: "bg-[#1366E0]/10 text-[#1366E0]",
  "Visas & Applications": "bg-[#F58B0F]/10 text-[#F58B0F]",
};

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#9A9A9A" className="shrink-0">
      <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7ZM5 9h14v11H5V9Z" />
    </svg>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return pageMetadata({
      title: "Blog Not Found",
      description: "This article could not be found.",
      path: `/our-blogs/${slug}`,
    });
  }

  return pageMetadata({
    title: blog.title,
    description: blog.excerpt,
    path: `/our-blogs/${blog.slug}`,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = blogs
    .filter((b) => b.slug !== blog.slug && b.category === blog.category)
    .slice(0, 3);

  return (
    <div>
      <article className="w-full bg-[#FFFEFA] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/our-blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B6B6B] transition-colors hover:text-[#1366E0]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Blog
          </Link>

          <span
            className={`mt-6 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${categoryStyles[blog.category]}`}
          >
            {blog.category}
          </span>

          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl">
            {blog.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#9A9A9A]">
            <CalendarIcon />
            {blog.date}
          </div>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-white">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
              priority
            />
          </div>

          <div className="mt-10 space-y-5">
            {blog.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-[#4A4A4A]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {relatedBlogs.length > 0 && (
        <section className="w-full bg-[#FFFEFA] px-6 pb-20">
          <div className="mx-auto max-w-3xl border-t border-[#ECECEC] pt-10">
            <h2 className="text-lg font-semibold text-[#1B1B1B]">
              More In {blog.category}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedBlogs.map((related) => (
                <Link
                  key={related.slug}
                  href={`/our-blogs/${related.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      sizes="240px"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold leading-snug text-[#1B1B1B] transition-colors group-hover:text-[#1366E0]">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCta />
    </div>
  );
}
