import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "Hungary";

const programs: Program[] = [
  {
    title: "Bachelor's Degree (BA/BSc)",
    group: "Undergraduate",
    requirements: [
      "Academic: High School / 12th Grade or equivalent",
      "Grades: Usually 60%+",
      "English: IELTS 5.5–6.0 or equivalent",
      "Selection: Interview or subject test",
    ],
    image: "/bachelors.png",
  },
  {
    title: "Master's Degree (MA/MSc)",
    group: "Postgraduate",
    requirements: [
      "Academic: Relevant Bachelor's degree",
      "English: IELTS 6.0–6.5 or equivalent",
      "Documents: Diploma + transcripts",
      "Selection: Interview / portfolio",
    ],
    image: "/masters.png",
  },
  {
    title: "Integrated Master's (Medicine/Dentistry/Pharmacy)",
    group: "Undergraduate",
    requirements: [
      "Academic: High School with strong Biology & Chemistry",
      "English: IELTS or university assessment",
      "Selection: Entrance exam + interview",
      "Alternative: Foundation / Pre-Medical course",
    ],
    image: "/master_intergrate.png",
  },
  {
    title: "Doctoral Degree (PhD/DLA)",
    group: "Doctoral",
    requirements: [
      "Academic: Relevant Master's degree",
      "English: IELTS 6.5–7.0 or equivalent",
      "Documents: Research proposal + academic records",
      "Selection: Supervisor approval + interview",
    ],
    image: "/phd.jpg",
  },
  {
    title: "Foundation / Preparatory Course",
    group: "Pathway",
    requirements: [
      "Academic: High School / 12th Grade",
      "English: IELTS, or options without IELTS",
      "Selection: Document review + placement test",
    ],
    image: "/diploma.avif",
  },
];

export default function EntryRequirementsHungary() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
