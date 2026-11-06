const sections = [
  { id: "acceptance-of-terms", title: "Acceptance of Terms" },
  { id: "our-services", title: "Our Services" },
  { id: "eligibility", title: "Eligibility" },
  { id: "user-responsibilities", title: "User Responsibilities" },
  { id: "fees-and-payments", title: "Fees & Payments" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "limitation-of-liability", title: "Limitation of Liability" },
  { id: "third-party-links", title: "Third-Party Links & Services" },
  { id: "termination", title: "Termination" },
  { id: "governing-law", title: "Governing Law" },
  { id: "changes-to-terms", title: "Changes To These Terms" },
  { id: "contact-us", title: "Contact Us" },
];

export default function TermsAndConditions() {
  return (
    <div className="w-full bg-[#FFFEFA]">
      {/* Header */}
      <section className="border-b border-[#ECECEC] px-6 py-16 text-center sm:py-20">
        <div className="mx-auto container">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1366E0]">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl md:text-5xl">
            Terms &amp; Conditions
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
              These Terms &amp; Conditions (&quot;Terms&quot;) govern your
              access to and use of Admission OnBoard&apos;s website, platform,
              and consultancy services. By using our services, you agree to be
              bound by these Terms. Please read them carefully.
            </p>

            <div id="acceptance-of-terms" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                1. Acceptance of Terms
              </h2>
              <p className="mt-4">
                By creating an account, submitting a consultation request, or
                otherwise using our services, you confirm that you have read,
                understood, and agree to these Terms and our Privacy Policy. If
                you do not agree, please do not use our services.
              </p>
            </div>

            <div id="our-services" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                2. Our Services
              </h2>
              <p className="mt-4">
                Admission OnBoard provides study abroad counselling, university
                and course guidance, application support, scholarship
                assistance, and visa filing support. We act as an intermediary
                between students and partner institutions; we do not guarantee
                admission, scholarship approval, or visa outcomes, as these
                decisions rest solely with the relevant university or government
                authority.
              </p>
            </div>

            <div id="eligibility" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                3. Eligibility
              </h2>
              <p className="mt-4">
                You must be at least 16 years old to use our services
                independently. If you are under 18, a parent or legal guardian
                must review and accept these Terms on your behalf and remain
                involved throughout the application process.
              </p>
            </div>

            <div id="user-responsibilities" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                4. User Responsibilities
              </h2>
              <p className="mt-4">By using our services, you agree to:</p>
              <ul className="mt-4 flex flex-col gap-2 pl-5">
                <li className="list-disc">
                  Provide accurate, current, and complete information at every
                  stage of your application
                </li>
                <li className="list-disc">
                  Promptly notify us of any changes to your academic, financial,
                  or personal circumstances that may affect your application
                </li>
                <li className="list-disc">
                  Submit required documents within the timelines we communicate
                  to you
                </li>
                <li className="list-disc">
                  Use our platform only for lawful purposes and not to submit
                  false or misleading information to any university or visa
                  authority
                </li>
              </ul>
            </div>

            <div id="fees-and-payments" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                5. Fees &amp; Payments
              </h2>
              <p className="mt-4">
                Our counselling and application support services are provided
                free of charge to students. Where applicable, fees for services
                such as visa processing are disclosed clearly and upfront before
                you incur any cost, with no hidden charges. Tuition fees, visa
                fees, and other third-party costs are payable directly to the
                relevant institution or authority and are outside our control.
              </p>
            </div>

            <div id="intellectual-property" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                6. Intellectual Property
              </h2>
              <p className="mt-4">
                All content on our website and platform, including text,
                graphics, logos, and software, is owned by or licensed to
                Admission OnBoard and is protected by applicable intellectual
                property laws. You may not copy, reproduce, or distribute our
                content without prior written permission.
              </p>
            </div>

            <div id="limitation-of-liability" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                7. Limitation of Liability
              </h2>
              <p className="mt-4">
                While we work diligently to support your application, we are not
                liable for decisions made by universities, embassies, or visa
                authorities, including rejections, delays, or changes in policy
                that are outside our control. Our services are provided on an
                &quot;as is&quot; basis, and we do not guarantee any specific
                outcome.
              </p>
            </div>

            <div id="third-party-links" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                8. Third-Party Links &amp; Services
              </h2>
              <p className="mt-4">
                Our platform may contain links to third-party websites, such as
                partner universities or payment providers. We are not
                responsible for the content, policies, or practices of any
                third-party site, and your use of those sites is governed by
                their own terms.
              </p>
            </div>

            <div id="termination" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                9. Termination
              </h2>
              <p className="mt-4">
                We reserve the right to suspend or terminate your access to our
                services at our discretion, including if we believe you have
                violated these Terms or provided false information. You may also
                stop using our services at any time.
              </p>
            </div>

            <div id="governing-law" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                10. Governing Law
              </h2>
              <p className="mt-4">
                These Terms are governed by the laws of the People&apos;s
                Republic of Bangladesh, without regard to its conflict of law
                principles. Any disputes arising from these Terms will be
                subject to the exclusive jurisdiction of the courts of Dhaka,
                Bangladesh.
              </p>
            </div>

            <div id="changes-to-terms" className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                11. Changes To These Terms
              </h2>
              <p className="mt-4">
                We may revise these Terms from time to time. We will update the
                &quot;Last updated&quot; date above whenever we do, and
                continued use of our services after changes take effect
                constitutes your acceptance of the revised Terms.
              </p>
            </div>

            <div
              id="contact-us"
              className="scroll-mt-28 rounded-2xl border border-[#ECECEC] bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
                12. Contact Us
              </h2>
              <p className="mt-4">
                If you have any questions about these Terms, reach out to us at:
              </p>
              <div className="mt-4 flex flex-col gap-1 text-[#4B4B4B]">
                <p className="font-semibold text-[#1B1B1B]">
                  Admission OnBoard
                </p>
                <p>33 St James&apos;s Square, London SW1Y 4JS, United Kingdom</p>
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
