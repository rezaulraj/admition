import React from "react";
import Image from "next/image";

// Place your gallery images at, e.g.:
// /public/gallery/session-1.jpg ... session-9.jpg

type GalleryItem = {
  src: string;
  alt: string;
  className: string;
};

const items: GalleryItem[] = [
  {
    src: "/session-1.png",
    alt: "Info session with attentive students",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/session-1.png",
    alt: "Students chatting during a workshop",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/session-1.png",
    alt: "Counsellor greeting visitors",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/session-1.png",
    alt: "Award ceremony with partner university",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/session-1.png",
    alt: "Study abroad photo booth setup",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/session-1.png",
    alt: "One-on-one consultation with counsellor",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/session-1.png",
    alt: "Team meeting with visiting delegates",
    className: "col-span-2 row-span-1",
  },
  {
    src: "/session-1.png",
    alt: "Students filling out application forms",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/session-1.png",
    alt: "Presentation during an education fair",
    className: "col-span-1 row-span-1",
  },
];

export default function PhotoGallery() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-[#1B1B1B] sm:text-3xl">
          Admission OnBoard <span className="text-[#1366E0]">Gallery</span>
        </h2>

        <div className="mt-10 grid auto-rows-[110px] grid-cols-2 gap-3 sm:auto-rows-[140px] sm:grid-cols-4 sm:gap-4">
          {items.map((item) => (
            <div
              key={item.src}
              className={`group relative overflow-hidden rounded-2xl ${item.className}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
