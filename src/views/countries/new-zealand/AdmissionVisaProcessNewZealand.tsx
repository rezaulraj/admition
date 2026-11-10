import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "New Zealand";

const steps: Step[] = [
  {
    title: "One-on-One Free Counselling",
    description:
      "Sit down with expert counsellors to explore your options, shortlist institutions in New Zealand, and understand what's required.",
  },
  {
    title: "Confirm Your Admission",
    description:
      "Apply to your preferred institution in New Zealand and receive your official Offer of Place.",
  },
  {
    title: "Submit Updated Documents",
    description:
      "Provide your latest academic and financial records, along with proof of health and character requirements.",
  },
  {
    title: "Pay Tuition & Receive Your Confirmation",
    description:
      "Pay your tuition fees and receive your Confirmation of Enrolment, the document your visa application will need.",
  },
  {
    title: "Apply For Your Student Visa & Prepare To Fly",
    description:
      "We help you lodge your New Zealand student visa application with Immigration New Zealand, then it's time to prepare for departure to your new campus.",
  },
];

export default function AdmissionVisaProcessNewZealand() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 5-step process to secure admission at your dream institution in New Zealand."
      image={{ src: "/studynew.png", alt: "Passport, visa stamps, and travel compass", width: 1672, height: 940 }}
      steps={steps}
    />
  );
}
