import DestinationHero, { type HeroStat } from "../shared/DestinationHero";

type Stat = HeroStat;

const stats: Stat[] = [
  {
    value: "22+ Universities",
    label:
      "200+ English-taught programmes, admissions open to international students",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 1.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11"
      />
    ),
  },
  {
    value: "€5,000 – €15,000",
    suffix: "/ ",
    label: "Year Tuition fee",
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
  {
    value: "Permanent Residency",
    label: "Eligible after 7 years of legal residence (conditions apply)",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-8.5Z"
      />
    ),
  },
];

export default function HeroGreece() {
  return (
    <DestinationHero
      name="Greece"
      text="Study in Greece with Admission OnBoard. Get expert guidance on admissions, scholarships, and visa support for a smooth study abroad journey."
      image={{ src: "/greece-hero.png", alt: "Acropolis of Athens, Greece", width: 1672, height: 941 }}
      stats={stats}
    />
  );
}
