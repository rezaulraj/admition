"use client";

import Image from "next/image";
import Link from "next/link";

const Apply = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 md:gap-16 items-center">
        <div className="space-y-6 col-span-7">
          <span className="text-base font-medium font-montserrat tracking-[1.5px] text-[#1e6deb] uppercase mb-3">
            APPLY
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 leading-tight">
            Submit Your Best Application
          </h2>

          <p className="text-base sm:text-lg font-sans text-neutral-600 leading-relaxed max-w-lg">
            Our quality checks ensure you include all required documents and put
            your best work forward.
          </p>
        </div>

        <div className="relative flex justify-center lg:justify-end col-span-5">
          <div className="relative w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
              <div className="bg-gradient-to-r from-primary-600 to-primary-500 h-10 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
              </div>

              <div className="flex">
                <div className="w-14 bg-neutral-50 border-r border-neutral-100 py-6 flex flex-col items-center gap-5">
                  <div className="text-primary-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div className="text-neutral-400 hover:text-neutral-600 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-neutral-400 hover:text-neutral-600 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-neutral-400 hover:text-neutral-600 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-neutral-400 hover:text-neutral-600 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                    </svg>
                  </div>
                  <div className="text-neutral-400 hover:text-neutral-600 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full bg-neutral-200 overflow-hidden border-2 border-white shadow-sm">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                        alt="User avatar"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="h-3 bg-neutral-200 rounded-full w-3/4" />
                      <div className="h-3 bg-neutral-100 rounded-full w-1/2" />
                    </div>
                  </div>

                  <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm relative z-10 hover:shadow-md transition-shadow duration-300">
                    <h4 className="text-sm font-semibold text-neutral-400 mb-4 text-center">
                      Application Completion
                    </h4>

                    <div className="h-2.5 bg-neutral-100 rounded-full mb-6 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-full w-[75%] animate-progress-fill" />
                    </div>

                    <div className="flex justify-between relative pt-2">
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-100 -z-10" />
                      <div className="absolute top-5 left-0 w-[75%] h-0.5 bg-emerald-200 -z-10 transition-all duration-1000" />

                      {[
                        {
                          name: "Passport",
                          icon: (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                          ),
                        },
                        {
                          name: "Recommendation",
                          icon: (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          ),
                        },
                        {
                          name: "Transcripts",
                          icon: (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          ),
                        },
                        {
                          name: "Certificates",
                          icon: (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          ),
                        },
                      ].map((step, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center gap-2 z-10"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${i < 3 ? "bg-emerald-50 border-emerald-200 text-emerald-400" : "bg-neutral-50 border-neutral-200 text-neutral-400"}`}
                          >
                            {step.icon}
                          </div>
                          <span className="text-xs text-neutral-500 font-sans font-medium whitespace-nowrap">
                            {step.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-6 sm:-right-16 animate-float">
              <div className="relative group">
                <Link
                  href="/auth/register"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-3 rounded-lg shadow-lg hover:shadow-primary-500/30 transition-all duration-300 flex items-center gap-2 transform group-hover:-translate-y-1 hover:animate-pulse"
                >
                  Submit Application
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="absolute -z-10 top-1/2 -right-12 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-40" />
            <div className="absolute -z-10 bottom-0 -left-8 w-56 h-56 bg-purple-200 rounded-full blur-3xl opacity-30" />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes cursor-bounce {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(4px) rotate(12deg); }
        }
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 75%; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-cursor-bounce { animation: cursor-bounce 2s ease-in-out infinite; }
        .animate-progress-fill { animation: progress-fill 1.5s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default Apply;
