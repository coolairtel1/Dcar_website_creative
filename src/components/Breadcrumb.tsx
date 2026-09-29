import Link from "next/link";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2 text-white/60">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-white/30">/</span>}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-gold">{item.label}</Link>
          ) : (
            <span aria-current="page" className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
