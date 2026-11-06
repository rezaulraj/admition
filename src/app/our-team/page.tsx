import HeroOurTeam from "@/views/our-team/HeroOurTeam";
import JoinOurTeam from "@/views/our-team/JoinOurTeam";
import TeamCta from "@/views/our-team/TeamCta";
import TeamIntro from "@/views/our-team/TeamIntro";
import TeamLeadership from "@/views/our-team/TeamLeadership";
import TeamMembers from "@/views/our-team/TeamMembers";
import TeamValues from "@/views/our-team/TeamValues";

export default function page() {
  return (
    <div>
      <HeroOurTeam />
      <TeamIntro />
      <TeamLeadership />
      <TeamMembers />
      <TeamValues />
      <JoinOurTeam />
      <TeamCta />
    </div>
  );
}
