import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "Lithuania";

const programs: Program[] = [
  {
    title: "Diploma / Pathway",
    group: "Pathway",
    requirements: [
      "Eligibility: High School Certificate (50%+ CGPA)",
      "Duration: 1–2 Years",
      "English: IELTS 5.0 / Duolingo 85+ (B1–B2)",
    ],
    image: "/diploma.avif",
  },
  {
    title: "Bachelor's Degree",
    group: "Undergraduate",
    requirements: [
      "Eligibility: High School Diploma (SKVC recognized / 60%+ CGPA)",
      "Duration: 3–4 Years (180–240 ECTS)",
      "English: IELTS 5.5+ / Duolingo 95+ (B2)",
    ],
    image: "/bachelors.png",
  },
  {
    title: "Master's Degree",
    group: "Postgraduate",
    requirements: [
      "Eligibility: Relevant Bachelor's Degree (SKVC recognized)",
      "Duration: 1.5–2 Years (90–120 ECTS)",
      "English: IELTS 6.0+ / Duolingo 105+ (B2–C1)",
    ],
    image: "/masters.png",
  },
  {
    title: "Master's Qualifying (MQP)",
    group: "Postgraduate",
    requirements: [
      "Eligibility: Higher Diploma or Bachelor's (Bridging)",
      "Duration: 1 Semester – 1 Year",
      "Progression: Direct entry to Master's",
    ],
    image: "/masters-quality.png",
  },
];

export default function EntryRequirementsLithuania() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
