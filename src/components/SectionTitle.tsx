import Reveal from "./Reveal";

export default function SectionTitle({ eyebrow, title, className = "" }: { eyebrow?: string; title: string; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && <p className="label mb-5 text-gold">{eyebrow}</p>}
      <Reveal className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-[-1.5px] text-ivory md:text-[64px]">{title}</Reveal>
    </div>
  );
}
