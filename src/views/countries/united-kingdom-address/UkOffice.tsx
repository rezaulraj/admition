"use client";

import { useState } from "react";
import Link from "next/link";

type Office = {
  slug: string;
  name: string;
  address: string;
};

const offices: Office[] = [
  {
    slug: "london",
    name: "London Office",
    address:
      "Kirkdale House, 7 Kirkdale Road, London, England, E11 1HP, United Kingdom",
    // address: "Suite 4, Fenchurch Street, London, EC3M, United Kingdom",
  },
  // {
  //   slug: "manchester",
  //   name: "Manchester Office",
  //   address: "2nd Floor, Deansgate, Manchester, M3, United Kingdom",
  // },
];

function PinBadgeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1366E0">
      <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.19 11.44 6.46 11.7a1.5 1.5 0 0 0 2.08 0c.27-.26 6.46-6.45 6.46-11.7C19.5 5.36 16.14 2 12 2Zm0 10.5A3 3 0 1 1 12 6.5a3 3 0 0 1 0 6Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#6B6B6B"
      className="shrink-0"
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z" />
    </svg>
  );
}

// Builds a Google Maps embed URL from a plain address, no API key required.
function mapEmbedSrc(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

function mapLinkHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default function UkOffice() {
  const [activeOffice, setActiveOffice] = useState<Office | null>(null);

  return (
    <div className="w-full bg-[#FFFEFA]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1366E0] via-[#0F4FB0] to-[#0B2A66] px-6 py-16 text-center sm:py-20">
        <div className="mx-auto container">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2 2 8l10 5 8-4v6h2V8L12 2Zm0 8L4 8l8-4 8 4-8 4Zm-6 2v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4l-6 3-6-3Z" />
            </svg>
            Admission OnBoard
          </span>

          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Study Abroad Guidance in United Kingdom
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Talk to our local team about admissions, scholarships, and visas,
            completely free, from your first enquiry to enrolment.
          </p>
        </div>
      </section>

      {/* Offices */}
      <section className="px-6 py-16">
        <div className="mx-auto container">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1B1B1B] sm:text-3xl">
            Our Offices in United Kingdom
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {offices.map((office) => (
              <div
                key={office.slug}
                className="flex flex-col rounded-2xl border border-[#ECECEC] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1366E0]/10">
                  <PinBadgeIcon />
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#1366E0]">
                  Admission OnBoard (United Kingdom)
                </p>
                <h3 className="mt-1 text-base font-semibold text-[#1B1B1B] sm:text-lg">
                  {office.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                  {office.address}
                </p>

                <button
                  type="button"
                  onClick={() => setActiveOffice(office)}
                  className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-[#1B1B1B] transition-colors hover:text-[#1366E0]"
                >
                  View Details &amp; Map
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {/* CTA card fills the last grid slot */}
            <div className="flex flex-col justify-between rounded-2xl bg-[#1B1B1B] p-6 text-white shadow-sm">
              <div>
                <h3 className="text-lg font-semibold">Ready to start?</h3>
                <p className="mt-2 text-sm text-white/70">
                  Talk to an advisor at a time that suits you.
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1B1B1B] transition-transform hover:scale-105"
              >
                Schedule A Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map modal */}
      {activeOffice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setActiveOffice(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveOffice(null)}
              aria-label="Close map"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1B1B1B] shadow-md hover:bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="aspect-video w-full">
              <iframe
                src={mapEmbedSrc(activeOffice.address)}
                title={`Map for ${activeOffice.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#1B1B1B]">
                {activeOffice.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                {activeOffice.address}
              </p>

              <a
                href={mapLinkHref(activeOffice.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#1B1B1B] px-5 py-2.5 text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
