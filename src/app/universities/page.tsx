import { pageMetadata } from "@/lib/seo";
import ContactCta from "@/components/common/ContactCta";
import UniversityExplorer from "@/views/universities/UniversityExplorer";

export const metadata = pageMetadata({
  title: "Partner Universities",
  description: "Browse partner universities across the UK, Australia, Europe and more, and get free admission guidance from Admission On Board.",
  path: "/universities",
});

export default function page() {
  return (
    <div>
      <UniversityExplorer />
      <ContactCta />
    </div>
  );
}
