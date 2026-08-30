import { ResponsiveImage } from "@/components/ResponsiveImage";

const emblem = "/images/brand/darkan-emblem-static.webp";
const phoenixBody = "/images/brand/darkan-phoenix-body-v2.webp";
const leftWing = "/images/brand/darkan-phoenix-wing-left-v2.webp";
const rightWing = "/images/brand/darkan-phoenix-wing-right-v2.webp";

export function AnimatedHeroLogo() {
  return (
    <div
      className="home-hero__logo-wrap is-flying"
      role="img"
      aria-label="Darkan Academy emblem with an animated phoenix"
    >
      <ResponsiveImage
        src={emblem}
        fallbackSrc="/images/brand/darkan-emblem-static.png"
        width={1254}
        height={1254}
        className="home-hero__logo"
        alt=""
        sizes="(max-width: 600px) 82vw, (max-width: 820px) 76vw, 540px"
        priority
      />
      <ResponsiveImage
        src={phoenixBody}
        fallbackSrc="/images/brand/darkan-phoenix-body-v2.png"
        width={1254}
        height={1254}
        className="home-hero__phoenix-body"
        alt=""
        sizes="(max-width: 600px) 82vw, (max-width: 820px) 76vw, 540px"
        loading="eager"
      />
      <ResponsiveImage
        src={leftWing}
        fallbackSrc="/images/brand/darkan-phoenix-wing-left-v2.png"
        width={1254}
        height={1254}
        className="home-hero__phoenix-wing home-hero__phoenix-wing--left"
        alt=""
        sizes="(max-width: 600px) 82vw, (max-width: 820px) 76vw, 540px"
        loading="eager"
      />
      <ResponsiveImage
        src={rightWing}
        fallbackSrc="/images/brand/darkan-phoenix-wing-right-v2.png"
        width={1254}
        height={1254}
        className="home-hero__phoenix-wing home-hero__phoenix-wing--right"
        alt=""
        sizes="(max-width: 600px) 82vw, (max-width: 820px) 76vw, 540px"
        loading="eager"
      />
    </div>
  );
}
