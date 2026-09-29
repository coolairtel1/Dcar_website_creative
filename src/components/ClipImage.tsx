"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Forge image reveal: clip-path opens from the bottom while the image settles from 1.15x.
export default function ClipImage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", end: "top 35%", scrub: true } });
      tl.fromTo(el, { clipPath: "inset(30% 8% 0% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" })
        .fromTo(el.firstElementChild, { scale: 1.15 }, { scale: 1, ease: "none" }, 0);
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
