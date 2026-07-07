"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User, Briefcase, Trophy, Building2, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { BottomNavSheet } from "./bottom-nav-sheet";

const navItems = [
    { id: "about", href: "/#about", label: "About", icon: User },
    { id: "projects", href: "/#projects", label: "Work", icon: Briefcase },
    { id: "hackathons", href: "/hackathons", label: "Hackathons", icon: Trophy },
    { id: "karyo", href: "/#karyo", label: "KĀRYO", icon: Building2 },
];

export function BottomNav() {
    const pathname = usePathname();
    const [activeHash, setActiveHash] = useState<string>("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    useEffect(() => {
        // Only run observer on the home page where these sections exist
        if (pathname !== "/") {
            setActiveHash("");
            return;
        }

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveHash(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: "-40% 0px -40% 0px", // triggers when section is in the middle of viewport
            threshold: 0,
        });

        // Observe the sections
        const sections = ["about", "projects", "karyo"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [pathname]);

    const isActive = (item: typeof navItems[0]) => {
        if (item.href.startsWith("/#")) {
            return pathname === "/" && activeHash === item.id;
        }
        return pathname.startsWith(item.href);
    };

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around bg-background/95 backdrop-blur-md border-t border-border/40 pb-[env(safe-area-inset-bottom)] lg:hidden">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item);
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                                active ? "text-primary" : "text-muted-foreground hover:text-foreground/80"
                            )}
                        >
                            <Icon className="h-[22px] w-[22px]" />
                            <span className="text-[11px] font-medium leading-none">{item.label}</span>
                        </Link>
                    );
                })}
                <button
                    onClick={() => setIsSheetOpen(true)}
                    className="flex flex-col items-center justify-center w-full h-full gap-1 text-muted-foreground hover:text-foreground/80 transition-colors"
                >
                    <LayoutGrid className="h-[22px] w-[22px]" />
                    <span className="text-[11px] font-medium leading-none">More</span>
                </button>
            </nav>
            <BottomNavSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
        </>
    );
}
