"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Forge-style intro: crest, tagline letter-spaced in, hairline progress bar, then fade out.
export default function Preloader({ tagline }: { tagline: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("dcar-intro")) {
      if (root.current) root.current.style.display = "none";
      return;
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            sessionStorage.setItem("dcar-intro", "1");
            setDone(true);
          },
        })
        .from("[data-crest]", { opacity: 0, y: 12, duration: 0.8, ease: "power3.out" })
        .to("[data-bar]", { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, "<")
        .from("[data-tagline]", { opacity: 0, letterSpacing: "12px", filter: "blur(8px)", duration: 1.2, ease: "power3.out" }, "-=0.6")
        .to(root.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "+=0.5");
    }, root);
    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <div data-crest className="absolute top-8 font-serif text-2xl tracking-[6px] text-gold">DCAR</div>
      <p data-tagline className="label max-w-md px-6 text-center leading-6">{tagline}</p>
      <div className="absolute bottom-10 h-px w-40 bg-white/15">
        <div data-bar className="h-full w-full origin-left scale-x-0 bg-white" />
      </div>
    </div>
  );
}
