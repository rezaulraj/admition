import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "United Kingdom";

const reasons: Reason[] = [
  {
    title: "Shorter, focused degrees",
    description:
      "Most UK master's programmes are completed in one year, and most bachelor's degrees take three years (four in Scotland). This reduces total tuition and living costs and lets graduates start their careers earlier.",
    icon: (
      <path d="M6 2h12v2h-1v3.6L13.4 12l3.6 4.4V20h1v2H6v-2h1v-3.6L10.6 12 7 7.6V4H6V2Z" />
    ),
  },
  {
    title: "Strong academic reputation",
    description:
      "The UK is home to many of the world's leading universities, including Oxford, Cambridge, Imperial College London, UCL and the University of Edinburgh. UK degrees are widely recognised by employers and universities around the world.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm-6 10v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "Quality and standards",
    description:
      "UK universities must meet nationally set standards for teaching and quality. Only recognised institutions can award UK degrees, so check that your chosen university appears on the UK government's official list of recognised bodies.",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.4 13.4L7.2 12l1.4-1.4 2 2 4.8-4.8 1.4 1.4-6.2 6.2Z" />
    ),
  },
  {
    title: "Research and innovation",
    description:
      "The UK has a strong research culture, with well-equipped laboratories and close links between universities and industry. Students can study subjects such as AI, engineering, medicine, business, finance and creative industries with up-to-date resources.",
    icon: (
      <path d="M9 2h6v2h-1v5.2l5.6 9.4A2 2 0 0 1 17.9 21H6.1a2 2 0 0 1-1.7-2.4L10 9.2V4H9V2Z" />
    ),
  },
  {
    title: "Post-study work opportunity",
    description:
      "After completing an eligible degree, international students can apply for the Graduate Route. It allows graduates to work or look for work in the UK without needing an employer sponsor. Graduates can later move to a skilled work route if they get a suitable job offer from a licensed employer. The length of stay is set by government rules, so check GOV.UK for current details.",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "Work while studying",
    description:
      "Students on a Student visa studying at degree level can usually work part-time during term and full-time during official holidays. The weekly hour limit is set by the visa conditions, and exceeding it can affect your visa. Part-time work helps with living costs and builds experience.",
    icon: (
      <path d="M4 6a2 2 0 0 1 2-2h12v3h1a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm2 0v1h10V6H6Zm11 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    ),
  },
  {
    title: "Student support and scholarships",
    description:
      "Universities offer career services, academic support, wellbeing services and international student advice. Many also offer scholarships, including the Chevening, Commonwealth and university-specific awards. Eligibility and funding vary, so check each scheme's official website.",
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

export default function WhyUK() {
  return (
    <DestinationWhy
      destination={DESTINATION}
      inName="the United Kingdom"
      headingLead="Why Choose"
      headingAccent="the UK?"
      reasons={reasons}
      backupCountries={backupCountries}
    />
  );
}
