import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const steps: Step[] = [
  {
    title: "Admission 🎓",
    list: [
      "Choose a course registered for international students and check its academic and English requirements.",
      "Apply to the university directly or through an authorised agent.",
      "Submit transcripts, an English test result, your passport, a CV and a statement of purpose. Some courses also need a portfolio, work experience or research proposal.",
      "After you accept the offer and pay the required deposit, the university issues your Confirmation of Enrolment (CoE).",
    ],
    tip: "If you want PR later, choose a course and field that fit an in-demand occupation.",
  },
  {
    title: "Student Visa (Subclass 500) 🛂",
    list: [
      "You need your CoE, Overseas Student Health Cover (OSHC) for the whole visa period, and a valid passport.",
      "Apply online and meet the Genuine Student requirement. Write your own answers about why you chose this course, this provider and Australia.",
      "Show enough funds for tuition, living costs and travel.",
      "Provide English test evidence, plus health checks, police certificates and biometrics if requested.",
      "Work is limited to 48 hours per fortnight during study periods.",
    ],
  },
  {
    title: "Arrive & Settle In ✈️",
    list: [
      "Arrange flights and accommodation, and carry your passport, visa grant, CoE and OSHC documents.",
      "Attend orientation and enrol in your units.",
      "Open a bank account and apply for a Tax File Number before working.",
      "Follow your visa conditions on study and work hours.",
    ],
  },
  {
    title: "Temporary Graduate Visa 💼",
    description:
      "After completing your course, apply from within Australia if you meet the study, age and English requirements.",
    list: [
      "It lets you live and work after study without a sponsor, and the length depends on your qualification and regional study.",
      "It is temporary and does not give PR on its own.",
      "Use it to build skilled work experience, get a skills assessment and improve your points.",
    ],
  },
  {
    title: "Permanent Residency 🏡",
    listIntro: "Main pathways:",
    list: [
      "Skilled Independent (189): Points-tested, with no sponsor. You need an eligible occupation, skills assessment, English, an Expression of Interest and an invitation.",
      "Skilled Nominated (190): The same process plus state or territory nomination.",
      "Skilled Work Regional (491): A provisional regional visa that can lead to permanent residence (subclass 191).",
      "Employer-sponsored (482, then 186): An employer sponsors you in an eligible skilled role, and you can transition to permanent status after meeting the work requirements.",
    ],
    tip: "The points test has a minimum score of 65, but invitations usually need a higher score.",
  },
];

export default function AdmissionVisaProcess() {
  return (
    <DestinationVisaProcess
      destination="Australia"
      intro="Follow our straightforward 5-step process to secure admission at your dream university in Australia."
      image={{ src: "/studyaus.png", alt: "Study in Australia: Sydney Opera House and Harbour Bridge at sunset", width: 1672, height: 941 }}
      steps={steps}
    />
  );
}
