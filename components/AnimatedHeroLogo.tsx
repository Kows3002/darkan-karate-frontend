"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const emblem = "/images/brand/darkhan-emblem-static.png";
const phoenixBody = "/images/brand/darkhan-phoenix-body-v2.png";
const leftWing = "/images/brand/darkhan-phoenix-wing-left-v2.png";
const rightWing = "/images/brand/darkhan-phoenix-wing-right-v2.png";

export function AnimatedHeroLogo() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [flying, setFlying] = useState(true);

  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFlying(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className={`home-hero__logo-wrap${flying ? " is-flying" : ""}`}
      aria-label="Darkan Academy emblem with an animated phoenix"
    >
      <Image
        src={emblem}
        width={1254}
        height={1254}
        className="home-hero__logo"
        alt="Darkan Academy emblem"
        priority
      />
      <Image
        src={phoenixBody}
        width={1254}
        height={1254}
        className="home-hero__phoenix-body"
        alt=""
        aria-hidden="true"
        priority
      />
      <Image
        src={leftWing}
        width={1254}
        height={1254}
        className="home-hero__phoenix-wing home-hero__phoenix-wing--left"
        alt=""
        aria-hidden="true"
        priority
      />
      <Image
        src={rightWing}
        width={1254}
        height={1254}
        className="home-hero__phoenix-wing home-hero__phoenix-wing--right"
        alt=""
        aria-hidden="true"
        priority
      />
    </div>
  );
}
