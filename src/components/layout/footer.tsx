import Link from "next/link";
import { socialLinks } from "@/lib/social";

export function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="container mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
                <p>
                    Karan Raj KR · Bengaluru · © {new Date().getFullYear()}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    {socialLinks.map((social) => (
                        <Link
                            key={social.name}
                            href={social.href}
                            target={social.name === "Email" ? undefined : "_blank"}
                            rel={social.name === "Email" ? undefined : "noopener noreferrer"}
                            className="underline-offset-4 transition-colors hover:text-foreground hover:underline hover:decoration-accent-signal"
                        >
                            {social.name}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
