"use client";

import Image from "next/image";
import Link from "next/link";

const HeroStudent = () => {
  return (
    <section className=" bg-white flex items-center px-6 sm:px-12 lg:px-20 py-16">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl font-montserrat font-bold leading-tight">
              <span className="text-neutral-800 block">Find Your</span>
              <span className="text-primary-600 block mt-2">Perfect Program</span>
            </h1>

            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-2 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold font-sans text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5"
            >
              Start Your Journey
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

          <div className="relative">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3 relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-primary-600 to-primary-400 aspect-[5/5] mt-16">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-xl" />
                    <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary-300 blur-xl" />
                  </div>
                  <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/30 pointer-events-none" />
                  <div className="absolute right-[-110px] top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/25 pointer-events-none" />
                  <div className="absolute right-[-160px] top-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-white/20 pointer-events-none" />
                  <Image
                    src="/studenthero.png"
                    alt="Happy student with laptop"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
                </div>
              </div>

              <div className="col-span-2 flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-square">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1661436612606-11b3af6451f2?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Students collaborating"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-square bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center">
                  <Image
                    src="https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&q=80"
                    alt="Travel luggage"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-1/2 -right-4 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-30" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroStudent;
