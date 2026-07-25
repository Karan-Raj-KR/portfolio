import Link from "next/link";

// Canonical numbers. Open Loop: 309 participants, 121 teams, 109 colleges,
// 14 states. HackBLR: 2,500+ *participants* (not teams), 40 teams advanced.
const hackathons = [
    {
        result: "1st place",
        event: "Open Loop 2026",
        date: "April 2026",
        scale: "121 teams · 109 colleges · 309 participants · 14 states",
        description:
            "Built FormPilot, a Chrome extension that autofills complex web forms with an LLM. Scored 80/100; second place scored 60. Team of three.",
        href: "/hackathons/open-loop-2026",
        external: false,
    },
    {
        result: "Top 40",
        event: "HackBLR 2026",
        date: "April 2026",
        scale: "2,500+ participants · 40 teams advanced",
        description:
            "Built VoiceRx, a RAG-backed voice health assistant, competing solo against teams from IITs, NITs and IISc.",
        href: "https://github.com/Karan-Raj-KR/VoiceRx",
        external: true,
    },
    {
        result: "Participant",
        event: "Agentathon 2026",
        date: "2026",
        scale: null,
        description:
            "A four-agent CrewAI pipeline that qualifies local business leads and drafts outreach. It still runs KĀRYO's prospecting.",
        href: "https://github.com/Karan-Raj-KR/karyo-agent",
        external: true,
    },
    {
        result: "Participant",
        event: "Databricks Hackathon",
        date: "2026",
        scale: null,
        description:
            "Court Backlog Predictor — a PySpark and MLflow pipeline forecasting judicial case backlog. Built solo.",
        href: "https://github.com/Karan-Raj-KR/court-backlog-predictor",
        external: true,
    },
];

export function Hackathon() {
    return (
        <section id="hackathons" className="container mx-auto max-w-5xl px-6 py-20 md:py-28 lg:px-8">
            <h1 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">Hackathons</h1>
            <p className="mt-4 max-w-[62ch] text-lg text-muted-foreground">
                What I&apos;ve built under a clock, and how it placed. Two wins and two that
                didn&apos;t place — both are here.
            </p>

            <ul className="mt-14">
                {hackathons.map((item) => (
                    <li key={item.event} className="reveal border-t border-border py-8">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <h2 className="text-xl font-semibold md:text-2xl">
                                <Link
                                    href={item.href}
                                    target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                    className="underline-offset-4 hover:underline hover:decoration-accent-signal"
                                >
                                    {item.event}
                                </Link>
                            </h2>
                            <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                {item.date}
                            </span>
                        </div>

                        <p className="mt-2 text-sm font-semibold text-accent-signal">{item.result}</p>

                        <p className="mt-3 max-w-[62ch] text-muted-foreground">{item.description}</p>

                        {item.scale && (
                            <p className="mt-3 font-mono text-xs text-muted-foreground">{item.scale}</p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
