import Image from "next/image";

const SuccessStories = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 space-y-4">
          <span className="text-sm font-bold font-sans tracking-[2px] text-primary-600 uppercase">
            SUCCESS STORIES
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold font-montserrat text-neutral-900 max-w-3xl mx-auto leading-tight">
            Our Platform Makes It Easy to Start Your Study Abroad Journey
          </h2>

          <p className="text-base md:text-lg text-neutral-600 max-w-2xl font-sans mx-auto leading-relaxed">
            We've spent a decade perfecting a faster, easier, quality-first
            international study application process. Now, the world is yours to
            explore in just a few clicks.
          </p>
        </div>

        <div className="bg-primary-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">

            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <blockquote className="text-white text-lg sm:text-xl leading-relaxed mb-8">
                "I tried applying to institutions] and it took months, and
                months, and months for me to get an answer from a school. But
                then I stumbled upon  AdmissionOnBoard, and it was like an answer from
                heaven."
              </blockquote>

              <div className="space-y-1">
                <p className="text-white font-semibold text-lg">Arabella</p>
                <p className="text-primary-200 text-sm">International Student</p>
              </div>
            </div>

            <div className="relative group max-h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                alt="Arabella - International Student"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-center object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-primary-700 hover:scale-110 transition-all duration-300 group/play">
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          <button className="w-2.5 h-2.5 rounded-full bg-primary-600 transition-all duration-300" />
          <button className="w-2.5 h-2.5 rounded-full bg-neutral-300 hover:bg-neutral-400 transition-all duration-300" />
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
