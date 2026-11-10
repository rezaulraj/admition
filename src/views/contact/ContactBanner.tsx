import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/AdmissionOnBoardOfficial/",
    path: "M13 22v-8h2.7l.4-3H13V9c0-.9.2-1.5 1.5-1.5H16V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.5v3H9.8v8H13Z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/8801784192780",
    path: "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.2.2-.3.2-.5.1-1.4-.7-2.3-1.3-3.2-2.9-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5s-.6-1.5-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/admissiononboardlimited/",
    path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.5.5.7.3 1.2.6 1.8 1.2.6.6.9 1.1 1.2 1.8.3.7.5 1.4.5 2.5.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.5-.3.7-.6 1.2-1.2 1.8-.6.6-1.1.9-1.8 1.2-.7.3-1.4.5-2.5.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.5-.5-.7-.3-1.2-.6-1.8-1.2-.6-.6-.9-1.1-1.2-1.8-.3-.7-.5-1.4-.5-2.5C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.5.3-.7.6-1.2 1.2-1.8.6-.6 1.1-.9 1.8-1.2.7-.3 1.4-.5 2.5-.5C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@AdmissionOnBoard",
    path: "M21.8 8.1s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 5 12 5 12 5s-3.9 0-6.9.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 9.9 2 11.6v1.4c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 6.6.2 6.6.2s3.9 0 6.9-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.4c0-1.7-.2-3.5-.2-3.5ZM9.9 15V8.9l5.6 3-5.6 3.1Z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/admission-onboard/",
    path: "M6.9 8.4H3.6V20h3.3V8.4ZM5.3 3.5A1.9 1.9 0 1 0 5.3 7.3 1.9 1.9 0 0 0 5.3 3.5ZM20.4 20h-3.3v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V20H9.3V8.4h3.2v1.6h.1c.4-.8 1.6-1.7 3.3-1.7 3.5 0 4.2 2.3 4.2 5.3V20Z",
  },
];

export default function ContactBanner() {
  return (
    <section className="w-full bg-[#FAFAFA] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
                <style>{`
          .cta-card { background: linear-gradient(125deg, #FFF4E6 0%, #FDF8F2 38%, #EEF3FF 72%, #E3EAFF 100%); border: 1px solid rgba(53,12,14,0.08); box-shadow: 0 30px 60px -34px rgba(53,12,14,0.35); }
          .cta-card .cta-blob-l { background: radial-gradient(circle at 50% 50%, rgba(247,147,30,0.28), rgba(247,147,30,0.08) 60%, transparent 72%); }
          .cta-card .cta-blob-r { background: radial-gradient(circle at 50% 50%, rgba(47,107,255,0.22), rgba(47,107,255,0.06) 60%, transparent 72%); }
          .cta-card .cta-title { color: #350C0E; }
          .cta-card .cta-text { color: #6B5556; }
          .cta-card .cta-btn { background: #350C0E; color: #fff; transition: background-color .3s ease, transform .3s ease; }
          .cta-card .cta-btn:hover, .cta-card .cta-btn:focus-visible { background: #F7931E; transform: translateY(-2px); }
          .cta-card .cta-social { background: #fff; color: #350C0E; box-shadow: 0 8px 20px -12px rgba(53,12,14,0.45); transition: background-color .3s ease, color .3s ease; }
          .cta-card .cta-social:hover, .cta-card .cta-social:focus-visible { background: #350C0E; color: #fff; }
        `}</style>
        <div className="cta-card relative isolate overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 cta-blob-l rounded-full sm:-left-12 sm:h-80 sm:w-80 md:h-[28rem] md:w-[28rem]" />

            <div className="absolute -right-20 -top-20 h-56 w-56 cta-blob-r rounded-full sm:-right-12 sm:h-72 sm:w-72" />
          </div>

          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="relative mt-10 h-64 w-48 shrink-0 sm:h-80 sm:w-60 md:mt-0 md:h-[22rem] md:w-[17rem] lg:h-[26rem] lg:w-[20rem]">
              <Image
                src="/counselor.png"
                alt="Student holding a phone"
                fill
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, (max-width: 1024px) 272px, 320px"
                className="object-cover object-bottom"
              />
            </div>

            <div className="flex w-full flex-col items-center justify-between md:flex-row md:items-end">
              <div className="flex w-full flex-col items-center px-6 pb-10 pt-8 text-center md:items-start md:px-10 md:pb-14 md:pt-14 md:text-left lg:px-14 lg:pr-10">
                <h2 className="max-w-3xl text-3xl cta-title font-bold leading-tight sm:text-4xl lg:text-[2.5rem]">
                  Start Your Global Education Journey
                </h2>
                <p className="mt-4 max-w-sm cta-text text-sm font-medium sm:text-base">
                  Find your course, choose your country, start your journey.
                </p>

                <Link
                  href="/countries"
                  className="mt-8 inline-flex items-center justify-center cta-btn rounded-full px-14 py-3.5 text-base font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A9B6E]"
                >
                  Start Your Journey
                </Link>
              </div>

              <div className="flex flex-row gap-3 pb-8 md:flex-col md:pb-14 md:pr-8 lg:pb-16 lg:pr-12">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center cta-social rounded-full sm:h-11 sm:w-11"
                  >
                    <svg
                      width="18"
                      height="18"
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
        </div>
      </div>
    </section>
  );
}
