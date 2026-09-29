import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ClipImage from "@/components/ClipImage";
import Media from "@/components/Media";
import SectionTitle from "@/components/SectionTitle";
import LogoMarquee from "@/components/LogoMarquee";
import CtaBlock from "@/components/CtaBlock";
import { clientShowcase, media, partners } from "@/content/site";

export const metadata: Metadata = {
  title: "Khách hàng",
  description: "Các doanh nghiệp và tổ chức tin chọn giải pháp di chuyển DCAR.",
};

export default function ClientsPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Khách hàng" }]}
        title="Khách hàng tiêu biểu"
        text="DCAR tự hào đã tối ưu trải nghiệm vận hành cho hàng trăm doanh nghiệp và tổ chức trên khắp Việt Nam."
        image={media.vanHero}
        position="70% 50%"
      />

      <section className="bg-bc1 px-6 pt-28 text-center lg:px-10">
        <SectionTitle eyebrow="Đối tác doanh nghiệp" title="Đồng hành cùng những thương hiệu dẫn đầu" className="flex flex-col items-center" />
      </section>
      <div className="bg-bc1 pt-16"><LogoMarquee names={partners} /></div>

      <section className="bg-bc1 px-6 py-28 lg:px-10">
        <p className="label mb-12 text-gold">Hình ảnh khách hàng</p>
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {clientShowcase.map((c, i) => (
            <figure key={i} className="group">
              <ClipImage className="relative aspect-[4/3]">
                <div className="absolute inset-0">
                  <Media item={c.image} sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="transition-transform duration-[1.2s] ease-bezzy2 group-hover:scale-105" />
                </div>
              </ClipImage>
              <figcaption className="mt-5 flex items-baseline justify-between border-b border-white/10 pb-4">
                <span className="font-serif text-3xl text-ivory transition-colors group-hover:text-gold">{c.client}</span>
                <span className="label text-white/50">{c.model}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBlock />
    </main>
  );
}
