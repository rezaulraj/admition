import { pageMetadata } from "@/lib/seo";
import ContactCta from "@/components/common/ContactCta";
import HeroInstitutionPartner from "@/views/institution-partner/HeroInstitutionPartner";
import PartnershipForm from "@/views/institution-partner/PartnershipForm";
import WhyPartnerWithUs from "@/views/institution-partner/WhyPartnerWithUs";

export const metadata = pageMetadata({
  title: "Institution Partnership",
  description: "Universities and colleges: partner with Admission On Board to recruit qualified international students.",
  path: "/institution-partner",
});

export default function page() {
  return (
    <div>
      <HeroInstitutionPartner />
      <WhyPartnerWithUs />
      <PartnershipForm />
    </div>
  );
}
