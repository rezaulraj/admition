import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "Cyprus";

const programs: Program[] = [
  {
    title: "Foundation Program (Pre-University)",
    group: "Pathway",
    requirements: [
      "Duration: 6 months – 1 year (30–60 ECTS)",
      "Academic: High School Certificate / O-Levels / WAEC / HSC (minimum 40%–50% aggregate)",
      "English: IELTS 4.0–4.5 or an internal university English test",
    ],
    image: "/fundation.png",
  },
  {
    title: "Associate Degree (Diploma / Higher Diploma)",
    group: "Undergraduate",
    requirements: [
      "Duration: 2 years (120 ECTS)",
      "Academic: High School Certificate / 12th Grade diploma (minimum 50% pass mark)",
      "English: IELTS 5.0–5.5, TOEFL iBT 50–65, or a placement test",
    ],
    image: "/diploma.png",
  },
  {
    title: "Bachelor's Degree (Undergraduate)",
    group: "Undergraduate",
    requirements: [
      "Duration: 4 years (240 ECTS), 6 years for Medicine",
      "Academic: High School Leaving Certificate (12th Grade / A-Levels / HSC) with a 55%–65% GPA",
      "English: IELTS 5.5–6.0 or TOEFL iBT 65–79",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Master's Degree (Postgraduate)",
    group: "Postgraduate",
    requirements: [
      "Duration: 1.5–2 years (90–120 ECTS)",
      "Academic: Recognized 3- or 4-year Bachelor's degree with a CGPA of 2.5/4.0 (55%–60%)",
      "English: IELTS 6.0–6.5 or a Medium of Instruction (MOI) certificate",
      "Other: CV and Statement of Purpose (SOP)",
    ],
    image: "/master.png",
  },
  {
    title: "Doctoral Degree (PhD)",
    group: "Doctoral",
    requirements: [
      "Duration: 3–5 years (180–240 ECTS)",
      "Academic: Relevant Master's degree with strong academic standing",
      "English: IELTS 6.5–7.0 or TOEFL iBT 90+",
      "Other: Detailed research proposal, CV and recommendation letters",
    ],
    image: "/phd.png",
  },
];

export default function EntryRequirementsCyprus() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
