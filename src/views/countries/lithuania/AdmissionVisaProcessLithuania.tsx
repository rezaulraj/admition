import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "Lithuania";

const steps: Step[] = [
  {
    title: "Choose Your University & Course",
    description:
      "Select your preferred Bachelor’s, Master’s, or other eligible programme and check the entry requirements.",
  },
  {
    title: "Apply for Admission",
    description:
      "Submit your academic documents, passport, English proficiency proof, CV and other required documents to the university. Receive your Offer/Admission Letter.",
  },
  {
    title: "Prepare Documents & Complete MIGRIS",
    description:
      "Complete the required PCC collection & legalization/attestation, financial and other documents, then submit your application through MIGRIS for the required residence procedure.",
  },
  {
    title: "Biometrics → Decision → TRP",
    description:
      "Attend the required biometrics/document verification appointment. After Migration Department assessment and a positive decision, obtain your Temporary Residence Permit (TRP).",
  },
  {
    title: "Travel to Lithuania & Join Classes ✈️",
    description:
      "After receiving the required travel/residence authorization, book your flight, arrange accommodation, travel to Lithuania, complete university registration, and start your classes.",
  },
];

export default function AdmissionVisaProcessLithuania() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 5-step process to secure admission at your dream university in Lithuania."
      image={{ src: "/lithuania-des.png", alt: "Passport, visa stamps, and travel compass", width: 1672, height: 940 }}
      steps={steps}
    />
  );
}
