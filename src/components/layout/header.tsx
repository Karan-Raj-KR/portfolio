"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";

const navLinks = [
    { href: "/#about", label: "About", section: "about" },
    { href: "/#skills", label: "Skills", section: "skills" },
    { href: "/#projects", label: "Work", section: "projects" },
    { href: "/hackathons", label: "Hackathons" },
    { href: "/blog", label: "Blog" },
    { href: "/#karyo", label: "Karyo", section: "karyo" },
    { href: "/#contact", label: "Contact", section: "contact" },
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
        window.addEventListener("scroll", handleScroll);
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

                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const active = isActive(link);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={active ? "true" : undefined}
                                className={cn(
                                    "relative text-sm font-medium transition-colors hover:text-foreground",
                                    active ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {link.label}
                                {active && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1.5 left-0 right-0 h-px bg-foreground"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
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
