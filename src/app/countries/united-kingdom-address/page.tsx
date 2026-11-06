import { pageMetadata } from "@/lib/seo";
import UkOffice from "@/views/countries/united-kingdom-address/UkOffice";

export const metadata = pageMetadata({
  title: "UK Office",
  description: "Find the Admission On Board office in the United Kingdom for student admissions and visa support.",
  path: "/countries/united-kingdom-address",
});

export default function page() {
  return (
    <div>
      <UkOffice />
    </div>
  );
}
