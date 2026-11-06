import { pageMetadata } from "@/lib/seo";
import Login from "@/views/auth/Login";

export const metadata = pageMetadata({
  title: "Log In",
  description: "Log in to your Admission On Board account.",
  path: "/auth/login",
});

export default function page() {
  return (
    <div>
      <Login />
    </div>
  );
}
