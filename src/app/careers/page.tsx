import { pageMetadata } from "@/lib/seo";
import CareerHero from "@/views/careers/CareerHero";
import CareerOpenings from "@/views/careers/CareerOpenings";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Join the Admission On Board team. See current job openings in study-abroad counselling, admissions and operations.",
  path: "/careers",
});

export default function page() {
  return (
    <div>
      <CareerHero />
      <CareerOpenings />
    </div>
  );
}
