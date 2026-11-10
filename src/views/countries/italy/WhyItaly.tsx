import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "Italy";

const reasons: Reason[] = [
  {
    title: "Low Tuition & Scholarships",
    description:
      "Public university fees for non-EU students are roughly €900–€4,000 a year. Regional DSU scholarships are need-based, and qualifying students can get a tuition waiver, subsidised housing, meals and a cash allowance.",
    icon: (
      <path
        fillRule="evenodd"
        d="M3 6.5A2.5 2.5 0 0 1 5.5 4H17v3h1.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11ZM5 7h10V6H5.5a.5.5 0 0 0-.5.5V7Zm11.5 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z"
      />
    ),
  },
  {
    title: "800+ English-Taught Programmes",
    description:
      "Choose from STEM, Business, Data Science, Architecture, Medicine and more at historic universities like Bologna, Sapienza, Politecnico di Milano and Padua. You don't need Italian to study.",
    icon: (
      <path d="m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.62 7 1.62-4.33L19.12 17h-3.24Z" />
    ),
  },
  {
    title: "Work While You Study",
    description:
      "Non-EU students can work part-time for up to 20 hours a week (1,040 hours a year).",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Career After Graduation",
    description:
      "Graduates can apply for a post-study job-search permit, or convert their student permit to a work permit without waiting for the yearly quota. Northern Italy's industry, fashion, engineering and tech hubs offer many openings.",
    icon: (
      <path d="M3 17 9 11l4 4 8-8v4h2V5h-6v2h4l-6.6 6.6-4-4L1.6 15.6 3 17Z" />
    ),
  },
  {
    title: "Path to Permanent Residence",
    description:
      "After 5 years of legal residence, you can apply for the EU Long-Term Residence Permit. Study years count, but you must first convert your student permit to a work permit, because the long-term permit can't be issued directly from a study permit. After 10 years, you can apply for citizenship.",
    icon: <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3L12 3Z" />,
  },
  {
    title: "Travel Freely in Europe",
    description:
      "Your student permit lets you travel visa-free across the Schengen Area for up to 90 days in any 180-day period.",
    icon: (
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
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
  "Italy",
  "Norway",
].filter((c) => c !== DESTINATION); // don't offer the same country as a backup

export default function WhyItaly() {
  return (
    <DestinationWhy
      destination={DESTINATION}
      headingLead="Why Study in"
      headingAccent="Italy?"
      reasons={reasons}
      backupCountries={backupCountries}
    />
  );
}
