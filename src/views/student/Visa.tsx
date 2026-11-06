import Link from "next/link";

const Visa = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative order-2 lg:order-1 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-1">
              <div className="bg-gradient-to-r from-primary-300 to-primary-400 h-12 flex items-center px-5 gap-2">
                <div className="w-3 h-3 rounded-full bg-white/80" />
                <div className="w-3 h-3 rounded-full bg-white/80" />
                <div className="w-3 h-3 rounded-full bg-white/80" />
              </div>

              <div className="p-8 space-y-6">
                <h3 className="text-2xl font-bold text-neutral-900">
                  Visa support
                </h3>

                <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors duration-300 animate-fade-in-up">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary-400">95%</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-400">
                        Level of study
                      </span>
                      <div className="h-2 bg-neutral-200 rounded-full w-24" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-400">
                        Province
                      </span>
                      <div className="h-2 bg-neutral-200 rounded-full w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-400">
                        Program
                      </span>
                      <div className="h-2 bg-neutral-200 rounded-full w-16" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors duration-300 animate-fade-in-up-delay">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary-400">85%</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-400">
                        Level of study
                      </span>
                      <div className="h-2 bg-neutral-200 rounded-full w-24" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-400">
                        Province
                      </span>
                      <div className="h-2 bg-neutral-200 rounded-full w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-400">
                        Program
                      </span>
                      <div className="h-2 bg-neutral-200 rounded-full w-16" />
                    </div>
                  </div>
                </div>

                <button className="w-full bg-primary-300 hover:bg-primary-400 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-0.5 animate-fade-in-up-delay-2">
                  Calculate visa score
                </button>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-4 sm:-right-8 animate-float">
              <div className="bg-white rounded-xl shadow-xl p-5 border border-neutral-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 4C16 4 8 12 8 18C8 21.3137 10.6863 24 14 24C15.5 24 16.8667 23.4667 18 22.6C19.1333 23.4667 20.5 24 22 24C25.3137 24 28 21.3137 28 18C28 12 20 4 20 4L16 4Z"
                        fill="#DC2626"
                      />
                      <path
                        d="M16 4C16 4 8 12 8 18C8 21.3137 10.6863 24 14 24C15.5 24 16.8667 23.4667 18 22.6C19.1333 23.4667 20.5 24 22 24C25.3137 24 28 21.3137 28 18C28 12 20 4 20 4L16 4Z"
                        fill="#DC2626"
                        fillOpacity="0.3"
                      />
                      <path
                        d="M16 8C16 8 12 14 12 18C12 19.6569 13.3431 21 15 21C15.75 21 16.4333 20.7333 17 20.3C17.5667 20.7333 18.25 21 19 21C20.6569 21 22 19.6569 22 18C22 14 18 8 18 8L16 8Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-neutral-900 leading-none">
                      one<span className="font-light">vasco</span>
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Visa Concierge Services since 2012
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-1/2 -left-12 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-30" />
          </div>
        </div>

        <div className="space-y-6 order-1 lg:order-2 lg:pl-8">
          <p className="text-base font-medium font-montserrat tracking-[1.5px] text-[#1e6deb] uppercase mb-3">
            VISA
          </p>

          <h2 className="text-3xl sm:text-4xl  font-montserrat font-bold text-neutral-900 leading-tight">
            Request Visa Support
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-lg">
            Receive guided support for your visa application through
             AdmissionOnBoard's trusted partner,{" "}
            <a
              href="#"
              className="text-primary-600 font-medium hover:text-primary-800 hover:underline transition-all duration-200"
            >
              OneVasco
            </a>
            .
          </p>

          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5 group">
            Get Visa Support
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-fade-in-up-delay { animation: fade-in-up 0.6s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-in-up-delay-2 { animation: fade-in-up 0.6s ease-out 0.4s forwards; opacity: 0; }
      `}</style>
    </section>
  );
};

export default Visa;
