import { pageMetadata } from "@/lib/seo";
import NepalOffice from "@/views/countries/nepal/NepalOffice";

export const metadata = pageMetadata({
  title: "Nepal Office",
  description: "Visit the Admission On Board office in Kathmandu, Nepal for study-abroad counselling, admissions and visa support.",
  path: "/countries/nepal",
});

export default function page() {
  return (
    <div>
      <NepalOffice />
    </div>
  );
}
