export type AchievementCategory = "competition" | "open-source" | "entrepreneurship" | "education";

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
    { id: "education", label: "Education" },
];

export const achievements: Achievement[] = [
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
        title: "Finalist",
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
        title: "Open Source Contributor",
        organization: "GirlScript Summer of Code",
        date: "2026",
        description: "Merged 12 pull requests across various open-source repositories.",
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
        title: "BTech, Computer Science Engineering",
        organization: "NIAT–S-VYASA University",
        date: "2025 - 2029",
        description: "Focusing on backend development with Python and FastAPI, while competing at hackathons and shipping projects outside the curriculum.",
        metric: "In Progress",
        category: "education"
    }
];

export const featuredAchievements = achievements.filter((achievement) => achievement.featured);
