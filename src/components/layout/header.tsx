"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/#projects", label: "Work" },
    { href: "/hackathons", label: "Hackathons" },
    { href: "/blog", label: "Blog" },
    { href: "/#karyo", label: "Karyo" },
    { href: "/#contact", label: "Contact" },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
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
