import Link from "next/link";

// Every number here links to something a stranger can verify. That is the
// point of the row — an unlinked metric from an 18-year-old reads as padding.
const proof = [
    {
        metric: "1st / 121 teams",
        label: "Open Loop 2026",
        href: "/hackathons/open-loop-2026",
        external: false,
    },
    {
        metric: "Top 40 / 2,500+",
        label: "HackBLR 2026",
        href: "https://github.com/Karan-Raj-KR/VoiceRx",
        external: true,
    },
    {
        metric: "Live on Chrome Web Store",
        label: "FormPilot",
        href: "https://chromewebstore.google.com/detail/formpilot/ffkpekcnpbafklidejfbhinahahaabfi",
        external: true,
    },
];

export function Hero() {
    return (
        <section className="container mx-auto max-w-5xl px-6 pb-12 pt-36 md:pb-16 md:pt-44 lg:px-8">
            <h1 className="max-w-[20ch] text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
                I build backends and AI products.
            </h1>

            <p className="mt-6 max-w-[58ch] text-lg text-muted-foreground md:text-xl">
                I&apos;m Karan Raj KR — 18, in Bengaluru, studying B.Tech CSE (AI/ML) at
                NIAT&ndash;S-VYASA. I co-founded{" "}
                <a
                    href="https://www.karyo.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline decoration-accent-signal decoration-2 underline-offset-4 transition-colors hover:text-accent-signal"
                >
                    KĀRYO
                </a>
                , a digital agency with paying clients, and I win hackathons on the weekends.
            </p>

            <ul className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
                {proof.map((item) => (
                    <li key={item.label}>
                        <Link
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="group block"
                        >
                            <span className="block text-sm font-semibold text-accent-signal underline-offset-4 group-hover:underline">
                                {item.metric}
                            </span>
                            <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                                {item.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-12 flex flex-wrap items-center gap-3">
                <Link
                    href="#work"
                    className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                    See the work
                </Link>
                <a
                    href="mailto:karanrajkr2008@gmail.com"
                    className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
                >
                    karanrajkr2008@gmail.com
                </a>
            </div>
        </section>
    );
}
