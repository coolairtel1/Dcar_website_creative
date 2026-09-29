import Link from "next/link";
import Media from "./Media";
import Reveal from "./Reveal";
import { cta, company, media, tel } from "@/content/site";
import Icon from "./Icon";

// Shared closing CTA — Forge "Are you ready to Refuse Ordinary" treatment.
export default function CtaBlock() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      <Media item={media.vanHero} className="opacity-45" position="70% 50%" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
      <div className="relative">
        <p className="label mb-6 text-white/70">{cta.text}</p>
        <Reveal className="mx-auto max-w-4xl font-serif text-5xl leading-[1.05] tracking-[-2px] text-ivory md:text-[80px]">{cta.title}</Reveal>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/lien-he" className="btn btn--solid">Nhận tư vấn ngay</Link>
          <a href={tel} className="btn"><Icon name="phone" size={14} />{company.hotline}</a>
        </div>
      </div>
    </section>
  );
}
