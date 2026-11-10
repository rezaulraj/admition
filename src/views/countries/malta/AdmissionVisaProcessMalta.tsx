import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "Malta";

const steps: Step[] = [
  {
    title: "Get Admission 🎓",
    description:
      "Apply to a Malta institution offering an MQF Level 5+ programme (a Bachelor's is Level 6 and a Master's is Level 7). Accept the offer and pay the tuition deposit.",
  },
  {
    title: "Apply for the Type D Student Visa 🛂",
    description:
      "Submit your application through the Maltese visa channel for your country.",
    listIntro: "Prepare:",
    list: [
      "3 months of bank statements showing at least 75% of Malta's minimum wage for each month of study (roughly €950 a month)",
      "Health insurance with cover of at least €30,000",
      "Proof of accommodation for your first 14 nights",
      "Your acceptance letter and payment receipt",
    ],
  },
  {
    title: "Get Your Study Residence Permit 🏠",
    description:
      "Apply to Identità as soon as you arrive in Malta. Renew it every year by keeping good attendance and passing your exams.",
    tip: "Want to work? Request Jobsplus authorisation first, and keep to a maximum of 20 hours a week.",
  },
  {
    title: "Request the Post-Study Permit 🔍",
    description:
      "Apply once after finishing your MQF Level 5+ course, while your student permit is still valid. Use the 9 months to find a full-time job.",
  },
  {
    title: "Switch to a Single Permit 💼",
    description:
      "Ask your employer to sponsor your combined work and residence permit (Single Permit). Renew it each year while you stay employed.",
  },
  {
    title: "Apply for Long-Term Residence (PR) 🏡",
    description: "Apply after 5 years of legal, continuous residence in Malta.",
    listIntro: "Before applying:",
    list: [
      "Keep each absence under 6 months and your total time abroad under 10 months",
      "Earn at least the minimum wage for 2 years, and keep your payslips and FS3 forms",
      "Complete the 100-hour \u201cI Belong\u201d course with a score of at least 75%",
      "Pass the Maltese language test (MQF Level 2) with at least 65%",
    ],
  },
];

export default function AdmissionVisaProcessMalta() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 6-step process to secure admission at your dream university in Malta."
      image={{ src: "/studymal.png", alt: "Passport, visa stamps, and travel compass", width: 1672, height: 940 }}
      steps={steps}
    />
  );
}
