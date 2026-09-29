export default function LogoMarquee({ names, label }: { names: string[]; label?: string }) {
  const row = [...names, ...names, ...names];
  return (
    <section className="border-y border-white/10 bg-black py-12">
      {label && <p className="label mb-10 text-center text-white/50">{label}</p>}
      <div className="marquee">
        {[0, 1].map((k) => (
          <div key={k} aria-hidden={k === 1}>
            {row.map((c, i) => (
              <span key={i} className="whitespace-nowrap font-serif text-3xl uppercase text-white/40 md:text-4xl">{c}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
