import { pageMetadata } from "@/lib/seo";
import HeroContact from "@/views/contact/HeroContact";
import ContactAudiences from "@/views/contact/ContactAudiences";
import OurOffices from "@/views/contact/OurOffices";
import ContactBanner from "@/views/contact/ContactBanner";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Admission On Board for free study-abroad counselling. Find our branch locations, phone, email and WhatsApp.",
  path: "/contact",
});

export default function page() {
  return (
    <div>
      <HeroContact />
      <ContactAudiences />
      <OurOffices />
      <ContactBanner />
    </div>
  );
}
