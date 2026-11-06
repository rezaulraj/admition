import { pageMetadata } from "@/lib/seo";
import AdmissionVisaProcessNewZealand from "@/views/countries/new-zealand/AdmissionVisaProcessNewZealand";
import ContactCta from "@/components/common/ContactCta";
import EntryRequirementsNewZealand from "@/views/countries/new-zealand/EntryRequirementsNewZealand";
import HeroNewZealand from "@/views/countries/new-zealand/HeroNewZealand";
// import VisaSuccessCarousel from "@/views/success-stories/VisaSuccessCarousel";
import WhyNewZealand from "@/views/countries/new-zealand/WhyNewZealand";
import UniversityPartner from "@/components/common/UniversityPartner";

export const metadata = pageMetadata({
  title: "Study in New Zealand | Admissions, Visa & Scholarships",
  description:
    "Study in New Zealand with expert guidance from Admission On Board: university admissions, entry requirements, student visa support and scholarships.",
  path: "/countries/new-zealand",
});

export default function page() {
  return (
    <div>
      <HeroNewZealand />
      <WhyNewZealand />
      <EntryRequirementsNewZealand />
      <AdmissionVisaProcessNewZealand />
      <UniversityPartner country="New Zealand" />
      <ContactCta />
    </div>
  );
}
