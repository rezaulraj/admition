import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { blogs } from "@/lib/blogs";

const routes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/countries", priority: 0.9 },
  { path: "/countries/united-kingdom", priority: 0.9 },
  { path: "/countries/australia", priority: 0.9 },
  { path: "/countries/new-zealand", priority: 0.9 },
  { path: "/countries/cyprus", priority: 0.8 },
  { path: "/countries/finland", priority: 0.8 },
  { path: "/countries/greece", priority: 0.8 },
  { path: "/countries/hungary", priority: 0.8 },
  { path: "/countries/lithuania", priority: 0.8 },
  { path: "/countries/malta", priority: 0.8 },
  { path: "/countries/romania", priority: 0.8 },
  { path: "/countries/bangladesh", priority: 0.7 },
  { path: "/countries/nepal", priority: 0.7 },
  { path: "/countries/united-kingdom-address", priority: 0.6 },
  { path: "/courses", priority: 0.8 },
  { path: "/universities", priority: 0.8 },
  { path: "/services", priority: 0.8 },
  { path: "/our-story", priority: 0.7 },
  { path: "/success-stories", priority: 0.7 },
  { path: "/our-blogs", priority: 0.7 },
  ...blogs.map((blog) => ({ path: `/our-blogs/${blog.slug}`, priority: 0.6 })),
  { path: "/seminar-and-events", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/careers", priority: 0.5 },
  { path: "/institution-partner", priority: 0.6 },
  { path: "/recruitment-partner", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/cookies", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency:
      path === "" || path === "/our-blogs" ? "weekly" : "monthly",
    priority,
  }));
}
