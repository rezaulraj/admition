import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "Italy";

const steps: Step[] = [
  {
    title: "Apply & Pre-Enrol 🎓",
    description:
      "Choose a programme on Universitaly (universitaly.it) and apply to the university. You need your diploma or degree, a CIMEA statement or Declaration of Value, and English proof. Some programmes also require an entry test.",
    tip: "Non-EU students living abroad must pre-enrol on Universitaly to start the study visa process.",
  },
  {
    title: "Apply for Scholarships 💶",
    list: [
      "MAECI (Italian Government): €1,200 a month for 9 months (€10,800 in total), for Master's, PhD, AFAM and research only, not Bachelor's. Apply at studyinitaly.esteri.it. The 2026–27 deadline was 26 March 2026, and the next call is expected in early 2027.",
      "DSU (regional, need-based): A tuition waiver plus, depending on the region, cash, housing and meals. Amounts vary, so check your regional agency's official call. Apply after admission, usually in summer.",
      "University awards: Check each university's website.",
    ],
  },
  {
    title: "Visa & Residence Permit 🛂",
    description:
      "Apply for the study visa at the Italian embassy in your country.",
    tip: "After arriving, apply for your residence permit at the Questura within 8 working days.",
  },
  {
    title: "Study & Work Part-Time 💼",
    description:
      "You can work up to 20 hours a week (1,040 hours a year). Renew your permit on time.",
  },
  {
    title: "Stay & Settle 🚀",
    list: [
      "Job-search permit: 12 months after your Bachelor's or Master's. Apply before your student permit expires.",
      "Work permit: Switch once you have a job offer. Conversion runs through the annual Decreto Flussi, so confirm quota details with the Questura.",
      "Long-term residence: The EU Long-Term Residence Permit after 5 years. Study years count, but you can't apply directly from a student permit, so convert to a work permit first. You need income at least equal to the assegno sociale, suitable housing and A2 Italian, and absences can't exceed 6 months at a time or 10 months in total.",
      "Citizenship: You can usually apply after 10 years of legal residence.",
    ],
  },
];

export default function AdmissionVisaProcessItaly() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 5-step process to secure admission at your dream university in Italy."
      image={{ src: "/studyita.png", alt: "Passport, visa stamps, and travel compass", width: 1680, height: 936 }}
      steps={steps}
    />
  );
}
