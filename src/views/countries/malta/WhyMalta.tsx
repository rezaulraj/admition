import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "Malta";

const reasons: Reason[] = [
  {
    title: "Study in English",
    description:
      "English is an official language of Malta, and the University of Malta and licensed institutions teach in English. You don't need to learn a new language to study.",
    icon: (
      <path d="m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.62 7 1.62-4.33L19.12 17h-3.24Z" />
    ),
  },
  {
    title: "EU-Recognised Degrees",
    description:
      "Malta follows the Bologna Process and the ECTS credit system, so licensed degrees are recognised across Europe. Your residence permit also gives you access to the Schengen Area.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "Affordable Tuition",
    description:
      "Non-EU undergraduate fees at the University of Malta are about €8,500–€10,800 a year (2026/27), and Medicine costs more. This is lower than many UK, Australian and Canadian options.",
    icon: (
      <path
        fillRule="evenodd"
        d="M3 6.5A2.5 2.5 0 0 1 5.5 4H17v3h1.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11ZM5 7h10V6H5.5a.5.5 0 0 0-.5.5V7Zm11.5 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z"
      />
    ),
  },
  {
    title: "Historic University",
    description:
      "The University of Malta was founded in 1592, making it one of Europe's oldest universities. It offers undergraduate, Master's and PhD programmes.",
    icon: (
      <path d="M12 2 2 7v2h20V7L12 2ZM4 11v7H3v2h18v-2h-1v-7h-2v7h-3v-7h-2v7h-2v-7H9v7H6v-7H4Z" />
    ),
  },
  {
    title: "Safe Mediterranean Island",
    description:
      "Malta is a compact, safe country with a warm climate and a large international student community, and it's easy to get around.",
    icon: (
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM1 11h3v2H1v-2Zm19 0h3v2h-3v-2ZM4.22 5.64l1.42-1.42 2.12 2.12-1.42 1.42-2.12-2.12Zm12.02 12.02 1.42-1.42 2.12 2.12-1.42 1.42-2.12-2.12ZM18.36 4.22l1.42 1.42-2.12 2.12-1.42-1.42 2.12-2.12ZM6.34 16.24l1.42 1.42-2.12 2.12-1.42-1.42 2.12-2.12Z" />
    ),
  },
  {
    title: "Work & Post-Study Options",
    description:
      "Non-EU students can work part-time while studying, up to 20 hours a week with a work licence. After graduation, you can apply for a post-study permit to look for work.",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
];

const backupCountries = [
  "United Kingdom",
  "Australia",
  "New Zealand",
  "Finland",
  "Greece",
  "Lithuania",
  "Hungary",
  "Romania",
  "Malta",
  "Cyprus",
].filter((c) => c !== DESTINATION); // don't offer the same country as a backup

export default function WhyMalta() {
  return (
    <DestinationWhy
      destination={DESTINATION}
      headingLead="Why Choose"
      headingAccent="Malta?"
      reasons={reasons}
      backupCountries={backupCountries}
    />
  );
}
