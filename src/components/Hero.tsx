"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Media from "./Media";
import type { heroSlides as Slides } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, SplitText);

const DURATION = 7000;

// Home hero: 3-slide crossfade with Ken Burns zoom, word blur-in titles, 01/02/03 progress, scroll blur-out.
export default function Hero({ slides }: { slides: typeof Slides }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const next = useCallback(() => setActive((i) => (i + 1) % slides.length), [slides.length]);

  useEffect(() => {
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [active, next]);

  useEffect(() => {
    const el = root.current?.querySelector<HTMLElement>(`[data-slide="${active}"] h1`);
    if (!el) return;
    const split = SplitText.create(el, { type: "words" });
    const tw = gsap.from(split.words, { opacity: 0, filter: "blur(12px)", y: 10, duration: 1.2, stagger: 0.06, ease: "power3.out", delay: 0.3 });
    return () => { tw.kill(); split.revert(); };
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-content]", { filter: "blur(14px)", opacity: 0, yPercent: -25, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-media]", { yPercent: 15, ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-svh min-h-[680px] overflow-hidden">
      <div data-hero-media className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-bezzy2 ${i === active ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== active}
          >
            <div className={`absolute inset-0 ${i === active ? "animate-[kenburns_8s_ease-out_forwards]" : ""}`}>
              <Media item={s.image} priority={i === 0} position="65% 50%" />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

      <div data-hero-content className="relative h-full">
        {slides.map((s, i) => (
          <div
            key={i}
            data-slide={i}
            className={`absolute inset-x-6 bottom-32 max-w-3xl transition-opacity duration-700 lg:inset-x-10 ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <h1 className="font-serif text-5xl leading-[1] tracking-[-2px] text-ivory md:text-7xl lg:text-[92px]">{s.title}</h1>
            <p className="mt-6 max-w-xl font-light leading-7 text-white/80">{s.text}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/san-pham" className="btn btn--solid">Khám phá sản phẩm</Link>
              <Link href="/lien-he" className="btn">Nhận tư vấn</Link>
            </div>
          </div>
        ))}

        <div className="absolute inset-x-6 bottom-12 flex gap-6 lg:inset-x-10">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="group flex-1 text-left md:max-w-[160px]" aria-label={`Slide ${i + 1}`}>
              <span className={`font-serif text-lg transition-colors ${i === active ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block h-px w-full bg-white/20">
                <span
                  key={i === active ? active : undefined}
                  className={`block h-full origin-left bg-white ${i === active ? "animate-[progress_linear_forwards]" : "scale-x-0"}`}
                  style={i === active ? { animationDuration: `${DURATION}ms` } : undefined}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
