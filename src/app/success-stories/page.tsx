import { pageMetadata } from "@/lib/seo";
import ContactCta from "@/components/common/ContactCta";
import CtaBanner from "@/components/common/CtaBanner";
import HeroSuccessStory from "@/views/success-stories/HeroSuccessStory";
// import StudentTestimonials from "@/views/success-stories/StudentTestimonials";
import StudentVideoStories from "@/views/success-stories/StudentVideoStories";
import SuccessStoriesGallery from "@/components/common/SuccessStoriesGallery";
import VisaSuccessCarousel from "@/views/success-stories/VisaSuccessCarousel";

export const metadata = pageMetadata({
  title: "Student Success Stories",
  description: "Read and watch visa and admission success stories from students who studied abroad with Admission On Board.",
  path: "/success-stories",
});

export default function page() {
  return (
    <div>
      <HeroSuccessStory />
      <SuccessStoriesGallery />
      {/* <StudentTestimonials /> */}
      <CtaBanner />
      {/* <VisaSuccessCarousel /> */}
      <StudentVideoStories />
      <ContactCta />
    </div>
  );
}
