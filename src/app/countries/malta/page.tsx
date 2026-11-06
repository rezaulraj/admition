import { pageMetadata } from "@/lib/seo";
import AdmissionVisaProcessMalta from "@/views/countries/malta/AdmissionVisaProcessMalta";
import ContactCta from "@/components/common/ContactCta";
import EntryRequirementsMalta from "@/views/countries/malta/EntryRequirementsMalta";
import HeroMalta from "@/views/countries/malta/HeroMalta";
// import VisaSuccessCarousel from "@/views/success-stories/VisaSuccessCarousel";
import WhyMalta from "@/views/countries/malta/WhyMalta";
import UniversityPartner from "@/components/common/UniversityPartner";

export const metadata = pageMetadata({
  title: "Study in Malta | Admissions, Visa & Scholarships",
  description:
    "Study in Malta with expert guidance from Admission On Board: university admissions, entry requirements, student visa support and scholarships.",
  path: "/countries/malta",
});

export default function page() {
  return (
    <div>
      <HeroMalta />
      <WhyMalta />
      <EntryRequirementsMalta />
      <AdmissionVisaProcessMalta />
      <UniversityPartner country="Malta" />
      <ContactCta />
    </div>
  );
}
