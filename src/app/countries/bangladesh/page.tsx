import { pageMetadata } from "@/lib/seo";
import BangladeshOffices from "@/views/countries/bangladesh/BangladeshOffices";

export const metadata = pageMetadata({
  title: "Bangladesh Offices",
  description: "Visit Admission On Board offices in Bangladesh for free study-abroad counselling, admissions and visa support.",
  path: "/countries/bangladesh",
});

export default function page() {
  return (
    <div>
      <BangladeshOffices />
    </div>
  );
}
