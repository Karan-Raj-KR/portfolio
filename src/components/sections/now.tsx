import { NowIntro } from "@/features/github/components/now-intro";
import { GithubActivity } from "@/features/github/components/github-activity";

export function Now() {
    return (
        <section id="now" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mx-auto max-w-4xl">
                <NowIntro />
                <GithubActivity />
            </div>
        </section>
    );
}