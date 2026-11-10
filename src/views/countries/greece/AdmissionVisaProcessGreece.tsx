import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "Greece";

const steps: Step[] = [
  {
    title: "Get Admitted 🎓",
    description: "Apply to a recognised Greek university.",
    list: [
      "Pick a university and programme recognised by Greece. Compare fees, English requirements, scholarships and intake dates.",
      "Send your application with your transcripts, passport copy and English proof.",
      "Receive your acceptance letter.",
    ],
  },
  {
    title: "Get Your Student Visa 🛂",
    description:
      "Apply for the National Type D visa at the Greek embassy in your country.",
    list: [
      "Documents: acceptance letter, passport, proof of funds and health insurance",
    ],
    tip: "Rules vary by embassy, so confirm the requirements with your local embassy.",
  },
  {
    title: "Get Your Residence Permit 🏠",
    description:
      "After arriving, apply for a student residence permit at the local migration office. It can take a few months.",
  },
  {
    title: "Study & Work Part-Time 💼",
    description:
      "Part-time work is allowed with authorisation, usually up to 20 hours a week during term, so check the conditions on your permit. Keep your permit valid and your studies on track.",
  },
  {
    title: "Stay After Graduation 🚀",
    list: [
      "Job-search permit: 12 months to find a job or start a business. Apply at least 30 days before your student permit expires.",
      "Work permit: Switch to this once you have a job offer.",
      "Long-term residence (M1): After 5 years of continuous legal residence, with study years counting as half. You need stable income, health insurance and basic Greek, and you can't be absent for more than 6 months at a time or 10 months in total.",
    ],
  },
];

export default function AdmissionVisaProcessGreece() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 5-step process to secure admission at your dream university in Greece."
      image={{ src: "/studygre.png", alt: "Passport, visa stamps, and travel compass", width: 1672, height: 940 }}
      steps={steps}
    />
  );
}
