import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "Australia";

const reasons: Reason[] = [
  {
    title: "World-class universities",
    description:
      "Australia has many universities ranked among the best in the world, including several in the global top 100. The Group of Eight (Go8) are its leading research universities. Rankings are a useful starting point, but you should also compare the course, location and cost.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm-6 10v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "A wide range of study levels",
    description:
      "Students can choose from foundation programmes, diplomas, bachelor's degrees (typically 3 years), master's degrees (usually 1–2 years for coursework) and PhDs. Foundation and diploma options help students who need a bridge into a degree. Only courses registered for international students are eligible for a student visa.",
    icon: (
      <path d="M12 2 3 6.5 12 11l9-4.5L12 2Zm-9 9 9 4.5 9-4.5v2.5L12 18l-9-4.5V11Zm0 5 9 4.5 9-4.5v2.5L12 23l-9-4.5V16Z" />
    ),
  },
  {
    title: "Post-study work rights",
    description:
      "Eligible graduates can apply for a temporary graduate visa. It allows them to live and work in Australia after study without employer sponsorship. Key points:",
    points: [
      "The length of stay depends on your qualification level.",
      "Applicants must meet an age limit and a minimum Australian study requirement.",
      "Graduates who studied and lived in a designated regional area may be eligible for extra time.",
      "The visa is temporary and does not lead directly to permanent residency.",
    ],
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Work while studying",
    description:
      "Student visa holders can work part-time during their course and have fewer limits during official breaks. Master's by research and PhD students have more flexibility. Work limits are strictly enforced, so treat work as a supplement to your funds rather than your main way of paying for study.",
    icon: (
      <path d="M4 6a2 2 0 0 1 2-2h12v3h1a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm2 0v1h10V6H6Zm11 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    ),
  },
  {
    title: "Convenient for Asian students",
    description:
      "Australia's time zones are close to many Asian countries, which makes travel and family contact easier. Major cities have large Asian communities and widely available Asian food and cultural services. Universities provide international student support, including orientation, English support and career services.",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 5h2v5.6l3.7 2.2-1 1.7L11 13.7V7Z" />
    ),
  },
  {
    title: "Safe, multicultural environment",
    description:
      "Australian campuses host students from all over the world. The environment is generally safe and English-speaking, which helps you build language skills, global networks and cross-cultural experience.",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.4 13.4L7.2 12l1.4-1.4 2 2 4.8-4.8 1.4 1.4-6.2 6.2Z" />
    ),
  },
  {
    title: "Scholarships",
    description:
      "Both the Australian government and universities offer scholarships for international students, including awards aimed at students from eligible developing countries. Eligibility and funding vary by scheme and university.",
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

export default function WhyAustralia() {
  return <DestinationWhy destination={DESTINATION} headingLead="Why Choose" headingAccent="Australia?" reasons={reasons} backupCountries={backupCountries} />;
}
