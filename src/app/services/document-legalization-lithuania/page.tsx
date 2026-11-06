import HeroLegalization from "@/views/services/document-legalization-lithuania/HeroLegalization";
import HowItWork from "@/views/services/document-legalization-lithuania/HowItWork";
import Intro from "@/views/services/document-legalization-lithuania/Intro";
import LegalizationCta from "@/views/services/document-legalization-lithuania/LegalizationCta";
import RouteCards from "@/views/services/document-legalization-lithuania/RouteCards";
import WhyServiceUs from "@/views/services/document-legalization-lithuania/WhyServiceUs";

export default function page() {
  return (
    <div>
      <HeroLegalization />
      <Intro />
      <RouteCards />
      <WhyServiceUs />
      <HowItWork />
      <LegalizationCta />
    </div>
  );
}
