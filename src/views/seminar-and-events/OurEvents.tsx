"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Place your event images at, e.g.:
// /public/events/malaysia-expo-2026.png
// /public/events/malta-expo-2026.png
// /public/events/canada-seminar-2025.png
// /public/events/uk-fair-2025.png

type EventItem = {
  slug: string;
  title: string;
  location: string;
  date: string;
  image: string;
  status: "Upcoming" | "Past";
};

const upcomingEvents: EventItem[] = [
  {
    slug: "study-in-cyprus-expo-2026",
    title: "Study in Cyprus Expo 2026",
    location: "The Westin Dhaka",
    date: "22 Sep 2026, 10:00 AM",
    image: "/cyprus-expo-2026.png",
    status: "Upcoming",
  },
  {
    slug: "study-in-malta-expo-2026",
    title: "Study in Malta Expo 2026",
    location: "Admission OnBoard, Banani Branch",
    date: "26 Sep 2026, 3:00 PM",
    image: "/malta-expo-2026.png",
    status: "Upcoming",
  },
];

const pastEvents: EventItem[] = [
  {
    slug: "romania-study-seminar-2025",
    title: "Romania Study Seminar 2025",
    location: "The Westin Dhaka",
    date: "14 Nov 2025, 11:00 AM",
    image: "/romania-seminar-2025.png",
    status: "Past",
  },
  {
    slug: "uk-education-fair-2025",
    title: "UK Education Fair 2025",
    location: "Admission OnBoard, Kalabagan Branch",
    date: "3 Aug 2025, 4:00 PM",
    image: "/uk-fair-2025.png",
    status: "Past",
  },
];

function PinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#1366E0"
      className="shrink-0"
    >
      <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 6.19 11.44 6.46 11.7a1.5 1.5 0 0 0 2.08 0c.27-.26 6.46-6.45 6.46-11.7C19.5 5.36 16.14 2 12 2Zm0 10.5A3 3 0 1 1 12 6.5a3 3 0 0 1 0 6Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#1366E0"
      className="shrink-0"
    >
      <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7ZM5 9h14v11H5V9Z" />
    </svg>
  );
}

export default function OurEvents() {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
  const events = activeTab === "Upcoming" ? upcomingEvents : pastEvents;

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-[#1B1B1B]">Our</span>{" "}
            <span className="text-[#1366E0]">Events</span>
          </h2>

          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => setActiveTab("Upcoming")}
              className={`relative pb-1 text-sm font-semibold transition-colors sm:text-base ${
                activeTab === "Upcoming" ? "text-[#1B1B1B]" : "text-[#9A9A9A]"
              }`}
            >
              Upcoming
              {activeTab === "Upcoming" && (
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[#1366E0]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("Past")}
              className={`relative pb-1 text-sm font-semibold transition-colors sm:text-base ${
                activeTab === "Past" ? "text-[#1B1B1B]" : "text-[#9A9A9A]"
              }`}
            >
              Past Events
              {activeTab === "Past" && (
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[#1366E0]" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <div
              key={event.slug}
              className="overflow-hidden rounded-2xl border border-[#ECECEC] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[18/10] w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain"
                />
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    event.status === "Upcoming"
                      ? "bg-[#1B1B1B]"
                      : "bg-[#9A9A9A]"
                  }`}
                >
                  {event.status}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-[#1B1B1B] sm:text-lg">
                  {event.title}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-[#2F5DA8]">
                  <PinIcon />
                  {event.location}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-[#4B4B4B]">
                  <CalendarIcon />
                  {event.date}
                </div>

                <Link
                  href={`/events/${event.slug}`}
                  className="mt-5 block w-full rounded-full border border-[#1B1B1B] px-6 py-2.5 text-center text-sm font-semibold text-[#1B1B1B] transition-colors hover:bg-[#1B1B1B] hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
