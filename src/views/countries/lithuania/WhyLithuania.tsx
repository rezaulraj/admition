import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "Lithuania";

const reasons: Reason[] = [
  {
    featured: true,
    title: "Explore 28 Universities & Colleges",
    description:
      "International students can choose from 15 universities and 13 colleges, with a wide range of English-taught programmes across Business, IT, Engineering, Health Sciences, and more.",
    icon: (
      <path d="M12 2 2 7v2h20V7L12 2ZM4 11v7H3v2h18v-2h-1v-7h-2v7h-3v-7h-2v7h-2v-7H9v7H6v-7H4Z" />
    ),
  },
  {
    title: "Affordable, High-Quality EU Education",
    description:
      "Lithuania offers fully European Union-accredited degrees with tuition fees significantly lower than in Western Europe. Annual tuition starts from €1,300–€4,000 for Bachelor’s degrees and €2,300–€6,500 for Master’s degrees (specialised fields like Medicine and Dentistry run higher).",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "Expanding English-Taught Programmes",
    description:
      "Higher education institutions across Lithuania offer over 500 fully English-taught Bachelor’s, Master’s, and Doctorate programmes, with specialised strengths in Information Technology, Business Administration, Engineering, and Life Sciences.",
    icon: (
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5a.5.5 0 0 0 0 1H20v3H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
    ),
  },
  {
    title: "Accessible Cost of Living",
    description:
      "Student life remains highly affordable compared to most Western EU countries. On average, international students spend between €500 and €800 per month, which covers dormitory or apartment accommodation, groceries, local transport, and utilities.",
    icon: <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3L12 3Z" />,
  },
  {
    title: "Strategic Schengen Area Location",
    description:
      "As part of the Schengen Area, holding a Lithuanian Temporary Residence Permit (TRP) or National Visa gives international students visa-free travel across 29 European member states during academic breaks and weekends.",
    icon: (
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
    ),
  },
  {
    title: "Flexible Academic Pathways",
    description:
      "Selected higher education institutions offer varied entry options, including foundation years, pathway diplomas, and preparatory courses, providing structured entry into full degree programmes for students who need academic or language bridging.",
    icon: (
      <path d="M12 2 3 7l9 5 7-3.89V16h2V7L12 2Zm-7 8.27V15c0 2.76 3.58 5 8 5s8-2.24 8-5v-4.73l-8 4.45-8-4.45Z" />
    ),
  },
  {
    title: "Post-Study Work Permit",
    description:
      "International graduates from non-EU countries are legally eligible to extend their temporary residence permit for up to 12 months after graduation to seek employment or launch a business in Lithuania.",
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

export default function WhyLithuania() {
  return (
    <DestinationWhy
      destination={DESTINATION}
      headingLead="Why Study in"
      headingAccent="Lithuania?"
      reasons={reasons}
      backupCountries={backupCountries}
    />
  );
}
