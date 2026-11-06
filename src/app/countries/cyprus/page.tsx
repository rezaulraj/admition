import { pageMetadata } from "@/lib/seo";
import AdmissionVisaProcessCyprus from "@/views/countries/cyprus/AdmissionVisaProcessCyprus";
import ContactCta from "@/components/common/ContactCta";
import EntryRequirementsCyprus from "@/views/countries/cyprus/EntryRequirementsCypus";
import HeroCyprus from "@/views/countries/cyprus/HeroCyprus";
// import VisaSuccessCarousel from "@/views/success-stories/VisaSuccessCarousel";
import WhyCyprus from "@/views/countries/cyprus/WhyCyprus";
import UniversityPartner from "@/components/common/UniversityPartner";

export const metadata = pageMetadata({
  title: "Study in Cyprus | Admissions, Visa & Scholarships",
  description:
    "Study in Cyprus with expert guidance from Admission On Board: university admissions, entry requirements, student visa support and scholarships.",
  path: "/countries/cyprus",
});

export default function page() {
  return (
    <div>
      <HeroCyprus />
      <WhyCyprus />
      <EntryRequirementsCyprus />
      <AdmissionVisaProcessCyprus />
      <UniversityPartner country="Cyprus" />
      <ContactCta />
    </div>
  );
}
