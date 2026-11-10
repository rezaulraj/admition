import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "Romania";

const steps: Step[] = [
  {
    title: "Choose University & Program",
    description:
      "Select an accredited Romanian university and suitable Bachelor’s, Master’s, PhD, or Preparatory Year program.",
  },
  {
    title: "Prepare & Submit Documents",
    description:
      "Prepare passport, academic certificates/transcripts, birth certificate, language proof, medical certificate and other required documents. Translate and legalize/apostille documents where required, then submit the application to the university.",
  },
  {
    title: "Receive Letter of Acceptance",
    description:
      "The university submits the eligible file to Romania’s Ministry of Education. After approval, the Letter of Acceptance is issued. Processing can take up to 30 working days.",
  },
  {
    title: "Apply for Student Visa",
    description:
      "After receiving the Letter of Acceptance, pay the required tuition fee and prepare financial proof, accommodation, health insurance, criminal record/PCC and other visa documents. Submit the application.",
  },
  {
    title: "Travel → Enrol → Residence Permit",
    description:
      "After visa approval, travel to Romania, complete university enrolment and apply for a Student Residence Permit through the Romanian Immigration Inspectorate (IGI).",
  },
];

export default function AdmissionVisaProcessRomania() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 5-step process to secure admission at your dream university in Romania."
      image={{ src: "/studyrom.png", alt: "Passport, visa stamps, and travel compass", width: 1672, height: 940 }}
      steps={steps}
    />
  );
}
