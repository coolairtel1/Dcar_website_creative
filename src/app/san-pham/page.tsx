import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClipImage from "@/components/ClipImage";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import CtaBlock from "@/components/CtaBlock";
import Icon from "@/components/Icon";
import { media, products } from "@/content/site";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Các dòng xe limousine cao cấp DCAR thiết kế riêng cho doanh nghiệp.",
};

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm" }]}
        title="Sản phẩm"
        text="Khám phá các dòng xe limousine cao cấp của DCAR, được thiết kế dành riêng cho doanh nghiệp, mang đến trải nghiệm di chuyển đẳng cấp, an toàn và hiệu quả vượt trội."
        image={media.studioVan}
        position="50% 60%"
      />

      <section className="bg-bc1 px-6 py-24 lg:px-10 lg:py-32">
        {products.map((p, i) => (
          <article key={p.slug} className="grid items-center gap-10 border-b border-white/10 py-16 first:pt-0 last:border-0 lg:grid-cols-2 lg:gap-20 lg:py-24">
            <ClipImage className={`relative aspect-[4/3] ${i % 2 ? "lg:order-2" : ""}`}>
              <Link href={`/san-pham/${p.slug}`} className="group absolute inset-0 block" aria-label={p.name}>
                <Media item={p.image} sizes="(min-width:1024px) 50vw, 100vw" className="transition-transform duration-[1.2s] ease-bezzy2 group-hover:scale-105" />
              </Link>
            </ClipImage>
            <div>
              <p className="label mb-5 text-white/50">{String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</p>
              <Reveal as="h2" className="font-serif text-5xl leading-none tracking-[-2px] text-ivory md:text-7xl">{p.name}</Reveal>
              <p className="label mt-5 text-gold">{p.tagline}</p>
              <p className="mt-5 max-w-md font-light leading-7 text-white/75">{p.text}</p>
              <Link href={`/san-pham/${p.slug}`} className="btn mt-10">Khám phá ngay <Icon name="arrow" size={14} /></Link>
            </div>
          </article>
        ))}
      </section>

      <CtaBlock />
    </main>
  );
}
