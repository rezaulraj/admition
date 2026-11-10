import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "Hungary";

const reasons: Reason[] = [
  {
    title: "Globally Recognized European Degrees",
    description:
      "Non-EU students earn internationally accredited Bachelor's, Master's and PhD qualifications that follow the European Bologna framework. Hundreds of English-taught programmes are available in high-demand fields like Medicine, Engineering, IT and Business.",
    icon: (
      <path d="M12 2 4 5v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V5l-8-3Zm-1.2 13.4-3.2-3.2 1.4-1.4 1.8 1.8 4.6-4.6 1.4 1.4-6 6Z" />
    ),
  },
  {
    title: "Generous Scholarships & Low Costs",
    description:
      "Hungary offers the fully funded Stipendium Hungaricum government scholarship, which covers 100% of tuition, a monthly stipend, a housing allowance and health insurance. For self-funded students, it remains one of the most budget-friendly options in Europe.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "Legal Part-Time Work Rights",
    description:
      "Non-EU students with a valid study residence permit can legally work up to 30 hours per week during term time, under the rules of Hungary's immigration authority (OIF), and full-time during official academic holidays.",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Post-Study Career & Residency Pathways",
    description:
      "Graduates can apply for a post-study residence permit to look for work or start a business in Hungary, giving them a structured path to build a long-term international career within the EU.",
    icon: (
      <path d="M3 17 9 11l4 4 8-8v4h2V5h-6v2h4l-6.6 6.6-4-4L1.6 15.6 3 17Z" />
    ),
  },
  {
    title: "Central Location & Schengen Travel",
    description:
      "Located in the heart of Europe, Hungary lets students with a residence permit travel visa-free across the Schengen Area, while living in safe, vibrant, multicultural student cities like Budapest, Debrecen, Szeged and Pécs.",
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
].filter((c) => c !== DESTINATION); // don't offer the same country as a backup

export default function WhyHungary() {
  return (
    <DestinationWhy
      destination={DESTINATION}
      headingLead="Why Study in"
      headingAccent="Hungary?"
      intro="Here are the five strongest reasons for non-EU students to study in Hungary."
      reasons={reasons}
      backupCountries={backupCountries}
    />
  );
}
