type Testimonial = {
  quote: string;
  name: string;
  school: string;
  country: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I'm grateful I got to fly to Perth for my Bachelor's at the University of Western Australia. My visa was granted within two weeks of applying, even after an earlier attempt with another agency fell through. The team at Admission OnBoard stayed with me until the very end.",
    name: "Ahmed Jashim",
    school: "University of Western Australia",
    country: "Australia",
    initials: "AJ",
  },
  {
    quote:
      "I recently received my UK visa for an MSc in International Business at Ulster University. Admission OnBoard's counsellors helped me choose the right course, prepare my documents, and stayed responsive throughout. Their guidance made a stressful process feel manageable.",
    name: "Hasibul Hasan Sany",
    school: "Ulster University",
    country: "United Kingdom",
    initials: "HS",
  },
  {
    quote:
      "Landing my UK visa for a Master's in Data Analytics at the University of Leicester felt like a huge weight lifted. From choosing the right course to preparing my financial documents, the team was with me at every stage. I finished my undergrad only eight months earlier.",
    name: "Rafid Hasan Chowdhury",
    school: "University of Leicester",
    country: "United Kingdom",
    initials: "RH",
  },
  {
    quote:
      "Getting my New Zealand visa approved for Applied Computing at Otago Polytechnic changed everything for me. Admission OnBoard handled my offer letter, financial planning, and interview prep without me ever feeling lost, right after I'd just finished my HSC.",
    name: "Nusrat Jahan Priya",
    school: "Otago Polytechnic",
    country: "New Zealand",
    initials: "NJ",
  },
  {
    quote:
      "I want to thank Admission OnBoard for helping me secure admission and a visa for Charles Darwin University. This journey wouldn't have been possible without their constant support, especially with assessing my profile carefully before recommending the program.",
    name: "Maharaf Hossain Imran",
    school: "Charles Darwin University",
    country: "Australia",
    initials: "MI",
  },
  {
    quote:
      "My Malta student visa was approved for the Bachelor of Science in Information Technology at the University of Malta, and Admission OnBoard guided me through the whole process without a single missed deadline. From the university application to the financial documents and the visa interview preparation, their team explained every step clearly whenever I felt confused. I had only just finished my HSC and knew almost nothing about European study visas, so having people I could ask at any hour meant a lot. Thank you to the entire team for to full fill my dream.",
    name: "Mahmud Jubare",
    school: "University of Malta, Malta",
    country: "Malta",
    initials: "MJ",
  },
];

export default function StudentTestimonials() {
  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-20">
      <div className="mx-auto container">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1B1B1B] sm:text-4xl">
            What <span className="text-[#1366E0]">Students</span> Say About Us
          </h2>
          <p className="mt-3 text-sm text-[#6B6B6B] sm:text-base">
            Hear from our successful students who turned their study-abroad
            dreams into reality
          </p>
        </div>

        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative mb-6 break-inside-avoid rounded-2xl border border-[#ECECEC] bg-white p-6 shadow-sm"
            >
              <span className="pointer-events-none absolute -top-2 left-5 select-none font-serif text-6xl leading-none text-[#1366E0]/10">
                &ldquo;
              </span>

              <p className="relative text-sm leading-relaxed text-[#3B3B3B]">
                {testimonial.quote}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1366E0] text-xs font-semibold text-white">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1B1B1B]">
                    {testimonial.name}
                  </div>
                  <div className="text-xs font-semibold text-[#1366E0]">
                    {testimonial.school}
                  </div>
                  <div className="text-xs text-[#9A9A9A]">
                    {testimonial.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
