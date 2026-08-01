"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tilt } from "@/components/ui/tilt";
import { Achievement } from "@/data/achievements";

export function AchievementCard({ item }: { item: Achievement }) {
    return (
        <Tilt className="flex h-full flex-col justify-between rounded-xl border border-border bg-muted/10 p-4 sm:p-6 transition-colors hover:bg-muted/20">
            <div>
                <h3 className="mb-1 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mb-4 text-sm font-medium text-primary/80">{item.organization}</p>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground break-words">
                    {item.description}
                </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-border pt-4 gap-2 sm:gap-0">
                <span className="text-sm font-medium text-foreground break-words">{item.metric}</span>
                <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
            </div>
            {item.link && (
                <div className="mt-4 border-t border-border/50 pt-4">
                    <Link
                        href={item.link}
                        className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                        View Details <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            )}
        </Tilt>
    );
}
