import { pageMetadata } from "@/lib/seo";
import ContactCta from "@/components/common/ContactCta";
import HeroNorway from "@/views/countries/norway/HeroNorway";
import WhyNorway from "@/views/countries/norway/WhyNorway";
import AdmissionVisaProcessNorway from "@/views/countries/norway/AdmissionVisaProcessNorway";
import EntryRequirementsNorway from "@/views/countries/norway/EntryRequirementsNorway";
import UniversityPartner from "@/components/common/UniversityPartner";

export const metadata = pageMetadata({
  title: "Study in Norway | Admissions, Visa & Scholarships",
  description:
    "Study in Norway with expert guidance from Admission On Board: university admissions, entry requirements, student visa support and scholarships.",
  path: "/countries/norway",
});

export default function page() {
  return (
    <div>
      <HeroNorway />
      <WhyNorway />
      <EntryRequirementsNorway />
      <AdmissionVisaProcessNorway />
      <UniversityPartner country="Norway" />
      <ContactCta />
    </div>
  );
}
