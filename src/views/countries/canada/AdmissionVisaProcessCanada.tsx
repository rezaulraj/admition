import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "Canada";

const steps: Step[] = [
  {
    title: "Get Admission 🎓",
    list: [
      "Apply to a Designated Learning Institution (DLI), which is a government-approved school.",
      "After admission you get a Letter of Acceptance (LOA).",
      "Most applicants also need a Provincial Attestation Letter (PAL), which you usually get through the school.",
    ],
    tip: "Since January 1, 2026, master's and PhD students at public universities do not need a PAL. Master's and PhD students at private institutions still do.",
  },
  {
    title: "Prepare Your Documents 📄",
    list: [
      "Passport: A valid passport.",
      "Admission letters: Your LOA, and your PAL if required.",
      "Proof of funds: Enough to cover first-year tuition, living costs and return travel. For applications from September 1, 2026, a single applicant outside Quebec must show CAD $23,448 for living costs, on top of tuition and travel.",
      "Accepted proof: A GIC, bank statements, a loan letter, or proof of paid tuition and housing. Officers check where your funds come from in every case.",
      "Statement of Purpose (study plan): Explain why this programme, why Canada, and your career goals.",
      "English test: An IELTS, PTE or TOEFL result.",
      "Medical & police: A medical exam and police certificate, only if IRCC asks for them or your country requires them.",
    ],
  },
  {
    title: "Apply Online 💻",
    list: [
      "Create an IRCC account and fill in the study permit application form.",
      "Upload your documents.",
      "Pay the fees: CAD $150 for the study permit and CAD $85 for biometrics.",
    ],
  },
  {
    title: "Biometrics & Medical 🩺",
    list: [
      "IRCC sends a biometrics instruction letter to your account.",
      "Give your fingerprints and photo at a VFS centre, usually within 30 days.",
      "Do the medical exam with an IRCC panel doctor if requested.",
    ],
  },
  {
    title: "Decision & Travel ✈️",
    list: [
      "If approved, you get a Port of Entry (POE) Letter of Introduction.",
      "If you need a visa (TRV), IRCC will ask you to send your passport to VFS.",
      "At the Canadian airport, show your POE letter, passport and LOA to the border officer.",
    ],
    tip: "The border officer issues your actual study permit when you arrive in Canada.",
  },
];

export default function AdmissionVisaProcessCanada() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 5-step process to secure admission at your dream university in Canada."
      image={{ src: "/admission-canada.png", alt: "Passport, visa stamps, and travel compass", width: 1669, height: 942 }}
      steps={steps}
    />
  );
}
