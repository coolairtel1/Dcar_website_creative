import Link from "next/link";
import { company, nav } from "@/content/site";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="bg-bc1 px-6 pb-8 pt-24 lg:px-10">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr_1.2fr]">
        <div>
          <p className="font-serif text-5xl tracking-[2px] text-gold">DCAR</p>
          <p className="label mt-5 max-w-[240px] leading-5 text-white/60">{company.tagline}</p>
          <div className="mt-8 flex gap-3">
            {(["youtube", "facebook"] as const).map((s) => (
              <a key={s} href="#" aria-label={s} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-gold hover:text-gold">
                <Icon name={s} size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="label mb-5 text-white/40">Điều hướng</p>
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-sm text-white/80 transition hover:text-gold">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-5 text-white/40">Liên hệ</p>
          <ul className="space-y-3 text-sm text-white/80">
            <li>{company.hotline}</li><li>{company.email}</li><li>{company.web}</li>
          </ul>
        </div>
        {company.showrooms.map((s) => (
          <div key={s.name}>
            <p className="label mb-5 text-white/40">{s.name}</p>
            <p className="text-sm leading-6 text-white/80">{s.address}</p>
          </div>
        ))}
      </div>
      <p aria-hidden className="mt-24 select-none text-center font-serif text-[22vw] leading-[0.8] tracking-[-0.04em] text-white/[0.04]">DCAR</p>
      <div className="mt-6 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
        <span>© 2026 DCAR. All rights reserved.</span>
        <span>Chính sách bảo mật · Điều khoản sử dụng</span>
      </div>
    </footer>
  );
}
