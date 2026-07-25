import Link from "next/link";

export default function NotFound() {
    return (
        <main id="main" className="container mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center px-6 lg:px-8">
            <p className="text-sm text-muted-foreground">404</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] md:text-5xl">
                This page doesn&apos;t exist.
            </h1>
            <p className="mt-4 max-w-[52ch] text-muted-foreground">
                Either I moved it or you typed it. Either way, the work is still here.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
                <Link
                    href="/"
                    className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                    Home
                </Link>
                <Link
                    href="/projects"
                    className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
                >
                    Projects
                </Link>
            </div>
        </main>
    );
}
