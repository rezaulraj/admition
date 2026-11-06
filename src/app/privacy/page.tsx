import { pageMetadata } from "@/lib/seo";
import PrivacyPolicy from "@/views/privacy/PrivacyPolicy";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Admission On Board collects, uses and protects your personal information.",
  path: "/privacy",
});

export default function page() {
  return (
    <div>
      <PrivacyPolicy />
    </div>
  );
}
