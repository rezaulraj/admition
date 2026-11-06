import Image from "next/image";

const StudentBanner = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-white">
          <div className="flex flex-col md:flex-row min-h-[320px] rounded-r-full bg-gradient-to-br from-orange-400 to-yellow-200">
            {/* Left: Image Section */}
            <div className="md:w-2/5 lg:w-1/3 relative h-64 md:h-auto">
              <Image
                src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional woman with tablet near coastal lighthouse"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover rounded-r-full"
              />
              <div className="absolute inset-0 bg-black/5"></div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-orange-400 to-yellow-200 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 pointer-events-none">
                <div className="w-72 h-72 border-2 border-white/25 rounded-full"></div>
                <div className="absolute top-10 left-10 w-52 h-52 border-2 border-white/25 rounded-full"></div>
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/25 rounded-full"></div>
              </div>

              <div className="relative z-10 max-w-md">
                <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-white mb-3 leading-tight">
                  Register for Free to Get Started
                </h2>
                <p className="text-white/90 text-sm md:text-base mb- font-sans leading-relaxed">
                  Ready to kick off your study abroad journey? We’ll guide you
                  from application to arrival!
                </p>
                <button className="inline-flex items-center bg-white text-lg text-primary-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-neutral-50 hover:shadow-md transition-all duration-200 mt-4">
                  Register as a Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentBanner;
