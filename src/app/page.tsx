import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/features/projects/components/project-list";

export default function Home() {
  return (
    <main id="main" className="relative flex min-h-screen flex-col">
      <Hero />
      <Projects />
      <About />
    </main>
  );
}
