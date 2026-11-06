import { pageMetadata } from "@/lib/seo";
import AdmissionVisaProcessFinland from "@/views/countries/finland/AdmissionVisaProcessFinland";
import ContactCta from "@/components/common/ContactCta";
import EntryRequirementsFinland from "@/views/countries/finland/EntryRequirementsFinland";
import HeroFinland from "@/views/countries/finland/HeroFinland";
// import VisaSuccessCarousel from "@/views/success-stories/VisaSuccessCarousel";
import WhyFinland from "@/views/countries/finland/WhyFinland";
import UniversityPartner from "@/components/common/UniversityPartner";

export const metadata = pageMetadata({
  title: "Study in Finland | Admissions, Visa & Scholarships",
  description:
    "Study in Finland with expert guidance from Admission On Board: university admissions, entry requirements, student visa support and scholarships.",
  path: "/countries/finland",
});

export default function page() {
  return (
    <div>
      <HeroFinland />
      <WhyFinland />
      <EntryRequirementsFinland />
      <AdmissionVisaProcessFinland />
      <UniversityPartner country="Finland" />
      <ContactCta />
    </div>
  );
}
