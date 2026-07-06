export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    metrics: { label: string; value: string }[];
    overview: string;
    problem: string;
    solution: string;
    architecture: string;
    techStack: string[];
    features: string[];
    challenges: string;
    results: string;
    lessons: string;
    timeline: string;
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
}

export const projects: Project[] = [
    {
        slug: "formpilot",
        title: "FormPilot",
        subtitle: "Chrome Extension · April 2026",
        description: "AI-powered Chrome extension that scans any web form, understands field context with LLMs, and autofills inputs with multi-profile support.",
        tags: ["Manifest V3", "React", "TypeScript", "TailwindCSS", "Vite", "LLM"],
        metrics: [
            { label: "Placement", value: "1st Place" },
            { label: "Score", value: "80/100" },
            { label: "Users", value: "TBA" }
        ],
        overview: "FormPilot is a privacy-first, BYOK (Bring Your Own Key) Chrome extension that intelligently autofills complex web forms using LLMs. It was built during the Open Loop 2026 hackathon, where it secured 1st place.",
        problem: "Users waste hours filling out repetitive, complex forms (job applications, grants, registrations). Traditional autofill is dumb—it relies on exact field name matches and fails on long-form text or nuanced dropdowns.",
        solution: "FormPilot injects a content script to scrape the DOM for input fields, passes their context to an LLM along with the user's selected profile, and maps the AI's structured JSON response back into the form fields.",
        architecture: "Vite + React frontend for the popup UI. Background service workers handle API communication. Content scripts manipulate the active page's DOM. All data is stored locally using Chrome Storage API.",
        techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Chrome Extension API (Manifest V3)", "OpenAI/Groq API"],
        features: [
            "Multi-profile support (e.g., Job Seeker, Investor)",
            "Intelligent dropdown matching",
            "Long-form text generation (cover letters, summaries)",
            "100% local storage of personal data",
            "Bring Your Own Key (BYOK) architecture"
        ],
        challenges: "Handling dynamic form fields rendered by frameworks like React or Vue, which often swallow native DOM events. We had to simulate authentic user input events (input, change, blur) to trigger framework state updates.",
        results: "Won 1st Place at Open Loop 2026 against 120+ teams, scoring 80/100 (2nd place scored 60/100). Successfully published to the Chrome Web Store.",
        lessons: "Learned the intricacies of Manifest V3, service worker lifecycles, and the importance of simulating trusted events in modern web apps.",
        timeline: "Built in 24 hours (April 2026)",
        assets: [
            { type: "image", url: "placeholder", alt: "FormPilot Popup UI" },
            { type: "gif", url: "placeholder", alt: "FormPilot autofilling a complex job application" }
        ],
        links: {
            demo: "https://form-pilot.netlify.app/",
            store: "https://chromewebstore.google.com/detail/formpilot/ffkpekcnpbafklidejfbhinahahaabfi",
            code: "https://github.com/Karan-Raj-KR/FormPilot",
        },
    },
    {
        slug: "voicerx",
        title: "VoiceRx",
        subtitle: "HackBLR 2026",
        description: "AI voice health assistant for patients without doctor access — built at HackBLR 2026",
        tags: ["FastAPI", "Vapi", "Qdrant", "Groq", "RAG"],
        metrics: [
            { label: "Status", value: "Finalist" },
            { label: "Applicants", value: "2,500+" }
        ],
        overview: "VoiceRx is an AI-powered voice assistant designed to provide accessible preliminary health information to patients who lack immediate access to medical professionals.",
        problem: "In many regions, wait times for doctors are extensive, and patients lack a reliable way to get immediate, conversational answers about symptoms or medications without resorting to anxiety-inducing web searches.",
        solution: "A voice-first interface powered by Vapi and Groq, utilizing a custom RAG (Retrieval-Augmented Generation) pipeline backed by Qdrant vector database to ensure medical accuracy.",
        architecture: "FastAPI backend handles webhooks and RAG logic. Qdrant stores medical embeddings. Groq provides ultra-fast LLM inference, and Vapi orchestrates the voice synthesis and recognition.",
        techStack: ["Python", "FastAPI", "Vapi", "Qdrant", "Groq", "LangChain"],
        features: [
            "Real-time voice conversation",
            "RAG-backed medical knowledge base",
            "Low-latency responses (<500ms)",
            "Symptom triage logic"
        ],
        challenges: "Reducing latency in the voice pipeline. The combination of STT (Speech-to-Text), RAG retrieval, LLM generation, and TTS (Text-to-Speech) initially took over 2 seconds. Optimized by streaming chunks and using Groq.",
        results: "Selected as a Finalist at HackBLR 2026 out of 2,500+ participants across India.",
        lessons: "Deep dive into real-time voice architectures and latency optimization for LLMs.",
        timeline: "April 2026",
        assets: [
            { type: "image", url: "placeholder", alt: "VoiceRx Architecture Diagram" }
        ],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/VoiceRx" },
    },
    {
        slug: "karyo-agent",
        title: "KĀRYO Lead Intelligence Agent",
        subtitle: "Agentathon 2026",
        description: "4-agent CrewAI pipeline that qualifies local business leads and drafts personalized cold outreach — built for KĀRYO's real sales workflow.",
        tags: ["CrewAI", "Groq", "Pydantic", "Python"],
        metrics: [
            { label: "Agents", value: "4" },
            { label: "Workflow", value: "Automated" }
        ],
        overview: "An automated lead generation and qualification pipeline built to support KĀRYO's door-to-door sales efforts in Bangalore.",
        problem: "Manually researching local businesses, checking if they have a website, and drafting personalized outreach is incredibly time-consuming and scales poorly.",
        solution: "A multi-agent system using CrewAI. Agent 1 scrapes local directories. Agent 2 qualifies leads based on digital footprint. Agent 3 drafts personalized outreach. Agent 4 reviews and formats the output.",
        architecture: "Python scripts orchestrating CrewAI with Groq as the LLM engine for cost-effective, rapid reasoning. Outputs are structured using Pydantic and exported to .docx.",
        techStack: ["Python", "CrewAI", "Groq", "Pydantic", "BeautifulSoup"],
        features: [
            "Automated lead scraping",
            "Digital footprint analysis (Website/GMB presence)",
            "Personalized pitch generation",
            "Self-correction loop for quality assurance",
            "Structured .docx output"
        ],
        challenges: "Preventing hallucinations in the qualification agent. Enforced strict JSON schema outputs using Pydantic to ensure reliable data passing between agents.",
        results: "Significantly accelerated KĀRYO's prospecting phase, generating dozens of highly qualified leads per run.",
        lessons: "Learned the complexities of multi-agent orchestration and the importance of structured outputs in LLM chains.",
        timeline: "2026",
        assets: [
            { type: "image", url: "placeholder", alt: "CrewAI Agent Graph" }
        ],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/karyo-agent" },
    },
    {
        slug: "court-backlog-predictor",
        title: "Court Backlog Predictor",
        subtitle: "Databricks Hackathon",
        description: "ML model predicting court case backlog trends — built solo at Databricks Hackathon",
        tags: ["PySpark", "MLflow", "Delta Lake", "Unity Catalog", "Jupyter"],
        metrics: [
            { label: "Build", value: "Solo" },
            { label: "Tech", value: "Databricks" }
        ],
        overview: "A machine learning pipeline built on Databricks to analyze and predict judicial backlog trends across various courts.",
        problem: "Court systems are overwhelmed, and administrative bodies lack predictive insights to allocate resources or judges efficiently.",
        solution: "Leveraged PySpark to process historical case data and train regression models to forecast future backlog severity by case type and jurisdiction.",
        architecture: "Data ingested into Delta Lake, managed via Unity Catalog. PySpark handles distributed data processing and model training, with MLflow tracking experiments.",
        techStack: ["PySpark", "MLflow", "Delta Lake", "Databricks Unity Catalog", "Python"],
        features: [
            "Distributed data processing",
            "Predictive modeling for case duration",
            "Automated experiment tracking",
            "Data governance via Unity Catalog"
        ],
        challenges: "Handling messy, unstructured historical legal data required extensive cleaning and normalization before feature engineering could begin.",
        results: "Successfully built and deployed a predictive pipeline during the Databricks Hackathon.",
        lessons: "Gained hands-on experience with the modern data lakehouse architecture and distributed ML workflows.",
        timeline: "2026",
        assets: [
            { type: "image", url: "placeholder", alt: "Databricks MLflow Dashboard" }
        ],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/court-backlog-predictor" },
    }
];
