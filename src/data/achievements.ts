export type AchievementCategory =
    | "competition"
    | "open-source"
    | "entrepreneurship"
    | "recognition"
    | "education";

export interface Achievement {
    title: string;
    organization: string;
    date: string;
    description: string;
    metric: string;
    category: AchievementCategory;
    featured?: boolean;
    link?: string;
    icon?: string;
}

export const achievementCategories: { id: AchievementCategory; label: string }[] = [
    { id: "competition", label: "Competitions & Hackathons" },
    { id: "open-source", label: "Open Source" },
    { id: "entrepreneurship", label: "Entrepreneurship" },
    { id: "recognition", label: "Recognition & Credentials" },
    { id: "education", label: "Education" },
];

export const achievements: Achievement[] = [
  {
    "title": "Top 50",
    "organization": "OpenAI DevDay Exchange community hackathon",
    "date": "10 Oct 2026",
    "description": "Top 50 at the OpenAI DevDay Exchange community hackathon, Bengaluru.",
    "metric": "Top 50",
    "category": "competition",
    "featured": true
  },
  {
    "title": "Creator programme selection",
    "organization": "SPARK 2026 · NIAT",
    "date": "2026",
    "description": "Instagram and LinkedIn creator. Selected for SPARK 2026, the NIAT creator programme.",
    "metric": "Selected",
    "category": "recognition"
  },
  {
    "title": "Agency and product revenue",
    "organization": "Entrepreneurship",
    "date": "To date",
    "description": "Revenue through agencies and products.",
    "metric": "6 figures",
    "category": "entrepreneurship",
    "featured": true
  },
  {
    "title": "Finance Head · Last term",
    "organization": "Entrepreneurship (ED) Club",
    "date": "Last term",
    "description": "Co-organised 4+ events. The biggest ED Club event had 140+ people.",
    "metric": "140+ people · 4+ events",
    "category": "entrepreneurship"
  },
    {
        title: "Double Category Winner",
        organization: "GRIT Awards 2026 — NIAT",
        date: "2026",
        description: "Won both the Content and Hackathons categories at NIAT's annual GRIT Awards.",
        metric: "2 Categories",
        category: "competition",
        featured: true
    },
    {
        title: "1st Place Winner",
        organization: "Open Loop 2026",
        date: "April 2026",
        description: "Built FormPilot with Havinash and Saagnik, competing against 121 teams from 109 colleges across 14 states — 309 participants. Scored 80/100 vs the runner-up's 60/100. ₹20,000 prize.",
        metric: "Rank 1 / 121 teams",
        category: "competition",
        featured: true,
        link: "/hackathons/open-loop-2026"
    },
    {
        title: "Top 40 Finish",
        organization: "Hack BLR 2026",
        date: "April 2026",
        description: "Selected as a finalist out of 2,500+ teams. Built VoiceRx solo.",
        metric: "Top 40 / 2,500+ teams",
        category: "competition",
        featured: true
    },
    {
        title: "Participant",
        organization: "Agentathon 2026",
        date: "2026",
        description: "Participated with the KĀRYO Lead Intelligence Agent, a CrewAI multi-agent pipeline.",
        metric: "Multi-Agent",
        category: "competition"
    },
    {
        title: "Technology Innovators Award",
        organization: "Certificate of Achievement",
        date: "10 Aug 2026",
        description: "Recognized with a certificate of achievement for the Technology Innovators Award.",
        metric: "Award",
        category: "recognition",
        featured: true
    },
    {
        title: "Ideathon Winner",
        organization: "Ideathon",
        date: "2026",
        description: "Won an Ideathon.",
        metric: "1st Place",
        category: "competition",
        featured: true
    },
    {
        title: "Maintainer & Project Admin",
        organization: "crewai-recipes (ECSoC)",
        date: "2026",
        description: "Open-source CrewAI templates using NVIDIA NIM. MIT licensed, with 9 forks. ECSoC Project Admin.",
        metric: "9 forks · MIT",
        category: "open-source",
        featured: true,
        link: "https://github.com/Karan-Raj-KR/crewai-recipes"
    },
    {
        title: "Open Source Contributor",
        organization: "GirlScript Summer of Code",
        date: "2026",
        description: "Merged 18 pull requests as part of GSSoC 2026.",
        metric: "18 PRs Merged",
        category: "open-source",
        featured: true
    },
    {
        title: "Founder",
        organization: "KĀRYO",
        date: "Aug 2025 – Present",
        description: "Founded KĀRYO in Aug 2025. Door-to-door client outreach across Bengaluru.",
        metric: "Active Agency",
        category: "entrepreneurship",
        featured: true
    },
    {
        title: "Google Campus Ambassador",
        organization: "Google",
        date: "Ended Jan 2026",
        description: "Past role: Google Campus Ambassador.",
        metric: "Google",
        category: "recognition"
    },
    {
        title: "Top Prompt Creator",
        organization: "Google Pitch Night",
        date: "Past credential",
        description: "Past credential: Top Prompt Creator at Google Pitch Night.",
        metric: "Google",
        category: "recognition"
    },
    {
        title: "B.Tech CSE (AI/ML)",
        organization: "NIAT–S-VYASA University",
        date: "2025 - 2029",
        description: "NIAT–S-VYASA, Bengaluru. Batch 2025–29.",
        metric: "In Progress",
        category: "education"
    }
];

export const featuredAchievements = achievements.filter((achievement) => achievement.featured);
