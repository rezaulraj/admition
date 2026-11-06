import { pageMetadata } from "@/lib/seo";
import AdmissionVisaProcessUK from "@/views/countries/united-kingdom/AdmissionVisaProcessUK";
import ContactCta from "@/components/common/ContactCta";
import EntryRequirementsUK from "@/views/countries/united-kingdom/EntryRequirementsUK";
import HeroUK from "@/views/countries/united-kingdom/HeroUK";
// import VisaSuccessCarousel from "@/views/success-stories/VisaSuccessCarousel";
import WhyUK from "@/views/countries/united-kingdom/WhyUK";
import UniversityPartner from "@/components/common/UniversityPartner";

export const metadata = pageMetadata({
  title: "Study in the UK | Admissions, Visa & Scholarships",
  description:
    "Study in the UK with expert guidance from Admission On Board: university admissions, entry requirements, student visa support and scholarships.",
  path: "/countries/united-kingdom",
});

export default function page() {
  return (
    <div>
      <HeroUK />
      <WhyUK />
      <EntryRequirementsUK />
      <AdmissionVisaProcessUK />
      <UniversityPartner country="United Kingdom" />
      <ContactCta />
    </div>
  );
}
