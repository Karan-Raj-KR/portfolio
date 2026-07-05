export interface Project {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    links: {
        demo: string | null;
        store?: string | null;
        code: string | null;
    };
}

export const projects: Project[] = [
    {
        title: "FormPilot",
        subtitle: "Chrome Extension · 2026",
        description: "AI-powered Chrome extension that scans any web form, understands field context with LLMs, and autofills inputs (including long text) with multi-profile support — 100% local, bring-your-own API key.",
        tags: ["Manifest V3", "React", "TypeScript", "TailwindCSS", "Vite", "LLM"],
        links: {
            demo: "https://form-pilot.netlify.app/",
            store: "https://chromewebstore.google.com/detail/formpilot/ffkpekcnpbafklidejfbhinahahaabfi",
            code: "https://github.com/Karan-Raj-KR/FormPilot",
        },
    },
    {
        title: "VoiceRx",
        subtitle: "HackBLR 2026",
        description: "AI voice health assistant for patients without doctor access — built at HackBLR 2026",
        tags: ["FastAPI", "Vapi", "Qdrant", "Groq", "RAG"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/VoiceRx" },
    },
    {
        title: "KĀRYO Lead Intelligence Agent",
        subtitle: "Agentathon 2026",
        description: "4-agent CrewAI pipeline that qualifies local business leads and drafts personalized cold outreach — built for KĀRYO's real sales workflow. Includes self-correction loop and structured .docx output.",
        tags: ["CrewAI", "Groq", "Pydantic", "Python"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/karyo-agent" },
    },
    {
        title: "Court Backlog Predictor",
        subtitle: "Databricks Hackathon — solo build",
        description: "ML model predicting court case backlog trends — built solo at Databricks Hackathon",
        tags: ["PySpark", "MLflow", "Delta Lake", "Unity Catalog", "Jupyter"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/court-backlog-predictor" },
    },
    {
        title: "Attendance App",
        subtitle: "Full-stack attendance system",
        description: "FastAPI backend with student attendance tracking, session management, and a web dashboard. Covers marking, reporting, and class-level views — early backend project built end-to-end.",
        tags: ["Python", "FastAPI"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/Attendance-App" },
    },
    {
        title: "Smart Bank Queue Management",
        subtitle: "Intelligent queue routing",
        description: "Queue routing system that assigns bank customers to tellers based on transaction type, estimated service time, and current load — reduces average wait time through priority-aware scheduling.",
        tags: ["Python"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/smart-bank-queue-management" },
    },
    {
        title: "FLUX — Hand Fluid Sim",
        subtitle: "Hand-tracking WebGL fluid simulation",
        description: "Hand-tracking WebGL fluid simulation using real-time webcam input",
        tags: ["MediaPipe", "WebGL", "JavaScript"],
        links: { demo: "https://karanrajkr-flux.vercel.app", code: "https://github.com/Karan-Raj-KR/FLUX" },
    },
];
