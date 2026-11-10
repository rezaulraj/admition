import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "Cyprus";

const steps: Step[] = [
  {
    title: "Choose Your University & Apply",
    description:
      "Pick a university and programme recognised by the Republic of Cyprus. Compare fees, English requirements, scholarships and intake dates. Then send your application with your transcripts, passport copy and English proof. After acceptance, pay the required deposit and receive your acceptance letter.",
  },
  {
    title: "Prepare Your Documents",
    listIntro: "Gather:",
    list: [
      "Academic certificates and transcripts",
      "Valid passport",
      "Bank statement showing you can cover your costs",
      "Medical test results (chest X-ray, hepatitis B and C, syphilis, HIV)",
      "Apostille or legalisation on required documents",
    ],
    tip: "Medical results are valid for about 4 months, so time your tests carefully.",
  },
  {
    title: "Entry Permit, Travel & Join Classes ✈️",
    description:
      "Your university submits your file to the Civil Registry and Migration Department (CRMD). Wait in your home country while it is processed. If approved, you receive your Entry Permit (blue slip) by email.",
    after:
      "Travel to Cyprus and apply for your student Temporary Residence Permit soon after arrival, following your university's deadline. Prepare health insurance, a medical certificate and proof of funds. Renew your permit every year while you study.",
  },
  {
    title: "Graduate, Find a Job & Get a Work Permit 💼",
    description:
      "Master's and PhD graduates (EQF level 7 or higher) can apply for a residence permit of up to 12 months to find a job or start a business in their field. Bachelor's graduates do not qualify for this permit, so they usually need a job offer and employer sponsorship.",
    after:
      "When you get a job offer, your employer applies for your work and residence permit. Renew it as required, work legally, and pay your taxes and social insurance.",
  },
  {
    title: "Apply for Long-Term Residence (PR) 🏡",
    description:
      "After 5 years of continuous legal residence, you can apply for EU Long-Term Resident status.",
    listIntro: "Main requirements:",
    list: [
      "Stable income without relying on social assistance",
      "Housing (rental agreement or property title)",
      "Health insurance",
      "Clean criminal record",
      "Basic language knowledge (a Greek test may be requested)",
    ],
  },
];

export default function AdmissionVisaProcessCyprus() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 5-step process to secure admission at your dream university in Cyprus."
      image={{ src: "/studycy.png", alt: "Passport, visa stamps, and travel compass", width: 1672, height: 940 }}
      steps={steps}
    />
  );
}
