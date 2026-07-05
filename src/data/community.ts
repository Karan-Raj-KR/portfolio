export interface CommunityEvent {
    title: string;
    role: string;
    date: string;
    location: string;
    description: string;
    link?: string;
}

export const communityEvents: CommunityEvent[] = [
    {
        title: "Open Loop Hackathon",
        role: "Participant (1st Place)",
        date: "April 2026",
        location: "Yenepoya University",
        description: "Competed in a 24-hour national level hackathon."
    },
    {
        title: "HackBLR",
        role: "Finalist",
        date: "April 2026",
        location: "Bangalore",
        description: "Built AI Voice Health Assistant in intense competitive environment."
    },
    {
        title: "Databricks Hackathon",
        role: "Participant",
        date: "2026",
        location: "Virtual",
        description: "Built a court backlog predictor using PySpark and Delta Lake."
    },
    {
        title: "GirlScript Summer of Code",
        role: "Open Source Contributor",
        date: "May 2026 - Present",
        location: "Global",
        description: "Actively contributing to open source projects."
    }
];
