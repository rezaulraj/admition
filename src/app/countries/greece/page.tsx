import { pageMetadata } from "@/lib/seo";
import AdmissionVisaProcessGreece from "@/views/countries/greece/AdmissionVisaProcessGreece";
import ContactCta from "@/components/common/ContactCta";
import EntryRequirementsGreece from "@/views/countries/greece/EntryRequirementsGreece";
import HeroGreece from "@/views/countries/greece/HeroGreece";
// import VisaSuccessCarousel from "@/views/success-stories/VisaSuccessCarousel";
import WhyGreece from "@/views/countries/greece/WhyGreece";
import UniversityPartner from "@/components/common/UniversityPartner";

export const metadata = pageMetadata({
  title: "Study in Greece | Admissions, Visa & Scholarships",
  description:
    "Study in Greece with expert guidance from Admission On Board: university admissions, entry requirements, student visa support and scholarships.",
  path: "/countries/greece",
});

export default function page() {
  return (
    <div>
      <HeroGreece />
      <WhyGreece />
      <EntryRequirementsGreece />
      <AdmissionVisaProcessGreece />
      <UniversityPartner country="Greece" />
      <ContactCta />
    </div>
  );
}
