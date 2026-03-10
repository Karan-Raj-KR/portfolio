import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Karyo } from "@/components/sections/karyo";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Spotlight } from "@/components/ui/spotlight";
import { ClickSparkWrapper } from "@/components/ui/click-spark-wrapper";

export default function Home() {
  return (
    <ClickSparkWrapper>
      <main className="relative flex min-h-screen flex-col overflow-hidden selection:bg-primary/20">
        <Spotlight />
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Karyo />
        <Contact />
      </main>
    </ClickSparkWrapper>
  );
}
