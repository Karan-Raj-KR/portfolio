"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
            <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
                <Link href="/" className="text-xl font-bold tracking-tighter transition-opacity hover:opacity-80">
                    Karan Raj K R
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                        About
                    </Link>
                    <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
                        Skills
                    </Link>
                    <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
                        Work
                    </Link>
                    <Link href="#karyo" className="text-sm font-medium hover:text-primary transition-colors">
                        Karyo
                    </Link>
                    <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                        Contact
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </nav>

                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    {/* Mobile menu button could go here */}
                </div>
            </div>
        </header>
    );
}
