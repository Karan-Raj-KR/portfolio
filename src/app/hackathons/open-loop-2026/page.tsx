import { ExternalLink, Github, ArrowLeft, MapPin, Calendar, Building } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Header } from "@/components/layout/header";

export const metadata = {
  title: "Open Loop 2026 Winner — FormPilot | Karan Raj KR",
  description: "1st Place Winner at Open Loop Hackathon 2026. Karan Raj KR and team built FormPilot, an AI-powered Chrome extension, winning 1st place among 121 teams.",
  alternates: {
    canonical: "/hackathons/open-loop-2026",
  },
  openGraph: {
    title: "Open Loop 2026 Winner — FormPilot | Karan Raj KR",
    description: "1st Place Winner at Open Loop Hackathon 2026. Karan Raj KR and team built FormPilot, an AI-powered Chrome extension, winning 1st place among 121 teams.",
    url: "https://www.karanrajkr.com/hackathons/open-loop-2026",
    images: [
      {
        url: "https://www.karanrajkr.com/Karan-certificate.png",
        width: 600,
        height: 800,
        alt: "Open Loop Hackathon 2026 Winner Certificate awarded to Karan Raj KR",
      },
    ],
  },
};

export default function OpenLoopHackathonPage() {
  return (
    <main className="min-h-screen py-24">
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.karanrajkr.com/" },
          { name: "Hackathons", url: "https://www.karanrajkr.com/hackathons" },
          { name: "Open Loop 2026", url: `https://www.karanrajkr.com/hackathons/open-loop-2026` },
        ]}
      />

      <article className="container mx-auto px-4 sm:px-8 lg:px-0 max-w-5xl">
        <Link href="/hackathons" className="inline-flex min-h-[44px] py-2 px-4 -ml-4 items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Hackathons
        </Link>

        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight break-words">Open Loop Hackathon 2026</h1>
            <div className="flex gap-2">
              <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm font-medium">
                1st Place Winner
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-8 text-muted-foreground">
            <div className="flex items-center gap-2"><Building className="h-4 w-4 shrink-0" /> Organizer: Yenepoya</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Venue: Yenepoya, Mangaluru</div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 shrink-0" /> Date: April 25–26, 2026</div>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            <strong className="text-foreground">Project: FormPilot</strong> <br />
            An AI Chrome extension built by Karan Raj KR, Havinash and Saagnik. Our team secured 1st place.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="https://form-pilot.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
              View Live <ExternalLink className="h-4 w-4" />
            </Link>
            <Link href="https://github.com/Karan-Raj-KR/FormPilot" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              Source Code <Github className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">FormPilot</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">AI Chrome extension. Team of 3: Karan Raj KR, Havinash and Saagnik.</p>
              <Image src="/Karan-certificate.png" alt="Open Loop 2026 winner certificate" width={600} height={800} className="w-full h-auto rounded-xl border border-border mb-4 bg-muted/5" />
              <Image src="/architecture-image.png" alt="FormPilot team project architecture" width={1586} height={856} className="w-full h-auto rounded-xl border border-border mb-4 bg-muted/5" />
            </section>
          </div>

          <aside className="space-y-10">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Timeline</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">25–26 Apr 2026</p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Event Scale</h3>
              <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                <li><strong>309</strong> participants</li>
                <li><strong>121</strong> teams</li>
                <li><strong>109</strong> colleges</li>
                <li><strong>14</strong> states</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Scores</h3>
              <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                <li>FormPilot (1st): <strong>80 / 100</strong></li>
                <li>Runner-up: <strong>60 / 100</strong></li>
                <li>Margin: <strong>20 points</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Prize</h3>
              <p className="text-muted-foreground text-sm">₹20,000 prize</p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Team</h3>
              <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                <li>Karan Raj KR</li>
                <li>Havinash</li>
                <li>Saagnik</li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
