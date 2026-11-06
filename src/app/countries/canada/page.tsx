import AdmissionVisaProcessCanada from "@/views/countries/canada/AdmissionVisaProcessCanada";
import EntryRequirementsCanada from "@/views/countries/canada/EntryRequirementsCanada";
import HeroCanada from "@/views/countries/canada/HeroCanada";
import UniversityPartner from "@/components/common/UniversityPartner";
import WhyCanada from "@/views/countries/canada/WhyCanada";
import ContactCta from "@/components/common/ContactCta";
export default function page() {
  return (
    <div>
      <HeroCanada />
      <WhyCanada />
      <EntryRequirementsCanada />
      <AdmissionVisaProcessCanada />
      <UniversityPartner country="Canada" />
      <ContactCta />
    </div>
  );
}
