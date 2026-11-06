import { pageMetadata } from "@/lib/seo";
import About from "@/views/our-story/About";
import Branches from "@/views/our-story/Branches";
import ContactCta from "@/components/common/ContactCta";
import HeroOurStory from "@/views/our-story/HeroOurStory";
import OurMission from "@/views/our-story/OurMission";

export const metadata = pageMetadata({
  title: "Our Story",
  description: "Learn about Admission On Board, our mission, our global branches and how we help students reach top universities abroad.",
  path: "/our-story",
});

export default function page() {
  return (
    <div>
      <HeroOurStory />
      <About />
      <Branches />
      <OurMission />
      <ContactCta />
    </div>
  );
}
