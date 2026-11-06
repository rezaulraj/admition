"use client";

import { useMemo, useState } from "react";

type Category = "General" | "Country" | "University" | "Course";

type FaqItem = {
  question: string;
  answer: string;
};

const categories: { key: Category; icon: string }[] = [
  { key: "General", icon: "💬" },
  { key: "Country", icon: "🌍" },
  { key: "University", icon: "🎓" },
  { key: "Course", icon: "📚" },
];

const faqData: Record<Category, FaqItem[]> = {
  General: [
    {
      question: "What does Admission OnBoard actually do?",
      answer:
        "We guide you through the entire study-abroad journey — choosing a course and university, preparing your application and documents, applying for your visa, and settling in once you arrive. Everything runs through one dedicated advisor rather than being split across separate agencies.",
    },
    {
      question: "Is there a fee for using your services?",
      answer:
        "Our onboarding fee and any service charges are shared with you upfront before you commit to anything, so there are no hidden costs. Many of our university partners also pay us directly, which can reduce or remove your fee entirely depending on the course you choose.",
    },
    {
      question: "How long does the whole process usually take?",
      answer:
        "It depends on your destination and intake, but most students start the process 6–9 months before their intended start date. This gives enough time for university offers, financial documentation, and visa processing without rushing any stage.",
    },
    {
      question: "Can you help even if I haven't decided on a country yet?",
      answer:
        "Yes — that's often where we start. Our advisors walk through your budget, academic background, and career goals to shortlist countries and courses that genuinely fit, rather than pushing you toward one destination.",
    },
    {
      question: "Do you support students at every study level?",
      answer:
        "We work with students applying for foundation programmes, undergraduate degrees, postgraduate degrees, and PhD study, as well as professional and diploma-level courses through our pathway partners.",
    },
    {
      question: "What happens if my visa application is refused?",
      answer:
        "We review the refusal reasons with you, help correct any documentation issues, and support a fresh application or an appeal where that's possible. Visa guidance doesn't stop after one attempt.",
    },
    {
      question: "How do I start the application process with you?",
      answer:
        "Book a free consultation through the site or reach out directly by email. An advisor will ask about your academic background, budget, and goals, then set you up with an account where you can track every stage of your application.",
    },
    {
      question: "Do you help with scholarships and funding?",
      answer:
        "Yes — where a course or university offers scholarships, bursaries, or fee waivers, we'll flag your eligibility early and help you put together a strong scholarship application alongside your main one.",
    },
    {
      question: "What documents will I need to prepare?",
      answer:
        "Typically your academic transcripts, a valid passport, an English test score (like IELTS or TOEFL), a statement of purpose, reference letters, and financial proof. The exact list depends on your destination and course — your advisor gives you a personalized checklist.",
    },
    {
      question: "Can my parents or a sponsor be involved in the process?",
      answer:
        "Absolutely. Many students apply with a parent or sponsor handling the financial documentation, and we're happy to loop them into calls or email updates so everyone stays informed.",
    },
    {
      question: "Is my personal information kept confidential?",
      answer:
        "Yes. Your documents and personal details are only shared with the universities you choose to apply to, and are handled in line with data protection regulations for each country we operate in.",
    },
    {
      question: "What if I need to change my plans after starting?",
      answer:
        "Life happens — if your circumstances, budget, or goals shift partway through, your advisor will revisit your shortlist and adjust the plan rather than locking you into the original one.",
    },
  ],
  Country: [
    {
      question: "Which countries can I apply to through you?",
      answer:
        "We currently support applications to the United Kingdom, Cyprus, and Hungary, with university partners across each. Coverage is growing, so it's worth asking your advisor about any destination not listed here.",
    },
    {
      question: "Which destination is cheapest for international students?",
      answer:
        "Tuition and living costs vary a lot by city as well as country — Hungary and Cyprus are generally more affordable than major UK cities, but a smaller UK city can sometimes come in lower than a capital-city programme elsewhere. We'll break down real costs for your shortlist.",
    },
    {
      question: "Do I need to know the local language to study there?",
      answer:
        "No — the vast majority of the programmes we place students into are taught fully in English, even in non-English-speaking countries like Hungary. Language requirements are usually about proving your English ability (IELTS/TOEFL), not learning the local language.",
    },
    {
      question: "Can I work part-time while studying abroad?",
      answer:
        "Most of our destination countries allow international students to work part-time during term and full-time during holidays, though exact hour limits differ by country and visa type. We'll confirm the current rules for wherever you're applying.",
    },
    {
      question: "How do visa requirements differ between countries?",
      answer:
        "Each country has its own financial proof, health insurance, and documentation requirements. The UK, for example, uses a points-based student visa system, while EU destinations like Hungary and Cyprus follow their own national immigration rules. We handle the specifics per destination.",
    },
    {
      question: "Can I bring my family with me on a student visa?",
      answer:
        "Dependant visa rules vary significantly by country and by course level — some postgraduate and research routes allow dependants, while many undergraduate routes don't. We'll confirm what's realistic for your specific visa category.",
    },
    {
      question: "What's the cost of living like in these destinations?",
      answer:
        "As a rough guide, UK cities outside London tend to be more affordable than the capital, while Hungary and Cyprus generally offer a lower overall cost of living. Your advisor can share a realistic monthly budget breakdown once you've picked a city.",
    },
    {
      question: "Is healthcare covered for international students?",
      answer:
        "Most destinations require proof of health insurance as part of your visa application — some, like the UK, include access to public healthcare through a surcharge paid with your visa, while others require private student health insurance.",
    },
    {
      question: "Can I stay and work in the country after I graduate?",
      answer:
        "Several of our destinations offer post-study work visas or graduate route options that let you stay and work for a set period after finishing your degree. Eligibility depends on your course level and the country's current immigration policy, which we keep track of.",
    },
    {
      question: "How safe are these destinations for international students?",
      answer:
        "The UK, Cyprus, and Hungary are all established, popular study destinations with large international student communities and university support services in place. We can also point you toward specific city-level safety resources during your pre-departure briefing.",
    },
  ],
  University: [
    {
      question: "How do you choose which universities to recommend?",
      answer:
        "We match your academic profile, budget, and career goals against accreditation status, course rankings, graduate outcomes, and — importantly — any admission restrictions or notes specific to your home region, which we always disclose upfront.",
    },
    {
      question: 'What does a restriction like "Except Sylhet" mean?',
      answer:
        "Some university partners apply regional restrictions on certain intakes due to visa-compliance monitoring in specific areas. This doesn't reflect on you personally — it's a partner-level policy we flag clearly on the university's profile so there are no surprises later.",
    },
    {
      question: "Can I apply to more than one university at a time?",
      answer:
        "Yes, and we generally recommend it. Applying to a small shortlist (rather than just one) gives you options if an offer, visa timeline, or scholarship doesn't work out the way you expected.",
    },
    {
      question: "Do you help with university partner scholarships?",
      answer:
        "Where a university partner offers scholarships or fee waivers, we'll flag your eligibility during the application stage and help you put together a competitive scholarship application alongside your main one.",
    },
    {
      question: "What if a university partner rejects my application?",
      answer:
        "We review the rejection reasons with your advisor and pivot quickly to backup options on your shortlist, or address the specific gap (grades, English score, documentation) before reapplying elsewhere.",
    },
    {
      question: "Are all your partner universities officially accredited?",
      answer:
        "Yes — we only work with universities and colleges that hold recognized national accreditation in their home country, so any degree you earn is properly recognized for further study or employment.",
    },
    {
      question: "How do I know if a university is a good fit for my grades?",
      answer:
        "Each university listing includes typical entry requirements for its courses. Your advisor also compares your transcripts directly against admission thresholds before you apply, so you're not applying blind.",
    },
    {
      question: "Can I visit a campus before accepting an offer?",
      answer:
        "Some universities offer virtual open days or campus tours, and a few allow in-person visits for international applicants. We can connect you with the university's international office to arrange this where it's available.",
    },
    {
      question: "What support do universities offer international students?",
      answer:
        "Most of our partner universities provide dedicated international student offices, orientation programmes, academic advising, and sometimes airport pickup or accommodation assistance — details vary by institution.",
    },
    {
      question: "Can I transfer between universities after enrolling?",
      answer:
        "Transfers are possible in some cases but depend heavily on your visa conditions, the point in your course, and both universities' policies. It's a more complex process than a fresh application, so speak to your advisor before making any decisions.",
    },
  ],
  Course: [
    {
      question: "How do I know which course level is right for me?",
      answer:
        "It depends on your prior qualifications: Foundation programmes bridge a gap before a degree, Undergraduate suits school leavers, Postgraduate suits those with a completed bachelor's degree, and Professional courses (like SQE law routes) target specific career qualifications. Your advisor will map this against your transcripts.",
    },
    {
      question: "Can I switch courses after starting the application?",
      answer:
        "In most cases, yes — as long as it's before the university has processed your enrolment. Switching gets harder (and sometimes involves reapplying) once a visa has been issued against a specific course, so it's best to raise it as early as possible.",
    },
    {
      question: "Do you help with entry requirements like IELTS or GRE?",
      answer:
        "Yes — we'll tell you exactly which English test and score each course requires, and can point you toward test preparation resources or in-house coaching options where available.",
    },
    {
      question: "What's the difference between a diploma and a degree route?",
      answer:
        "A diploma (often through a pathway college) is usually shorter and can sometimes lead into the second year of a related degree, while a full degree is the complete multi-year programme from day one. Diplomas can be a lower-cost or lower-entry-requirement route into the same field.",
    },
    {
      question: "How are course durations decided — like 3 vs 4 years?",
      answer:
        "This usually comes down to the country's education system (some four-year degrees include a foundation or placement year built in) or whether the course includes an industrial placement year, which adds roughly 12 months to a standard programme length.",
    },
    {
      question: "What happens if I don't meet the English requirement yet?",
      answer:
        "Many universities offer a pre-sessional English course before the main programme starts, which lets you meet the requirement without retaking the main test repeatedly. We can advise whether this route makes sense for your situation.",
    },
    {
      question:
        "Can international qualifications count toward entry requirements?",
      answer:
        "Yes — most universities have equivalency guidelines for qualifications from different countries. We compare your existing qualifications against the target course's entry criteria as part of the initial assessment.",
    },
    {
      question: "Are there placement years or internships built into courses?",
      answer:
        "Several undergraduate programmes, particularly in engineering, business, and computing, offer an optional industrial placement year — typically extending the course by about a year but adding valuable work experience and often improving graduate outcomes.",
    },
    {
      question: "How much does a typical course cost per year?",
      answer:
        "Tuition varies widely by country, university, and subject — professional courses like law (SQE routes) and specialized postgraduate degrees tend to cost more than standard undergraduate programmes. Your advisor provides exact, current fee figures for any course on your shortlist.",
    },
    {
      question: "Can I study part-time or online through your partners?",
      answer:
        "Most of our student visa–linked placements are full-time, on-campus programmes, since that's what's required for most student visa categories. A small number of partners offer blended or part-time postgraduate options — ask your advisor if that's relevant to you.",
    },
  ],
};

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("General");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const items = faqData[activeCategory];
    if (query.trim() === "") return items;
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        item.answer.toLowerCase().includes(query.toLowerCase()),
    );
  }, [activeCategory, query]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
    setOpenIndex(0);
    setQuery("");
  };

  return (
    <section className="w-full bg-[#FFFEFA] px-6 py-16 sm:py-20">
      <div className="mx-auto container">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1366E0]">
            Support
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1B1B1B] sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm text-[#6B6B6B] sm:text-base">
            Everything you need to know about studying abroad, organized by
            topic. Can&apos;t find your answer?{" "}
            <a
              href="/contact"
              className="text-[#2F5DA8] underline underline-offset-2"
            >
              Get in touch with an advisor
            </a>
            .
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A9A9A]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${activeCategory.toLowerCase()} questions...`}
              className="w-full rounded-full border border-[#E5E5E5] bg-white py-3 pl-11 pr-4 text-sm text-[#1B1B1B] outline-none placeholder:text-[#9A9A9A] focus:border-[#1366E0]"
            />
          </div>
        </div>

        {/* Layout: left tabs + right accordion */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Left: category tabs */}
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:h-fit lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count = faqData[cat.key].length;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryClick(cat.key)}
                  className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition-colors lg:w-full ${
                    isActive
                      ? "bg-[#1366E0] text-white shadow-sm"
                      : "border border-[#ECECEC] bg-white text-[#3A3A3A] hover:border-[#1366E0]/30 hover:text-[#1B1B1B]"
                  }`}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <span>{cat.icon}</span>
                    {cat.key}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#F5F5F0] text-[#9A9A9A]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right: accordion */}
          <div>
            <h2 className="mb-5 text-xl font-bold text-[#1B1B1B] sm:text-2xl">
              {activeCategory} Questions
            </h2>

            <div className="flex flex-col gap-3">
              {filtered.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={item.question}
                    className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                      isOpen
                        ? "border-[#1366E0]/40 shadow-sm"
                        : "border-[#ECECEC]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="text-sm font-semibold text-[#1B1B1B] sm:text-base">
                        {item.question}
                      </span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                          isOpen
                            ? "rotate-45 border-[#1366E0] text-[#1366E0]"
                            : "border-[#ECECEC] text-[#9A9A9A]"
                        }`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed text-[#6B6B6B] sm:px-6 sm:pb-6 sm:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <p className="rounded-2xl border border-[#ECECEC] bg-white px-6 py-10 text-center text-sm text-[#6B6B6B]">
                  No questions match your search in this category. Try another
                  term or browse a different topic.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
