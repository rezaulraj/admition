import DestinationEntry, { type Program } from "../shared/DestinationEntry";

const DESTINATION = "Romania";

const programs: Program[] = [
  {
    title: "Preparatory Year",
    group: "Pathway",
    requirements: [
      "Academic: High School Diploma or equivalent",
      "Purpose: Romanian language preparation for Romanian-taught programmes",
      "Documents: Transcripts, legalized/recognized certificates",
      "Approval: Romanian Ministry of Education Acceptance Letter",
      "Visa: Tuition payment, financial proof, PCC & health insurance",
    ],
    image: "/preparatory.png",
  },
  {
    title: "Bachelor's Degree",
    group: "Undergraduate",
    requirements: [
      "Academic: High School Diploma / equivalent",
      "Documents: Academic transcripts & legalized/recognized certificates",
      "Language: English or Romanian proficiency as required",
      "Admission: Entrance exam may apply to some programmes",
      "Approval: Ministry of Education Acceptance Letter",
    ],
    image: "/bachelors.png",
  },
  {
    title: "Master's Degree",
    group: "Postgraduate",
    requirements: [
      "Academic: Recognized Bachelor's Degree",
      "Documents: Degree certificate & transcripts",
      "Additional: CV, Motivation Letter and programme-specific documents",
      "Language: English or Romanian proficiency as required",
      "Approval: Ministry of Education Acceptance Letter",
    ],
    image: "/masters.png",
  },
  {
    title: "PhD / Doctorate",
    group: "Doctoral",
    requirements: [
      "Academic: Recognized Master's Degree",
      "Documents: Academic certificates & transcripts",
      "Additional: Research Proposal and supervisor/doctoral school approval",
      "Assessment: Interview or admission evaluation may apply",
      "Approval: Ministry of Education Acceptance Letter",
    ],
    image: "/phd.jpg",
  },
];

export default function EntryRequirementsRomania() {
  return <DestinationEntry destination={DESTINATION} programs={programs} />;
}
