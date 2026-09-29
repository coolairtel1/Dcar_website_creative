import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ProductStack from "@/components/ProductStack";
import ClipImage from "@/components/ClipImage";
import Media from "@/components/Media";
import Icon from "@/components/Icon";
import SectionTitle from "@/components/SectionTitle";
import LogoMarquee from "@/components/LogoMarquee";
import CtaBlock from "@/components/CtaBlock";
import { about, heroSlides, media, partners, products, reasons, solutions } from "@/content/site";

export default function Home() {
  return (
    <main>
      <Hero slides={heroSlides} />

      <LogoMarquee names={partners} label="Được tin chọn bởi các doanh nghiệp hàng đầu" />

      {/* Statement — Forge "We Don't Modify Vehicles" word blur-in over dimmed material shot */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-6">
        <Media item={media.material} className="opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-bc1" />
        <Reveal scrub className="relative max-w-4xl text-center font-serif text-4xl leading-[1.1] tracking-[-1px] text-ivory md:text-6xl">
          Chúng tôi không chỉ sản xuất xe. Chúng tôi kiến tạo đẳng cấp cho doanh nghiệp.
        </Reveal>
      </section>

      {/* Về DCAR */}
      <section className="bg-bc1 px-6 pb-32 lg:px-10">
        <ClipImage className="relative aspect-[4/3] w-full md:aspect-[21/9]">
          <div className="absolute inset-0"><Media item={media.cabin} sizes="100vw" /></div>
        </ClipImage>
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal variant="rise" className="font-serif text-6xl tracking-[-2px] text-ivory md:text-[88px]">{about.title}</Reveal>
          <div>
            <p className="font-light leading-8 text-white/80 md:text-lg">{about.text}</p>
            <ul className="mt-10">
              {about.points.map((p) => (
                <li key={p} className="flex items-center gap-4 border-b border-white/10 py-5 text-sm">
                  <Icon name="check" size={20} className="shrink-0 text-gold" />{p}
                </li>
              ))}
            </ul>
            <Link href="/san-pham" className="btn mt-10">Tìm hiểu thêm</Link>
          </div>
        </div>
      </section>

      {/* Giải pháp cho doanh nghiệp */}
      <section className="bg-bc2 px-6 py-32 lg:px-10">
        <SectionTitle eyebrow="Giải pháp" title="Giải pháp cho doanh nghiệp" className="mb-16" />
        <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <article key={s.title} className="group bg-bc2 p-8 transition-colors duration-500 hover:bg-bc3 lg:p-10">
              <div className="flex items-start justify-between">
                <p className="font-serif text-xl text-white/50">
                  {String(i + 1).padStart(2, "0")} <span className="text-white/25">/ {String(solutions.length).padStart(2, "0")}</span>
                </p>
                <Icon name={s.icon} size={36} className="text-white/60 transition-colors duration-500 group-hover:text-gold" />
              </div>
              <h3 className="mt-20 font-serif text-3xl text-ivory md:text-4xl">{s.title}</h3>
              <p className="mt-3 text-sm font-light text-white/70">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section className="bg-black px-6 pb-16 pt-32 lg:px-10">
        <SectionTitle eyebrow="Bộ sưu tập" title="Sản phẩm nổi bật" />
      </section>
      <ProductStack items={products} />

      {/* Vì sao chọn DCAR */}
      <section className="bg-bc1 px-6 py-32 lg:px-10">
        <p className="label mb-6 text-gold">Vì sao doanh nghiệp chọn DCAR</p>
        <ul>
          {reasons.map((r, i) => (
            <li key={r.title} className="group flex items-center gap-6 border-b border-white/10 py-7 md:gap-10">
              <span className="w-10 font-serif text-lg text-white/40">{String(i + 1).padStart(2, "0")}</span>
              <Reveal as="h3" variant="rise" className="flex-1 font-serif text-3xl text-ivory transition-colors group-hover:text-gold md:text-6xl">{r.title}</Reveal>
              <Icon name={r.icon} size={40} className="hidden text-white/40 transition-colors group-hover:text-gold md:block" />
            </li>
          ))}
        </ul>
      </section>

      {/* Khách hàng tiêu biểu */}
      <section className="bg-black px-6 py-32 text-center lg:px-10">
        <SectionTitle title="Khách hàng tiêu biểu" className="flex flex-col items-center" />
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px bg-white/10 md:grid-cols-3">
          {partners.map((p) => (
            <div key={p} className="flex h-32 items-center justify-center bg-black font-serif text-2xl uppercase text-white/60 transition-colors hover:text-gold md:text-3xl">{p}</div>
          ))}
        </div>
        <Link href="/khach-hang" className="btn mt-14">Xem thêm khách hàng</Link>
      </section>

      <CtaBlock />
    </main>
  );
}
