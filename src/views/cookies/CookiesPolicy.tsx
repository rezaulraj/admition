const sections = [
  { id: "what-are-cookies", title: "What Are Cookies" },
  { id: "how-we-use-cookies", title: "How We Use Cookies" },
  { id: "types-of-cookies", title: "Types of Cookies We Use" },
  { id: "managing-cookies", title: "Managing Your Cookie Preferences" },
  { id: "third-party-cookies", title: "Third-Party Cookies" },
  { id: "policy-changes", title: "Changes To This Policy" },
  { id: "contact-us", title: "Contact Us" },
];

const cookieTypes = [
  {
    name: "Essential Cookies",
    description:
      "Required for the site to function, such as keeping you logged in and remembering form progress. These can't be switched off.",
  },
  {
    name: "Performance Cookies",
    description:
      "Help us understand how visitors use our site, such as which pages are most popular, so we can improve the experience.",
  },
  {
    name: "Functional Cookies",
    description:
      "Remember choices you make, like your preferred country or language, so you don't have to reset them on every visit.",
  },
  {
    name: "Advertising Cookies",
    description:
      "Used to show you more relevant ads and measure the performance of our marketing campaigns across other websites.",
  },
];

export default function CookiesPolicy() {
  return (
    <div className="w-full bg-[#FFFEFA]">
      <section className="border-b border-[#ECECEC] px-6 py-16 text-center sm:py-20">
        <div className="mx-auto container">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1366E0]">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl md:text-5xl">
            Cookies Policy
          </h1>
          <p className="mt-4 text-sm text-[#6B6B6B] sm:text-base">
            Last updated: September 15, 2026
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
          {/* Sticky table of contents */}
          <nav className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-[#ECECEC] bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-[#9A9A9A]">
                On This Page
              </p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[#6B6B6B] transition-colors hover:text-[#1366E0]"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Content */}
          <div className="flex flex-col gap-12 text-sm leading-relaxed text-[#4B4B4B] sm:text-base">
            <p>
              This Cookies Policy explains how Admission OnBoard uses cookies
              and similar tracking technologies when you visit our website, and
              the choices you have about them.
            </p>

            <div id="what-are-cookies" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                1. What Are Cookies
              </h2>
              <p className="mt-4">
                Cookies are small text files placed on your device when you
                visit a website. They help the site remember information about
                your visit, like your preferred language and other settings,
                which can make your next visit easier and the site more useful
                to you.
              </p>
            </div>

            <div id="how-we-use-cookies" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                2. How We Use Cookies
              </h2>
              <p className="mt-4">We use cookies to:</p>
              <ul className="mt-4 flex flex-col gap-2 pl-5">
                <li className="list-disc">
                  Keep you signed in to your account
                </li>
                <li className="list-disc">
                  Remember your consultation form progress and preferences
                </li>
                <li className="list-disc">
                  Understand how visitors navigate our site so we can improve it
                </li>
                <li className="list-disc">
                  Measure the performance of our marketing campaigns
                </li>
              </ul>
            </div>

            <div id="types-of-cookies" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                3. Types of Cookies We Use
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                {cookieTypes.map((cookie) => (
                  <div
                    key={cookie.name}
                    className="rounded-2xl border border-[#ECECEC] bg-white p-5"
                  >
                    <h3 className="text-base font-semibold text-[#1B1B1B]">
                      {cookie.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#6B6B6B]">
                      {cookie.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div id="managing-cookies" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                4. Managing Your Cookie Preferences
              </h2>
              <p className="mt-4">
                Most web browsers let you control cookies through their
                settings, including blocking or deleting them. Keep in mind that
                disabling essential cookies may affect how parts of our site
                function, such as staying logged in or saving your progress on a
                form.
              </p>
              <p className="mt-4">
                You can typically manage cookie settings from your
                browser&apos;s preferences menu under &quot;Privacy&quot; or
                &quot;Security.&quot;
              </p>
            </div>

            <div id="third-party-cookies" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                5. Third-Party Cookies
              </h2>
              <p className="mt-4">
                Some cookies on our site are placed by third-party services we
                use, such as analytics providers and social media platforms.
                These third parties may use cookies to collect information about
                your online activities across different websites. We don&apos;t
                control these cookies directly, so we recommend reviewing the
                relevant third party&apos;s own cookie policy for more detail.
              </p>
            </div>

            <div id="policy-changes" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                6. Changes To This Policy
              </h2>
              <p className="mt-4">
                We may update this Cookies Policy from time to time to reflect
                changes in the cookies we use or for legal reasons. We&apos;ll
                update the &quot;Last updated&quot; date above whenever we do.
              </p>
            </div>

            <div
              id="contact-us"
              className="scroll-mt-28 rounded-2xl border border-[#ECECEC] bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                7. Contact Us
              </h2>
              <p className="mt-4">
                If you have any questions about how we use cookies, reach out to
                us at:
              </p>
              <div className="mt-4 flex flex-col gap-1 text-[#4B4B4B]">
                <p className="font-semibold text-[#1B1B1B]">
                  Admission OnBoard
                </p>
                <p>
                  33 St James&apos;s Square, London SW1Y 4JS, United Kingdom
                </p>
                <a
                  href="mailto:aob@admissiononboard.com"
                  className="hover:text-[#1366E0]"
                >
                  aob@admissiononboard.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
