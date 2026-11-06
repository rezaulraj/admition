import { pageMetadata } from "@/lib/seo";
import ContactCta from "@/components/common/ContactCta";
import HeroEventsSeminars from "@/views/seminar-and-events/HeroEventsSeminars";
import OurEvents from "@/views/seminar-and-events/OurEvents";
import PhotoGallery from "@/views/seminar-and-events/PhotoGallery";

export const metadata = pageMetadata({
  title: "Seminars & Events",
  description: "Join Admission On Board seminars, education fairs and events to meet universities and get study-abroad advice.",
  path: "/seminar-and-events",
});

export default function page() {
  return (
    <div>
      <HeroEventsSeminars />
      <OurEvents />
      <PhotoGallery />
      <ContactCta/>
    </div>
  );
}
