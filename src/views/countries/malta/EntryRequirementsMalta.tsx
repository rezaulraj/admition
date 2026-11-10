import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "Malta";

const programs: Program[] = [
  {
    title: "Foundation / Certificate",
    group: "Pathway",
    requirements: [
      "Who it's for: Students whose school results fall short of Maltese entry rules, or who need to improve their English",
      "Entry: Secondary school certificate, with about 50–60% overall",
      "English: Typically IELTS 5.0–5.5",
    ],
    image: "/fundation.png",
  },
  {
    title: "Higher / Advanced Diploma",
    group: "Pathway",
    requirements: [
      "Where: Vocational and technical programmes at MCAST, ITS and private institutions",
      "Entry: Higher secondary certificate (12 years), with relevant subjects such as Maths for IT",
      "English: Typically IELTS 5.5–6.0",
    ],
    image: "/diploma.png",
  },
  {
    title: "Bachelor's Degree",
    group: "Undergraduate",
    requirements: [
      "Entry: A recognised higher secondary certificate (A-Levels, IB, HSC or similar), plus subject requirements such as Maths for Engineering or Biology for Health",
      "English: Typically IELTS 6.0 (no band below 5.5) or TOEFL 80+",
      "Waiver: Students from English-speaking countries may request an English waiver",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Master's Degree",
    group: "Postgraduate",
    requirements: [
      "Entry: A recognised 3- or 4-year Bachelor's in a related field, with about 55% or a 2.5/4.0 GPA or higher",
      "Executive MBA: Usually needs 2–3 years of work experience",
      "English: Typically IELTS 6.5 (no band below 6.0)",
    ],
    image: "/master.png",
  },
  {
    title: "PhD",
    group: "Doctoral",
    requirements: [
      "Entry: A Master's degree, a research proposal and a faculty supervisor",
      "English: Typically IELTS 7.0, depending on the faculty",
    ],
    image: "/phd.png",
  },
];

export default function EntryRequirementsMalta() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
