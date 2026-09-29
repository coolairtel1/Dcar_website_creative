"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { nav, company, tel } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setCompact(self.scroll() > 80);
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!menu.current) return;
    const links = menu.current.querySelectorAll("[data-menu-link]");
    if (open) {
      gsap.set(menu.current, { display: "flex" });
      gsap.fromTo(menu.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" });
      gsap.fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.08, ease: "expo.out", delay: 0.35 });
    } else {
      gsap.to(menu.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => { if (menu.current) gsap.set(menu.current, { display: "none" }); },
      });
    }
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-[var(--header-h)] items-center justify-between px-6 lg:px-10">
        <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-500 ${compact && !open ? "opacity-100" : "opacity-0"}`} />
        <a href={tel} aria-label="Gọi hotline" className="text-white/90 transition hover:text-gold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/><path d="M16 2v6M13 5h6"/></svg>
        </a>
        <Link href="/" className="flex flex-col items-center" aria-label="DCAR — Trang chủ">
          <span className="font-serif text-3xl leading-none tracking-[4px] text-gold">D</span>
          <span className={`label mt-1 !tracking-[6px] transition-all duration-500 ease-bezzy2 ${compact ? "h-0 opacity-0" : "h-4 opacity-100"}`}>DCAR</span>
        </Link>
        <div className="flex items-center gap-6">
        <Link href="/lien-he" className={`btn hidden !px-5 !py-3 lg:inline-flex ${open ? "invisible" : ""}`}>Nhận tư vấn</Link>
        <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open} className="relative h-6 w-8">
          <span className={`absolute left-0 h-px w-full bg-white transition-all duration-500 ease-bezzy2 ${open ? "top-3 rotate-45" : "top-2"}`} />
          <span className={`absolute left-0 h-px w-full bg-white transition-all duration-500 ease-bezzy2 ${open ? "top-3 -rotate-45" : "top-4"}`} />
        </button>
        </div>
        <div className="pointer-events-none fixed inset-x-6 bottom-4 h-px bg-white/15 lg:inset-x-10">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-white" />
        </div>
      </header>

      <div
        ref={menu}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center gap-10"
        style={{ background: "linear-gradient(135deg, #2a0204 0%, var(--bc3) 45%, #1a0102 100%)" }}
      >
        <nav className="flex flex-col items-center">
          {nav.map((item) => (
            <div key={item.href} className="overflow-hidden">
              <Link
                data-menu-link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block font-serif text-6xl uppercase leading-[1.1] transition-colors hover:text-gold md:text-8xl ${pathname === item.href ? "text-gold" : "text-ivory"}`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
        <a href={tel} className="btn">Nhận tư vấn · {company.hotline}</a>
      </div>
    </>
  );
}
