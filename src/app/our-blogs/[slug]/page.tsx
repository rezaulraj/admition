import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { blogs, getBlogBySlug } from "@/lib/blogs";
import ContactCta from "@/components/common/ContactCta";
import BlogArticle from "@/views/our-blogs/BlogArticle";

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

  // Same-category articles first, topped up with the newest others so there is always something to read next
  const others = blogs.filter((b) => b.slug !== blog.slug);
  const related = [...others.filter((b) => b.category === blog.category), ...others.filter((b) => b.category !== blog.category)].slice(0, 3);

  const wordCount = blog.content.join(" ").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div>
      <BlogArticle blog={blog} related={related} minutes={minutes} />
      {/* <ContactCta /> */}
    </div>
  );
}
