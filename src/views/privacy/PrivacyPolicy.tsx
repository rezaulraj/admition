const sections = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-it", title: "How We Use Your Information" },
  { id: "sharing-your-information", title: "Sharing Your Information" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "data-security", title: "Data Security" },
  { id: "your-rights", title: "Your Rights & Choices" },
  { id: "childrens-privacy", title: "Children's Privacy" },
  { id: "policy-changes", title: "Changes To This Policy" },
  { id: "contact-us", title: "Contact Us" },
];

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-[#FFFEFA]">
      {/* Header */}
      <section className="border-b border-[#ECECEC] px-6 py-16 text-center sm:py-20">
        <div className="mx-auto container">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1366E0]">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl md:text-5xl">
            Privacy Policy
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
              Admission OnBoard (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) respects your privacy and is committed to
              protecting the personal information you share with us. This policy
              explains what we collect, how we use it, and the choices you have,
              in plain language.
            </p>

            <div id="information-we-collect" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                1. Information We Collect
              </h2>
              <p className="mt-4">
                We collect information you provide directly to us, such as when
                you fill out a consultation form, register an account, or
                contact our team. This may include:
              </p>
              <ul className="mt-4 flex flex-col gap-2 pl-5">
                <li className="list-disc">
                  Your name, email address, phone number, and date of birth
                </li>
                <li className="list-disc">
                  Academic records, transcripts, and test scores you choose to
                  share
                </li>
                <li className="list-disc">
                  Passport and visa-related documents submitted for processing
                </li>
                <li className="list-disc">
                  Payment details when you make a payment through our platform
                </li>
                <li className="list-disc">
                  Usage data such as pages visited, browser type, and device
                  information, collected automatically
                </li>
              </ul>
            </div>

            <div id="how-we-use-it" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                2. How We Use Your Information
              </h2>
              <p className="mt-4">We use the information we collect to:</p>
              <ul className="mt-4 flex flex-col gap-2 pl-5">
                <li className="list-disc">
                  Match you with universities, courses, and scholarship
                  opportunities
                </li>
                <li className="list-disc">
                  Prepare and submit your admission and visa applications
                </li>
                <li className="list-disc">
                  Communicate with you about your application status and next
                  steps
                </li>
                <li className="list-disc">
                  Improve our services, website, and the overall experience we
                  provide
                </li>
                <li className="list-disc">
                  Meet legal and regulatory obligations where required
                </li>
              </ul>
            </div>

            <div id="sharing-your-information" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                3. Sharing Your Information
              </h2>
              <p className="mt-4">
                We only share your information with third parties when it&apos;s
                necessary to deliver our services, including:
              </p>
              <ul className="mt-4 flex flex-col gap-2 pl-5">
                <li className="list-disc">
                  Partner universities and institutions, to process your
                  application
                </li>
                <li className="list-disc">
                  Visa offices and government bodies, where required by the
                  application process
                </li>
                <li className="list-disc">
                  Trusted service providers who help us operate our platform,
                  such as payment processors and email services
                </li>
              </ul>
              <p className="mt-4">
                We never sell your personal information to third parties for
                marketing purposes.
              </p>
            </div>

            <div id="cookies" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                4. Cookies &amp; Tracking
              </h2>
              <p className="mt-4">
                We use cookies and similar technologies to remember your
                preferences, understand how you use our site, and improve your
                experience. You can control cookie preferences through your
                browser settings at any time.
              </p>
            </div>

            <div id="data-security" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                5. Data Security
              </h2>
              <p className="mt-4">
                We use industry-standard safeguards, including encryption and
                access controls, to protect your information from unauthorized
                access, alteration, or disclosure. No method of transmission
                over the internet is 100% secure, but we work continuously to
                protect your data.
              </p>
            </div>

            <div id="your-rights" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                6. Your Rights &amp; Choices
              </h2>
              <p className="mt-4">
                Depending on where you live, you may have the right to:
              </p>
              <ul className="mt-4 flex flex-col gap-2 pl-5">
                <li className="list-disc">
                  Access the personal data we hold about you
                </li>
                <li className="list-disc">
                  Request correction of inaccurate information
                </li>
                <li className="list-disc">
                  Request deletion of your data, subject to legal requirements
                </li>
                <li className="list-disc">
                  Opt out of marketing communications at any time
                </li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us using the details at
                the bottom of this page.
              </p>
            </div>

            <div id="childrens-privacy" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                7. Children&apos;s Privacy
              </h2>
              <p className="mt-4">
                Our services are intended for individuals aged 16 and above. We
                do not knowingly collect personal information from children
                under 16. If you believe we have inadvertently collected such
                information, please contact us so we can remove it.
              </p>
            </div>

            <div id="policy-changes" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                8. Changes To This Policy
              </h2>
              <p className="mt-4">
                We may update this policy from time to time to reflect changes
                in our practices or for legal reasons. We&apos;ll update the
                &quot;Last updated&quot; date above, and for significant
                changes, we may notify you directly.
              </p>
            </div>

            <div
              id="contact-us"
              className="scroll-mt-28 rounded-2xl border border-[#ECECEC] bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                9. Contact Us
              </h2>
              <p className="mt-4">
                If you have any questions about this Privacy Policy or how we
                handle your information, reach out to us at:
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
