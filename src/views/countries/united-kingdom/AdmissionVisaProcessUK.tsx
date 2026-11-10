import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "the UK";

const steps: Step[] = [
  {
    title: "Offer Letter 🎓",
    list: [
      "Choose a UK university licensed to sponsor international students.",
      "Apply through UCAS (undergraduate) or the university's own portal (postgraduate).",
      "Submit your academic records and proof of English, or a university-approved waiver.",
      "You first receive a conditional offer.",
      "It becomes unconditional once you meet all conditions, such as final results or an English test.",
    ],
    tip: "A deposit is a separate requirement set by the university.",
  },
  {
    title: "CAS & Student Visa 🛂",
    list: [
      "The university issues your CAS (Confirmation of Acceptance for Studies).",
      "Use the CAS to apply for the Student visa.",
      "Show enough funds for your remaining first-year tuition plus living costs.",
      "Living-cost amounts are higher for London than elsewhere.",
      "The money must be held in your account for the required minimum period.",
      "Degree-level students can generally work part-time in term time and full-time in official holidays, within visa limits.",
    ],
  },
  {
    title: "Graduate Visa 🔍",
    list: [
      "Apply from inside the UK while your Student visa is still valid.",
      "No job offer or sponsor is needed.",
      "You can work or look for work at any skill level.",
      "Pay the application fee and the Immigration Health Surcharge.",
      "PhD graduates get a longer stay than other graduates.",
    ],
    tip: "The Graduate Route cannot be extended and is not a route to settlement.",
  },
  {
    title: "Skilled Worker Visa 🏢",
    list: [
      "Find a job with a licensed sponsor.",
      "The job must meet the required skill level and salary threshold.",
      "Recent graduates may qualify for a lower \u201cnew entrant\u201d salary rate.",
    ],
    tip: "Skill and salary requirements change often, so check GOV.UK for current figures.",
  },
  {
    title: "ILR & Citizenship 🏡",
    list: [
      "Apply for Indefinite Leave to Remain (ILR) after the required continuous years on a Skilled Worker visa.",
      "Pass the Life in the UK Test.",
      "Show the required English level.",
      "Stay within the limit on days spent outside the UK.",
      "Remain in qualifying sponsored employment.",
    ],
    after:
      "After holding ILR for a further period, you can usually apply for British citizenship.",
  },
];

export default function AdmissionVisaProcessUK() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 5-step process to secure admission at your dream university in the UK."
      image={{ src: "/studyuk.png", alt: "Passport, visa stamps, and travel compass", width: 1672, height: 940 }}
      steps={steps}
    />
  );
}
