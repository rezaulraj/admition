import DestinationHero, { type HeroStat } from "../shared/DestinationHero";

type Stat = HeroStat;

const stats: Stat[] = [
  {
    value: "22+ Universities",
    label: "350+ English-taught programmes open to international students",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 1.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11"
      />
    ),
  },
  {
    value: "€8,500 – €25,500",
    suffix: "/ year",
    label: "Tuition fee (about NOK 100,000 – 300,000+)",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path
          strokeLinecap="round"
          d="M15 9a3.5 3.5 0 1 0 0 6M7.5 11h5M7.5 13h5"
        />
      </>
    ),
  },
  {
    value: "Post-Study Work",
    label: "12-month work permit after graduation",
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

export default function HeroNorway() {
  return (
    <DestinationHero
      name="Norway"
      text="Study in Norway with Admission OnBoard. Get expert guidance on admissions, scholarships, and visa support for a smooth study abroad journey."
      image={{ src: "/norway.png", alt: "Fjord and mountains in Norway", width: 1882, height: 836 }}
      stats={stats}
    />
  );
}
