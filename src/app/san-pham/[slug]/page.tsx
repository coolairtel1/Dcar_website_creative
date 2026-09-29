import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ClipImage from "@/components/ClipImage";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import Carousel from "@/components/Carousel";
import CtaBlock from "@/components/CtaBlock";
import { media, productUsps, products, type MediaItem } from "@/content/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.overview } : {};
}

// Image with Forge clip reveal, used for every media slot on this page.
function Shot({ item, className = "", position }: { item: MediaItem; className?: string; position?: string }) {
  return (
    <ClipImage className={`relative ${className}`}>
      <div className="absolute inset-0"><Media item={item} sizes="(min-width:1024px) 60vw, 100vw" position={position} /></div>
    </ClipImage>
  );
}

function Row({ title, children, media: side }: { title: string; children: React.ReactNode; media: React.ReactNode }) {
  return (
    <section className="grid gap-10 border-t border-white/10 py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:py-28">
      <div>
        <Reveal as="h2" variant="rise" className="font-serif text-5xl tracking-[-1.5px] text-ivory md:text-6xl">{title}</Reveal>
        <div className="mt-6 font-light leading-7 text-white/75">{children}</div>
      </div>
      {side}
    </section>
  );
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const gallery: [MediaItem, string][] = [
    [p.image, "50% 50%"], [media.cabin, "40% 50%"], [media.material, "50% 50%"],
    [media.vanHero, "70% 50%"], [media.studioVanCompact, "50% 50%"], [media.studioVan, "50% 50%"],
  ];
  const others = products.filter((x) => x.slug !== p.slug);

  return (
    <main>
      <PageHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm", href: "/san-pham" }, { label: p.name }]}
        title={p.name}
        subtitle={p.tagline}
        text={p.text}
        image={p.image}
        position="60% 50%"
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/lien-he" className="btn btn--solid">Nhận tư vấn</Link>
          <a href="#" className="btn"><Icon name="download" size={14} />Tải catalogue</a>
        </div>
      </PageHero>

      {/* USP strip */}
      <section className="border-b border-white/10 bg-bc1">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {productUsps.map((u) => (
            <li key={u.title} className="flex flex-col items-center gap-4 border-white/10 px-4 py-10 text-center [&:not(:last-child)]:border-r">
              <Icon name={u.icon} size={28} className="text-gold" />
              <span className="label max-w-[140px] leading-5 text-white/80">{u.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-bc1 px-6 lg:px-10">
        <Row title="Tổng quan" media={<Shot item={p.image} className="aspect-[16/10]" />}>
          <p>{p.overview}</p>
        </Row>

        <Row title="Ngoại thất" media={<Shot item={media.vanHero} className="aspect-[16/10]" position="75% 50%" />}>
          <p>{p.exterior}</p>
        </Row>

        <Row
          title="Nội thất"
          media={
            <div className="grid grid-cols-3 gap-3">
              <Shot item={media.cabin} className="col-span-3 aspect-[16/9]" />
              <Shot item={media.material} className="aspect-square" position="20% 50%" />
              <Shot item={media.cabin} className="aspect-square" position="85% 50%" />
              <Shot item={media.material} className="aspect-square" position="90% 40%" />
            </div>
          }
        >
          <p>{p.interior}</p>
        </Row>

        <Row
          title="Tính năng nổi bật"
          media={
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {[[media.cabin, "30% 40%"], [media.material, "50% 50%"], [media.cabin, "70% 70%"], [media.material, "85% 30%"], [media.cabin, "15% 80%"], [media.material, "30% 90%"]].map(([m, pos], i) => (
                <Shot key={i} item={m as MediaItem} position={pos as string} className="aspect-square" />
              ))}
            </div>
          }
        >
          <ul className="space-y-4">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3"><Icon name="check" size={20} className="mt-0.5 shrink-0 text-gold" />{f}</li>
            ))}
          </ul>
        </Row>

        <Row title="Thông số kỹ thuật" media={<Shot item={media.studioVan} className="aspect-[16/10]" />}>
          <table className="w-full text-sm">
            <tbody>
              {p.specs.map(([k, v]) => (
                <tr key={k} className="border-b border-white/10">
                  <th scope="row" className="py-4 pr-4 text-left font-normal text-white/50">{k}</th>
                  <td className="py-4 text-white">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>

        <Row title="Ứng dụng" media={<Shot item={media.vanHero} className="aspect-[16/10]" position="60% 50%" />}>
          <ul className="space-y-4">
            {p.uses.map((u) => (
              <li key={u} className="flex gap-3"><Icon name="check" size={20} className="mt-0.5 shrink-0 text-gold" />{u}</li>
            ))}
          </ul>
        </Row>
      </div>

      {/* Gallery */}
      <section className="bg-black py-28">
        <div className="mb-12 px-6 lg:px-10">
          <Reveal className="font-serif text-5xl tracking-[-1.5px] text-ivory md:text-6xl">Gallery</Reveal>
        </div>
        <Carousel label={`Gallery ${p.name}`}>
          {gallery.map(([m, pos], i) => (
            <div key={i} className="relative aspect-[4/3] w-[80vw] shrink-0 snap-start overflow-hidden md:w-[42vw] lg:w-[32vw]">
              <Media item={m} position={pos} sizes="(min-width:1024px) 32vw, 80vw" className="transition-transform duration-[1.2s] ease-bezzy2 hover:scale-105" />
            </div>
          ))}
        </Carousel>
      </section>

      {/* Other models */}
      <section className="bg-bc1 px-6 py-28 lg:px-10">
        <p className="label mb-10 text-gold">Dòng xe khác</p>
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/san-pham/${o.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Media item={o.image} sizes="(min-width:768px) 33vw, 100vw" className="transition-transform duration-[1.2s] ease-bezzy2 group-hover:scale-105" />
              </div>
              <p className="mt-5 font-serif text-3xl text-ivory transition-colors group-hover:text-gold">{o.name}</p>
              <p className="mt-1 text-sm font-light text-white/60">{o.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBlock />
    </main>
  );
}
