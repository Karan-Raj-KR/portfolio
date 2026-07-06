export interface Achievement {
    title: string;
    organization: string;
    date: string;
    description: string;
    metric: string;
    icon?: string;
}

export const achievements: Achievement[] = [
    {
        title: "1st Place Winner",
        organization: "Open Loop Hackathon",
        date: "April 2026",
        description: "Built FormPilot, competing against 120+ teams from 100+ colleges across 14 states.",
        metric: "Rank 1 / 120+"
    },
    {
        title: "Finalist",
        organization: "HackBLR",
        date: "April 2026",
        description: "Selected as a finalist out of 2,500+ participants. Built VoiceRx solo.",
        metric: "Top 40 / 2500+"
    },
    {
        title: "Open Source Contributor",
        organization: "GirlScript Summer of Code",
        date: "2026",
        description: "Merged 12 pull requests across various open-source repositories.",
        metric: "12 PRs Merged"
    },
    {
        title: "Co-Founder",
        organization: "KĀRYO",
        date: "2025 - Present",
        description: "Building a digital agency for local businesses in Bangalore.",
        metric: "Active Agency"
    }
];
