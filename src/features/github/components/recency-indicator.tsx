"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RelativeTime } from "./relative-time";

interface RecencyIndicatorProps {
    lastCommitAt: string;
    commitUrl: string | null;
    profileUrl: string;
    username: string;
}

export function RecencyIndicator({
    lastCommitAt,
    commitUrl,
    profileUrl,
    username,
}: RecencyIndicatorProps) {
    return (
        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border border-live/25 bg-live/5 px-5 py-4">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-live"
                    animate={{ opacity: [0.6, 0], scale: [1, 2.4] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-live" />
            </span>
            <p className="font-mono text-sm text-foreground">
                Last commit{" "}
                <span className="text-live">
                    <RelativeTime time={lastCommitAt} />
                </span>
            </p>
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                {commitUrl && (
                    <a
                        href={commitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 uppercase tracking-wider text-muted-foreground transition-colors hover:border-live/50 hover:text-foreground focus-visible:outline-none"
                    >
                        view commit
                        <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
                    </a>
                )}
                <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 uppercase tracking-wider transition-colors hover:text-foreground focus-visible:outline-none"
                >
                    @{username}
                    <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
                </a>
            </div>
        </div>
    );
}