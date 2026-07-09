import { HeroContent } from "./hero-content";
import { HeroAnimations } from "./hero-animations";

export function Hero() {
    return (
        <HeroAnimations>
            <HeroContent />
        </HeroAnimations>
    );
}
