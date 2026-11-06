"use client";

import { useMemo, useState } from "react";
import Image from "next/image";


type Story = {
  name: string;
  university: string;
  country: string;
  image: string;
  summary: string;
};

const countries = [
  "All Countries",
  "Romania",
  "Malta",
  "Hungary",
  "Cyprus",
  "United Kingdom",
  "Greece",
];

const stories: Story[] = [
  {
    name: "Rohit Kumar",
    university: "University of Bucharest",
    country: "Romania",
    image: "/success1.png",
    summary:
      "Meet Rohit Kumar. He's secured a place in the Bachelor of Computer Science program at the University of Bucharest, Romania! He received end-to-end guidance from our Kalabagan branch.",
  },
  {
    name: "Mahmud Jubare",
    university: "University of Malta",
    country: "Malta",
    image: "/success2.png",
    summary:
      "Meet RMahmud Jubare. He's been admitted into the Master of Business Administration program at the University of Malta! Our team supported her through every step of the visa process.",
  },
  {
    name: "Hossen Akram",
    university: "University of Debrecen",
    country: "Hungary",
    image: "/success3.png",
    summary:
      "Meet Shakib Al Rafi. He's now enrolled in the Bachelor's in Computer Science Engineering at the University of Debrecen, Hungary! He worked closely with our Uttara branch throughout his application.",
  },
  {
    name: "Robel Chowdhury",
    university: "University of Cyprus",
    country: "Cyprus",
    image: "/success4.png",
    summary:
      "Meet Robel Chowdhury. He's secured a place in the Bachelor of Architecture program at the University of Cyprus! Our counsellors guided her from application to visa approval without a hitch.",
  },
  {
    name: "Rakibul Hasan Emon",
    university: "University of Leicester",
    country: "United Kingdom",
    image: "/success5.png",
    summary:
      "Meet Rakibul Hasan Emon. He's been admitted into the Master of Data Analytics program at the University of Leicester, UK! He received complete visa and documentation support from our Dhaka office.",
  },
  {
    name: "Mustakim",
    university: "Aristotle University of Thessaloniki",
    country: "Greece",
    image: "/success6.png",
    summary:
      "Meet Mustakim. He's now enrolled in the Bachelor of Tourism Management program at Aristotle University of Thessaloniki, Greece! Our team handled her scholarship search and visa filing.",
  },
  {
    name: "Nusrat Jahan",
    university: "Babes-Bolyai University",
    country: "Romania",
    image: "/success7.png",
    summary:
      "Meet Nusrat Jahan. He's secured admission into the Bachelor of Economics program at Babes-Bolyai University, Romania! His visa was processed in record time with our support.",
  },
  {
    name: "Rabby Hossin",
    university: "University of Westminster",
    country: "United Kingdom",
    image: "/success8.png",
    summary:
      "Meet Rabby Hossin. She's been admitted into the Master of Fashion Marketing program at the University of Westminster, UK! Our counsellors helped her put together a winning scholarship application.",
  },
];

export default function VisaSuccessCarousel() {
  const [activeCountry, setActiveCountry] = useState("All Countries");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredStories = useMemo(
    () =>
      activeCountry === "All Countries"
        ? stories
        : stories.filter((story) => story.country === activeCountry),
    [activeCountry],
  );

  const currentStory = filteredStories[activeIndex] ?? filteredStories[0];

  const handleCountryChange = (country: string) => {
    setActiveCountry(country);
    setActiveIndex(0);
  };

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-[#1366E0]">Visa Success</span>{" "}
            <span className="text-[#1B1B1B]">Stories</span>
          </h2>
          <p className="mt-3 text-sm text-[#6B6B6B] sm:text-base">
            Genuine journeys from students who turned their study-abroad plans
            into visas
          </p>
        </div>

        {/* Country filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {countries.map((country) => {
            const isActive = country === activeCountry;
            return (
              <button
                key={country}
                type="button"
                onClick={() => handleCountryChange(country)}
                className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                  isActive
                    ? "border-[#1B1B1B] bg-[#1B1B1B] text-white"
                    : "border-[#ECECEC] bg-white text-[#1B1B1B] hover:border-[#1B1B1B]"
                }`}
              >
                {country}
              </button>
            );
          })}
        </div>

        {/* Story card */}
        <div className="mt-12 rounded-3xl border border-[#ECECEC] bg-white p-6 shadow-sm sm:p-10">
          {currentStory ? (
            <div
              key={`${currentStory.name}-${activeIndex}`}
              className="grid grid-cols-1 items-center gap-8 transition-opacity duration-500 md:grid-cols-[280px_1fr]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={currentStory.image}
                  alt={currentStory.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover object-center"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#1366E0] sm:text-2xl">
                  {currentStory.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B4B4B] sm:text-base">
                  {currentStory.summary}
                </p>

                <div className="mt-5 flex flex-col gap-2 text-sm sm:text-base">
                  <p>
                    <span className="font-semibold text-[#1B1B1B]">
                      University:
                    </span>{" "}
                    <span className="text-[#2F5DA8]">
                      {currentStory.university}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-[#1B1B1B]">
                      Country:
                    </span>{" "}
                    <span className="text-[#2F5DA8]">
                      {currentStory.country}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-sm text-[#6B6B6B]">
              No stories available for this country yet.
            </p>
          )}
        </div>

        {/* Dot pagination */}
        {filteredStories.length > 1 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filteredStories.map((story, i) => (
              <button
                key={`${story.name}-${i}`}
                type="button"
                aria-label={`Show story ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === i
                    ? "w-6 bg-[#1366E0]"
                    : "w-2.5 bg-[#E5E5E5] hover:bg-[#D5D5D5]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
