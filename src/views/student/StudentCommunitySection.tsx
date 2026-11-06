import Image from "next/image";

const StudentCommunitySection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 rounded-3xl overflow-hidden shadow-2xl text-white">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] border-[40px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[450px] h-[450px] border-[40px] border-white/5 rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] border-[40px] border-white/5 rounded-full -translate-y-1/4 translate-x-1/6 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[650px]">
            <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
              <h2 className="text-3xl md:text-4x font-montserrat font-bold mb-8 leading-tight">
                Join Our Student Community
              </h2>

              <div className="space-y-4 mb-10">
                <svg
                  className="w-8 h-8 text-primary-300 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H11.017C11.017 14.8954 10.1216 14 9.01703 14H8.01703C8.01703 12.8954 8.91246 12 10.017 12V10H6.01703C4.91246 10 4.01703 10.8954 4.01703 12V18C4.01703 19.1046 4.91246 20 6.01703 20H14.017V21ZM20.017 21V18C20.017 16.8954 19.1216 16 18.017 16H17.017C17.017 14.8954 16.1216 14 15.017 14H14.017C14.017 12.8954 14.9125 12 16.017 12V10H12.017C10.9125 10 10.017 10.8954 10.017 12V18C10.017 19.1046 10.9125 20 12.017 20H20.017V21Z" />
                </svg>
                <p className="text-xl font-medium font-semibold">
                  AdmissionOnBoard filled in all the gaps
                </p>
                <p className="text-primary-100 text-base font-sans leading-relaxed">
                  How to get started was the biggest difficulty I was facing. I
                  knew I wanted a diploma for fitness, but from where?
                  AdmissionOnBoard filled in all the gaps and helped me make the
                  right decision.
                </p>
                <p className="text-primary-200 text-sm italic">~ Jose G.T.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-primary-100">
                  {/*LinkedIn*/}
                  <svg
                    className="w-5 h-5 hover:text-white transition-colors cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  {/*YouTube*/}
                  <svg
                    className="w-5 h-5 hover:text-white transition-colors cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  {/*Instagram*/}
                  <svg
                    className="w-5 h-5 hover:text-white transition-colors cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>

                  {/*TikTok*/}
                  <svg
                    className="w-5 h-5 hover:text-white transition-colors cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  {/*Facebook*/}
                  <svg
                    className="w-5 h-5 hover:text-white transition-colors cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <p className="text-sm text-primary-200 font-sans">
                  Follow us on your preferred platforms!
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 md:p-10 relative z-10">
              <div className="grid grid-cols-3 gap-3 h-full">
                <div className="flex flex-col justify-center">
                  <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] group cursor-pointer">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                      alt="Student talking"
                      fill
                      sizes="(max-width: 1024px) 33vw, 200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-3 left-2 right-2 font-sans bg-primary-600/90 text-white text-xs p-2 rounded-md text-center backdrop-blur-sm">
                      How to study abroad with AdmissionOnBoard
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] group cursor-pointer">
                    <Image
                      src="https://images.unsplash.com/photo-1570708815241-ab70c41765e9?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Student 2"
                      fill
                      sizes="(max-width: 1024px) 33vw, 200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 right-2 font-sans bg-black/70 text-white text-xs p-1.5 rounded-md backdrop-blur-sm">
                      3 steps to study abroad
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] group cursor-pointer">
                    <Image
                      src="https://plus.unsplash.com/premium_photo-1706546718253-37a906e324ff?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Student 3"
                      fill
                      sizes="(max-width: 1024px) 33vw, 200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] group cursor-pointer">
                    <Image
                      src="https://plus.unsplash.com/premium_photo-1686244636206-4fd70f5bb6aa?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Student 4"
                      fill
                      sizes="(max-width: 1024px) 33vw, 200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 font-sans right-2 bg-black/70 text-white text-xs p-1.5 rounded-md backdrop-blur-sm">
                      Why did you choose to study abroad?
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] group cursor-pointer">
                    <Image
                      src="https://plus.unsplash.com/premium_photo-1733306644309-90a33768d232?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Student 5"
                      fill
                      sizes="(max-width: 1024px) 33vw, 200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentCommunitySection;
