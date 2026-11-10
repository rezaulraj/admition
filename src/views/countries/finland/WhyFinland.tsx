import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "Finland";

const reasons: Reason[] = [
  {
    title: "World-Class Education System",
    description:
      "Finland consistently ranks at the top globally for educational innovation. Universities use a flat hierarchy, so students work directly with professors on practical, industry-focused projects.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "Type-A Residence Permit & Fast-Track PR",
    description:
      "Students receive a continuous Type-A Residence Permit for the full duration of their degree. All years spent studying count 100% toward the continuous residence required for Permanent Residency (PR) and Finnish citizenship.",
    icon: (
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13ZM8.5 8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-4 9h8c0-1.66-1.79-3-4-3s-4 1.34-4 3Zm9-8.5v1.5h6V8.5h-6Zm0 3.5v1.5h6V12h-6Z" />
    ),
  },
  {
    title: "Generous Part-Time Work Allowance",
    description:
      "Non-EU international students can work legally for up to 30 hours per week during study terms, and full-time during semester breaks, to support their living costs.",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Flexible 2-Year Post-Study Work Permit",
    description:
      "Graduates receive a 2-year post-study work permit. It can be used continuously or split into shorter periods across the 3 years after graduation.",
    icon: (
      <path d="M7 2v2H5.5A2.5 2.5 0 0 0 3 6.5v13A2.5 2.5 0 0 0 5.5 22h13a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 18.5 4H17V2h-2v2H9V2H7Zm-2 7h14v10.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V9Zm2 3v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Z" />
    ),
  },
  {
    title: "High Return on Investment (Scholarships & Early-Bird Deals)",
    description:
      "Most institutions offer 10%–30% early-bird discounts for paying fees promptly, alongside 50%–100% merit-based tuition waivers. The national Finland Scholarship covers 100% of Master's tuition plus a €5,000 relocation grant.",
    icon: (
      <path
        fillRule="evenodd"
        d="M3 6.5A2.5 2.5 0 0 1 5.5 4H17v3h1.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11ZM5 7h10V6H5.5a.5.5 0 0 0-.5.5V7Zm11.5 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z"
      />
    ),
  },
  {
    title: "Family Inclusion with Unrestricted Work Rights",
    description:
      "Your spouse and dependants can join you on family residence permits, and spouses get unrestricted full-time work rights in any sector.",
    icon: (
      <path d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8.5 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 13c-3.3 0-6 1.8-6 4v3h12v-3c0-2.2-2.7-4-6-4Zm8.5 1c-.6 0-1.2.07-1.75.2A5.2 5.2 0 0 1 16 17v3h6v-2.5c0-1.93-2.46-3.5-5.5-3.5Z" />
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
].filter((c) => c !== DESTINATION);

export default function WhyFinland() {
  return (
    <DestinationWhy
      destination={DESTINATION}
      headingLead="Why Choose"
      headingAccent="Finland?"
      reasons={reasons}
      backupCountries={backupCountries}
    />
  );
}
