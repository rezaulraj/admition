import DestinationHero, { type HeroStat } from "../shared/DestinationHero";

type Stat = HeroStat;

const stats: Stat[] = [
  {
    value: "164+ Universities",
    label: "70,000+ programmes in Uk",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 1.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11"
      />
    ),
  },
  {
    value: "£9,000 to £25,000",
    suffix: "/ year",
    label: "Tuition fees",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path
          strokeLinecap="round"
          d="M14.5 8.5a2.5 2.5 0 0 0-4.5 1.5V15m-1.5-3h4M8.5 15.5h7"
        />
      </>
    ),
  },
  {
    // Graduate Route: 18 months for Bachelor's/Master's applications made from 1 Jan 2027
    value: "18 Months",
    label: "Post-study work (3 years for PhD)",
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

export default function HeroUK() {
  return (
    <DestinationHero
      name="United Kingdom"
      text="Study in the United Kingdom with Admission OnBoard. Get expert guidance on admissions, scholarships, and visa support for a smooth study abroad journey."
      image={{ src: "/uk.png", alt: "Tower Bridge, United Kingdom", width: 1536, height: 1024 }}
      stats={stats}
    />
  );
}
