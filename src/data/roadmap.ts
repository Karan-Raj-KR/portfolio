export interface RoadmapItem {
    quarter: string;
    title: string;
    description: string;
    status: "completed" | "in-progress" | "planned";
}

export const roadmap: RoadmapItem[] = [
    {
        quarter: "Q1 2026",
        title: "Hackathon Sprint",
        description: "Compete in major hackathons including HackBLR and Open Loop to refine rapid prototyping skills.",
        status: "completed"
    },
    {
        quarter: "Q2 2026",
        title: "Open Source & KĀRYO Expansion",
        description: "Contribute to GSSoC and scale KĀRYO client acquisition in Bangalore.",
        status: "in-progress"
    },
    {
        quarter: "Q3 2026",
        title: "Launch SaaS Product",
        description: "Develop and launch an AI-first SaaS product targeting developer productivity.",
        status: "planned"
    },
    {
        quarter: "Q4 2026",
        title: "Advanced AI Research",
        description: "Deep dive into multi-agent systems and fine-tuning open-source LLMs.",
        status: "planned"
    }
];
