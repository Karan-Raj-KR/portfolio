export interface RoadmapItem {
    quarter: string;
    title: string;
    description: string;
    status: "completed" | "in-progress" | "planned";
}

export const roadmap: RoadmapItem[] = [
  {
    "quarter": "Aug 2025",
    "title": "Founded KĀRYO",
    "description": "Door-to-door client outreach across Bengaluru.",
    "status": "completed"
  },
  {
    "quarter": "Apr 2026",
    "title": "Open Loop 2026",
    "description": "Won 1st place with Havinash and Saagnik. Built FormPilot.",
    "status": "completed"
  },
  {
    "quarter": "2026",
    "title": "Open source",
    "description": "18 merged PRs in GSSoC 2026. ECSoC Project Admin for crewai-recipes.",
    "status": "completed"
  },
  {
    "quarter": "Currently",
    "title": "Eligent",
    "description": "Opportunity discovery and autofill prototype, built with Mustafa.",
    "status": "in-progress"
  }
];
