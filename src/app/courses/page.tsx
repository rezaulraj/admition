import { pageMetadata } from "@/lib/seo";
import ContactCta from "@/components/common/ContactCta";
import ProgrammeFinder from "@/views/courses/ProgrammeFinder";

export const metadata = pageMetadata({
  title: "Find Courses & Programmes Abroad",
  description:
    "Search bachelors, masters, diploma and foundation programmes at universities worldwide and apply with Admission On Board.",
  path: "/courses",
});

export default function page() {
  return (
    <div>
      <ProgrammeFinder />
      <ContactCta />
    </div>
  );
}
