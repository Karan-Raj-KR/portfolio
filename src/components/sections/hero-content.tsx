import { Github } from "lucide-react";

const words = [
    { text: "From ideas ", highlight: false },
    { text: "to real ", highlight: true },
    { text: "products.", highlight: false },
];

export function HeroContent() {
    return (
        <>
            <h1 className="sr-only">Karan Raj KR — AI Engineer & Backend Developer</h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-tight sm:leading-tight md:leading-tight break-words max-w-[90vw]">
                {words.map((word, i) => (
                    <span
                        key={i}
                        className={word.highlight ? "text-muted-foreground/80" : ""}
                    >
                        {word.text}
                    </span>
                ))}
            </h2>

            <p className="pt-6 max-w-[600px] mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
                AI Engineer · Backend Developer · Founder
            </p>

            <p className="text-sm font-light tracking-wide text-muted-foreground/60 max-w-prose mx-auto">
                CSE student building backends, competing at hackathons, and shipping real products.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 pb-6 pt-2 w-full">
                <a
                    href="#projects"
                    className="relative z-10 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                    View Projects
                </a>
                <a
                    href="https://github.com/Karan-Raj-KR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-7 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                    GitHub
                </a>
                <a
                    href="#contact"
                    className="relative z-10 inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                >
                    Contact
                </a>
            </div>
        </>
    );
}
