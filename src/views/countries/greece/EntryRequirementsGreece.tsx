import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "Greece";

const programs: Program[] = [
  {
    title: "Bachelor's",
    group: "Undergraduate",
    duration: "3 to 6 years",
    requirements: [
      "Duration: Most take 4 years. Engineering, Dentistry, Pharmacy, Agriculture, Forestry and Fine Arts take 5, and Medicine takes 6",
      "English-taught: The portal lists 16 programmes, including Medicine, Pharmacy, Law, AI & Data Science, Business, Archaeology and Engineering",
      "Fees (English-taught): €5,000–€15,000 a year",
      "Entry (English-taught): A recognised secondary diploma and proof of English (often IELTS 6.0–6.5, but it varies by programme). Apply via SiG",
      "Greek-taught: More than 1,000 programmes, with free tuition",
      "Entry (Greek-taught): You and your parents must not be Greek nationals. Apply through the Ministry of Education's system with Apostille-certified, Greek-translated documents. You need enough Greek to study in Greek. Check the dates for the next intake (the 2026–27 window was 2–9 July 2026)",
    ],
    image: "/bachelor.png",
  },
  {
    title: "Master's",
    group: "Postgraduate",
    duration: "1 to 2 years",
    requirements: [
      "Programmes: 170+ English-taught programmes",
      "Fees: About €3,000–€7,000 a year",
      "Entry: A recognised Bachelor's degree, usually in a related field, and proof of English",
      "Extra: Some programmes, such as MBAs, also ask for GMAT/GRE scores or work experience",
      "Deadlines: Each programme sets its own rules and deadlines",
    ],
    image: "/master.png",
  },
  {
    title: "PhD",
    group: "Doctoral",
    duration: "3+ years",
    requirements: [
      "Entry: A Master's degree is generally required",
      "Conditions: Departments set their own conditions",
      "Documents: You usually need a research proposal and a supervisor",
      "Where to look: Find PhD opportunities on MaTSiG",
    ],
    image: "/phd.png",
  },
];

export default function EntryRequirementsGreece() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
