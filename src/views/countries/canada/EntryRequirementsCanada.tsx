import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "Canada";

const programs: Program[] = [
  {
    title: "Certificate",
    group: "Pathway",
    duration: "About 1 year",
    requirements: [
      "Requirements: High school diploma (HSC) or equivalent, and English proof (IELTS about 6.0). Some programmes have their own extra requirements.",
    ],
    image: "/oneyear.png",
  },
  {
    title: "Diploma / Advanced Diploma",
    group: "Pathway",
    duration: "2–3 years",
    requirements: [
      "Requirements: HSC or equivalent, with subjects such as Maths or Science for some programmes, and English proof (IELTS about 6.0).",
      "Note: Highly competitive programmes ask for higher marks. A diploma programme must be on IRCC's eligible list for a PGWP.",
    ],
    image: "/diploma.png",
  },
  {
    title: "Bachelor's Degree",
    group: "Undergraduate",
    duration: "3–4 years",
    requirements: [
      "Requirements: 12 years of schooling (HSC), the required subjects for the programme, and English proof (IELTS about 6.5).",
      "Marks: Each university sets its own, for example at least 75% overall at U of T Mississauga. Top programmes ask for much higher.",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Graduate Certificate / Diploma",
    group: "Postgraduate",
    duration: "1–2 years",
    requirements: [
      "Requirements: A previous diploma or bachelor's degree, and English proof (IELTS about 6.5).",
      "Note: Some programmes want work experience.",
    ],
    image: "/master.png",
  },
  {
    title: "Master's",
    group: "Postgraduate",
    duration: "1–2 years",
    requirements: [
      "Requirements: A 4-year bachelor's, a minimum average of about B+ (76% at UBC), and English proof (IELTS about 6.5, no band below 6.0).",
      "Documents: SOP, 2–3 reference letters (LOR) and a CV.",
    ],
    image: "/master.png",
  },
  {
    title: "PhD",
    group: "Doctoral",
    duration: "4–6 years",
    requirements: [
      "Requirements: A master's degree with research ability, a research proposal, and English proof (IELTS about 7.0).",
      "Documents: CV, SOP and 3 references.",
    ],
    image: "/phd.png",
  },
];

export default function EntryRequirementsCanada() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
