export function HeroContent() {
  return (
    <>
      <div className="flex flex-col items-center gap-4 mb-2">
        <h1 className="flex flex-col items-center gap-2">
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-tight sm:leading-tight md:leading-tight max-w-full">
            <span className="block sm:inline">From ideas </span>
            <span className="text-muted-foreground/80">to real </span>
            <span>products.</span>
          </span>
        </h1>
      </div>

      <p className="pt-4 max-w-[600px] mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
        Founder, KĀRYO
      </p>

      <p className="text-sm font-light tracking-wide text-muted-foreground/60 max-w-prose mx-auto">
        Builder · Hackathon winner · Open-source contributor · Content creator
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 pb-6 pt-2 w-full">
        <a
          href="#projects"
          className="relative z-10 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          View Projects
        </a>
        <a
          href="https://github.com/Karan-Raj-KR"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-7 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          GitHub
        </a>
        <a
          href="#contact"
          className="relative z-10 inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
        >
          Contact
        </a>
      </div>
    </>
  );
}
