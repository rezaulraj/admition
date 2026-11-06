import Image from "next/image";

export default function HeroContact() {
  return (
    <section className="w-full overflow-hidden bg-[#FFFEFA] py-8 sm:py-2">
      <style>{`
        @keyframes contactFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes contactImageIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes contactGlow {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes contactUnderline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div className="mx-auto container px-6">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
          {/* Left: text */}
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl">
              <span className="block animate-[contactFadeUp_0.8s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none">
                Contact With Us —
              </span>
              <span
                className="relative inline-block animate-[contactFadeUp_0.8s_cubic-bezier(0.22,1,0.36,1)_both] text-[#1366E0] motion-reduce:animate-none"
                style={{ animationDelay: "120ms" }}
              >
                We&apos;re Here to Help
                {/* Underline that draws itself in */}
                {/* <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[5px] w-full origin-left rounded-full bg-[#1366E0]/25 animate-[contactUnderline_0.9s_cubic-bezier(0.65,0,0.35,1)_both] motion-reduce:animate-none"
                  style={{ animationDelay: "750ms" }}
                /> */}
              </span>
            </h1>

            <p
              className="mt-5 max-w-md text-sm leading-relaxed text-[#6B6B6B] animate-[contactFadeUp_0.8s_ease-out_both] motion-reduce:animate-none sm:text-base"
              style={{ animationDelay: "300ms" }}
            >
              Not sure where to start with studying overseas? Our advisors are
              on hand to walk you through every step, offering tailored advice
              for your international education plans.
            </p>
          </div>

          {/* Right: image */}
          <div className="relative mx-auto h-[280px] w-full max-w-2xl sm:h-[460px]">
            {/* Soft glow behind the advisor */}
            <div
              aria-hidden
              className="absolute inset-0 m-auto h-3/4 w-3/4 rounded-full bg-[#1366E0]/10 blur-3xl animate-[contactGlow_1.2s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: "150ms" }}
            />
            <Image
              src="/admission-contact.png"
              alt="Support advisor ready to help with study abroad questions"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 480px"
              className="object-contain object-bottom animate-[contactImageIn_1s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
              style={{
                animationDelay: "250ms",
                maskImage:
                  "radial-gradient(ellipse at center, black 55%, transparent 90%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 55%, transparent 90%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
