"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Work" },
    { href: "#karyo", label: "Karyo" },
    { href: "#contact", label: "Contact" },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
            <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
                <Link href="/" className="text-xl font-bold tracking-tighter transition-opacity hover:opacity-80">
                    Karan Raj K R
                </Link>

                <nav className="hidden md:flex items-center gap-8">
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

                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 right-0 top-full bg-background/95 backdrop-blur-md border-b border-border/40 md:hidden"
                    >
                        <div className="container mx-auto flex flex-col px-4 py-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="py-3 text-base font-medium text-foreground/60 hover:text-foreground transition-colors border-b border-border/30 last:border-0"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
