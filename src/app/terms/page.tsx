import { pageMetadata } from "@/lib/seo";
import TermsAndConditions from "@/views/terms/TermsAndConditions";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms and conditions for using the Admission On Board website and services.",
  path: "/terms",
});

export default function page() {
  return (
    <div>
      <TermsAndConditions />
    </div>
  );
}
