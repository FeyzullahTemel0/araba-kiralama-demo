"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleAlert, ShieldCheck } from "lucide-react";
import { DemoNotice } from "@/components/site-chrome";
import { cars, formatPrice } from "@/lib/cars";

const stages = ["Tarih", "Ek hizmetler", "İletişim"];
const extras = [
  { id: "driver", title: "Ek sürücü", detail: "Demo ücret: kiralama başına", price: 250 },
  { id: "child-seat", title: "Çocuk koltuğu", detail: "Demo ücret: kiralama başına", price: 180 },
  { id: "wifi", title: "Taşınabilir Wi-Fi", detail: "Demo ücret: kiralama başına", price: 120 },
];

function BookingFlow() {
  const params = useSearchParams();
  const selected = cars.find(car => car.id === params.get("car")) ?? cars[0];
  const [step, setStep] = useState(0);
  const [start, setStart] = useState("2026-11-02T10:00");
  const [end, setEnd] = useState("2026-11-05T10:00");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [location, setLocation] = useState("İstanbul");
  const [confirmed, setConfirmed] = useState(false);
  const [formError, setFormError] = useState("");
  const [demoName, setDemoName] = useState("");
  const [demoEmail, setDemoEmail] = useState("");
  const days = useMemo(() => {
    const difference = new Date(end).getTime() - new Date(start).getTime();
    return Math.max(0, Math.ceil(difference / 86_400_000));
  }, [start, end]);
  const extraTotal = selectedExtras.reduce((sum, id) => sum + (extras.find(extra => extra.id === id)?.price ?? 0), 0);
  const total = selected.price * days + extraTotal;
  function changeExtra(id: string) {
    setSelectedExtras(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }
  function next() {
    if (step === 0 && days < 1) {
      setFormError("Teslim tarihi ve saati, alış tarihinden sonra olmalıdır.");
      return;
    }
    setFormError("");
    setStep(value => Math.min(2, value + 1));
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!demoName.trim() || !demoEmail.trim()) {
      setFormError("Lütfen örnek iletişim alanlarını doldurun. Gerçek bilgi girmeyin.");
      return;
    }
    setFormError("");
    setConfirmed(true);
  }
  if (confirmed) return (
    <div className="page-shell py-12 sm:py-20"><div className="mx-auto max-w-[620px] rounded-2xl border border-[#dcebe4] bg-white p-6 text-center shadow-[0_12px_40px_rgba(16,46,53,.06)] sm:p-10"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e9f6ef] text-[#3b9a70]"><CheckCircle2 size={34} /></span><p className="eyebrow mt-6">DEMO AKIŞI TAMAMLANDI</p><h1 className="mt-2 text-3xl font-extrabold tracking-[-.05em]">Örnek talebin hazır!</h1><p className="mx-auto mt-3 max-w-[430px] text-sm leading-6 text-[#718087]">Bu yalnızca ekranda oluşturulan sahte onaydır. Herhangi bir rezervasyon yapılmadı ve bilgiler kaydedilmedi ya da gönderilmedi.</p><div className="mx-auto mt-6 max-w-[360px] rounded-xl bg-[#f4f7f6] p-5"><p className="text-xs text-[#718087]">Örnek rezervasyon kodu</p><p className="mt-2 text-2xl font-extrabold tracking-[.12em]">ROTA-DEMO-2048</p><p className="mt-2 text-xs text-[#718087]">{selected.name} · {days} gün · ₺{formatPrice(total)}</p></div><Link href="/" className="btn-primary mt-7">Ana sayfaya dön <ArrowRight size={16} /></Link></div></div>
  );
  return (
    <div className="page-shell py-8 sm:py-12">
      <div className="mb-7"><p className="eyebrow">ADIM ADIM DEMO REZERVASYONU</p><h1 className="mt-2 text-3xl font-extrabold tracking-[-.05em]">Yolculuğunu planla</h1><p className="mt-2 text-sm text-[#718087]">Örnek akış; gerçek rezervasyon, ödeme veya kayıt oluşturulmaz.</p></div>
      <DemoNotice />
      <div className="mt-7 grid items-start gap-7 lg:grid-cols-[1fr_350px]">
        <section className="rounded-2xl border border-[#e7ebea] bg-white p-5 sm:p-7">
          <ol className="mb-8 grid grid-cols-3" aria-label="Rezervasyon adımları">{stages.map((label, index) => <li key={label} className={`flex items-center gap-2 border-b-2 pb-3 text-xs font-bold sm:text-sm ${index <= step ? "border-[#f4773b] text-[#102e35]" : "border-[#e7ebea] text-[#9aa4a6]"}`}><span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${index < step ? "bg-[#f4773b] text-white" : index === step ? "bg-[#102e35] text-white" : "bg-[#eef1f0]"}`}>{index < step ? <Check size={13} /> : index + 1}</span>{label}</li>)}</ol>
          {step === 0 && <div><h2 className="text-xl font-extrabold">Alış ve teslim bilgileri</h2><p className="mt-1 text-sm text-[#718087]">Uygun tarihleri seçerek örnek toplamı hesapla.</p><label className="mt-6 block"><span className="field-label">ALIŞ NOKTASI</span><select className="field-control" value={location} onChange={event => setLocation(event.target.value)}>{["İstanbul", "Ankara", "İzmir", "Antalya"].map(item => <option key={item}>{item}</option>)}</select></label><div className="mt-4 grid gap-4 sm:grid-cols-2"><label><span className="field-label">ALIŞ TARİHİ VE SAATİ</span><input className="field-control" type="datetime-local" value={start} onChange={event => setStart(event.target.value)} required /></label><label><span className="field-label">TESLİM TARİHİ VE SAATİ</span><input className="field-control" type="datetime-local" min={start} value={end} onChange={event => setEnd(event.target.value)} required /></label></div></div>}
          {step === 1 && <div><h2 className="text-xl font-extrabold">Ek hizmetler</h2><p className="mt-1 text-sm text-[#718087]">İhtiyacına göre ekle; toplam anında güncellensin.</p><div className="mt-6 grid gap-3">{extras.map(extra => <label key={extra.id} className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-[#e7ebea] p-4 hover:bg-[#f8faf9]"><span className="flex items-center gap-3"><input type="checkbox" checked={selectedExtras.includes(extra.id)} onChange={() => changeExtra(extra.id)} className="h-4 w-4 accent-[#f4773b]" /><span><span className="block text-sm font-bold">{extra.title}</span><span className="mt-1 block text-xs text-[#718087]">{extra.detail}</span></span></span><strong className="shrink-0 text-sm">₺{formatPrice(extra.price)}</strong></label>)}</div></div>}
          {step === 2 && <form onSubmit={submit}><h2 className="text-xl font-extrabold">Örnek iletişim bilgileri</h2><p className="mt-1 text-sm text-[#718087]">Gerçek bilgi girmeyin. Örnek alanlar tarayıcıda kalır ve gönderilmez.</p><div className="mt-6 grid gap-4"><label><span className="field-label">ÖRNEK AD</span><input className="field-control" autoComplete="off" value={demoName} onChange={event => setDemoName(event.target.value)} placeholder="Örn. Demo Kullanıcısı" /></label><label><span className="field-label">ÖRNEK E-POSTA</span><input className="field-control" type="email" autoComplete="off" value={demoEmail} onChange={event => setDemoEmail(event.target.value)} placeholder="demo@example.test" /></label></div><div className="mt-4 flex gap-2 rounded-lg bg-[#f5f7f6] p-3 text-xs leading-5 text-[#718087]"><ShieldCheck className="mt-0.5 shrink-0" size={16} />Kimlik, ehliyet, telefon, ödeme veya gerçek kişisel bilgi istenmez.</div><button type="submit" className="btn-primary mt-6 w-full">Sahte demo onayını göster <CheckCircle2 size={16} /></button></form>}
          {formError && <p role="alert" className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#b84928]"><CircleAlert size={16} />{formError}</p>}
          {step < 2 && <div className="mt-8 flex items-center justify-between border-t border-[#e7ebea] pt-5">{step > 0 ? <button type="button" onClick={() => { setFormError(""); setStep(value => value - 1); }} className="btn-secondary"><ArrowLeft size={15} />Geri</button> : <Link href={`/cars/${selected.id}`} className="text-xs font-semibold text-[#718087] underline underline-offset-2">Araca geri dön</Link>}<button type="button" onClick={next} className="btn-primary">Devam et <ArrowRight size={16} /></button></div>}
        </section>
        <aside className="rounded-2xl bg-[#f4f7f6] p-5 sm:p-6 lg:sticky lg:top-[96px]"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#f4773b]">ÖRNEK ÖZET</p><div className="mt-4 flex gap-4"><Image src={selected.image} alt="" width={96} height={80} loading="eager" className="h-20 w-24 rounded-lg object-cover" /><div><h2 className="font-extrabold">{selected.name}</h2><p className="mt-1 text-xs text-[#718087]">{selected.category} · {selected.transmission}</p><p className="mt-2 text-sm font-bold">₺{formatPrice(selected.price)} <span className="font-normal text-[#718087]">/ gün</span></p></div></div><div className="mt-5 grid gap-3 border-t border-[#dfe6e3] py-5 text-xs"><div className="flex justify-between"><span className="text-[#718087]">Alış noktası</span><strong>{location}</strong></div><div className="flex justify-between gap-3"><span className="text-[#718087]">Alış</span><strong className="text-right">{new Date(start).toLocaleString("tr-TR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</strong></div><div className="flex justify-between gap-3"><span className="text-[#718087]">Teslim</span><strong className="text-right">{new Date(end).toLocaleString("tr-TR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</strong></div><div className="flex justify-between"><span className="text-[#718087]">Süre</span><strong>{days} gün</strong></div><div className="flex justify-between"><span className="text-[#718087]">Ek hizmetler</span><strong>₺{formatPrice(extraTotal)}</strong></div></div><div className="flex items-end justify-between border-t border-[#dfe6e3] pt-4"><span className="text-xs text-[#718087]">Örnek toplam</span><strong className="text-2xl font-extrabold tracking-[-.04em]">₺{formatPrice(total)}</strong></div><p className="mt-4 text-[11px] leading-5 text-[#718087]">Örnek fiyat; gerçek teklif veya işletme tarifesi değildir. Hiçbir ödeme alınmaz.</p></aside>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return <Suspense fallback={<div className="page-shell py-16">Demo rezervasyon akışı yükleniyor...</div>}><BookingFlow /></Suspense>;
}
