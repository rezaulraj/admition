import DoubleCta from "@/views/services/double-entry-visa-india/DoubleCta";
import HeroDoubleEntry from "@/views/services/double-entry-visa-india/HeroDoubleEntry";
import HowItWorksDoubleEntry from "@/views/services/double-entry-visa-india/HowItWorksDoubleEntry";
import IntroDoubleEntry from "@/views/services/double-entry-visa-india/IntroDoubleEntry";
import TimelineDoubleEntry from "@/views/services/double-entry-visa-india/TimelineDoubleEntry";
import WhoItsFor from "@/views/services/double-entry-visa-india/WhoItsFor";

export default function page() {
  return (
    <div>
      <HeroDoubleEntry />
      <IntroDoubleEntry />
      <WhoItsFor />
      <TimelineDoubleEntry />
      <HowItWorksDoubleEntry />
      <DoubleCta />
    </div>
  );
}
