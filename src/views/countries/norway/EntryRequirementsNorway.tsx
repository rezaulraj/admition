import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "Norway";

const programs: Program[] = [
  {
    title: "Foundation / Preparatory Year",
    group: "Pathway",
    requirements: [
      "Who it's for: Students whose diploma doesn't meet Norway's entry rules (the GSU list)",
      "Duration: About 1 year",
      "Focus: Norwegian language, academic English and an introduction to Norwegian society",
      "Entry: A secondary school diploma and basic English",
    ],
    image: "/fundation.png",
  },
  {
    title: "Bachelor's",
    group: "Undergraduate",
    duration: "3 years (180 ECTS)",
    requirements: [
      "Language: Most are taught in Norwegian, and only a few are in English",
      "Entry: A diploma that meets the GSU list for your country. Some countries also need 1–2 years of university study at home",
      "English: Typically IELTS 6.0 or TOEFL 80",
      "Norwegian-taught: Norwegian proficiency of about B2 is required",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Master's",
    group: "Postgraduate",
    duration: "1.5–2 years (90–120 ECTS)",
    requirements: [
      "Why it matters: The main route for international students, with many English-taught programmes",
      "Entry: A recognised 3- or 4-year Bachelor's in a related field, with a minimum grade (usually C or better)",
      "English: Typically IELTS 6.5 or TOEFL 90",
      "Documents: CV, motivation letter and recommendation letters. Some business programmes also ask for GMAT/GRE",
    ],
    image: "/master.png",
  },
  {
    title: "PhD",
    group: "Doctoral",
    duration: "3–4 years",
    requirements: [
      "Funding: A PhD is a paid university job, and no tuition is charged",
      "Entry: A Master's with strong grades, a research proposal and a competitive interview",
      "English: Requirements vary by department",
    ],
    image: "/phd.png",
  },
];

export default function EntryRequirementsNorway() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
