import React from "react";

type Step = {
  number: number;
  title: string;
  icon: React.ReactNode;
  offset: "up" | "down";
};

const steps: Step[] = [
  {
    number: 1,
    title: "Activate Account",
    offset: "down",
    icon: (
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-8 2-8 5v1h11.28A6 6 0 0 1 15 15.08 10.7 10.7 0 0 0 12 14Zm7 0-4 4-2-2-1.4 1.4L15 20.8l5.4-5.4Z" />
    ),
  },
  {
    number: 2,
    title: "Add Students",
    offset: "up",
    icon: (
      <path d="M12 2 3 7l9 5 7-3.89V16h2V7L12 2Zm-7 8.27V15c0 2.76 3.58 5 8 5s8-2.24 8-5v-4.73l-8 4.45-8-4.45Z" />
    ),
  },
  {
    number: 3,
    title: "Track Progress",
    offset: "down",
    icon: (
      <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.19 11.44 6.46 11.7a1.5 1.5 0 0 0 2.08 0c.27-.26 6.46-6.45 6.46-11.7C19.5 5.36 16.14 2 12 2Zm0 10.5A3 3 0 1 1 12 6.5a3 3 0 0 1 0 6Z" />
    ),
  },
  {
    number: 4,
    title: "Get Commissions",
    offset: "up",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.75 15.5v1.25h-1.5V17.5c-1.4-.2-2.5-.95-2.7-2.35h1.6c.13.65.65 1.05 1.6 1.05.9 0 1.45-.4 1.45-.95 0-.5-.35-.8-1.6-1.1-1.7-.4-2.8-1.05-2.8-2.55 0-1.2.9-2.05 2.45-2.3V8h1.5v1.3c1.35.25 2.2 1.05 2.35 2.25h-1.55c-.1-.55-.55-.9-1.3-.9-.8 0-1.3.35-1.3.85 0 .45.35.7 1.55 1 1.75.4 2.85 1.05 2.85 2.6 0 1.3-.95 2.15-2.6 2.4Z" />
    ),
  },
  {
    number: 5,
    title: "Grow Together",
    offset: "down",
    icon: (
      <path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-2.7 0-6 1.34-6 4v2h8.5l1.5-3.3c-1-.4-2.3-.7-4-.7Zm8 0c-.62 0-1.35.06-2.1.2L12 17h6.5v-2c0-2-2.5-4-2.5-4Z" />
    ),
  },
];

function CurvedArrow({ flip }: { flip: boolean }) {
  return (
    <svg
      viewBox="0 0 80 40"
      className={`hidden h-8 w-16 shrink-0 text-[#1B1B1B] sm:block ${
        flip ? "-scale-y-100" : ""
      }`}
      fill="none"
    >
      <path
        d="M2 34C20 34 26 6 78 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5 5"
        fill="none"
      />
      <path d="M70 1 79 6 70 12Z" fill="currentColor" />
    </svg>
  );
}

export default function RiseWithEveryStep() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            Rise with Every Step
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B6B6B] sm:text-base">
            Manage the entire study-abroad process from one simple place. Save
            time, and stay focused on what matters most.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div
                className={`flex flex-col items-center gap-3 ${
                  step.offset === "up"
                    ? "sm:-translate-y-6"
                    : "sm:translate-y-6"
                }`}
              >
                {step.offset === "up" && (
                  <span className="hidden text-sm font-semibold text-[#1B1B1B] sm:block">
                    {step.title}
                  </span>
                )}

                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1B1B1B] shadow-md">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      {step.icon}
                    </svg>
                  </div>
                  <span className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#F58B0F] text-xs font-bold text-white shadow-sm">
                    {step.number}
                  </span>
                </div>

                {step.offset === "down" && (
                  <span className="text-sm font-semibold text-[#1B1B1B] sm:text-sm">
                    {step.title}
                  </span>
                )}
                <span className="text-sm font-semibold text-[#1B1B1B] sm:hidden">
                  {step.offset === "up" ? step.title : null}
                </span>
              </div>

              {index < steps.length - 1 && (
                <CurvedArrow flip={step.offset === "up"} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
