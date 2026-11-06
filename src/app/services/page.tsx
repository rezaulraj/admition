import { pageMetadata } from "@/lib/seo";
import ContactCta from "@/components/common/ContactCta";
import HeroServices from "@/views/services/HeroServices";
import WhatWeOffer from "@/views/services/WhatWeOffer";

export const metadata = pageMetadata({
  title: "Our Services",
  description: "End-to-end study-abroad services: course and university selection, admissions, scholarship essays, visa support, test prep and pre-departure help.",
  path: "/services",
});
export default function page() {
  return (
    <div>
      <HeroServices />
      <WhatWeOffer />
      <ContactCta />
    </div>
  );
}
