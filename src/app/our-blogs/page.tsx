import { pageMetadata } from "@/lib/seo";
import ContactCta from "@/components/common/ContactCta";
import OurBlogs from "@/views/our-blogs/OurBlogs";

export const metadata = pageMetadata({
  title: "Blog: Study Abroad Guides & Tips",
  description: "Guides on scholarships, visa interviews, courses and living abroad from the Admission On Board team.",
  path: "/our-blogs",
});

export default function page() {
  return (
    <div>
      <OurBlogs />
      <ContactCta />
    </div>
  );
}
