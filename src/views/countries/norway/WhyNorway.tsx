import DestinationWhy, { type Reason } from "../shared/DestinationWhy";

const DESTINATION = "Norway";

const reasons: Reason[] = [
  {
    title: "High-Quality Academic System & Innovation",
    description:
      "Norwegian universities rank highly worldwide for academic excellence, innovative teaching and cutting-edge research. Learning is practical and student-centred, with a flat hierarchy between professors and students that encourages critical thinking and independent research.",
    icon: (
      <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
    ),
  },
  {
    title: "300+ English-Taught Master's Programmes",
    description:
      "Most undergraduate programmes are taught in Norwegian, but Norway offers over 300 English-taught Master's programmes in high-demand fields such as Renewable Energy, Maritime Engineering, Computer Science, Environmental Sustainability, Business Administration and Social Sciences.",
    icon: (
      <path d="m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.62 7 1.62-4.33L19.12 17h-3.24Z" />
    ),
  },
  {
    title: "High Quality of Life & Safety",
    description:
      "Norway regularly ranks among the top countries in the UN Human Development Index and the World Happiness Report. Clean cities, reliable public services, strong social welfare and a very low crime rate make it one of the safest places to study.",
    icon: (
      <path d="M12 2 4 5v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V5l-8-3Zm-1.2 13.4-3.2-3.2 1.4-1.4 1.8 1.8 4.6-4.6 1.4 1.4-6 6Z" />
    ),
  },
  {
    title: "Strong Career Prospects",
    description:
      "Norway has a robust, specialised job market with high wages and strong employee protections. Sectors like IT, Engineering, Renewable Energy, Maritime and Offshore Technology, Finance and Healthcare actively look for skilled international talent.",
    icon: (
      <path d="M3 17 9 11l4 4 8-8v4h2V5h-6v2h4l-6.6 6.6-4-4L1.6 15.6 3 17Z" />
    ),
  },
  {
    title: "Work While You Study",
    description:
      "Non-EU students with a valid study permit can work part-time for up to 20 hours a week during term, and full-time during official university breaks, which helps cover a good share of living costs.",
    icon: (
      <path d="M9 2h6a2 2 0 0 1 2 2v2h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h4V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z" />
    ),
  },
  {
    title: "English Is Widely Spoken",
    description:
      "Norwegian is the official language, but over 90% of Norwegians speak fluent English. You can manage banking, transport, housing and shopping without learning Norwegian first.",
    icon: (
      <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1Zm4 5v2h8V9H8Zm0 3.5v2h5v-2H8Z" />
    ),
  },
  {
    title: "12-Month Post-Study Work Permit",
    description:
      "After graduating with a Bachelor's, Master's or PhD, non-EU students can apply for a 12-month job-seeker permit to stay in Norway and find work in their field.",
    icon: (
      <path d="M7 2v2H5.5A2.5 2.5 0 0 0 3 6.5v13A2.5 2.5 0 0 0 5.5 22h13a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 18.5 4H17V2h-2v2H9V2H7Zm-2 7h14v10.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V9Zm2 3v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Z" />
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

export default function WhyNorway() {
  return (
    <DestinationWhy
      destination={DESTINATION}
      headingLead="Why Choose"
      headingAccent="Norway?"
      reasons={reasons}
      backupCountries={backupCountries}
    />
  );
}
