export type BlogCategory =
  | "Academic Writing"
  | "Destinations"
  | "Visas & Applications";

export type Blog = {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  content: string[];
};

export const blogs: Blog[] = [
  {
    slug: "what-to-look-for-in-a-university-location",
    category: "Academic Writing",
    title: "What International Students Should Look For In A University Location",
    excerpt:
      "Picking a university is about more than the course itself. Safety, cost of living, and campus surroundings matter just as much as the ranking.",
    image: "/university-location.png",
    date: "11 Sept 2026",
    content: [
      "Picking a university is about more than the course itself. Safety, cost of living, and campus surroundings matter just as much as the ranking when you're going to spend years of your life there.",
      "Start with safety. Look up crime statistics for the city and specifically the neighbourhood around campus, not just the country as a whole. Talk to current students or alumni through forums and social media groups to get an honest picture rather than relying only on the university's marketing material.",
      "Cost of living varies dramatically even within the same country. A university in a major capital city might have a stronger name, but rent, groceries, and transport can eat into your budget far faster than in a smaller university town. Factor in these ongoing costs alongside tuition when comparing offers.",
      "Consider the climate and how it might affect your day-to-day life and mental health, especially if you're moving somewhere with long, dark winters or extreme heat. It's a small detail that becomes a big deal after a few months.",
      "Finally, look at what's actually around the campus: part-time job opportunities, public transport links, healthcare access, and communities of people from your own country or background. These support networks make the difference between struggling to adjust and genuinely settling in.",
    ],
  },
  {
    slug: "best-countries-renewable-energy-engineering",
    category: "Destinations",
    title: "Best Countries To Study Renewable Energy Engineering",
    excerpt:
      "As the world shifts toward cleaner power, demand is rising for engineers who can design and scale sustainable energy systems.",
    image: "/renewable-energy-engineering.png",
    date: "11 Sept 2026",
    content: [
      "As the world shifts toward cleaner power, demand is rising for engineers who can design and scale sustainable energy systems. Choosing where to study this field can shape the kind of projects and job market you'll have access to after graduation.",
      "Germany remains a leader thanks to its long-standing investment in wind and solar infrastructure, offering programmes with strong industry ties and research funding. Many universities also teach in English at the postgraduate level, making it accessible to international students.",
      "The United Kingdom offers a mix of world-class research institutions and a growing offshore wind sector, particularly in Scotland, which has become a hub for renewable energy innovation and graduate employment.",
      "Australia's abundant sun and space for large-scale solar projects have pushed its universities to develop cutting-edge research in solar engineering, alongside government incentives that support graduate employment in the sector.",
      "Finland and other Nordic countries stand out for their focus on sustainability across the curriculum, low tuition costs for many programmes, and a job market actively recruiting engineers for green transition projects.",
      "Whichever country you choose, look closely at the university's industry partnerships and internship placement rates. Renewable energy is a hands-on field, and practical experience during your studies often matters more than the institution's name.",
    ],
  },
  {
    slug: "how-to-read-a-course-description",
    category: "Academic Writing",
    title: "How To Read A University Course Description Before Applying",
    excerpt:
      "Choosing a course is one of the biggest decisions in your study abroad journey. Here's how to actually understand what a listing is telling you.",
    image: "/reading-course-descriptions.png",
    date: "11 Sept 2026",
    content: [
      "Choosing a course is one of the biggest decisions in your study abroad journey. Here's how to actually understand what a listing is telling you, beyond the flashy headline title.",
      "Start with the module list rather than the course name. Two programmes with almost identical titles can have very different content depending on which modules are compulsory and which are optional electives.",
      "Pay attention to the assessment methods listed for each module. A course that's heavily weighted toward exams suits a different kind of learner than one built around coursework, group projects, or a final dissertation.",
      "Check the entry requirements carefully, especially any subject-specific prerequisites. Some listings bury a required background subject deep in the fine print, and missing it can delay your application or affect your visa timeline.",
      "Look for information on placement years, industry partnerships, or study-abroad exchanges built into the course. These details are often more indicative of real-world value than the ranking of the department.",
      "Finally, cross-reference the description with the module handbook or previous years' syllabi if the university publishes them. Course descriptions are marketing documents first; the actual syllabus tells you what you'll really be studying.",
    ],
  },
  {
    slug: "best-european-countries-english-taught-degrees",
    category: "Destinations",
    title: "Best European Countries For English-Taught Degrees",
    excerpt:
      "You don't need to learn a new language to study in Europe. These destinations offer strong English-taught programs at lower tuition.",
    image: "/english-taught-degrees.png",
    date: "11 Sept 2026",
    content: [
      "You don't need to learn a new language to study in Europe. A growing number of destinations offer strong English-taught programmes at a fraction of the tuition you'd pay in the UK, US, or Australia.",
      "Finland offers a high standard of living and English-taught master's programmes with a strong emphasis on research and innovation, particularly in engineering and technology fields.",
      "Hungary has become popular for its affordable tuition, especially in medicine and dentistry, alongside a low cost of living compared to Western Europe.",
      "Lithuania and Malta both offer compact, English-friendly environments where international students can settle in quickly, with growing numbers of English-taught bachelor's and master's degrees.",
      "Greece and Cyprus combine a lower cost of living with a Mediterranean lifestyle and increasing numbers of English-taught programmes, particularly in business, tourism, and maritime studies.",
      "When comparing these destinations, check not just tuition fees but also post-study work visa options, since these vary significantly across the EU and can affect your long-term plans after graduation.",
    ],
  },
  {
    slug: "writing-a-scholarship-essay-that-stands-out",
    category: "Academic Writing",
    title: "Writing A Scholarship Essay That Actually Stands Out",
    excerpt:
      "Scholarship committees read hundreds of essays a season. Here's how to write one that doesn't sound like everyone else's.",
    image: "/scholarship-essays.png",
    date: "8 Sept 2026",
    content: [
      "Scholarship committees read hundreds of essays a season. Here's how to write one that doesn't sound like everyone else's and actually gets remembered.",
      "Avoid opening with a generic statement about your passion for the field. Reviewers see this line constantly, and it wastes your strongest real estate: the first sentence. Instead, open with a specific moment or detail that pulls the reader in.",
      "Be specific rather than aspirational. Instead of saying you want to 'make a difference,' describe the exact problem you want to solve and why you're the person to work on it. Concrete details are more convincing than broad ambition.",
      "Answer the actual prompt. It sounds obvious, but many applicants write a generic personal statement and force it to fit the scholarship's specific question, which reviewers notice immediately.",
      "Show, rather than tell, your qualities. Instead of stating that you're resilient, describe a situation where you had to be, and let the reader draw the conclusion themselves.",
      "Finally, read your essay out loud before submitting. Awkward phrasing and overly formal language are far easier to catch by ear than by eye, and a natural, confident voice stands out far more than a polished but generic one.",
    ],
  },
  {
    slug: "visa-interview-questions-and-how-to-answer-them",
    category: "Visas & Applications",
    title: "Common Visa Interview Questions And How To Answer Them",
    excerpt:
      "A visa interview isn't a test of memorized answers, it's a check for genuine intent. Here's how to prepare without sounding rehearsed.",
    image: "/visa-interview-tips.png",
    date: "5 Sept 2026",
    content: [
      "A visa interview isn't a test of memorised answers, it's a check for genuine intent. Officers are trained to spot rehearsed responses, so preparation should focus on clarity, not scripting.",
      "Expect to be asked why you chose this specific university and course. Have a genuine, specific answer ready that connects your academic background and career goals to the programme, rather than a generic response about rankings.",
      "You'll likely be asked how you plan to fund your studies. Know your own finances in detail, including who is sponsoring you and how, and be ready to explain it without hesitation.",
      "Officers often ask about your plans after graduation. Answer honestly about your intentions, whether that's returning home, gaining work experience, or further study, since consistency with your visa category matters more than any single 'ideal' answer.",
      "You may also be asked about ties to your home country, such as family, property, or job prospects. This is used to assess your intent to return, so answer plainly rather than overselling it.",
      "Above all, stay calm and answer only what's asked. Over-explaining or volunteering extra information can create more questions than it answers, while short, honest, and specific answers build confidence in your genuine intent.",
    ],
  },
];

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug);
}
