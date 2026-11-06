import Image from "next/image";
import Link from "next/link";

const StudyDestinationsSection = () => {
  const destinations = [
    {
      name: "Study in Australia",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
      alt: "Sydney Harbour Bridge and Opera House, Australia",
      link: "/australia",
    },
    {
      name: "Study in Canada",
      image:
        "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80",
      alt: "Toronto skyline, Canada",
      link: "/canada",
    },
    {
      name: "Study in Germany",
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80",
      alt: "Munich cityscape, Germany",
      link: "/germany",
    },
    {
      name: "Study in Ireland",
      image:
        "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=800&q=80",
      alt: "Dublin streetscape, Ireland",
      link: "/ireland",
    },
    {
      name: "Study in the UK",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
      alt: "Big Ben and Westminster, UK",
      link: "/uk",
    },
    {
      name: "Study in the USA",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
      alt: "New York City skyline, USA",
      link: "/usa",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="text-base font-medium font-montserrat tracking-[1.5px] text-[#1e6deb] uppercase mb-3">
            STUDY DESTINATIONS
          </p>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-neutral-900 leading-tight">
            Rely on Our 10+ Years of Destination Expertise
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-sans leading-relaxed">
            There's a lot to learn before choosing to study in a new country.
            What's it like to live there? How does it differ from other
            destinations? Can I work while studying, or after graduation? How do
            I apply for my student visa? Trust the experts at AdmissionOnBoard to help
            you understand all this and more. We're here to help you make the
            right decision for your needs!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <Link
              key={index}
              href={dest.link}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[16/9]"
            >
              {/* Image */}
              <Image
                src={dest.image}
                alt={dest.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-lg sm:text-xl font-semibold font-montserrat tracking-wide drop-shadow-md">
                  {dest.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyDestinationsSection;
