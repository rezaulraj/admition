import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "the UK";

const programs: Program[] = [
  {
    title: "Foundation Year",
    group: "Pathway",
    requirements: [
      "Academic: Class 12 / HSC with about 50–60%",
      "English: IELTS about 4.5–5.5 overall",
    ],
    image: "/fundation.png",
  },
  {
    title: "International Year One",
    group: "Undergraduate",
    requirements: [
      "Academic: Class 12 with about 60–70% or more, or 1 year of university study",
      "English: IELTS about 5.5–6.0 overall",
    ],
    image: "/internationalone.png",
  },
  {
    title: "Bachelor's Degree",
    group: "Undergraduate",
    duration: "3 years (4 in Scotland)",
    requirements: [
      "Academic: A-levels, IB, or strong Class 12 results (requirements vary by university)",
      "English: IELTS about 6.0–6.5 overall",
      "Please note: Lower HSC results usually mean a Foundation Year first",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Integrated Master's",
    group: "Undergraduate",
    duration: "4 years",
    requirements: [
      "Academic: Higher grades, especially in maths and science",
      "English: IELTS about 6.5–7.0 overall",
    ],
    image: "/master_intergrate.png",
  },
  {
    title: "Taught Master's",
    group: "Postgraduate",
    duration: "1 year",
    requirements: [
      "Degree: 4-year bachelor's degree with a good CGPA or percentage",
      "English: IELTS about 6.5 overall",
    ],
    image: "/master.png",
  },
  {
    title: "MBA",
    group: "Postgraduate",
    requirements: [
      "Degree: Bachelor's degree",
      "Experience: 2–3 years or more of relevant work experience",
      "English: IELTS about 6.5–7.0 overall",
    ],
    image: "/mba.png",
  },
  {
    title: "Research Master's",
    group: "Postgraduate",
    duration: "1–2 years",
    requirements: [
      "Degree: Strong bachelor's degree (about UK 2:1 equivalent)",
      "Proposal: A research proposal",
      "English: IELTS about 6.5–7.0 overall",
    ],
    image: "/research.png",
  },
  {
    title: "PhD",
    group: "Doctoral",
    duration: "3–4 years",
    requirements: [
      "Degree: Strong master's or bachelor's degree",
      "Research: A research proposal and a supervisor",
      "English: IELTS about 6.5–7.0 overall",
    ],
    image: "/phd.png",
  },
];

export default function EntryRequirementsUK() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
