import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "Italy";

const programs: Program[] = [
  {
    title: "Bachelor's (Laurea Triennale)",
    group: "Undergraduate",
    duration: "3 years",
    requirements: [
      "Schooling: 12 years (if your country has 10 or 11 years, you need a foundation year or university credits first)",
      "Entry test: A subject test such as TOLC-E or TOLC-I",
      "English: IELTS about 5.5–6.5 or TOEFL about 72–90",
      "Documents: Declaration of Value or CIMEA statement",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Master's (Laurea Magistrale)",
    group: "Postgraduate",
    duration: "2 years",
    requirements: [
      "Degree: A recognised Bachelor's in a related field with enough matching credits",
      "Grades: A minimum grade, set by each university",
      "English: IELTS about 6.0–6.5 or TOEFL 80+",
    ],
    image: "/master.png",
  },
  {
    title: "Single-Cycle Master's",
    group: "Undergraduate",
    duration: "5–6 years",
    requirements: [
      "Fields: Medicine (6 years), Dentistry (6), Pharmacy (5), Architecture (5), Law (5)",
      "Schooling: 12 years of schooling",
      "Entry test: A national or university entry test, such as IMAT for Medicine in English",
      "Seats: Places for non-EU students are limited by quota, so admission is competitive",
    ],
    image: "/signle-master.png",
  },
  {
    title: "Specialising Master's",
    group: "Postgraduate",
    duration: "1 year",
    requirements: [
      "1st level: Requires a Bachelor's degree",
      "2nd level: Requires a Master's degree",
      "Selection: CV, an interview, and sometimes work experience",
      "Please note: It does not qualify you for a PhD",
    ],
    image: "/spatical-master.png",
  },
  {
    title: "PhD (Dottorato)",
    group: "Doctoral",
    duration: "3–4 years",
    requirements: [
      "Degree: A Master's degree",
      "Proposal: A research proposal",
      "Selection: Success in a competitive call (interview, publications, recommendation letters, sometimes GRE)",
    ],
    image: "/phd.png",
  },
];

export default function EntryRequirementsItaly() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
