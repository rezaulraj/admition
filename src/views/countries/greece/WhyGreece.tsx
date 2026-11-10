import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "Greece";

const reasons: Reason[] = [
  {
    title: "Degrees Recognised Across Europe",
    description:
      "Greece has 24 public universities. Undergraduate programmes use the ECTS credit system, so your credits are easy to transfer and have recognised elsewhere in Europe.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "200+ Programmes Taught in English",
    description:
      "Choose from Bachelor's, Master's, joint and dual degrees. You don't need to speak Greek to study here.",
    icon: (
      <path d="m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.62 7 1.62-4.33L19.12 17h-3.24Z" />
    ),
  },
  {
    title: "Wide Choice of Subjects",
    description:
      "English-taught options include Medicine, Pharmacy, Law, Artificial Intelligence & Data Science, Engineering, Business, Humanities and more.",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    ),
  },
  {
    title: "Affordable Compared to Many European Countries",
    description:
      "Non-EU students typically pay about €5,000–€15,000 a year for a Bachelor's and €3,000–€7,000 a year for a Master's. Fees vary by programme and university, so check the official programme finder for exact costs.",
    icon: (
      <path
        fillRule="evenodd"
        d="M3 6.5A2.5 2.5 0 0 1 5.5 4H17v3h1.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11ZM5 7h10V6H5.5a.5.5 0 0 0-.5.5V7Zm11.5 4.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z"
      />
    ),
  },
  {
    title: "Work While You Study, and Plan Your Next Step",
    description:
      "Non-EU students with a study permit can work part-time under Greek rules. Eligible graduates may also be able to stay and look for a job after finishing their degree, subject to immigration conditions.",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Study Where It All Began",
    description:
      "Live in the country that gave the world philosophy, democracy and science, with historic cities, islands, beaches and a sunny Mediterranean climate.",
    icon: (
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM1 11h3v2H1v-2Zm19 0h3v2h-3v-2ZM4.22 5.64l1.42-1.42 2.12 2.12-1.42 1.42-2.12-2.12Zm12.02 12.02 1.42-1.42 2.12 2.12-1.42 1.42-2.12-2.12ZM18.36 4.22l1.42 1.42-2.12 2.12-1.42-1.42 2.12-2.12ZM6.34 16.24l1.42 1.42-2.12 2.12-1.42-1.42 2.12-2.12Z" />
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

export default function WhyGreece() {
  return (
    <DestinationWhy
      destination={DESTINATION}
      headingLead="Why Study in"
      headingAccent="Greece?"
      reasons={reasons}
      backupCountries={backupCountries}
    />
  );
}
