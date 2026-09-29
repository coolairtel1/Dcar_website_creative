"use client";

import { useRef } from "react";
import Icon from "./Icon";

// Scroll-snap track with hairline arrow buttons.
export default function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div>
      <div
        ref={track}
        role="region"
        aria-label={label}
        data-lenis-prevent-wheel
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-10 flex justify-end gap-3 px-6 lg:px-10">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            onClick={() => go(d)}
            aria-label={d < 0 ? "Trước" : "Sau"}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <Icon name={d < 0 ? "arrowLeft" : "arrow"} size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}
