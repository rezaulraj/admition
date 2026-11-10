import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const programs: Program[] = [
  {
    title: "Foundation Program",
    group: "Pathway",
    duration: "About 1 year",
    summary:
      "A pathway course of about 1 year that prepares students for entry into a bachelor's degree.",
    requirements: [
      "Academic: Class 12 / HSC or equivalent",
      "English: IELTS about 5.0–5.5",
    ],
    image: "/fundation.png",
  },
  {
    title: "Diploma / Advanced Diploma",
    group: "Pathway",
    duration: "1–2 years",
    summary:
      "A 1–2 year course that can often be credited towards the first year of a bachelor's degree.",
    requirements: [
      "Academic: Class 12 or equivalent",
      "English: IELTS about 5.5–6.0",
    ],
    image: "/diploma.png",
  },
  {
    title: "Bachelor's Degree",
    group: "Undergraduate",
    duration: "Usually 3 years",
    summary:
      "The standard undergraduate degree, usually 3 years, and longer for fields such as engineering and medicine.",
    requirements: [
      "Academic: Year 12 or equivalent, with the score set by the university",
      "Please note: Applicants from 12-year systems may need a Foundation or Diploma first",
      "English: IELTS about 6.0–6.5",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Bachelor's with Honours",
    group: "Undergraduate",
    duration: "+1 year or 4-year integrated",
    summary:
      "An extra research-focused year after a bachelor's degree, or a 4-year integrated course, and a common route into research degrees.",
    requirements: [
      "Academic: A strong bachelor's result",
      "English: IELTS about 6.5",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Double Degree",
    group: "Undergraduate",
    duration: "4–5 years",
    summary:
      "Two bachelor's degrees studied together in less time than separately, usually 4–5 years.",
    requirements: [
      "Academic: The higher entry requirement of the two courses",
      "English: IELTS about 6.0–6.5",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Graduate Certificate",
    group: "Postgraduate",
    duration: "0.5–1 year",
    summary:
      "A short postgraduate course of about 0.5–1 year that builds skills in a field.",
    requirements: ["Degree: Bachelor's degree", "English: IELTS about 6.5"],
    image: "/master.png",
  },
  {
    title: "Graduate Diploma",
    group: "Postgraduate",
    duration: "1–2 years",
    summary:
      "A postgraduate course of about 1–2 years, often used to change fields or as a bridge to a master's.",
    requirements: ["Degree: Bachelor's degree", "English: IELTS about 6.5"],
    image: "/diploma.png",
  },
  {
    title: "Master's by Coursework",
    group: "Postgraduate",
    duration: "1–2 years",
    summary:
      "A taught postgraduate degree of 1–2 years, with classes, assignments and sometimes a project.",
    requirements: [
      "Degree: Recognised bachelor's degree with a good GPA or percentage",
      "Please note: A 3-year bachelor's may need a Graduate Diploma or Honours first",
      "English: IELTS about 6.5 (at least 6.0 in each skill)",
    ],
    image: "/master.png",
  },
  {
    title: "MBA",
    group: "Postgraduate",
    duration: "1–2 years",
    summary: "A professional management master's degree, usually 1–2 years.",
    requirements: [
      "Degree: Bachelor's degree",
      "Experience: 2–3 years or more of work experience",
      "English: IELTS about 6.5–7.0",
    ],
    image: "/mba.png",
  },
  {
    title: "Master's by Research",
    group: "Postgraduate",
    duration: "1–2 years",
    summary: "A 1–2 year degree based on an independent research thesis.",
    requirements: [
      "Degree: Strong bachelor's degree, often with Honours",
      "Research: Research proposal and supervisor",
      "English: IELTS about 6.5–7.0",
    ],
    image: "/research.png",
  },
  {
    title: "Extended Master's (Law, Medicine and similar)",
    group: "Postgraduate",
    duration: "3–4 years",
    summary:
      "A 3–4 year professional degree that leads directly into careers such as law and medicine.",
    requirements: [
      "Degree: Bachelor's degree with a strong GPA",
      "Selection: Possible admission test or interview",
      "English: The requirement depends on the profession",
    ],
    image: "/master.png",
  },
  {
    title: "PhD",
    group: "Doctoral",
    duration: "3–4 years",
    summary:
      "The highest research degree, usually 3–4 years, ending in an original thesis.",
    requirements: [
      "Degree: Honours bachelor's or master's degree",
      "Research: Research proposal and supervisor",
      "English: IELTS about 6.5–7.0",
    ],
    image: "/phd.png",
  },
  {
    title: "Professional Doctorate",
    group: "Doctoral",
    summary:
      "A research-based doctorate focused on professional practice, such as in education, engineering, business or health.",
    requirements: [
      "Degree: Master's degree",
      "Experience: Relevant professional experience",
      "English: IELTS about 6.5–7.0",
    ],
    image: "/phd.png",
  },
];

export default function EntryRequirementsAustralia() {
  return <DestinationEntry destination="Australia" programs={programs} />;
}
