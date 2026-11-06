import { pageMetadata } from "@/lib/seo";
import CookiesPolicy from "@/views/cookies/CookiesPolicy";

export const metadata = pageMetadata({
  title: "Cookies Policy",
  description: "How Admission On Board uses cookies on its website.",
  path: "/cookies",
});

export default function page() {
  return (
    <div>
      <CookiesPolicy />
    </div>
  );
}
