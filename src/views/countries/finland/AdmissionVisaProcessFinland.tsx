import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "Finland";

const steps: Step[] = [
  {
    title: "Apply & Get Admitted 🎓",
    description:
      "Apply through Studyinfo.fi, where you can choose up to 6 programmes. Non-EU/EEA students usually pay tuition. If you're offered a place, you may need to pay the first-year fee to secure it, unless you receive a scholarship.",
  },
  {
    title: "Apply for Your Student Residence Permit 🛂",
    description:
      "Apply online through Enter Finland (enterfinland.fi). The permit can be granted for the whole length of your studies.",
    listIntro: "You will need:",
    list: [
      "Proof of funds: about €800 a month (€9,600 a year)",
      "Insurance: valid health insurance for your stay",
    ],
  },
  {
    title: "Study & Work Part-Time 💼",
    description:
      "You can usually work up to 30 hours a week during term and full-time during holidays.",
    tip: "Work limits can change, so check the current rules on Migri (migri.fi).",
  },
  {
    title: "Post-Study Job-Search Permit 🔍",
    description:
      "After graduating, apply for a residence permit to look for work or start a business, valid for up to 2 years. If your student permit was an A permit, this one will be an A permit too.",
    list: ["Proof of funds: about €19,200 for the full 2 years"],
  },
  {
    title: "Switch to a Work or Specialist Permit 🏢",
    description:
      "Once you have a job or your own business, switch to a work-based permit (worker, specialist or entrepreneur).",
    tip: "Apply before your current permit expires to avoid any gap in your stay.",
  },
  {
    title: "Apply for Permanent Residence (P Permit) 🏠",
    listIntro: "Migri's main routes are:",
    list: [
      "Finnish degree path: Complete a Master's (university or UAS), a university Bachelor's, or a licentiate or doctoral degree in Finland. You need A2 Finnish or Swedish (or 15 university credits in the language) and enough income, and you must not have spent long periods outside Finland after graduating. There is no fixed residence period, but a UAS Bachelor's doesn't qualify. You can't apply while your permit is for studies, so this usually follows job-seeking or work.",
      "6-year path: 6 years on an A permit, 2 years of work history and B1 Finnish or Swedish.",
      "4-year paths: 4 years plus an income of €40,000 a year, or a recognised foreign Master's plus 2 years of work, or C1 language skills plus 3 years of work.",
    ],
  },
];

export default function AdmissionVisaProcessFinland() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 6-step process to secure admission at your dream university in Finland."
      image={{ src: "/studyfin.png", alt: "Passport, visa stamps, and travel compass", width: 1672, height: 940 }}
      steps={steps}
    />
  );
}
