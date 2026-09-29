"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import Media from "./Media";
import type { Product } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

// Forge "Services" pattern: full-screen sticky panels stack over each other; the covered panel dims and lifts.
export default function ProductStack({ items, eyebrow = "Sản phẩm" }: { items: Product[]; eyebrow?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      panels.slice(0, -1).forEach((panel, i) => {
        gsap.to(panel.querySelector("[data-panel-inner]"), {
          opacity: 0.2, yPercent: -20, scale: 0.94, filter: "brightness(1.6) saturate(0.6)", ease: "none",
          scrollTrigger: { trigger: panels[i + 1], start: "top bottom", end: "top top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {items.map((p, i) => (
        <section key={p.slug} data-panel className="sticky top-0 h-svh overflow-hidden bg-black">
          <div data-panel-inner className="relative h-full origin-top">
            <Media item={p.image} position="60% 50%" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute inset-x-6 bottom-16 max-w-2xl lg:inset-x-10">
              <p className="label mb-4 text-white/60">{eyebrow} · {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p>
              <Reveal as="h2" className="font-serif text-6xl leading-none tracking-[-2px] text-ivory md:text-[88px]">{p.name}</Reveal>
              <p className="label mt-5 text-gold">{p.tagline}</p>
              <p className="mt-4 max-w-lg font-light leading-7 text-white/80">{p.text}</p>
              <Link href={`/san-pham/${p.slug}`} className="btn mt-8">Khám phá ngay</Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
