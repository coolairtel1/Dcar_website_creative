"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Breadcrumb from "./Breadcrumb";
import Media from "./Media";
import Reveal from "./Reveal";
import type { MediaItem } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  crumbs: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
  text?: string;
  image: MediaItem;
  position?: string;
  children?: React.ReactNode;
};

// Inner-page hero: full-bleed image with Forge-style scroll zoom + blur-out title, breadcrumb on top.
export default function PageHero({ crumbs, title, subtitle, text, image, position, children }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.fromTo("[data-ph-media]", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: st });
      gsap.to("[data-ph-content]", { yPercent: -15, opacity: 0, filter: "blur(10px)", ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-[88svh] items-end overflow-hidden">
      <div data-ph-media className="absolute inset-0">
        <Media item={image} priority position={position} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/40" />
      <div data-ph-content className="relative w-full px-6 pb-16 pt-[calc(var(--header-h)+40px)] lg:px-10 lg:pb-20">
        <Breadcrumb items={crumbs} />
        <Reveal as="h1" delay={0.1} className="mt-8 max-w-5xl font-serif text-5xl leading-[1] tracking-[-2px] text-ivory md:text-7xl lg:text-[96px]">
          {title}
        </Reveal>
        {subtitle && <p className="label mt-5 text-gold">{subtitle}</p>}
        {text && <p className="mt-5 max-w-xl font-light leading-7 text-white/80">{text}</p>}
        {children}
      </div>
    </section>
  );
}
