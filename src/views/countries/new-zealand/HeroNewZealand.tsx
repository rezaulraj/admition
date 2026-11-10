import DestinationHero, { type HeroStat } from "../shared/DestinationHero";

type Stat = HeroStat;

const stats: Stat[] = [
  {
    value: "22+ Universities",
    label: "3,500+ programmes in New Zealand",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 1.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11"
      />
    ),
  },
  {
    value: "$12,000 to $68,000+",
    suffix: "NZD / year",
    label: "Tuition fees",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path
          strokeLinecap="round"
          d="M12 6.5v11M14.5 9.5c0-1.1-1.1-2-2.5-2s-2.5.9-2.5 2 1.1 1.7 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2-2.5-.9-2.5-2"
        />
      </>
    ),
  },
  {
    value: "3 Years",
    label: "Post-study work permit after graduation",
    icon: (
      <>
        <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
        <path
          strokeLinecap="round"
          d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17"
        />
      </>
    ),
  },
];

export default function HeroNewZealand() {
  return (
    <DestinationHero
      name="New Zealand"
      text="Study in New Zealand with Admission OnBoard. Get expert guidance on admissions, scholarships, and visa support for a smooth study abroad journey."
      image={{ src: "/newzeland.png", alt: "Auckland Sky Tower, New Zealand", width: 1918, height: 820 }}
      stats={stats}
    />
  );
}
