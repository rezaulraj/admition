import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "New Zealand";

const programs: Program[] = [
  {
    title: "Foundation Programme / Certificate",
    group: "Pathway",
    summary: "A bridge course into a bachelor's degree.",
    requirements: [
      "Academic: Class 12 / HSC or equivalent",
      "English: IELTS about 5.0–5.5",
    ],
    image: "/fundation.png",
  },
  {
    title: "Diploma",
    group: "Pathway",
    level: "Level 5–6",
    summary:
      "A vocational or academic course that can often be credited towards a degree.",
    requirements: [
      "Academic: Class 12 or equivalent",
      "English: IELTS about 5.5–6.0",
    ],
    image: "/diploma.png",
  },
  {
    title: "Bachelor's Degree",
    group: "Undergraduate",
    level: "Level 7",
    duration: "Usually 3 years",
    summary:
      "The main undergraduate degree, usually 3 years, and longer for fields such as engineering, medicine and architecture.",
    requirements: [
      "Academic: University entrance standard, or an overseas equivalent assessed by the university",
      "Please note: Students from 12-year school systems may need a Foundation programme or first-year university study",
      "English: IELTS about 6.0 overall, around 5.5 minimum in each skill",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Conjoint (Double) Degree",
    group: "Undergraduate",
    summary:
      "Two bachelor's degrees completed together in less time than studying them separately.",
    requirements: [
      "Academic: The higher of the two degrees' entry requirements",
      "English: IELTS about 6.0–6.5",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Graduate Certificate / Graduate Diploma",
    group: "Postgraduate",
    level: "Level 7",
    summary: "A short course for building skills or changing field.",
    requirements: ["Degree: Bachelor's degree", "English: IELTS about 6.0–6.5"],
    image: "/bachelor.png",
  },
  {
    title: "Bachelor's with Honours",
    group: "Postgraduate",
    level: "Level 8",
    summary:
      "An additional research-focused year and a common stepping stone to research degrees.",
    requirements: [
      "Academic: Strong bachelor's result",
      "English: IELTS about 6.5",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Postgraduate Certificate / Postgraduate Diploma",
    group: "Postgraduate",
    level: "Level 8",
    summary: "Advanced study that often bridges into a master's.",
    requirements: ["Degree: Bachelor's degree", "English: IELTS about 6.5"],
    image: "/master.png",
  },
  {
    title: "Master's Degree",
    group: "Postgraduate",
    level: "Level 9",
    duration: "1–2 years",
    summary: "Coursework, research or thesis-based, usually 1–2 years.",
    requirements: [
      "Degree: Recognised bachelor's with good grades, or Honours or a postgraduate diploma",
      "Please note: A 3-year bachelor's may need extra study first, depending on the university",
      "English: IELTS about 6.5, around 6.0 minimum in each skill",
    ],
    image: "/master.png",
  },
  {
    title: "MBA",
    group: "Postgraduate",
    summary: "A professional management master's degree.",
    requirements: [
      "Degree: Bachelor's degree",
      "Experience: Relevant work experience",
      "English: IELTS about 6.5–7.0",
    ],
    image: "/mba.png",
  },
  {
    title: "Doctorate / PhD",
    group: "Doctoral",
    level: "Level 10",
    summary:
      "The highest research degree, completed with an original thesis.",
    requirements: [
      "Degree: Honours or master's degree",
      "Research: Research proposal and an agreed supervisor",
      "English: IELTS about 6.5",
    ],
    image: "/phd.png",
  },
  {
    title: "Professional Degrees (Medicine, Law, Health Sciences)",
    group: "Professional",
    summary:
      "Very competitive, with higher entry standards, selection tests or interviews, and sometimes higher English scores.",
    image: "/profetional.png",
  },
];

export default function EntryRequirementsNewZealand() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
