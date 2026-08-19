"use client";

import { useRef, useState } from "react";
import type { LanguageStat } from "../lib/types";

interface LanguageBarProps {
    languages: LanguageStat[];
}

function shadeFor(index: number): number {
    return Math.max(0.3, 0.95 - index * 0.15);
}

interface ActiveSegment {
    index: number;
    left: number;
}

export function LanguageBar({ languages }: LanguageBarProps) {
    const barRef = useRef<HTMLDivElement>(null);
    const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [active, setActive] = useState<ActiveSegment | null>(null);

    if (!languages || languages.length === 0) return null;

    const total = languages.reduce((sum, language) => sum + language.bytes, 0);

    const activateSegment = (index: number) => {
        const bar = barRef.current;
        const segment = segmentRefs.current[index];
        let left = 50;
        if (bar && segment) {
            const barRect = bar.getBoundingClientRect();
            const segmentRect = segment.getBoundingClientRect();
            const center = segmentRect.left - barRect.left + segmentRect.width / 2;
            left = Math.min(Math.max(center, 44), barRect.width - 44);
        }
        setActive({ index, left });
    };

    return (
        <div className="mt-12">
            <div className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="text-live">$</span> <span>languages · by bytes</span>
            </div>

            <div className="relative">
                <div
                    ref={barRef}
                    role="img"
                    aria-label={languages
                        .map((language) => `${language.name} ${language.percent.toFixed(1)} percent`)
                        .join(", ")}
                    className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted/20"
                >
                    {languages.map((language, index) => (
                        <button
                            key={language.name}
                            ref={(element) => {
                                segmentRefs.current[index] = element;
                            }}
                            type="button"
                            onMouseEnter={() => activateSegment(index)}
                            onMouseLeave={() => setActive(null)}
                            onFocus={() => activateSegment(index)}
                            onBlur={() => setActive(null)}
                            style={{
                                width: `${total > 0 ? (language.bytes / total) * 100 : 0}%`,
                                backgroundColor: "var(--live)",
                                opacity: active?.index === index ? 1 : shadeFor(index),
                            }}
                            aria-label={`${language.name}: ${language.percent.toFixed(1)} percent of code bytes`}
                            className="h-full cursor-pointer outline-none transition-[opacity,filter] duration-200 hover:brightness-125 focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    ))}
                </div>

                {active !== null && languages[active.index] && (
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-4 -translate-y-full -translate-x-1/2 rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs whitespace-nowrap text-foreground shadow-lg"
                        style={{ left: `${active.left}px` }}
                    >
                        {languages[active.index].name} · {languages[active.index].percent.toFixed(1)}%
                    </div>
                )}
            </div>

            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {languages.map((language, index) => (
                    <li
                        key={language.name}
                        className="flex items-center gap-2 font-mono text-xs text-muted-foreground"
                    >
                        <span
                            aria-hidden="true"
                            className="h-2 w-2 rounded-full"
                            style={{
                                backgroundColor: "var(--live)",
                                opacity: shadeFor(index),
                            }}
                        />
                        <span>{language.name}</span>
                        <span className="tabular-nums text-live/80">
                            {language.percent.toFixed(1)}%
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}