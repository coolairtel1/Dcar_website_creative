"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Props = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: string;
  /** "blur" = Forge word blur-in; "rise" = lines rising from mask */
  variant?: "blur" | "rise";
  /** tie progress to scroll instead of playing once */
  scrub?: boolean;
  delay?: number;
};

export default function Reveal({ as: Tag = "h2", className, children, variant = "blur", scrub = false, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      split = SplitText.create(el, variant === "rise" ? { type: "lines", mask: "lines" } : { type: "words" });
      const targets = variant === "rise" ? split.lines : split.words;
      const from = variant === "rise" ? { yPercent: 110 } : { opacity: 0, filter: "blur(12px)", y: 8 };
      gsap.from(targets, {
        ...from,
        duration: 1.2,
        stagger: variant === "rise" ? 0.1 : 0.06,
        ease: "power3.out",
        delay,
        scrollTrigger: scrub
          ? { trigger: el, start: "top 85%", end: "bottom 45%", scrub: true }
          : { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [variant, scrub, delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
