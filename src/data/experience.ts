export interface Experience {
    role: string;
    period: string;
    company: string;
    description: string[];
}

export const experience: Experience[] = [
    {
        role: "Open Source Contributor — GSSoC 2026",
        period: "May 2026 — Present",
        company: "",
        description: [
            "Active contributor in GirlScript Summer of Code 2026",
            "Merged 18 pull requests across open-source repositories",
            "Contributing through bug fixes, backend improvements, and feature implementations",
            "Collaborating with maintainers via GitHub workflows and code reviews",
        ],
    },
    {
        role: "Founder, KĀRYO",
        period: "2025 – Present",
        company: "",
        description: [
            "Building a digital agency helping local businesses in Bangalore establish their online presence",
            "Door-to-door client acquisition across local markets",
            "End-to-end delivery: websites, Google Business, social media setup",
        ],
    },
    {
        role: "1st Place — Open Loop 2026",
        period: "April 2026",
        company: "Yenepoya University / Yentech",
        description: [
            "National-level 24-hour hackathon — 121 teams, 109 colleges, 14 states, 309 participants",
            "Built FormPilot: a Chrome extension that auto-fills web forms using AI (ChatGPT/Claude/Gemini). Handles React/Vue apps, writes cover letters, matches dropdowns intelligently",
            "Scored 80/100 — runner-up scored 60/100. ₹20,000 prize",
            "Team of 3: Karan Raj KR, Havinash, Saagnik Dey",
        ],
    },
    {
        role: "Finalist — HackBLR 2026",
        period: "April 2026",
        company: "HackBLR, Bangalore",
        description: [
            "Selected as finalist from 2,500+ teams across IITs, NITs, IISc — Top 40",
            "Built VoiceRx: AI voice health assistant for patients without doctor access (FastAPI, Vapi, Qdrant, Groq, RAG)",
            "Competed solo",
        ],
    },
    {
        role: "BTech, Computer Science Engineering",
        period: "2025 – 2029",
        company: "NIAT–S-VYASA University",
        description: [
            "Focusing on backend development with Python and FastAPI",
            "Competing at hackathons and shipping projects outside the curriculum",
            "Building toward entrepreneurship alongside college",
        ],
    },
];
