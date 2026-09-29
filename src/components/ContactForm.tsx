"use client";

import { useState } from "react";
import Icon from "./Icon";
import { products } from "@/content/site";

// Phase 3 wires this to a Server Action (email/CRM). For now it validates and confirms locally.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <Icon name="check" size={48} className="text-gold" />
        <p className="mt-6 font-serif text-4xl text-ivory">Cảm ơn quý khách</p>
        <p className="mt-3 max-w-sm font-light text-white/70">Đội ngũ DCAR sẽ liên hệ lại trong thời gian sớm nhất.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-x-8 gap-y-6 md:grid-cols-2"
    >
      <label className="md:col-span-2">
        <span className="label text-white/50">Tên công ty</span>
        <input className="field" name="company" placeholder="Nhập tên công ty" />
      </label>
      <label>
        <span className="label text-white/50">Họ và tên *</span>
        <input className="field" name="name" required placeholder="Nhập họ và tên" />
      </label>
      <label>
        <span className="label text-white/50">Số điện thoại *</span>
        <input className="field" name="phone" type="tel" required pattern="[0-9 +]{9,15}" placeholder="Nhập số điện thoại" />
      </label>
      <label className="md:col-span-2">
        <span className="label text-white/50">Email</span>
        <input className="field" name="email" type="email" placeholder="Nhập email" />
      </label>
      <label>
        <span className="label text-white/50">Số lượng xe dự kiến</span>
        <select className="field" name="quantity" defaultValue="">
          <option value="" disabled>Chọn số lượng xe</option>
          <option>1 xe</option><option>2 – 5 xe</option><option>6 – 10 xe</option><option>Trên 10 xe</option>
        </select>
      </label>
      <label>
        <span className="label text-white/50">Dòng xe quan tâm</span>
        <select className="field" name="model" defaultValue="">
          <option value="" disabled>Chọn dòng xe</option>
          {products.map((p) => <option key={p.slug}>{p.name}</option>)}
        </select>
      </label>
      <label className="md:col-span-2">
        <span className="label text-white/50">Nội dung yêu cầu</span>
        <textarea className="field min-h-32 resize-none" name="message" placeholder="Vui lòng mô tả nhu cầu của bạn..." />
      </label>
      <div className="flex flex-col items-start gap-5 md:col-span-2">
        <button type="submit" className="btn btn--solid">Gửi yêu cầu <Icon name="arrow" size={14} /></button>
        <p className="flex items-center gap-2 text-xs text-white/50">
          <Icon name="lock" size={14} /> Thông tin của bạn được bảo mật và chỉ sử dụng cho mục đích tư vấn.
        </p>
      </div>
    </form>
  );
}
