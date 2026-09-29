import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import { contact, media } from "@/content/site";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ DCAR để được tư vấn giải pháp di chuyển cao cấp cho doanh nghiệp.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
        title="Liên hệ với DCAR"
        text="Cùng DCAR tạo ra giải pháp di chuyển đẳng cấp dành riêng cho doanh nghiệp của bạn. Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ."
        image={media.studioVanCompact}
        position="50% 55%"
      >
        <ul className="mt-12 grid max-w-3xl gap-px bg-white/10 sm:grid-cols-3">
          {contact.values.map((v) => (
            <li key={v.title} className="bg-black/60 p-5 backdrop-blur-md">
              <Icon name={v.icon} size={22} className="text-gold" />
              <p className="mt-4 text-sm font-medium">{v.title}</p>
              <p className="mt-1 text-xs font-light text-white/60">{v.text}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="grid gap-16 bg-bc1 px-6 py-28 lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:px-10">
        <div>
          <Reveal className="font-serif text-5xl tracking-[-1.5px] text-ivory md:text-6xl">Thông tin liên hệ</Reveal>
          <ul className="mt-12">
            {contact.blocks.map((b) => (
              <li key={b.title} className="flex gap-5 border-t border-white/10 py-7">
                <Icon name={b.icon} size={22} className="mt-1 shrink-0 text-gold" />
                <div>
                  <p className="font-serif text-2xl text-ivory">{b.title}</p>
                  {b.lines.map((l) => (
                    <p key={l} className="mt-1 text-sm font-light leading-6 text-white/70">{l}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-bc2 p-8 md:p-12">
          <Reveal className="mb-10 font-serif text-5xl tracking-[-1.5px] text-ivory md:text-6xl">Gửi yêu cầu tư vấn</Reveal>
          <ContactForm />
        </div>
      </section>

      <section className="bg-bc1 px-6 pb-28 lg:px-10">
        <SectionTitle title="Bản đồ" className="mb-10" />
        <div className="relative aspect-[16/10] overflow-hidden md:aspect-[21/9]">
          <iframe
            title="Bản đồ Showroom DCAR HCM"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=16&output=embed`}
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="bg-bc2 px-6 py-28 lg:px-10">
        <SectionTitle title="DCAR – Đối tác tin cậy của doanh nghiệp" className="mb-16" />
        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {contact.pillars.map((p) => (
            <div key={p.title} className="bg-bc2 p-8 lg:p-10">
              <Icon name={p.icon} size={36} className="text-gold" />
              <p className="label mt-10">{p.title}</p>
              <p className="mt-3 text-sm font-light leading-6 text-white/70">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
