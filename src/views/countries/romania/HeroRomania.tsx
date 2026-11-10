import DestinationHero, { type HeroStat } from "../shared/DestinationHero";

type Stat = HeroStat;

const stats: Stat[] = [
  {
    value: "50+ Universities",
    suffix: "/ institutions",
    label: "open for international student admissions.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 1.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11"
      />
    ),
  },
  {
    value: "€2,000 to €7,000",
    suffix: "/ ",
    label: "Year Tuition Fee",
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
    value: "PR Benefits",
    label: "After 5 years of legal residence",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-8.5Z"
      />
    ),
  },
];

export default function HeroRomania() {
  return (
    <DestinationHero
      name="Romania"
      text="Study in Romania with Admission OnBoard. Get expert guidance on admissions, scholarships, and visa support for a smooth study abroad journey."
      image={{ src: "/romania-hero.png", alt: "Palace of the Parliament, Bucharest, Romania", width: 1672, height: 941 }}
      stats={stats}
    />
  );
}
