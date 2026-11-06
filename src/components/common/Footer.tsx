import Image from "next/image";
import Link from "next/link";
import React from "react";

const explore = [
  { name: "Courses", slug: "courses", active: true },
  { name: "Universities", slug: "universities", active: true },
  { name: "Study Destination", slug: "countries", active: true },
];

const companyLinks = [
  { label: "About Us", href: "/our-story" },
  { label: "Our Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Contact Us", href: "/contact" },
];

const resource = [
  { label: "Our Blogs", href: "/our-blogs" },
  { label: "Frequently Asked Questions", href: "/frequently-asked-questions" },
];
const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/admission-onboard/",
    path: "M6.9 8.4H3.6V20h3.3V8.4ZM5.3 3.5A1.9 1.9 0 1 0 5.3 7.3 1.9 1.9 0 0 0 5.3 3.5ZM20.4 20h-3.3v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V20H9.3V8.4h3.2v1.6h.1c.4-.8 1.6-1.7 3.3-1.7 3.5 0 4.2 2.3 4.2 5.3V20Z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/AdmissionOnBoardOfficial/",
    path: "M13 22v-8h2.7l.4-3H13V9c0-.9.2-1.5 1.5-1.5H16V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.5v3H9.8v8H13Z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/8801906499741",
    path: "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.2.2-.3.2-.5.1-1.4-.7-2.3-1.3-3.2-2.9-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5s-.6-1.5-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@AdmissionOnBoard",
    path: "M21.8 8.1s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 5 12 5 12 5s-3.9 0-6.9.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 9.9 2 11.6v1.4c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 6.6.2 6.6.2s3.9 0 6.9-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.4c0-1.7-.2-3.5-.2-3.5ZM9.9 15V8.9l5.6 3-5.6 3.1Z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/admissiononboardlimited/",
    path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.5.5.7.3 1.2.6 1.8 1.2.6.6.9 1.1 1.2 1.8.3.7.5 1.4.5 2.5.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.5-.3.7-.6 1.2-1.2 1.8-.6.6-1.1.9-1.8 1.2-.7.3-1.4.5-2.5.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.5-.5-.7-.3-1.2-.6-1.8-1.2-.6-.6-.9-1.1-1.2-1.8-.3-.7-.5-1.4-.5-2.5C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.5.3-.7.6-1.2 1.2-1.8.6-.6 1.1-.9 1.8-1.2.7-.3 1.4-.5 2.5-.5C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
  },
];

function BranchItem({ name, slug, active }: (typeof explore)[number]) {
  if (active) {
    return (
      <Link
        href={`/${slug}`}
        className="text-[#5B5B5B] transition-colors hover:text-[#1366E0]"
      >
        {name}
      </Link>
    );
  }

  return (
    <span className="cursor-default text-[#B5B5B5]" aria-disabled="true">
      {name}
    </span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto container rounded-4xl bg-[#F5F5F3] px-6 py-14">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_1fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Admission OnBoard"
              width={170}
              height={38}
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5B5B5B]">
            Admission OnBoard connects students to top global universities.
            Headquartered in Dhaka, we specialise across fields like
            engineering, business, and healthcare.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#1B1B1B]">
            Explore
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-3 text-sm">
            {explore.map((branch) => (
              <BranchItem key={branch.slug} {...branch} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#1B1B1B]">
            About
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#5B5B5B] transition-colors hover:text-[#1366E0]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        {/* Resource */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#1B1B1B]">
            Resource
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            {resource.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#5B5B5B] transition-colors hover:text-[#1366E0]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#1B1B1B]">
            Get In Touch
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#5B5B5B]">
            {/* <p>
              {" "}
              New Naikap - 6, Orchid Colony; just infront to cold store
              building, Kathmandu, Nepal
            </p> */}
            <a
              href="mailto:aob@admissiononboard.com"
              className="hover:text-[#1366E0]"
            >
              aob@admissiononboard.com
            </a>
            {/* <a href="tel:+447465268767" className="hover:text-[#1366E0]">
              +44 7465 268767
            </a> */}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-black/[.08] pt-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[#5B5B5B]">
            &copy; {year} Admission OnBoard. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-[#5B5B5B]">
            {legalLinks.map((link, i) => (
              <React.Fragment key={link.href}>
                <Link href={link.href} className="hover:text-[#1366E0]">
                  {link.label}
                </Link>
                {i < legalLinks.length - 1 && (
                  <span className="text-[#C9C9C9]">&middot;</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B1B1B] text-white transition-colors hover:bg-[#1366E0]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
