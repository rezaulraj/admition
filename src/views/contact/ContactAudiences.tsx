import Image from "next/image";
import Link from "next/link";

// Place your images at:
// /public/contact/for-students.png
// /public/contact/for-partners.png
// /public/contact/for-agents.png

type ContactBlock = {
  audience: string;
  imageSrc: string;
  imageAlt: string;
  bgColor: string;
  details: { label: string; value: React.ReactNode }[];
  cta?: { label: string; href: string };
};

const blocks: ContactBlock[] = [
  {
    audience: "For Students",
    imageSrc: "/student.png",
    imageAlt: "Student ready to help with your application questions",
    bgColor: "#FCBD5E",
    details: [
      {
        label: "Email",
        value: (
          <a
            href="mailto:apply@admissiononboard.com"
            className="text-[#2F5DA8] underline underline-offset-2"
          >
            apply@admissiononboard.com
          </a>
        ),
      },
      {
        label: "Applications",
        value: (
          <>
            Already have an application with us?{" "}
            <Link
              href="/auth/register"
              className="text-[#2F5DA8] underline underline-offset-2"
            >
              Sign in to your account
            </Link>{" "}
            to view its status, then use &quot;Ask a question&quot; on the
            relevant application to reach the right person directly.
          </>
        ),
      },
      { label: "Monday to Friday", value: "9:00am – 6:00pm" },
    ],
  },
  {
    audience: "For University Partners",
    imageSrc: "/bothpartner.png",
    imageAlt: "Partnerships advisor available for university collaborations",
    bgColor: "#48AEF8",
    details: [
      {
        label: "Email",
        value: (
          <a
            href="mailto:aob@admissiononboard.com"
            className="text-[#1366E0] underline underline-offset-2"
          >
            aob@admissiononboard.com
          </a>
        ),
      },
      { label: "Monday to Friday", value: "7:00am – 5:00pm Eastern Time (ET)" },
      { label: "Phone", value: "+44 7465 268767" },
    ],
    cta: { label: "Why Partner with Us", href: "/institution-partner" },
  },
  {
    audience: "For Education Agents",
    imageSrc: "/for-eduction.png",
    imageAlt: "Education agent relations team member",
    bgColor: "#F58B0F",
    details: [
      {
        label: "Email",
        value: (
          <a
            href="mailto:agent@admissiononboard.com"
            className="text-[#1366E0] underline underline-offset-2"
          >
            agent@admissiononboard.com
          </a>
        ),
      },
      { label: "Monday to Friday", value: "7:00am – 5:00pm Eastern Time (ET)" },
      {
        label: "Live chat",
        value: (
          <>
            Available once you{" "}
            <Link
              href="/auth/register"
              className="text-[#2F5DA8] underline underline-offset-2"
            >
              sign in to your account
            </Link>
            .
          </>
        ),
      },
    ],
    cta: { label: "Why Partner with Us", href: "/recruitment-partner" },
  },
];

export default function ContactAudiences() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-16 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-16 sm:gap-20">
        {blocks.map((block, index) => {
          const imageFirst = index % 2 !== 0;

          return (
            <div
              key={block.audience}
              className={`flex flex-col items-center gap-12 sm:gap-20 lg:gap-22 ${
                imageFirst ? "sm:flex-row-reverse" : "sm:flex-row"
              }`}
            >
              {/* Image */}
              <div
                className="relative h-64 w-52 shrink-0 overflow-hidden rounded-2xl shadow-sm"
                style={{ backgroundColor: block.bgColor }}
              >
                <Image
                  src={block.imageSrc}
                  alt={block.imageAlt}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>

              {/* Text content */}
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-semibold tracking-tight text-[#1B1B1B] sm:text-3xl">
                  {block.audience}
                </h3>

                <dl className="mt-4 flex max-w-xl flex-col gap-2.5 text-sm text-[#3A3A3A] sm:text-base">
                  {block.details.map((detail) => (
                    <div
                      key={detail.label}
                      className="flex flex-wrap justify-center gap-1.5 sm:justify-start"
                    >
                      <dt className="font-semibold text-base text-[#2c2c2c]">
                        {detail.label}:
                      </dt>
                      <dd className="text-[#6B6B6B]">{detail.value}</dd>
                    </div>
                  ))}
                </dl>

                {block.cta && (
                  <Link
                    href={block.cta.href}
                    className="mt-5 inline-flex items-center justify-center rounded-lg border border-[#1366E0] px-5 py-2.5 text-sm font-semibold text-[#1366E0] transition-colors hover:bg-[#1366E0] hover:text-white"
                  >
                    {block.cta.label}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
