"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User, Briefcase, Trophy, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

const navItems = [
    { id: "work", href: "/#work", label: "Work", icon: Briefcase },
    { id: "about", href: "/#about", label: "About", icon: User },
    { id: null, href: "/hackathons", label: "Hackathons", icon: Trophy },
    { id: null, href: "/blog", label: "Writing", icon: BookOpen },
];

const trackedSections = ["work", "about"];

export function BottomNav() {
    const pathname = usePathname();
    const activeHash = useActiveSection(trackedSections);
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);

    // Hand-rolled so framer-motion stays off the root layout — it was 42.7 KB gz
    // on every route, including ones with no animation at all.
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setHidden(y > lastY.current && y > 50);
            lastY.current = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isActive = (item: (typeof navItems)[number]) =>
        item.id ? pathname === "/" && activeHash === item.id : pathname.startsWith(item.href);

    return (
        <nav
            aria-label="Quick links"
            // Focus pulls it back on screen: translated-away controls stay in the
            // tab order otherwise (WCAG 2.4.11).
            onFocus={() => setHidden(false)}
            className={cn(
                "fixed bottom-0 left-0 right-0 z-50 flex h-[80px] items-center justify-around border-t border-border/40 bg-background/95 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-md transition-transform duration-300 lg:hidden",
                hidden ? "translate-y-full" : "translate-y-0"
            )}
        >
            {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        aria-current={active ? (item.id ? "true" : "page") : undefined}
                        className={cn(
                            "flex h-full w-full flex-col items-center justify-center gap-1 transition-colors",
                            active
                                ? "font-semibold text-foreground"
                                : "text-muted-foreground hover:text-foreground/80"
                        )}
                    >
                        <Icon className="h-[22px] w-[22px]" />
                        <span className="text-[11px] leading-none">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
