"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";


const videos = [
  {
    id: "aqz-KE-bpKQ",
    name: "Rafid Hasan",
    thumbnail: "/success1.png",
  },
  {
    id: "eYq7WapuDLU",
    name: "Rajon Kumar",
    thumbnail: "/success2.png",
  },
  {
    id: "M7lc1UVf-VE",
    name: "Imran Kabir",
    thumbnail: "/success5.png",
  },
  {
    id: "5qap5aO4i9A",
    name: "Rakib Uddin",
    thumbnail: "/success8.png",
  },
];

const ITEMS_PER_VIEW = 4;

export default function StudentVideoStories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const pageCount = Math.ceil(videos.length / ITEMS_PER_VIEW);

  const scrollToPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;
    // Pages come from the real track width, so the arrows still work on small screens where fewer cards fit
    const maxPage = Math.ceil(track.scrollWidth / track.clientWidth) - 1;
    const clamped = Math.max(0, Math.min(page, maxPage));
    track.scrollTo({
      left: clamped * track.clientWidth,
      behavior: "smooth",
    });
    setActivePage(clamped);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const page = Math.round(track.scrollLeft / track.clientWidth);
      setActivePage(page);
    };
    track.addEventListener("scroll", onScroll);
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideoId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            Hear From <span className="text-[#1366E0]">Our Students</span>
          </h2>
          <p className="mt-3 text-sm font-semibold text-[#6B6B6B] sm:text-base">
            Real stories, straight from the students we&apos;ve guided abroad
          </p>
        </div>

        <div className="relative mt-12">
          <button
            type="button"
            onClick={() => scrollToPage(activePage - 1)}
            aria-label="Previous videos"
            className="absolute left-0 top-1/2 z-10 -translate-x-1/2 lg:hidden -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#1B1B1B] bg-white text-[#1B1B1B] shadow-sm transition-colors hover:bg-[#1B1B1B] hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {videos.map((video) => (
              <button
                key={video.id}
                type="button"
                // onClick={() => setActiveVideoId(video.id)}
                className="group relative aspect-[3/4] w-[calc(25%-15px)] min-w-[220px] shrink-0 snap-start overflow-hidden rounded-3xl"
              >
                <Image
                  src={video.thumbnail}
                  alt={`${video.name} shares their study abroad story`}
                  fill
                  sizes="(max-width: 768px) 70vw, 260px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform group-hover:scale-110">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#1B1B1B"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToPage(activePage + 1)}
            aria-label="Next videos"
            className="absolute right-0 top-1/2 z-10 translate-x-1/2 lg:hidden -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#1B1B1B] bg-white text-[#1B1B1B] shadow-sm transition-colors hover:bg-[#1B1B1B] hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {pageCount > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to page ${i + 1}`}
                onClick={() => scrollToPage(i)}
                className={`h-2.5 rounded-full transition-all ${
                  activePage === i ? "w-6 bg-[#1366E0]" : "w-2.5 bg-[#E5E5E5]"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Video modal */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideoId(null)}
              aria-label="Close video"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1B1B1B] hover:bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="Student story video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
