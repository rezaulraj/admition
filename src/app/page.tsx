// import Accreditations from "@/views/home/Accreditations";
// import BranchLocations from "@/views/home/BranchLocations";
// import CtaBanner from "@/components/common/CtaBanner";
import DreamDestinations from "@/components/common/DreamDestinations";
import FaqSection from "@/views/home/FaqSection";
import HeroHome from "@/views/home/HeroHome";
import LatestBlogs from "@/views/home/LatestBlogs";
// import OurPartners from "@/views/home/OurPartners";
// import PartnerInstitutions from "@/views/home/PartnerInstitutions";
// import StudentVideoStories from "@/views/success-stories/StudentVideoStories";
// import VisaSuccessStories from "@/views/home/VisaSuccessStories";
import WhyChose from "@/views/home/WhyChose";
// import ContactCta from "@/components/common/ContactCta";
import HowWeHelp from "@/views/home/HowWeHelp";
// import FindStudyProgram from "@/views/home/FindStudyProgram";
// import HelpPartnerInstitutions from "@/views/home/HelpPartnerInstitutions";
import VisionTargets from "@/views/home/VisionTargets";
import TheJourney from "@/views/home/TheJourney";
import SuccessStoriesGallery from "@/components/common/SuccessStoriesGallery";
import UniversityPartner from "@/components/common/UniversityPartner";
import ContactFooter from "@/views/home/ContactFooter";
import OurOffices from "@/views/contact/OurOffices";

export default function Home() {
  return (
    <div>
      <HeroHome />
      {/* <WhyChose /> */}
      {/* <Accreditations /> */}
      <VisionTargets />
      <SuccessStoriesGallery />
      {/* <FindStudyProgram /> */}
      <HowWeHelp />
      <TheJourney />
      <UniversityPartner country="United Kingdom" />
      {/* <PartnerInstitutions /> */}
      {/* <VisaSuccessStories /> */}
      {/* <CtaBanner /> */}

      <DreamDestinations />
      {/* <StudentVideoStories />
      <OurPartners /> */}
      {/* <HelpPartnerInstitutions /> */}
      <LatestBlogs />
      {/* <BranchLocations /> */}
      <FaqSection />
      {/* <ContactCta /> */}
      <OurOffices />
      <ContactFooter />
    </div>
  );
}
