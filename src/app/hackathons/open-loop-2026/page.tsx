import { ExternalLink, Github, ArrowLeft, MapPin, Calendar, Building } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Header } from "@/components/layout/header";

export const metadata = {
    title: "Open Loop Hackathon 2026 — Winner | Karan Raj KR",
    description: "1st Place Winner at Open Loop Hackathon 2026. Built FormPilot, an AI-powered Chrome extension.",
};

export default function OpenLoopHackathonPage() {
    return (
        <main className="min-h-screen py-24">
            <Header />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: "https://karanrajkr.com/" },
                    { name: "Hackathons", url: "https://karanrajkr.com/hackathons" },
                    { name: "Open Loop 2026", url: `https://karanrajkr.com/hackathons/open-loop-2026` },
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
                        <div className="flex items-center gap-2"><Building className="h-4 w-4 shrink-0" /> Organizer: YenTech — Official Tech Club of Yenepoya School of Engineering & Technology</div>
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Venue: YMK Auditorium, Kulur Campus, Mangaluru, Karnataka</div>
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4 shrink-0" /> Date: April 25–26, 2026</div>
                    </div>

                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        <strong className="text-foreground">Project: FormPilot</strong> <br/>
                        A privacy-first, BYOK (Bring Your Own Key) Chrome extension that intelligently autofills complex web forms using LLMs. Built entirely in 24 hours on-site. Secured 1st place.
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
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">The Problem</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Users waste hours filling repetitive, complex forms (job applications, grants, registrations). Traditional autofill relies on exact field-name matching and fails on long-form text or nuanced dropdowns.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">The Solution (FormPilot)</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                FormPilot injects a content script to scrape the DOM for input fields, passes their context to an LLM with the user's selected profile, and maps the AI's structured JSON response back into form fields.
                            </p>
                            
                            <Image
                                src="/Karan-certificate.png"
                                alt="Open Loop Hackathon 2026 Winner Certificate"
                                width={1200}
                                height={675}
                                className="w-full h-auto rounded-xl border border-border mb-4 bg-muted/5"
                            />
                        </section>
                        
                        <section>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">Architecture</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Vite + React frontend for the popup UI. Background service workers handle API communication. Content scripts manipulate the active page's DOM. All personal data is stored locally via Chrome Storage API, never sent to any server.
                            </p>
                            
                            <Image
                                src="/architecture-image.png"
                                alt="FormPilot Architecture Diagram"
                                width={1200}
                                height={675}
                                className="w-full h-auto rounded-xl border border-border mb-4 bg-muted/5"
                            />
                        </section>
                        
                        <div className="space-y-12 border-t border-border pt-12">
                            <section>
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">Engineering Challenge</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Handling dynamic form fields rendered by React or Vue frameworks, which swallow native DOM events. We had to simulate authentic input, change, and blur events to trigger framework state updates correctly.
                                </p>
                            </section>
                            
                            <section className="bg-muted/5 border border-border rounded-xl p-8">
                                <h2 className="text-xl font-bold mb-3">Lessons Learned</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Manifest V3 intricacies, service worker lifecycles, and simulating trusted events in modern web apps.
                                </p>
                            </section>
                        </div>
                    </div>
                    
                    <aside className="space-y-10">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Timeline</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">Built in 24 hours | April 25–26, 2026</p>
                        </div>
                        
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Tech Stack</h3>
                            <ul className="flex flex-wrap gap-2">
                                {["React 18", "TypeScript", "Vite", "Tailwind CSS", "Chrome Extension API (Manifest V3)", "OpenAI/Groq API"].map(tech => (
                                    <li key={tech} className="bg-muted/10 border border-border px-3 py-1 rounded-md text-sm text-muted-foreground">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Key Features</h3>
                            <ul className="list-disc pl-4 text-muted-foreground space-y-2 text-sm">
                                <li>Multi-provider support: ChatGPT, Claude, Gemini, Groq</li>
                                <li>Multi-profile support (e.g., Job Seeker, Investor)</li>
                                <li>Intelligent dropdown field matching</li>
                                <li>Long-form text generation (cover letters, summaries)</li>
                                <li>100% local storage — no personal data leaves the device</li>
                                <li>BYOK (Bring Your Own Key) architecture</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Event Scale</h3>
                            <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                                <li><strong>309</strong> participants</li>
                                <li><strong>121</strong> teams</li>
                                <li><strong>109</strong> colleges</li>
                                <li><strong>14</strong> states | <strong>58</strong> cities</li>
                                <li><strong>70%</strong> completion rate (teams that shipped end-to-end)</li>
                                <li>Top 25 teams shortlisted for finals</li>
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
                            <p className="text-muted-foreground text-sm">₹20,000 cash | Total prize pool: ₹1,00,000</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Team</h3>
                            <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                                <li>Karan Raj KR (Team Lead) — S-VYASA University</li>
                                <li>Havinash Gangisetty — S-VYASA University</li>
                                <li>Saagnik Dey — S-VYASA University</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Podium</h3>
                            <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                                <li>🥇 1st: Karan's Team (OL02) — S-VYASA University, Bengaluru</li>
                                <li>🥈 2nd: Prateek D Shriyan + team — PACE, Mangaluru</li>
                                <li>🥉 3rd: Harshith + team — SDMIT, Ujire</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Judges</h3>
                            <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                                <li>Vaibhav Salian – AI/ML Engineer, EG A/S (Denmark)</li>
                                <li>Joywin Bennis – Software Engineer, EG A/S</li>
                                <li>Darshan Dinesh Bhandary – Infrastructure Specialist, Kyndryl</li>
                                <li>Adithya Poonja – Business Development, AIC NITTE Incubation Centre</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Sponsors (Gold Tier)</h3>
                            <p className="text-muted-foreground text-sm">Unstop, DK24, NXT WAVE, .xyz, Kalvium</p>
                        </div>
                    </aside>
                </div>
            </article>
        </main>
    );
}
