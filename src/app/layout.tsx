import type { Metadata } from "next";
import { Geist, Noto_Serif_Display } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "vietnamese"],
});

// Stand-in for Forge's "Editorial New" (no Vietnamese glyphs): condensed, thin, variable width.
const editorial = Noto_Serif_Display({
  variable: "--font-editorial",
  subsets: ["latin", "vietnamese"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: { default: "DCAR — Giải pháp di chuyển cao cấp cho doanh nghiệp", template: "%s | DCAR" },
  description: "Xe limousine cao cấp thiết kế riêng cho doanh nghiệp. Thiết kế và sản xuất tại Việt Nam.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${geist.variable} ${editorial.variable}`}>
      <body>
        <Preloader tagline="Xe limousine thiết kế riêng cho doanh nghiệp. Chất lượng – Đẳng cấp – Khác biệt." />
        <Header />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
