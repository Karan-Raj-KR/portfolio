export interface Project {
    slug: string;
    title: string;
    /** Honest maturity label. Shipped things and weekend builds are not the same
     *  claim, and saying so is what makes the shipped ones believable. */
    context: string;
    description: string;
    /** One verifiable result. Omit rather than invent one. */
    outcome?: string;
    tags: string[];
    overview: string;
    problem: string;
    solution: string;
    architecture: string;
    techStack: string[];
    features: string[];
    challenges: string;
    results: string;
    lessons: string;
    timeline: string;
    links: {
        demo: string | null;
        store?: string | null;
        code: string | null;
    };
}

export const projects: Project[] = [
    {
        slug: "formpilot",
        title: "FormPilot",
        context: "Shipped · Chrome Web Store",
        description:
            "A Chrome extension that reads any web form, works out what each field is actually asking for using an LLM, and fills it in from a saved profile — including long-form answers and awkward dropdowns.",
        outcome: "1st of 121 teams at Open Loop 2026 · scored 80/100, second place scored 60",
        tags: ["Manifest V3", "React", "TypeScript", "LLM"],
        overview:
            "A BYOK Chrome extension that autofills complex web forms using LLMs. Built in 24 hours, won Open Loop 2026, then published to the Chrome Web Store.",
        problem:
            "Job applications, grant forms and registrations ask the same twenty questions in twenty different shapes. Native autofill matches on exact field names, so it breaks on anything with a custom label, a long-form textarea, or a dropdown whose options don't match your answer verbatim.",
        solution:
            "A content script scrapes the DOM for input fields and their surrounding context, sends that plus the user's selected profile to an LLM, and maps the structured JSON response back onto the form.",
        architecture:
            "Vite + React popup UI. A background service worker handles API calls. Content scripts manipulate the active page. All personal data stays in Chrome Storage on-device — the extension never sees a server we control.",
        techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Manifest V3", "OpenAI / Groq API"],
        features: [
            "Multiple profiles (e.g. job seeker vs. investor) with different tones",
            "Dropdown matching that picks the closest valid option rather than failing",
            "Long-form generation for cover letters and summaries",
            "Personal data stored locally, never transmitted to our infrastructure",
            "Bring Your Own Key — the user supplies their own API key",
        ],
        challenges:
            "React and Vue swallow programmatic DOM writes: setting `input.value` directly updates the DOM but never the framework's state, so the form submits empty. Fixed by dispatching the native input/change/blur sequence the frameworks actually listen for, which meant reading how React's synthetic event system attaches listeners.",
        results:
            "1st place at Open Loop 2026 — 121 teams, 109 colleges, 309 participants, 14 states. Scored 80/100 against a second-place score of 60. Published to the Chrome Web Store.",
        lessons:
            "Manifest V3 service workers are killed aggressively, so any state you keep in module scope disappears mid-session. Everything that matters has to round-trip through storage.",
        timeline: "Built in 24 hours · April 2026",
        links: {
            demo: "https://form-pilot.netlify.app/",
            store: "https://chromewebstore.google.com/detail/formpilot/ffkpekcnpbafklidejfbhinahahaabfi",
            code: "https://github.com/Karan-Raj-KR/FormPilot",
        },
    },
    {
        slug: "karyo",
        title: "KĀRYO",
        context: "Running · paying clients",
        description:
            "A digital agency I co-founded with Havinash, getting local Bangalore businesses online — websites, Google Business profiles, social presence. Clients are acquired door-to-door and delivery is end-to-end.",
        outcome: "Paying clients, production work shipped",
        tags: ["Next.js", "SEO", "Client work"],
        overview:
            "A digital agency for local businesses in Bangalore. I lead technical architecture and delivery; Havinash and I both sell.",
        problem:
            "Local businesses in Bangalore have demand but no digital surface — no site, no Google Business listing, nothing to find. Traditional agencies price them out and take months.",
        solution:
            "Cut the agency overhead: direct door-to-door acquisition instead of paid ads, and an AI-assisted build pipeline that gets a small business live in days rather than months.",
        architecture:
            "Next.js sites deployed on Vercel, Google Business profile setup, and internal automation (see the Lead Intelligence Agent) to keep prospecting from eating the whole week.",
        techStack: ["Next.js", "Vercel", "Google Business Profile", "n8n"],
        features: [
            "Websites built and deployed end-to-end",
            "Google Business profile setup and optimisation",
            "Social presence setup",
            "Door-to-door B2B acquisition across local markets",
        ],
        challenges:
            "Selling to owners who have been burned by an agency before, or who don't believe a website will change anything. The pitch had to become a demonstration rather than a deck.",
        results:
            "Paying clients and shipped production work while studying full time.",
        lessons:
            "Doing sales yourself changes what you build. Most of what we thought clients wanted was not what they paid for.",
        timeline: "2025 – present",
        links: { demo: "https://www.karyo.in", code: null },
    },
    {
        slug: "voicerx",
        title: "VoiceRx",
        context: "Hackathon build · solo",
        description:
            "A voice-first health assistant for people who can't get a doctor on the phone. Ask it about a symptom or a medication and it answers conversationally, grounded in a real medical corpus rather than whatever the model remembers.",
        outcome: "Top 40 of 2,500+ participants at HackBLR 2026",
        tags: ["FastAPI", "Vapi", "Qdrant", "Groq", "RAG"],
        overview:
            "A RAG-backed voice health assistant giving preliminary medical information to people without immediate access to a doctor. Built solo.",
        problem:
            "Waiting rooms are long and web search is worse — you type in a symptom and get cancer. People want a conversation, and they want it grounded in something.",
        solution:
            "A voice interface over a retrieval pipeline: Vapi handles speech, Qdrant holds medical embeddings, Groq runs inference fast enough that the conversation doesn't feel like a form submission.",
        architecture:
            "FastAPI handles webhooks and retrieval. Qdrant stores medical embeddings. Groq serves the LLM. Vapi orchestrates speech-to-text and text-to-speech.",
        techStack: ["Python", "FastAPI", "Vapi", "Qdrant", "Groq", "LangChain"],
        features: [
            "Real-time voice conversation",
            "Answers grounded in a retrieved medical corpus, not model memory",
            "Symptom triage that escalates rather than diagnosing",
        ],
        challenges:
            "The full loop — speech-to-text, retrieval, generation, text-to-speech — started at over two seconds, which is long enough that people talk over it. Streaming the response in chunks and moving inference to Groq brought it under 500ms to first audio.",
        results:
            "Top 40 of 2,500+ participants at HackBLR 2026, competing solo against teams.",
        lessons:
            "In voice, latency is the product. A correct answer that arrives late reads as broken.",
        timeline: "April 2026",
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/VoiceRx" },
    },
    {
        slug: "karyo-agent",
        title: "KĀRYO Lead Intelligence Agent",
        context: "Internal tool · in use",
        description:
            "A four-agent CrewAI pipeline that finds local businesses, works out which ones actually need a website, and drafts the outreach. Built because prospecting by hand was eating the week.",
        outcome: "Runs KĀRYO's prospecting; dozens of qualified leads per run",
        tags: ["CrewAI", "Groq", "Pydantic", "Python"],
        overview:
            "A multi-agent lead qualification pipeline supporting KĀRYO's real sales workflow — not a demo.",
        problem:
            "Researching local businesses one at a time, checking whether they already have a site, and writing a personal message to each is a full day's work for maybe fifteen leads.",
        solution:
            "Four agents in sequence: scrape local directories, qualify on digital footprint, draft personalised outreach, then review and format. Each hands structured data to the next.",
        architecture:
            "CrewAI orchestration with Groq for cheap fast reasoning. Pydantic schemas enforce the contract between agents so a malformed step fails loudly instead of poisoning the next one.",
        techStack: ["Python", "CrewAI", "Groq", "Pydantic", "BeautifulSoup"],
        features: [
            "Automated lead scraping from local directories",
            "Qualification on digital footprint (existing site, Google Business presence)",
            "Personalised outreach drafting",
            "A review pass that rejects its own bad output",
        ],
        challenges:
            "The qualification agent confidently invented businesses that didn't exist. Enforcing strict Pydantic schemas on every inter-agent handoff turned silent hallucinations into loud validation errors.",
        results:
            "Now the front of KĀRYO's prospecting process, producing dozens of qualified leads per run.",
        lessons:
            "In a multi-agent chain, an unvalidated handoff means the second agent's error is invisible until the fourth. Schemas at every boundary, not just the output.",
        timeline: "2026",
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/karyo-agent" },
    },
    {
        slug: "court-backlog-predictor",
        title: "Court Backlog Predictor",
        context: "Hackathon build · solo",
        description:
            "A PySpark pipeline on Databricks that forecasts judicial case backlog by court and case type, so administrators can see where the pile-up is coming before it arrives.",
        tags: ["PySpark", "MLflow", "Delta Lake", "Databricks"],
        overview:
            "An ML pipeline on the Databricks lakehouse predicting judicial backlog trends across courts.",
        problem:
            "Court systems are overwhelmed and allocate judges reactively, because nobody can see which jurisdictions are about to get worse.",
        solution:
            "Process historical case records with PySpark and train regression models to forecast backlog severity by case type and jurisdiction.",
        architecture:
            "Data lands in Delta Lake under Unity Catalog governance. PySpark handles distributed processing and training; MLflow tracks experiments.",
        techStack: ["PySpark", "MLflow", "Delta Lake", "Unity Catalog", "Python"],
        features: [
            "Distributed processing of historical case data",
            "Backlog severity forecasting by jurisdiction and case type",
            "Experiment tracking through MLflow",
        ],
        challenges:
            "Historical legal records are inconsistent in almost every field that matters — dates, case types, court identifiers. Most of the work was normalisation before any modelling could start.",
        results: "Built and deployed end-to-end during the hackathon, solo.",
        lessons:
            "On real administrative data, feature engineering is downstream of a week of cleaning you didn't budget for.",
        timeline: "2026",
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/court-backlog-predictor" },
    },
];
