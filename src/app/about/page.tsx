import { Header } from "@/components/layout/header";
import Image from "next/image";
import { Github, Linkedin, Twitter, Instagram, Youtube, ExternalLink } from "lucide-react";
import { About as AboutSection } from "@/components/sections/about";

export default function AboutPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden selection:bg-primary/20">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
            <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden shrink-0 border-4 border-muted">
              <Image
                src="/karan-raj-kr-ai-engineer.jpeg"
                alt="Karan Raj KR - AI Engineer and Backend Developer, Founder of KĀRYO"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Karan Raj KR
              </h1>
              <p className="text-xl text-muted-foreground">
                AI Engineer & Backend Developer
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                <a href="https://github.com/Karan-Raj-KR" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-6 h-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://linkedin.com/in/karanrajkr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-6 h-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="https://twitter.com/karan_raj_kr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="w-6 h-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="https://instagram.com/karan.rajkr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="w-6 h-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://youtube.com/@KaranRajKR" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Youtube className="w-6 h-6" />
                  <span className="sr-only">YouTube</span>
                </a>
                <a href="https://karanrajkr.hashnode.dev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-6 h-6" />
                  <span className="sr-only">Hashnode</span>
                </a>
                <a href="https://dev.to/karanrajkr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-6 h-6" />
                  <span className="sr-only">Dev.to</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AboutSection />
    </main>
  );
}
