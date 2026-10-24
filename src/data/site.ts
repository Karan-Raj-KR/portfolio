// All visible content lives here.
// Sources: karanrajkr.com (home, /hackathons, /achievements, /gallery, /blog, every /projects page),
// the project READMEs on github.com/Karan-Raj-KR, and the live product sites. Nothing is invented.
// Facts that change (GitHub forks, latest push) are also refreshed live in the browser
// (src/motion/github.ts); the numbers below are the fallback, checked 23 Oct 2026.
// All 20 public routes were reconciled during migration; see MIGRATION.md.

export type Image = { kind: 'image'; src: string; alt: string; caption: string; w: number; h: number; srcset?: string; sizes?: string; tint?: string };

export type Link = { label: string; href: string };
export type Mechanism =
  | { kind: 'steps'; title: string; steps: { name: string; text: string }[] }
  | { kind: 'chain'; title: string; steps: string[] }
  | { kind: 'code'; title: string; code: string; note: string }
  | { kind: 'verdicts'; title: string; verdicts: { name: string; text: string }[] };
export type Project = {
  slug: string;
  title: string;
  kind: string; // what it is
  result: string; // the index column: placement or status
  year: number;
  team: string;
  stack: string[];
  summary: string; // what it does, for whom; the result is stated separately, once
  description: string; // meta description, 120 to 160 characters
  serves?: string; // who it is for
  contribution?: string; // Karan's own part, where a source states it
  links: Link[];
  facts?: { k: string; v: string }[];
  features?: string[];
  line: string; // what it does, in one line for the work index
  idea?: string; // the idea it started as (featured projects only), in the words of its README
  proof?: string; // the verified result, stated once
  how?: Mechanism; // how it works, set as type: each project gets its own form
  decisions?: { heading: string; text: string }[]; // a product or technical decision, and why
  sections: { heading: string; text: string }[];
  outcome?: string;
  photo?: Image; // a real photograph, only where one exists
};

const certificate: Image = { kind: 'image', src: '/media/open-loop-certificate.webp', tint: '#6b829e', w: 600, h: 800, alt: 'Karan Raj KR receiving the first place certificate on stage at Open Loop 2026.', caption: 'Receiving 1st place at Open Loop 2026, Yenepoya, Mangaluru.' };

export const media = {
  portrait: { kind: 'image', src: '/media/karan-portrait.webp', tint: '#90887d', srcset: '/media/karan-portrait-600.webp 600w, /media/karan-portrait.webp 900w', sizes: '(max-width: 767px) 92vw, 34vw', w: 900, h: 1200, alt: 'Karan Raj KR holding a microphone while public speaking.', caption: 'Public speaking.' } as Image,
  certificate,
};

export const site = {
  name: 'Karan Raj KR',
  short: 'Karan Raj',
  role: 'Co-founder, KĀRYO',
  seoTitle: 'Karan Raj KR | AI Developer & KĀRYO Co-founder',
  url: 'https://www.karanrajkr.com',
  description:
    'Karan Raj KR is an AI developer, open-source maintainer and KĀRYO co-founder in Bangalore. Explore AI projects, national hackathon wins and build notes.',
  email: 'mail@karanrajkr.com',
  location: 'Based in Bangalore.',
  github: 'Karan-Raj-KR',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Karan-Raj-KR' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/karanrajkr/' },
    { label: 'X', href: 'https://x.com/karan_raj_kr' },
    { label: 'Instagram', href: 'https://www.instagram.com/karan.rajkr/' },
    { label: 'Hashnode', href: 'https://karanrajkr.hashnode.dev/' },
  ],
  otherProfiles: [
    { label: 'YouTube', href: 'https://www.youtube.com/@KaranRajKR' },
    { label: 'Medium', href: 'https://medium.com/@karanrajkr2008' },
    { label: 'Dev.to', href: 'https://dev.to/karanrajkr' },
  ],
  hero: {
    // The h1, one line each: Karan's own line from karanrajkr.com, set in the display face.
    title: ['From ideas', 'to real', 'products.'],
    sentence: 'I’m Karan Raj KR. I build AI products, co-founded KĀRYO with Havinash, and maintain crewai-recipes, an open-source CrewAI repository.',
    roles: 'B.Tech CSE (AI/ML) at NIAT and S-VYASA, batch of 2029. Based in Bangalore.',
    action: { label: 'See the work', href: '#work' },
    second: { label: 'Email me', href: '#contact' },
  },
  contact: {
    lines: ['Have an idea?', 'Tell me in one line.'],
    placeholder: 'An app that tells clinics who to call back first',
    note: 'The arrow opens Gmail in this tab. Or choose Outlook.com or your email app below. You review and send the email there.',
  },

  // Wins, strongest first. Every row is also in record.groups.
  wins: {
    heading: 'Results so far',
    lead: 'Each against the field it was measured in.',
    items: [
      { figure: '1st', event: 'Open Loop 2026', detail: 'A national-level hackathon with teams from 14+ states. We won with FormPilot, built with Havinash and Saagnik.', when: 'Apr 2026', href: '/work/formpilot/' },
      { figure: 'Top 40', event: 'Hack BLR 2026', detail: 'VoiceRx, a voice health assistant, built alone against 2,500+ teams.', when: 'Apr 2026', href: '/work/voicerx/' },
      { figure: 'Top 41', event: 'OpenAI DevDay Exchange', detail: 'Selected from thousands of applications for the community hackathon in Bengaluru.', when: 'Oct 2026' },
      { figure: '2/2', event: 'GRIT Awards 2026', detail: 'Won both the Content and the Hackathons categories at NIAT.', when: '2026' },
      { figure: 'Award', event: 'Technology Innovators Award', detail: 'Certificate of achievement.', when: 'Aug 2026' },
      { figure: '1st', event: 'Ideathon 2026', detail: 'First place.', when: '2026' },
    ],
  },

  karyo: {
    heading: 'KĀRYO',
    // [[c|text]] marks a highlight: c is b (blue), k (ink) or t (tone).
    story: 'KĀRYO is the digital agency Havinash and I co-founded in [[b|August 2025]] to put local businesses in Bangalore online. We find clients the direct way, [[k|door to door]], starting with clinics and neighbourhood shops. I lead the backend, business development and client outreach. We build the websites, including the one for [[t|ISKCON Visakhapatnam]], and the tools that run the agency itself: the Client Onboarding Manager for quotations and [[t|GST invoices]], and a Lead Intelligence Agent that decides which doors to knock on next. Every proposal, contract and invoice template is written in house, international clients included. So far the agency and my products have brought in [[b|6 figures in revenue]], and I have pitched KĀRYO to [[k|a VC and an angel investor]].',
    close: 'See what KĀRYO is doing now.',
    lead: 'Havinash and I co-founded KĀRYO in August 2025: a digital agency for local businesses in Bangalore. We find clients the direct way, door to door, starting with clinics and local shops.',
    work: [
      'I lead backend, business development and client outreach',
      'Client websites, including ISKCON Visakhapatnam (Next.js, Tailwind)',
      'Internal AI tools: the Client Onboarding Manager and the Lead Intelligence Agent',
      'Every operating document written in house: proposals, contracts, GST invoices, international clients',
      '6 figures in revenue through the agency and my products',
      'Pitched to a VC and an angel investor',
    ],
    built: ['client-onboarding-manager', 'lead-intelligence-agent', 'iskcon-visakhapatnam'],
    link: { label: 'Visit KĀRYO', href: 'https://karyo.online' },
  },

  karana: 'KĀRYO is named after the karana, half a lunar day.',

  teaser: {
    heading: 'Building in Bangalore.',
    text: 'When I’m not shipping, I’m on stage, writing build notes, or knocking on a clinic door for KĀRYO. I also make content on Instagram and LinkedIn.',
  },

  about: {
    heading: 'Builder. Founder.',
    bio: [
      'I’m Karan Raj KR, based in Bangalore, studying B.Tech CSE (AI/ML) at NIAT and S-VYASA, batch of 2025 to 2029.',
      'In my first year Havinash and I co-founded KĀRYO. I won Open Loop 2026 with FormPilot, placed Top 40 of 2,500+ teams at Hack BLR building solo, and became the project admin of an open-source repository other developers fork. I also make content on Instagram and LinkedIn.',
    ],
    roles: [
      { title: 'Co-founder, KĀRYO', when: 'Aug 2025 to now', text: 'Co-founded with Havinash. I lead backend, business development and client outreach for a digital agency serving local businesses.' },
      { title: 'EDC President candidate', when: 'Now', text: 'Running for President of the Entrepreneurship Development Cell.' },
      { title: 'Finance Head, ED Club', when: '2025 · First year of B.Tech', text: 'Co-organised 4+ events: an IPL auction, a build-a-product-in-30-minutes pitch, a sponsored teams event and an entrepreneurship debate. The biggest drew 140+ people, and I spoke to large audiences. Won a best member award.' },
      { title: 'Project Admin, ECSoC', when: '2026', text: 'crewai-recipes: open-source CrewAI templates on NVIDIA NIM.' },
      { title: 'Contributor, GSSoC', when: '2026', text: '18 pull requests merged in GirlScript Summer of Code.' },
      { title: 'Google Campus Ambassador', when: 'Until Jan 2026', text: 'Past role.' },
    ],
    recognition: [
      'GRIT Awards 2026, NIAT: won both the Content and the Hackathons categories',
      'Technology Innovators Award, certificate of achievement, 10 Aug 2026',
      'Top Prompt Creator, Google Pitch Night',
    ],
    now: [
      'Building the KĀRYO Client Onboarding Manager: quotations, GST invoices and payment automation',
      'Eligent: a prototype in progress',
      'Running for EDC President',
    ],
    skills: [
      { group: 'Product', items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'Python', 'FastAPI'] },
      { group: 'AI', items: ['Groq', 'NVIDIA NIM', 'CrewAI', 'MCP', 'Claude Code'] },
      { group: 'Ship', items: ['Vercel', 'Docker', 'AWS Bedrock'] },
    ],
    writing: [
      { slug: 'open-loop-2026-formpilot-winner', title: 'We Scrapped 6 Hours of Work Mid-Hackathon. Then We Won 1st Place at Open Loop 2026.', date: 'Jul 9, 2026', datetime: '2026-07-09', summary: 'Three first-year students scrapped six hours of work, pivoted at 5 PM, and won 1st place at Open Loop 2026 with FormPilot, an AI Chrome extension.', href: 'https://karanrajkr.hashnode.dev/open-loop-2026-formpilot-winner', alt: { label: 'Dev.to', href: 'https://dev.to/karanrajkr/we-scrapped-6-hours-of-work-mid-hackathon-then-we-won-1st-place-at-open-loop-2026-2b17' } },
      { slug: 'my-first-year-of-engineering', title: 'My First Year of Engineering: What I Built, Won, and Actually Learned', date: 'Jul 6, 2026', datetime: '2026-07-06', summary: 'What I built, won and learned during my first year of engineering.', href: 'https://karanrajkr.hashnode.dev/my-first-year-of-engineering', alt: { label: 'Dev.to', href: 'https://dev.to/karanrajkr/my-first-year-of-engineering-what-i-built-won-and-actually-learned-1473' } },
    ],
  },

  updates: [
    { datetime: '2026-10-10', date: '10 Oct 2026', text: 'Selected among the top 41 from thousands of applications for the OpenAI DevDay Exchange community hackathon in Bengaluru.', href: '/record/#wins' },
    { datetime: '2026-08-30', date: '29 and 30 Aug 2026', text: 'Built Eligent in 24 hours at The Hive Sprint, Startup Park Bengaluru.', href: '/work/eligent/' },
    { datetime: '2026-08-10', date: '10 Aug 2026', text: 'Received the Technology Innovators Award.', href: '/record/#wins' },
    { datetime: '2026-07-09', date: '9 Jul 2026', text: 'Published the story behind FormPilot and our Open Loop win.', href: '/about/#writing-open-loop-2026-formpilot-winner' },
    { datetime: '2026-07-06', date: '6 Jul 2026', text: 'Published what I built, won and learned in my first year of engineering.', href: '/about/#writing-my-first-year-of-engineering' },
    { datetime: '2026-04-25', date: '25 and 26 Apr 2026', text: 'Won Open Loop 2026 with FormPilot, built with Havinash and Saagnik.', href: '/work/formpilot/' },
    { datetime: '2025-08', date: 'Aug 2025', text: 'Co-founded KĀRYO with Havinash in Bangalore.', href: '/#karyo' },
  ],

  record: {
    intro: 'Everything I’ve won, shipped and built so far, each with the scale it was measured against.',
    groups: [
      {
        name: 'Competitions and hackathons',
        rows: [
          { when: '10 Oct 2026', what: 'OpenAI DevDay Exchange community hackathon, selected from thousands of applications', where: 'Bengaluru', result: 'Top 41', tier: 'win' },
          { when: '29 to 30 Aug 2026', what: 'The Hive Sprint, Eligent built in 24 hours', where: 'Startup Park Bengaluru', result: 'Built' },
          { when: '25 to 26 Apr 2026', what: 'Open Loop 2026, FormPilot with Havinash and Saagnik', where: 'Yenepoya, Mangaluru', result: '1st of 121 teams', tier: 'win' },
          { when: 'Apr 2026', what: 'Hack BLR 2026, VoiceRx, solo', where: 'Bengaluru', result: 'Top 40 of 2,500+', tier: 'win' },
          { when: '2026', what: 'GRIT Awards 2026, Content and Hackathons categories', where: 'NIAT', result: 'Won both', tier: 'win' },
          { when: '2026', what: 'Ideathon', where: '', result: 'Winner', tier: 'win' },
          { when: '2026', what: 'Agentathon 2026, KĀRYO Lead Intelligence Agent', where: '', result: 'Participated', tier: 'minor' },
          { when: '2026', what: 'TakeOver’26, 24 hour live build with Havinash and Saagnik', where: 'NIAT KKH, Hyderabad', result: 'Participated', tier: 'minor' },
          { when: '2026', what: 'Smart India Hackathon 2026, EdgeWake for an ISRO problem statement', where: 'Internal round', result: 'Presented', tier: 'minor' },
        ],
      },
      {
        name: 'Open source',
        rows: [
          { when: '2026', what: 'crewai-recipes, Maintainer and ECSoC Project Admin', where: 'GitHub', result: 'MIT licensed' },
          { when: '2026', what: 'GirlScript Summer of Code', where: 'GitHub', result: '18 PRs merged' },
        ],
      },
      {
        name: 'Entrepreneurship',
        rows: [
          { when: 'Aug 2025 to now', what: 'Co-founder, KĀRYO, with Havinash', where: 'Bangalore', result: 'Active agency' },
          { when: 'To date', what: 'Revenue through agencies and products', where: '', result: '6 figures' },
          { when: '2025 · First year of B.Tech', what: 'Finance Head, Entrepreneurship (ED) Club', where: 'NIAT', result: '4+ events, 140+ people' },
        ],
      },
      {
        name: 'Recognition',
        rows: [
          { when: '10 Aug 2026', what: 'Technology Innovators Award', where: 'Certificate of achievement', result: 'Award', tier: 'win' },
          { when: 'Until Jan 2026', what: 'Google Campus Ambassador', where: 'Google', result: 'Past role', tier: 'minor' },
          { when: 'Past', what: 'Top Prompt Creator, Google Pitch Night', where: 'Google', result: 'Credential', tier: 'minor' },
        ],
      },
      {
        name: 'Education',
        rows: [{ when: '2025 to 2029', what: 'B.Tech CSE (AI/ML)', where: 'NIAT and S-VYASA University, Bengaluru', result: 'In progress' }],
      },
    ],
  },

  footer: {
    heading: 'Let’s build something.',
  },
  notFound: {
    heading: 'This page doesn’t exist.',
    text: 'The link may be old. Everything that does exist is one step back.',
    cta: 'Back to the start',
  },
};

export const projects: Project[] = [
  {
    slug: 'formpilot',
    title: 'FormPilot',
    kind: 'AI Chrome extension',
    result: '1st, Open Loop 2026',
    year: 2026,
    team: 'Karan Raj KR, Havinash and Saagnik',
    stack: ['Chrome Manifest V3', 'React 18', 'TypeScript', 'Vite', 'esbuild'],
    summary: 'A Chrome extension that reads a web form, works out what each field is asking, shows you its answers, and fills them in when you agree, long answers included.',
    description: 'FormPilot is an AI Chrome extension that scans a web form, previews its answers and fills them on approval. Built by Karan Raj KR, Havinash and Saagnik.',
    serves: 'People who type the same details into form after form, and still face the long answer at the end of an application.',
    contribution: 'Team lead. I mapped the architecture, worked out the business model and the pitch, shot the demo video and gave the explanation in judging. Havinash built the frontend and backend logic; he and Saagnik built Google Sign-In.',
    links: [
      { label: 'Chrome Web Store', href: 'https://chromewebstore.google.com/detail/formpilot/ffkpekcnpbafklidejfbhinahahaabfi' },
      { label: 'Website', href: 'https://form-pilot.netlify.app/' },
      { label: 'Source', href: 'https://github.com/Karan-Raj-KR/FormPilot' },
      { label: 'The story', href: 'https://karanrajkr.hashnode.dev/open-loop-2026-formpilot-winner' },
    ],
    facts: [
      { k: 'Event', v: 'Open Loop 2026, Yenepoya, Mangaluru, 25 and 26 April' },
      { k: 'Field', v: '14+ states, 109 colleges, 121 teams, 309 participants' },
      { k: 'Score', v: '80/100, against the runner-up’s 60/100' },
      { k: 'Prize', v: '₹20,000' },
      { k: 'Now', v: 'Published on the Chrome Web Store' },
    ],
    features: ['Reads labels in React and Vue apps, where selectors break', 'Writes essay and textarea answers', 'Matches dropdown options without an exact string match', 'Profiles, a vault and a fill history', 'OpenAI, Claude, Gemini and Groq, with your own key'],
    line: 'Scans a web form, previews its answers, and fills them when you agree.',
    idea: 'Autofill that understands the form, and writes the long answers too.',
    proof: 'Won Open Loop 2026, a national-level hackathon',
    how: {
      kind: 'steps',
      title: 'Scan, preview, fill',
      steps: [
        { name: 'Scan', text: 'Finds every input, textarea, select and ARIA field, reads its label (aria-label first, then the fieldset legend, then nearby text) and sorts it: personal, contact, address, professional, essay.' },
        { name: 'Preview', text: 'Sends your profile and the field list to the model you chose. Each suggested value comes back with a confidence score, for you to check before anything is written.' },
        { name: 'Fill', text: 'Focuses each field, sets it through the native setter and fires input, change and blur, so React and Vue register the value. The session is saved to History.' },
      ],
    },
    decisions: [
      { heading: 'Nothing is written before you see it', text: 'The model’s answers stop at a preview, each with its confidence. You see what will be written, and only Fill touches the page.' },
      { heading: 'Your key, no relay server', text: 'Calls go straight from the browser to the provider you choose. Keys stay in the extension’s local storage, and there is no telemetry.' },
    ],
    sections: [
      { heading: 'The problem', text: 'Browser autofill matches field names. It breaks on React and Vue apps, and it can’t write the 500 word answer at the bottom of an application.' },
      { heading: 'The pivot', text: 'We arrived to build a Raspberry Pi device. By 5 PM nothing worked, and a product doing the same already cost a quarter of ours. All three of us reached the same conclusion, scrapped six hours of work, and started FormPilot.' },
    ],
    outcome: 'First of 121 teams, scored 80/100 against the runner-up’s 60/100 by a panel of four industry judges. FormPilot has since been published on the Chrome Web Store.',
    photo: certificate,
  },
  {
    slug: 'voicerx',
    title: 'VoiceRx',
    kind: 'Voice health assistant',
    result: 'Top 40, Hack BLR 2026',
    year: 2026,
    team: 'Solo',
    stack: ['Vapi', 'FastAPI', 'Qdrant', 'Groq', 'FastEmbed'],
    summary: 'A voice assistant that answers health questions on a phone call, from a curated set of health FAQs rather than the model’s memory.',
    description: 'VoiceRx is a voice health assistant Karan Raj KR built solo with Vapi, FastAPI, Qdrant and Groq. It answers from retrieved health FAQs during a call.',
    serves: 'Patients who have a phone long before they have a doctor nearby.',
    contribution: 'Built alone: the Vapi assistant, the FastAPI webhook, the FAQ ingestion into Qdrant and the answer step.',
    links: [{ label: 'Source', href: 'https://github.com/Karan-Raj-KR/VoiceRx' }],
    facts: [
      { k: 'Event', v: 'Hack BLR 2026, Bengaluru, April' },
      { k: 'Field', v: '2,500+ teams' },
      { k: 'Result', v: 'Top 40, as a solo build' },
    ],
    line: 'Answers health questions over a phone call, from retrieved FAQs.',
    idea: 'Health answers over a phone call, for patients who can’t reach a doctor.',
    proof: 'Top 40 of 2,500+ teams at Hack BLR 2026, built solo',
    how: {
      kind: 'chain',
      title: 'One question, six steps',
      steps: ['You ask a question on the call', 'Vapi turns it into text and calls the webhook', 'FastEmbed embeds the question locally', 'Qdrant returns the three closest health FAQs', 'Llama 3.1 8B on Groq answers from those three', 'Vapi reads the answer back'],
    },
    decisions: [
      { heading: 'Retrieve first, then answer', text: 'The model is never asked a health question cold. It gets the three closest entries from a curated FAQ set and writes its answer from them, so what a caller hears can be traced to a source.' },
    ],
    sections: [
      { heading: 'The problem', text: 'Plenty of patients have a phone long before they have a doctor. VoiceRx gives them someone to ask, on an ordinary call.' },
    ],
    outcome: 'Top 40 of 2,500+ teams at Hack BLR 2026, built alone.',
  },
  {
    slug: 'client-onboarding-manager',
    title: 'Client Onboarding Manager',
    kind: 'AI agent for KĀRYO',
    result: 'Live, in progress',
    year: 2026,
    team: 'Karan Raj KR',
    stack: ['Next.js', 'Groq', 'Supabase'],
    summary: 'The tool KĀRYO runs on: an AI agent that drafts quotations, raises GST invoices and automates payment follow-up from one client record.',
    description: 'The KĀRYO Client Onboarding Manager by Karan Raj KR: an AI agent built with Next.js, Groq and Supabase for quotations, GST invoices and payments.',
    serves: 'KĀRYO itself, and every new client the agency signs.',
    contribution: 'Built by me, first in a live 24 hour hackathon session, and still my main build.',
    links: [{ label: 'Live app', href: 'https://karyo-client-onboarding-manager.vercel.app/' }],
    features: ['Quotations', 'GST invoices', 'Payment automation'],
    line: 'Drafts quotations, raises GST invoices and chases payments for KĀRYO.',
    sections: [
      { heading: 'Why', text: 'Every new KĀRYO client needs the same three things: a quotation, a GST invoice and someone chasing the payment. This agent does all three from one client record.' },
      { heading: 'Status', text: 'Live, and still being built. It is what I’m working on now.' },
    ],
  },
  {
    slug: 'school-erp',
    title: 'School ERP',
    kind: 'Demo product',
    result: 'Live demo',
    year: 2026,
    team: 'Karan Raj KR',
    stack: ['Next.js 15', 'Supabase'],
    summary: 'A school ERP with about 45 routes: students, fees, exams, attendance, a parent portal, and Ask ERP, which answers questions about the school’s data in plain language.',
    description: 'School ERP by Karan Raj KR: a Next.js 15 and Supabase demo with about 45 routes for students, fees, exams, attendance, parents and AI queries.',
    serves: 'A school’s office, its principal, its teachers and its parents, each with their own view.',
    links: [{ label: 'Live demo', href: 'https://erpdemo.karanrajkr.com/' }],
    facts: [{ k: 'Routes', v: 'About 45' }, { k: 'Roles', v: 'Office, principal, teacher, parent' }],
    features: ['Students and fees', 'Exams and attendance', 'Parent portal', 'Ask ERP: questions in plain language'],
    line: 'Runs a school on one dataset: students, fees, exams, parents, and questions in plain language.',
    sections: [
      { heading: 'What it is', text: 'A single-tenant ERP for a school: the office runs students and fees, teachers run exams and attendance, parents see their child, and anyone can ask the data a question.' },
    ],
  },
  {
    slug: 'crewai-recipes',
    title: 'crewai-recipes',
    kind: 'Open-source repository',
    result: 'Maintainer',
    year: 2026,
    team: 'Maintainer, with open-source contributors',
    stack: ['CrewAI', 'NVIDIA NIM', 'Python', 'FastAPI'],
    summary: 'Ready-to-run CrewAI multi-agent workflows on NVIDIA NIM, with a gallery where you watch a recorded run before you clone anything. I maintain it.',
    description: 'crewai-recipes: open-source, MIT-licensed CrewAI multi-agent workflows on NVIDIA NIM, maintained by Karan Raj KR, with a gallery of recorded runs.',
    serves: 'Developers who want a working multi-agent workflow to start from, not a wall of example code and a screenshot.',
    contribution: 'Maintainer: the recipes, the contract and its test, the gallery, and the issues new contributors start on. Project Admin for ECSoC.',
    links: [
      { label: 'Gallery', href: 'https://karan-raj-kr.github.io/crewai-recipes/' },
      { label: 'Source', href: 'https://github.com/Karan-Raj-KR/crewai-recipes' },
    ],
    facts: [
      { k: 'Recipes', v: '11, from lead qualification to RAG over a repository' },
      { k: 'License', v: 'MIT' },
      { k: 'Model', v: 'Llama 3.1 8B on NVIDIA NIM by default, 70B with one variable' },
      { k: 'Role', v: 'Maintainer, ECSoC Project Admin' },
    ],
    line: 'Multi-agent workflows you watch run in the browser before you clone them.',
    idea: 'Watch the agents work before you clone them.',
    proof: 'Maintained by me, MIT licensed, open to contributors',
    how: {
      kind: 'code',
      title: 'The contract',
      code: 'recipes/<recipe>/\n  crew.py\n    build_crew(**inputs) -> Crew\n  inputs.json\n    name, label, example per input\n\ntests/test_recipe_contract.py',
      note: 'Meet it, and the CLI flags, the local playground form and the gallery recording all come from the same two files. The test runs on every push, with no API key.',
    },
    decisions: [
      { heading: 'A contract, not glue code', text: 'Every recipe exposes build_crew(**inputs) and an inputs.json. A contributor adds a folder; the tooling finds it. That is what lets first-time contributors add a recipe without touching anything else.' },
    ],
    sections: [
      { heading: 'The problem', text: 'Most multi-agent examples are a wall of code and a screenshot. You can’t tell whether one works, or what the agents say to each other, until you’ve installed it.' },
      { heading: 'The idea', text: 'Fix the order. Recipes are run for real, their agent traces recorded and replayed in the browser, so you watch the agents work first and decide to clone second.' },
    ],
    outcome: 'An MIT-licensed repository other developers fork and build on, run as a project in ECSoC with good-first issues and a written first-PR guide.',
  },
  {
    slug: 'eligent',
    title: 'Eligent',
    kind: 'Eligibility checker',
    result: 'Prototype',
    year: 2026,
    team: 'Karan Raj KR',
    stack: ['TypeScript', 'Chrome extension'],
    summary: 'Tells students which scholarships and opportunities they shouldn’t apply to, and quotes the exact clause that rules them out.',
    description: 'Eligent tells students which scholarships they don’t qualify for and quotes the clause, with zero AI in the eligibility decision. Built in 24 hours.',
    serves: 'Students applying for scholarships and other opportunities with strict eligibility rules.',
    contribution: 'I built all of it: the eligibility engine, the website and the Chrome extension.',
    links: [{ label: 'Live prototype', href: 'https://eligent.karanrajkr.com/' }],
    facts: [{ k: 'Built', v: '24 hours, The Hive Sprint, 29 and 30 Aug 2026' }, { k: 'Where', v: 'Startup Park Bengaluru' }, { k: 'Status', v: 'Prototype in progress' }],
    line: 'Tells students which opportunities they don’t qualify for, and quotes the clause.',
    idea: 'Tell students what they shouldn’t apply to, and quote the clause.',
    proof: 'A live prototype, built in 24 hours at The Hive Sprint',
    how: {
      kind: 'verdicts',
      title: 'Three verdicts',
      verdicts: [
        { name: 'Eligible', text: 'Every rule on the official page is met.' },
        { name: 'Near miss', text: 'With the exact gap, such as “0.2 CGPA short”.' },
        { name: 'Not eligible', text: 'With the sentence from the official page that rules you out.' },
      ],
    },
    decisions: [
      { heading: 'Arithmetic, not AI', text: 'The eligibility engine makes zero LLM calls. A profile goes in, a verdict comes out, and every verdict can be checked against the rule it came from.' },
    ],
    sections: [
      { heading: 'The reframe', text: 'Every tool in this space helps students apply to more things. Eligent helps them apply to fewer, better ones, and checks whether they should start at all.' },
      { heading: 'On the real portal', text: 'A Chrome extension fills the form, refuses to fill one you aren’t eligible for, and compares the documents the portal demands with the official list. The human always clicks submit.' },
    ],
  },
  {
    slug: 'lead-intelligence-agent',
    title: 'Lead Intelligence Agent',
    kind: 'KĀRYO lead pipeline',
    result: 'Agentathon 2026',
    year: 2026,
    team: 'Solo',
    stack: ['CrewAI', 'Groq', 'Python', 'OpenStreetMap'],
    summary: 'Given a city and a category, it finds local businesses, scores the gaps in their online presence, re-checks the borderline ones, and drafts an email for each lead worth pitching.',
    description: 'The KĀRYO Lead Intelligence Agent by Karan Raj KR: a CrewAI and Groq pipeline that finds, scores and re-checks local leads, then drafts outreach.',
    serves: 'KĀRYO’s door-to-door sales: it decides which doors are worth knocking on.',
    contribution: 'Built alone for Agentathon 2026.',
    links: [{ label: 'Source', href: 'https://github.com/Karan-Raj-KR/Karyo-Agent' }],
    line: 'Decides which local businesses KĀRYO should pitch, and drafts what to say.',
    how: {
      kind: 'chain',
      title: 'Four agents',
      steps: ['Researcher: finds businesses on OpenStreetMap, checks each website and domain age', 'Scorer: rates the presence gap and the chance of converting, out of 20', 'Manager: approves 16 and up, rejects 8 and below, re-researches the rest once', 'Copywriter: one 100 to 140 word email per approved lead, naming its gap'],
    },
    sections: [
      { heading: 'Why', text: 'KĀRYO finds clients door to door. This agent decides which doors are worth knocking on, and what to say when one opens.' },
    ],
    decisions: [
      { heading: 'A second look, not a coin toss', text: 'Borderline leads aren’t decided on one score. The manager asks a follow-up research question, the business is researched again and re-scored, and only then approved or dropped. Every decision is logged with its reasoning.' },
    ],
  },
  {
    slug: 'iskcon-visakhapatnam',
    title: 'ISKCON Visakhapatnam',
    kind: 'Client website, KĀRYO',
    result: 'Client work',
    year: 2026,
    team: 'KĀRYO',
    stack: ['Next.js 14', 'Tailwind'],
    summary: 'A website for ISKCON Visakhapatnam, designed and built by KĀRYO.',
    description: 'The ISKCON Visakhapatnam website, a client project built by Karan Raj KR and KĀRYO with Next.js 14 and Tailwind CSS.',
    links: [],
    line: 'A client website, designed and shipped through KĀRYO.',
    sections: [
      { heading: 'What it is', text: 'A client website for ISKCON Visakhapatnam, shipped through KĀRYO with Next.js 14 and Tailwind.' },
    ],
  },
];
