import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "Norway";

const steps: Step[] = [
  {
    title: "University Application & Offer Letter 🎓",
    list: [
      "Choose a programme: Apply directly to an accredited public or private university in Norway, usually through its online portal between October and December for the August intake.",
      "Meet entry criteria: A recognised Bachelor's degree (for Master's applicants), or high school credentials plus 1–2 years of higher education (for Bachelor's applicants, under the GSU list), along with English proof (IELTS 6.5+ / TOEFL 90+).",
      "Get admitted: Receive your official Letter of Admission.",
    ],
  },
  {
    title: "Student Visa & Travel 🛂",
    list: [
      "Deposit funds: Transfer the required living allowance (about NOK 150,000–170,000 per academic year) into the university's deposit account.",
      "Apply for a UDI study permit: Submit your application online through the Norwegian Directorate of Immigration (UDI), pay the fee (about NOK 5,300) and register your biometrics at the embassy or VFS.",
      "Fly & settle in: Once approved, book your flight, collect your keys at student housing (SiO, Sammen, Sit), and attend your police appointment to receive your residence card.",
    ],
  },
  {
    title: "Study & Part-Time Work 💼",
    list: [
      "Complete your degree: Keep up good academic progress in your 2-year Master's or 3-year Bachelor's programme.",
      "Part-time work: Work up to 20 hours a week during term, and full-time (40 hours a week) during official semester breaks.",
    ],
  },
  {
    title: "Graduation & Job-Seeker Permit 🔍",
    description: "Earn your degree.",
    list: [
      "Job-seeker permit: Before your student permit expires, apply to UDI for a 12-month job-seeker permit to stay in Norway and look for qualified work.",
    ],
  },
  {
    title: "Get a Skilled Job & Switch Permits 🏢",
    list: [
      "Secure employment: Get a full-time job offer relevant to your degree that meets UDI's minimum salary threshold (about NOK 450,000–530,000+ a year, depending on the position).",
      "Skilled worker permit: Switch from the job-seeker permit to a skilled worker residence permit sponsored by your employer.",
    ],
  },
  {
    title: "Work 3 Years & Secure Permanent Residence (PR) 🏡",
    description:
      "Work continuously on a skilled worker permit for 3 full years.",
    tip: "Years spent on a student permit do not count toward permanent residence.",
    listIntro: "You must also:",
    list: [
      "Language test: Pass the oral Norwegian test (minimum A2 or B1 level).",
      "Social studies test: Pass the Samfunnskunnskap test.",
      "Finances: Show you are self-sufficient, with no social welfare support in the previous 12 months.",
      "PR granted: Receive your permanent residence permit, giving you the right to live and work in Norway indefinitely.",
    ],
  },
];

export default function AdmissionVisaProcessNorway() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 6-step process to secure admission at your dream university in Norway."
      image={{ src: "/studynor.png", alt: "Passport, visa stamps, and travel compass", width: 1680, height: 936 }}
      steps={steps}
    />
  );
}
