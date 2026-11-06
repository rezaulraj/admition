import { pageMetadata } from "@/lib/seo";
import ContactCta from "@/components/common/ContactCta";
import HeroItaly from "@/views/countries/italy/HeroItaly";
import WhyItaly from "@/views/countries/italy/WhyItaly";
import EntryRequirementsItaly from "@/views/countries/italy/EntryRequirementsItaly";
import AdmissionVisaProcessItaly from "@/views/countries/italy/AdmissionVisaProcessItaly";
import UniversityPartner from "@/components/common/UniversityPartner";

export const metadata = pageMetadata({
  title: "Study in Italy | Admissions, Visa & Scholarships",
  description:
    "Study in Italy with expert guidance from Admission On Board: university admissions, entry requirements, student visa support and scholarships.",
  path: "/countries/italy",
});

export default function page() {
  return (
    <div>
      <HeroItaly />
      <WhyItaly />
      <EntryRequirementsItaly />
      <AdmissionVisaProcessItaly />
      <UniversityPartner country="Italy" />
      <ContactCta />
    </div>
  );
}
