import { pageMetadata } from "@/lib/seo";
import Register from "@/views/auth/Register";

export const metadata = pageMetadata({
  title: "Create Account",
  description: "Create an Admission On Board account to start your study-abroad journey.",
  path: "/auth/register",
});

export default function page() {
  return (
    <div>
      <Register />
    </div>
  );
}
