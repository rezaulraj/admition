import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "Finland";

const programs: Program[] = [
  {
    title: "Bachelor's Degrees",
    group: "Undergraduate",
    duration: "3–4 years",
    requirements: [
      "Academic eligibility: High school diploma / HSC / IB / A-Levels",
      "Selection: International online entrance exam (Joint Exam) or SAT scores",
      "Language: IELTS 6.0–6.5 / TOEFL 80+ / entrance exam English module",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Academic Master's",
    group: "Postgraduate",
    duration: "Research Universities (2 years)",
    requirements: [
      "Eligibility: Relevant 3- or 4-year Bachelor's degree",
      "Work experience: None required (direct entry)",
      "Selection: GPA, SOP, motivation letter, and GRE/GMAT for some business and tech fields",
      "Language: IELTS 6.5–7.0 / TOEFL 90+",
    ],
    image: "/master.png",
  },
  {
    title: "Professional Master's",
    group: "Postgraduate",
    duration: "UAS Institutions (1–1.5 years)",
    requirements: [
      "Eligibility: Relevant Bachelor's degree",
      "Work experience: Minimum 2 years (24 months) of relevant work experience after graduation",
      "Selection: Pre-task, portfolio or online interview",
      "Language: IELTS 6.0–6.5 / TOEFL 80+",
    ],
    image: "/profational.png",
  },
  {
    title: "Doctoral / PhD Degrees",
    group: "Doctoral",
    duration: "3–4 years",
    requirements: [
      "Eligibility: Relevant Master's degree + detailed research proposal",
      "Tuition: Free for all nationalities",
    ],
    image: "/phd.png",
  },
];

export default function EntryRequirementsFinland() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
