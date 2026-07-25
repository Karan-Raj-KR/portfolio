"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";

const navLinks = [
    { href: "/#work", label: "Work", section: "work" },
    { href: "/#about", label: "About", section: "about" },
    { href: "/hackathons", label: "Hackathons" },
    { href: "/blog", label: "Writing" },
];

const trackedSections = navLinks.flatMap((link) => (link.section ? [link.section] : []));

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const activeSection = useActiveSection(trackedSections);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (link: (typeof navLinks)[number]) =>
        link.section ? activeSection === link.section : pathname.startsWith(link.href);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40 py-3" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold tracking-tighter transition-opacity hover:opacity-80">
                    Karan Raj KR
                </Link>

                <nav aria-label="Main" className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const active = isActive(link);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={active ? (link.section ? "true" : "page") : undefined}
                                className={cn(
                                    "relative text-sm font-medium transition-colors hover:text-foreground",
                                    active ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {link.label}
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "absolute -bottom-1.5 left-0 right-0 h-px origin-left bg-accent-signal transition-transform duration-200",
                                        active ? "scale-x-100" : "scale-x-0"
                                    )}
                                />
                            </Link>
                        );
                    })}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </nav>

                <div className="lg:hidden flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>

        </header>
    );
}
