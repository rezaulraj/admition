import DestinationVisaProcess, { type Step } from "../shared/DestinationVisaProcess";

const DESTINATION = "Hungary";

const steps: Step[] = [
  {
    title: "University Admission",
    description:
      "Choose an eligible Hungarian university and programme, and receive your admission letter.",
  },
  {
    title: "Student Residence Permit",
    description:
      "Apply for a Hungarian Residence Permit for the Purpose of Studies and travel to Hungary. The permit can generally be issued for up to 3 years and extended.",
  },
  {
    title: "Study & Graduate",
    description:
      "Complete your Bachelor’s, Master’s or other eligible higher-education programme. During your studies, you can work within the applicable limits.",
  },
  {
    title: "Post-Study Job Search",
    description:
      "After successfully completing your studies, you can apply in Hungary for a Residence Permit for Seeking a Job or Starting a Business, helping you move into employment or self-employment.",
  },
  {
    title: "Employment → Long-Term Residence",
    description:
      "After moving into a suitable residence status and meeting the legal requirements, you may become eligible for a National Residence Card (long-term residence). The standard route requires at least 3 years of legal, continuous residence in Hungary. Time spent on a study permit does not qualify directly, so your exact pathway depends on the residence status you hold after graduation.",
  },
];

export default function AdmissionVisaProcessHungary() {
  return (
    <DestinationVisaProcess
      destination={DESTINATION}
      intro="Follow our straightforward 5-step process to secure admission at your dream university in Hungary."
      image={{ src: "/studyhun.png", alt: "Passport, visa stamps, and travel compass", width: 1672, height: 940 }}
      steps={steps}
    />
  );
}
