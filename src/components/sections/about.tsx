export function About() {
    return (
        <section id="about" className="container mx-auto max-w-5xl px-6 py-16 md:py-20 lg:px-8">
            <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-4xl">About</h2>

            <div className="mt-8 max-w-[62ch] space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                    I&apos;m 18, based in Bengaluru, and studying B.Tech CSE (AI/ML) at
                    NIAT&ndash;S-VYASA. Most of what I actually know came from shipping things
                    outside the syllabus — hackathons, client work, and a lot of debugging at
                    hours I should have been asleep.
                </p>
                <p>
                    In April 2026 my team won Open Loop 2026, a national 24-hour hackathon:{" "}
                    <Proof href="/hackathons/open-loop-2026">
                        1st of 121 teams
                    </Proof>{" "}
                    across 109 colleges and 14 states, 309 participants, scored 80/100 against a
                    second-place 60. We built FormPilot, and it&apos;s since gone up on the Chrome
                    Web Store. The same month I entered HackBLR solo with VoiceRx and finished{" "}
                    <Proof href="https://github.com/Karan-Raj-KR/VoiceRx" external>
                        top 40 of 2,500+ participants
                    </Proof>
                    .
                </p>
                <p>
                    Alongside college I co-founded{" "}
                    <Proof href="https://www.karyo.in" external>
                        KĀRYO
                    </Proof>{" "}
                    with Havinash — a digital agency getting local Bangalore businesses online. We
                    knock on doors, we build the thing, and people pay us. Doing the selling myself
                    has changed how I build more than any course has.
                </p>
                <p>
                    I contribute to open source through GSSoC 2026, and I write up what I build at{" "}
                    <Proof href="https://karanrajkr.hashnode.dev" external>
                        karanrajkr.hashnode.dev
                    </Proof>
                    . If you&apos;re working on something interesting, my inbox is open.
                </p>
            </div>
        </section>
    );
}

function Proof({
    href,
    external,
    children,
}: {
    href: string;
    external?: boolean;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="text-foreground underline decoration-accent-signal decoration-2 underline-offset-4 transition-colors hover:text-accent-signal"
        >
            {children}
        </a>
    );
}
