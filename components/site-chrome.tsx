"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CarFront, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [{ href: "/", label: "Ana sayfa" }, { href: "/cars", label: "Araçlarımız" }, { href: "/#how-it-works", label: "Nasıl çalışır?" }, { href: "/#faq", label: "SSS" }];
  return (
    <header className="sticky top-0 z-40 border-b border-[#e9edeb] bg-white/95 backdrop-blur">
      <div className="page-shell flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="RotaCar ana sayfa">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#102e35] text-white"><CarFront size={21} /></span>
          <span className="text-[17px] font-extrabold tracking-[-.05em]">rota<span className="text-[#f4773b]">car</span></span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Ana menü">
          {links.map(link => <Link key={link.href} href={link.href} className={`text-[13px] font-semibold transition-colors hover:text-[#f4773b] ${pathname === link.href ? "text-[#f4773b]" : "text-[#536469]"}`}>{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/admin" className="text-[12px] font-semibold text-[#536469] hover:text-[#f4773b]">İşletme paneli demosu</Link>
          <Link href="/cars" className="btn-primary !min-h-[40px] !px-4 !text-[12px]">Araç bul <ArrowRight size={15} /></Link>
        </div>
        <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e9e8] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {open && <nav className="border-t border-[#e9edeb] bg-white px-5 py-4 md:hidden" aria-label="Mobil menü">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-[#f0f2f1] py-3 text-sm font-semibold">{link.label}</Link>)}<Link href="/admin" onClick={() => setOpen(false)} className="block py-3 text-sm font-semibold text-[#f4773b]">İşletme paneli demosu</Link></nav>}
    </header>
  );
}

export function DemoNotice() {
  return <div className="demo-note"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#d36a38]" /><span><strong>Demo — gerçek rezervasyon yapılmaz, gerçek kişisel bilgi girmeyin.</strong> Buradaki tüm işlemler yalnızca örnek arayüz davranışıdır.</span></div>;
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[#102e35] text-white">
      <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:py-14">
        <div><Link href="/" className="flex w-fit items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/10"><CarFront size={21} /></span><span className="text-[17px] font-extrabold tracking-[-.05em]">rota<span className="text-[#f4773b]">car</span></span></Link><p className="mt-4 max-w-[320px] text-sm leading-6 text-white/65">Yola çıkmanın daha kolay bir yolu. RotaCar, tamamen kurgusal bir araç kiralama ürün demosudur.</p></div>
        <div><p className="text-sm font-bold">Keşfet</p><div className="mt-4 grid gap-3 text-sm text-white/65"><Link href="/cars" className="hover:text-white">Araçlarımız</Link><Link href="/#how-it-works" className="hover:text-white">Nasıl çalışır?</Link><Link href="/#faq" className="hover:text-white">Sık sorulan sorular</Link></div></div>
        <div><p className="text-sm font-bold">Demo hakkında</p><p className="mt-4 text-sm leading-6 text-white/65">Bu sitede gerçek rezervasyon, ödeme veya iletişim kurulmaz. Görünen tüm filo ve işletme verileri örnektir.</p><Link href="/admin" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#ff9a69]">İşletme paneli demosu <ArrowRight size={15} /></Link></div>
      </div>
      <div className="border-t border-white/10"><div className="page-shell flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 RotaCar Demo · Kurgusal marka</span><span>Sunum ve deneyim amacıyla hazırlanmıştır.</span></div></div>
    </footer>
  );
}
