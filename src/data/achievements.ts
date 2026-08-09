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
        title: "Double Category Winner",
        organization: "GRIT Awards 2026 — NIAT",
        date: "July 2026",
        description: "Won both the Content and Hackathons categories at NIAT's annual GRIT Awards.",
        metric: "2 Categories",
        category: "competition",
        featured: true
    },
    {
        title: "1st Place Winner",
        organization: "Open Loop Hackathon",
        date: "April 2026",
        description: "Built FormPilot, competing against 120+ teams from 100+ colleges across 14 states.",
        metric: "Rank 1 / 120+",
        category: "competition",
        featured: true,
        link: "/hackathons/open-loop-2026"
    },
    {
        title: "Top 40 Finish",
        organization: "HackBLR",
        date: "April 2026",
        description: "Selected as a finalist out of 2,500+ participants. Built VoiceRx solo.",
        metric: "Top 40 / 2500+",
        category: "competition",
        featured: true
    },
    {
        title: "Participant",
        organization: "Agentathon 2026",
        date: "2026",
        description: "Built a 4-agent CrewAI pipeline that qualifies local business leads and drafts personalized cold outreach.",
        metric: "Multi-Agent",
        category: "competition"
    },
    {
        title: "Participant",
        organization: "Databricks Hackathon",
        date: "2026",
        description: "Built Court Backlog Predictor ML pipeline using PySpark, MLflow, and Delta Lake.",
        metric: "Solo Build",
        category: "competition"
    },
    {
        title: "Maintainer & Project Admin",
        organization: "crewai-recipes (ECSoC)",
        date: "2026",
        description: "Built and maintain an open-source CrewAI multi-agent template library (MIT licensed). Review and merge pull requests from external contributors.",
        metric: "Open Source · MIT",
        category: "open-source",
        featured: true,
        link: "https://github.com/Karan-Raj-KR/crewai-recipes"
    },
    {
        title: "Open Source Contributor",
        organization: "GirlScript Summer of Code",
        date: "2026",
        description: "Merged 12 pull requests as part of GSSoC 2026 (CommitPulse).",
        metric: "12 PRs Merged",
        category: "open-source",
        featured: true
    },
    {
        title: "Founder",
        organization: "KĀRYO",
        date: "2025 - Present",
        description: "Building a digital agency for local businesses in Bangalore.",
        metric: "Active Agency",
        category: "entrepreneurship",
        featured: true
    },
    {
        title: "Google Campus Ambassador",
        organization: "Google",
        // TODO(karan): confirm the date/term for the Campus Ambassador role.
        date: "TBA",
        description: "Selected as a Google Campus Ambassador.",
        metric: "Google",
        category: "recognition"
    },
    {
        title: "Top Prompt Creator",
        organization: "Google Pitch Night",
        // TODO(karan): confirm the date and any additional detail (event edition, prize, etc.).
        date: "TBA",
        description: "Recognized as a Top Prompt Creator at Google Pitch Night.",
        metric: "Google",
        category: "recognition"
    },
    {
        title: "BTech, Computer Science Engineering",
        organization: "NIAT–S-VYASA University",
        date: "2025 - 2029",
        description: "Focusing on backend development with Python and FastAPI, while competing at hackathons and shipping projects outside the curriculum.",
        metric: "In Progress",
        category: "education"
    }
];

export const featuredAchievements = achievements.filter((achievement) => achievement.featured);
