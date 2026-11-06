import type { Metadata } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.admissiononboard.com"
).replace(/\/$/, "");

export const SITE_NAME = "Admission On Board";

export const SITE_DESCRIPTION =
  "Admission On Board is a global study-abroad consultancy helping students with university admissions, visa support, scholarships and pre-departure guidance for the UK, Australia, New Zealand, Cyprus, Finland, Greece, Hungary, Lithuania, Malta and Romania.";

export const SITE_KEYWORDS = [
  "Admission On Board",
  "study abroad consultancy",
  "study abroad from Bangladesh",
  "overseas education consultant",
  "university admission abroad",
  "student visa support",
  "study visa consultant",
  "scholarships abroad",
  "study in UK",
  "study in Australia",
  "study in New Zealand",
  "study in Cyprus",
  "study in Finland",
  "study in Greece",
  "study in Hungary",
  "study in Lithuania",
  "study in Malta",
  "study in Romania",
  "IELTS preparation",
  "education agent Bangladesh",
];

export const SOCIAL_LINKS = [
  "https://www.linkedin.com/company/admission-onboard/",
  "https://www.facebook.com/AdmissionOnBoardOfficial/",
  "https://www.youtube.com/@AdmissionOnBoard",
  "https://instagram.com/AdmissionOnBoard",
];

export const OG_IMAGE = "/logo.png";

type PageSeo = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [{ url: OG_IMAGE, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
