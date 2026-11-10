import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "Canada";

const reasons: Reason[] = [
  {
    title: "Top-ranked qualifications",
    description:
      "Canadian degrees are respected worldwide, alongside those from the US and UK. Universities such as the University of Toronto, UBC and McGill consistently rank among the world's top 50, giving you a valuable qualification in every major industry.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm-6 10v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "Post-Graduation Work Permit (PGWP)",
    description:
      "Eligible graduates can apply for an open Post-Graduation Work Permit, with no job offer needed. Key points:",
    points: [
      "Graduates of programmes of 2 years or more, and of eligible master's degrees, can receive a permit of up to 3 years.",
      "You must study at an eligible institution and meet the language and field-of-study requirements in place when you apply.",
      "It lets you gain Canadian work experience straight after graduation.",
    ],
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Work while studying",
    description:
      "Eligible students can work off campus for up to 24 hours per week during academic terms and full-time during scheduled breaks. Many programmes also include paid co-op placements that give you real industry experience.",
    icon: (
      <path d="M4 6a2 2 0 0 1 2-2h12v3h1a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm2 0v1h10V6H6Zm11 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    ),
  },
  {
    title: "Strong value for money",
    description:
      "Average international tuition is about CAD 41,700 a year for university degrees and about CAD 15,000–18,000 a year for college diplomas. This is generally lower than in the US or UK, giving you a strong return on your investment.",
    icon: <path d="M4 20V10h4v10H4Zm6 0V4h4v16h-4Zm6 0v-7h4v7h-4Z" />,
  },
  {
    title: "Clear pathways to permanent residence",
    description:
      "Canadian work experience can help you qualify for Permanent Residency through Express Entry (Canadian Experience Class) and Provincial Nominee Programs (PNPs). Each pathway has its own requirements, and residence is never guaranteed.",
    icon: <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3L12 3Z" />,
  },
];

const backupCountries = [
  "United Kingdom",
  "Canada",
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

export default function WhyCanada() {
  return (
    <DestinationWhy
      destination={DESTINATION}
      headingLead="Why Study in"
      headingAccent="Canada?"
      reasons={reasons}
      backupCountries={backupCountries}
    />
  );
}
