export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    metrics: { label: string; value: string }[];
    overview: string;
    problem?: string;
    solution?: string;
    architecture?: string;
    techStack: string[];
    features: string[];
    challenges?: string;
    results?: string;
    lessons?: string;
    timeline?: string;
    assets: {
        type: "image" | "gif";
        url: string; // Placeholder string
        alt: string;
    }[];
    links: {
        demo: string | null;
        store?: string | null;
        code: string | null;
    };
    story?: string;
    collaborators?: string[];
}

export const projects: Project[] = [
  {
    "slug": "client-onboarding-manager",
    "title": "KĀRYO Client Onboarding Manager",
    "subtitle": "AI agent",
    "description": "AI agent for quotations, GST invoices and payment automation.",
    "overview": "AI agent for quotations, GST invoices and payment automation.",
    "story": "AI agent for quotations, GST invoices and payment automation.",
    "tags": [
      "Next.js",
      "Groq",
      "Supabase"
    ],
    "techStack": [
      "Next.js",
      "Groq",
      "Supabase"
    ],
    "features": [
      "Quotations",
      "GST invoices",
      "Payment automation"
    ],
    "metrics": [],
    "assets": [],
    "links": {
      "demo": "https://karyo-client-onboarding-manager.vercel.app",
      "code": "https://github.com/Karan-Raj-KR/Client-Onboarding-Manager"
    }
  },
  {
    "slug": "school-erp",
    "title": "School ERP",
    "subtitle": "Demo product",
    "description": "School ERP demo with ~45 routes: students, fees, exams, attendance, a parent portal and Ask ERP, an AI query feature.",
    "overview": "School ERP demo with ~45 routes: students, fees, exams, attendance, a parent portal and Ask ERP, an AI query feature.",
    "story": "School ERP demo with ~45 routes: students, fees, exams, attendance, a parent portal and Ask ERP, an AI query feature.",
    "tags": [
      "Next.js 15",
      "Supabase"
    ],
    "techStack": [
      "Next.js 15",
      "Supabase"
    ],
    "features": [
      "Students and fees",
      "Exams and attendance",
      "Parent portal",
      "Ask ERP: AI queries"
    ],
    "metrics": [
      {
        "label": "Routes",
        "value": "~45"
      },
      {
        "label": "Status",
        "value": "Demo product"
      }
    ],
    "assets": [],
    "links": {
      "demo": "https://erpdemo.karanrajkr.com",
      "code": null
    }
  },
  {
    "slug": "eligent",
    "title": "Eligent",
    "subtitle": "Prototype in progress",
    "description": "Opportunity discovery and autofill prototype, built with Mustafa. Prototype in progress.",
    "overview": "Opportunity discovery and autofill prototype, built with Mustafa. Prototype in progress.",
    "story": "Opportunity discovery and autofill prototype, built with Mustafa. Prototype in progress.",
    "tags": [],
    "techStack": [],
    "features": [
      "Opportunity discovery",
      "Autofill"
    ],
    "metrics": [],
    "assets": [],
    "links": {
      "demo": null,
      "code": null
    },
    "collaborators": [
      "Mustafa"
    ]
  },
  {
    "slug": "iskcon-visakhapatnam",
    "title": "ISKCON Visakhapatnam website",
    "subtitle": "Client project",
    "description": "Client website for ISKCON Visakhapatnam.",
    "overview": "Client website for ISKCON Visakhapatnam.",
    "story": "Client website for ISKCON Visakhapatnam.",
    "tags": [
      "Next.js 14",
      "Tailwind"
    ],
    "techStack": [
      "Next.js 14",
      "Tailwind"
    ],
    "features": [
      "Client website"
    ],
    "metrics": [],
    "assets": [],
    "links": {
      "demo": null,
      "code": null
    }
  },
  {
    "slug": "karyo-agent",
    "title": "KĀRYO Lead Intelligence Agent",
    "subtitle": "Agentathon · Participated",
    "description": "CrewAI multi-agent pipeline. Participated in Agentathon with this project.",
    "overview": "CrewAI multi-agent pipeline. Participated in Agentathon with this project.",
    "story": "CrewAI multi-agent pipeline. Participated in Agentathon with this project.",
    "tags": [
      "CrewAI"
    ],
    "techStack": [
      "CrewAI"
    ],
    "features": [
      "Multi-agent pipeline"
    ],
    "metrics": [],
    "assets": [],
    "links": {
      "demo": null,
      "code": null
    }
  },
  {
    "slug": "crewai-recipes",
    "title": "crewai-recipes",
    "subtitle": "Open source · ECSoC Project Admin",
    "description": "Open-source CrewAI templates using NVIDIA NIM. MIT licensed, with 9 forks. ECSoC Project Admin.",
    "overview": "Open-source CrewAI templates using NVIDIA NIM. MIT licensed, with 9 forks. ECSoC Project Admin.",
    "story": "Open-source CrewAI templates using NVIDIA NIM. MIT licensed, with 9 forks. ECSoC Project Admin.",
    "tags": [
      "CrewAI",
      "NVIDIA NIM"
    ],
    "techStack": [
      "CrewAI",
      "NVIDIA NIM"
    ],
    "features": [
      "Open-source templates",
      "MIT license"
    ],
    "metrics": [
      {
        "label": "Forks",
        "value": "9"
      },
      {
        "label": "Role",
        "value": "ECSoC Project Admin"
      }
    ],
    "assets": [],
    "links": {
      "demo": null,
      "code": "https://github.com/Karan-Raj-KR/crewai-recipes"
    }
  },
  {
    "slug": "formpilot",
    "title": "FormPilot",
    "subtitle": "Open Loop 2026 · 1st place",
    "description": "AI Chrome extension built by Karan Raj KR, Havinash and Saagnik. Our team won 1st place at Open Loop 2026.",
    "overview": "AI Chrome extension built by Karan Raj KR, Havinash and Saagnik. Our team won 1st place at Open Loop 2026.",
    "story": "AI Chrome extension built by Karan Raj KR, Havinash and Saagnik. Our team won 1st place at Open Loop 2026.",
    "tags": [
      "Chrome Extension"
    ],
    "techStack": [
      "Chrome Extension"
    ],
    "features": [
      "AI form filling"
    ],
    "metrics": [
      {
        "label": "Placement",
        "value": "1st place"
      },
      {
        "label": "Score",
        "value": "80/100"
      },
      {
        "label": "Team",
        "value": "3 builders"
      }
    ],
    "assets": [],
    "links": {
      "demo": null,
      "code": null
    },
    "collaborators": [
      "Havinash",
      "Saagnik"
    ],
    "timeline": "25–26 Apr 2026 · Yenepoya, Mangaluru",
    "results": "1st place among 121 teams: 309 participants, 109 colleges, 14 states. Scored 80/100 vs 60/100. ₹20,000 prize."
  },
  {
    "slug": "voicerx",
    "title": "VoiceRx",
    "subtitle": "Hack BLR 2026 · Top 40",
    "description": "Voice health assistant built solo at Hack BLR 2026. Top 40 of 2,500+ teams.",
    "overview": "Voice health assistant built solo at Hack BLR 2026. Top 40 of 2,500+ teams.",
    "story": "Voice health assistant built solo at Hack BLR 2026. Top 40 of 2,500+ teams.",
    "tags": [
      "Vapi",
      "FastAPI",
      "Qdrant",
      "Groq"
    ],
    "techStack": [
      "Vapi",
      "FastAPI",
      "Qdrant",
      "Groq"
    ],
    "features": [
      "Voice health assistant"
    ],
    "metrics": [
      {
        "label": "Result",
        "value": "Top 40"
      },
      {
        "label": "Team",
        "value": "Solo"
      }
    ],
    "assets": [],
    "links": {
      "demo": null,
      "code": null
    }
  }
];
