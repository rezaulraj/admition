import { pageMetadata } from "@/lib/seo";
import AdmissionVisaProcessHungary from "@/views/countries/hungary/AdmissionVisaProcessHungary";
import ContactCta from "@/components/common/ContactCta";
import HeroHungary from "@/views/countries/hungary/HeroHungary";
import WhyHungary from "@/views/countries/hungary/WhyHungary";
import EntryRequirementsHungary from "@/views/countries/hungary/EntryRequirementsHungary";
import UniversityPartner from "@/components/common/UniversityPartner";

export const metadata = pageMetadata({
  title: "Study in Hungary | Admissions, Visa & Scholarships",
  description:
    "Study in Hungary with expert guidance from Admission On Board: university admissions, entry requirements, student visa support and scholarships.",
  path: "/countries/hungary",
});

export default function page() {
  return (
    <div>
      <HeroHungary />
      <WhyHungary />
      <EntryRequirementsHungary />
      <AdmissionVisaProcessHungary />
      <UniversityPartner country="Hungary" />
      <ContactCta />
    </div>
  );
}
