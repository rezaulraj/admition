import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "New Zealand";

const reasons: Reason[] = [
  {
    title: "Globally ranked universities",
    description:
      "All eight of New Zealand's public universities sit in the top 3% worldwide in the QS rankings. Rankings are only a guide, so the course content, city and total cost matter as well.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm-6 10v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "Regulated student welfare",
    description:
      "Providers must sign up to the government's Pastoral Care Code of Practice before they can enrol international students. The Code covers safety, wellbeing and fair treatment. Qualifications are placed on the New Zealand Qualifications and Credentials Framework (NZQCF), which makes levels easy to compare.",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.4 13.4L7.2 12l1.4-1.4 2 2 4.8-4.8 1.4 1.4-6.2 6.2Z" />
    ),
  },
  {
    title: "Choice of study levels",
    description:
      "Options include foundation programmes, diplomas, bachelor's degrees (usually 3 years), postgraduate certificates and diplomas, master's degrees and PhDs. A student visa is only available for courses at approved providers.",
    icon: (
      <path d="M12 2 3 6.5 12 11l9-4.5L12 2Zm-9 9 9 4.5 9-4.5v2.5L12 18l-9-4.5V11Zm0 5 9 4.5 9-4.5v2.5L12 23l-9-4.5V16Z" />
    ),
  },
  {
    title: "Work after graduation",
    description:
      "Graduates with a qualification at Level 7 or above can generally apply for a Post-Study Work Visa with open work rights.",
    points: [
      "The length depends on the qualification level and the study completed in New Zealand.",
      "A new short-term graduate work visa is being introduced for some graduates whose qualifications do not meet the Post-Study Work Visa criteria.",
      "These visas support job search and work experience, but they do not guarantee residence.",
    ],
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Part-time work during study",
    description:
      "Eligible students can work part-time in the academic year and full-time during scheduled holidays. The limit has been raised to 25 hours per week for eligible students, though some visas still carry a lower limit and need a variation of conditions. Work rights depend on the visa and course type. Work income should supplement, not replace, the funds needed for study.",
    icon: (
      <path d="M4 6a2 2 0 0 1 2-2h12v3h1a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm2 0v1h10V6H6Zm11 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    ),
  },
  {
    title: "A route towards residence",
    description:
      "Graduates can progress from study to work visas and then to residence through the Skilled Migrant Category or employer-supported routes. New Zealand qualifications earn extra recognition in the points system. Outcomes depend on occupation, wage, experience and English, and residence is never guaranteed.",
    icon: <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3L12 3Z" />,
  },
  {
    title: "Suitable for Asian students",
    description:
      "New Zealand has a sizable Asian community, particularly in Auckland, with Asian food and cultural services widely available. Universities offer international student support, including orientation, English help and career services.",
    icon: (
      <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19c0-3 2.7-5 6-5s6 2 6 5v1H2v-1Zm13.5 1v-1c0-1.6-.6-3-1.6-4 .6-.2 1.3-.3 2.1-.3 3.3 0 6 2 6 5v.3h-6.5Z" />
    ),
  },
  {
    title: "Safe and welcoming",
    description:
      "The country is generally safe and English-speaking, which helps students build language skills, international networks and cross-cultural experience.",
    icon: (
      <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.19 11.44 6.46 11.7a1.5 1.5 0 0 0 2.08 0c.27-.26 6.46-6.45 6.46-11.7C19.5 5.36 16.14 2 12 2Zm0 10.5A3 3 0 1 1 12 6.5a3 3 0 0 1 0 6Z" />
    ),
  },
  {
    title: "Scholarships and fees",
    description:
      "Both the government and universities offer scholarships, including some aimed at students from developing countries. International PhD students pay the same fees as domestic students. Eligibility and funding differ by scheme.",
    icon: (
      <path d="M12 2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 16.8 6.1 20l1.3-6.5L2.5 8.9l6.6-.8L12 2Z" />
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

export default function WhyNewZealand() {
  return (
    <DestinationWhy
      destination={DESTINATION}
      headingLead="Why Choose"
      headingAccent="New Zealand?"
      reasons={reasons}
      backupCountries={backupCountries}
    />
  );
}
