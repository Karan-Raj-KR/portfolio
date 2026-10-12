import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import Image from "next/image";
import Link from "next/link";
import { allSocialLinks } from "@/lib/social";
import { About as AboutSection } from "@/components/sections/about";
import { ProfilePageJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Karan Raj KR — Founder, KĀRYO based in Bengaluru, Karnataka, India.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Karan Raj KR | Founder, KĀRYO",
    description:
      "Learn more about Karan Raj KR — Founder, KĀRYO based in Bengaluru, Karnataka, India.",
    url: "https://www.karanrajkr.com/about",
    images: [
      {
        url: "https://www.karanrajkr.com/karan-raj-kr-ai-engineer.jpeg",
        width: 900,
        height: 1200,
        alt: "Karan Raj KR — Founder, KĀRYO",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden selection:bg-primary/20">
      <Header />
      <ProfilePageJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.karanrajkr.com/" },
          { name: "About", url: "https://www.karanrajkr.com/about" },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
            <div className="flex flex-col items-center gap-3">
              <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-2xl overflow-hidden shrink-0 border-2 border-border shadow-2xl bg-muted/20">
                <Image
                  src="/karan-raj-kr-ai-engineer.jpeg"
                  alt="Karan Raj KR — Founder, KĀRYO based in Bengaluru"
                  fill
                  priority
                  sizes="(max-width: 768px) 192px, 256px"
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground/80 font-mono">
                Bengaluru, Karnataka
              </p>
            </div>

            <div className="text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono uppercase tracking-wider text-primary">
                Primary Identity
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Karan Raj KR
              </h1>
              <p className="text-xl text-muted-foreground font-light">
                Founder, KĀRYO
              </p>
              <p className="text-sm text-muted-foreground/70 max-w-xl">
                From Gubbi, Tumkur. B.Tech CSE (AI/ML), NIAT–S-VYASA, Bengaluru, batch 2025–29.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-3">
                {allSocialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target={social.name === "Email" ? undefined : "_blank"}
                      rel={social.name === "Email" ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/80 bg-muted/10 hover:bg-muted/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      title={social.name}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{social.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AboutSection />
    </main>
  );
}
