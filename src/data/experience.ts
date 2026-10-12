export interface Experience {
    role: string;
    period: string;
    company: string;
    description: string[];
}

// TODO(karan): confirm the exact ED Club best-member award title.
export const experience: Experience[] = [
  {
    "role": "Founder, KĀRYO",
    "period": "Aug 2025 – Present",
    "company": "Bengaluru",
    "description": [
      "Led backend, business development and client outreach for a digital agency serving local businesses",
      "Ran door-to-door outreach across Bengaluru, targeting clinics and local businesses",
      "Shipped client websites, including ISKCON Visakhapatnam (Next.js, Tailwind)",
      "Built the KĀRYO Client Onboarding Manager, an AI product for quotations, GST invoices and payment automation, in a live 24-hour hackathon build",
      "Built the KĀRYO Lead Intelligence Agent, a CrewAI multi-agent pipeline",
      "Wrote the full agency operating docs: proposals, contracts, GST invoices, international client handling",
      "6 figures in revenue through agencies and products",
      "Pitched to a VC and an angel investor"
    ]
  },
  {
    "role": "Finance Head · Entrepreneurship (ED) Club",
    "period": "Last term",
    "company": "",
    "description": [
      "Co-organised 4+ events: IPL auction, build-a-product-in-30-minutes pitch, a sponsored-teams event and an entrepreneurship debate",
      "140+ people at the biggest ED Club event",
      "Large-audience speaking experience",
      "Won a best-member award; exact title pending"
    ]
  },
  {
    "role": "EDC President candidate",
    "period": "Currently",
    "company": "Entrepreneurship Development Cell",
    "description": [
      "Running for EDC President"
    ]
  },
  {
    "role": "Open-source contributor · GSSoC 2026",
    "period": "2026",
    "company": "",
    "description": [
      "18 merged PRs"
    ]
  },
  {
    "role": "ECSoC Project Admin",
    "period": "2026",
    "company": "crewai-recipes",
    "description": [
      "Open-source CrewAI templates using NVIDIA NIM",
      "MIT license · 9 forks"
    ]
  },
  {
    "role": "B.Tech CSE (AI/ML)",
    "period": "2025–29",
    "company": "NIAT–S-VYASA, Bengaluru",
    "description": [
      "Builder, hackathon winner, open-source contributor and content creator"
    ]
  }
];
