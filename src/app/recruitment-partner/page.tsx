import { pageMetadata } from "@/lib/seo";
// import HeroRecruitmentPartner from "@/views/recruitment-partner/HeroRecruitmentPartner";
import PartnerCta from "@/views/recruitment-partner/PartnerCta";
import PartnerExpand from "@/views/recruitment-partner/PartnerExpand";
import RiseWithEveryStep from "@/views/recruitment-partner/RiseWithEveryStep";
import WhatYouWillGain from "@/views/recruitment-partner/WhatYouWillGain";

export const metadata = pageMetadata({
  title: "Become a Recruitment Partner",
  description: "Grow your education business by becoming an Admission On Board recruitment partner.",
  path: "/recruitment-partner",
});

export default function page() {
  return (
    <div>
      {/* <HeroRecruitmentPartner /> */}
      <PartnerExpand />
      <WhatYouWillGain />
      <RiseWithEveryStep />
      <PartnerCta />
    </div>
  );
}
