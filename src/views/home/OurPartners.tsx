const partners = [
  { name: "AirAsia", color: "#FF0000" },
  { name: "Ryze", color: "#1B1B1B" },
  { name: "Starlink Travel", color: "#1E90FF" },
  { name: "Firsttrip", color: "#1366E0" },
  { name: "British Council", color: "#00539F" },
];

export default function OurPartners() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-16">
      <div className="mx-auto container">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
          Our <span className="text-[#1366E0]">Partners</span>
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-28 items-center justify-center rounded-2xl border border-[#ECECEC] bg-white px-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                className="text-center text-lg font-semibold sm:text-xl"
                style={{ color: partner.color }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
