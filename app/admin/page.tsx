"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CalendarDays, CarFront, CircleCheck, CircleHelp, Clock3, Plus, Radio, TrendingUp } from "lucide-react";
import { cars, formatPrice } from "@/lib/cars";
import { DemoNotice } from "@/components/site-chrome";

const sampleRequests = [
  {
    code: "DEMO-1046",
    vehicle: "Şehir Mini",
    customer: "Örnek talep sahibi",
    route: "İstanbul",
    dates: "02 Kas – 05 Kas",
    statuses: ["Yeni talep", "İncelemede", "Örnek onaylandı"],
  },
  {
    code: "DEMO-1043",
    vehicle: "Aile SUV",
    customer: "Örnek talep sahibi",
    route: "İzmir",
    dates: "03 Kas – 06 Kas",
    statuses: ["İncelemede", "Örnek onaylandı", "İncelemede"],
  },
  {
    code: "DEMO-1042",
    vehicle: "Şehir Mini",
    customer: "Örnek talep sahibi",
    route: "Ankara",
    dates: "02 Kas – 04 Kas",
    statuses: ["Örnek onaylandı", "Örnek onaylandı", "İncelemede"],
  },
  {
    code: "DEMO-1044",
    vehicle: "Konfor Sedan",
    customer: "Örnek talep sahibi",
    route: "Antalya",
    dates: "05 Kas – 08 Kas",
    statuses: ["İncelemede", "Yeni talep", "Örnek onaylandı"],
  },
  {
    code: "DEMO-1045",
    vehicle: "Hibrit Yol",
    customer: "Örnek talep sahibi",
    route: "İstanbul",
    dates: "06 Kas – 07 Kas",
    statuses: ["Yeni talep", "İncelemede", "İncelemede"],
  },
];

const demoSnapshots = [
  { requests: "08", available: "04", revenue: "₺84.250" },
  { requests: "09", available: "03", revenue: "₺86.800" },
  { requests: "10", available: "04", revenue: "₺89.150" },
  { requests: "09", available: "05", revenue: "₺87.400" },
];

const statusStyles: Record<string, string> = {
  "Yeni talep": "bg-[#fff1e9] text-[#cb6435]",
  İncelemede: "bg-[#f0f2f1] text-[#778388]",
  "Örnek onaylandı": "bg-[#e9f6ef] text-[#398965]",
};

export default function AdminPage() {
  const [month, setMonth] = useState(10);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");
  const [notice, setNotice] = useState("");
  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const daysInMonth = new Date(2026, month + 1, 0).getDate();
  const firstDay = (new Date(2026, month, 1).getDay() + 6) % 7;
  const busyDays = month === 10 ? [2, 3, 5, 6, 11, 12, 18, 19, 24] : [4, 9, 14, 17, 22, 27];
  const snapshot = demoSnapshots[refreshCount % demoSnapshots.length];

  useEffect(() => {
    function updateTimestamp() {
      setLastUpdated(new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date()));
    }

    updateTimestamp();
    const interval = window.setInterval(() => {
      setRefreshCount(count => count + 1);
      updateTimestamp();
    }, 10_000);
    return () => window.clearInterval(interval);
  }, []);

  function shiftMonth(delta: number) {
    setMonth(value => (value + delta + 12) % 12);
  }

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  return (
    <div className="min-h-[70vh] bg-[#f5f7f6] py-8 sm:py-12">
      <div className="page-shell">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">ROTACAR / İŞLETME</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-[-.05em]">İşletme paneli demosu</h1>
            <p className="mt-2 text-sm text-[#718087]">Filo ve operasyon görünümü · yalnızca kurgusal örnek veriler</p>
          </div>
          <button type="button" onClick={() => showNotice("Araç ekleme yalnızca demo görünümüdür; yeni kayıt oluşturulmadı.")} className="btn-primary w-fit"><Plus size={16} />Örnek araç ekle</button>
        </div>

        <DemoNotice />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#dcebe4] bg-white px-4 py-3 text-xs">
          <span className="flex items-center gap-2 font-bold text-[#398965]"><Radio size={15} />Canlı demo akışı <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#48a17f] opacity-50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#48a17f]" /></span></span>
          <span className="text-[#718087]">Örnek kayıtlar her 10 saniyede bir simüle olarak güncellenir{lastUpdated ? ` · Son güncelleme ${lastUpdated}` : ""}</span>
        </div>

        {notice && <p role="status" className="mt-3 rounded-lg bg-[#102e35] px-4 py-3 text-sm text-white">{notice}</p>}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CarFront, label: "Örnek filo", value: "06", sub: "örnek araç" },
            { icon: CalendarDays, label: "Bugünkü örnek talep", value: snapshot.requests, sub: "simülasyon değeri" },
            { icon: CircleCheck, label: "Örnek müsait araç", value: snapshot.available, sub: "simülasyon değeri" },
            { icon: TrendingUp, label: "Örnek ciro", value: snapshot.revenue, sub: "gerçek satış veya gelir değil" },
          ].map(card => <div key={card.label} className="rounded-xl border border-[#e7ebea] bg-white p-5"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff1e9] text-[#e96b34]"><card.icon size={18} /></span><p className="mt-4 text-xs text-[#718087]">{card.label}</p><p className="mt-1 text-2xl font-extrabold tracking-[-.04em]">{card.value}</p><p className="mt-1 text-[11px] text-[#9aa4a6]">{card.sub}</p></div>)}
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-xl border border-[#e7ebea] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#f4773b]">ÖRNEK TAKVİM</p><h2 className="mt-1 text-lg font-extrabold">Müsaitlik görünümü</h2></div>
              <div className="flex items-center gap-2"><button type="button" onClick={() => shiftMonth(-1)} className="btn-secondary !min-h-9 !px-3" aria-label="Önceki ay">‹</button><span className="min-w-[90px] text-center text-xs font-bold">{monthNames[month]} 2026</span><button type="button" onClick={() => shiftMonth(1)} className="btn-secondary !min-h-9 !px-3" aria-label="Sonraki ay">›</button></div>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#889599]">
              {["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"].map(day => <span key={day} className="py-2">{day}</span>)}
              {Array.from({ length: firstDay }, (_, i) => <span key={`blank-${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const busy = busyDays.includes(day);
                return <span key={day} title={busy ? "Örnek rezerve" : "Örnek müsait"} className={`mx-auto flex aspect-square w-full max-w-10 items-center justify-center rounded-lg text-xs ${busy ? "bg-[#fff0e8] font-bold text-[#d86836]" : "text-[#58696e] hover:bg-[#f3f6f5]"}`}>{day}</span>;
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 border-t border-[#edf0ef] pt-4 text-[11px] text-[#718087]"><span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-[#fff0e8]" />Örnek rezerveli</span><span className="flex items-center gap-2"><i className="h-3 w-3 rounded border border-[#dfe5e2]" />Örnek müsait</span></div>
          </section>

          <section className="rounded-xl border border-[#e7ebea] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#f4773b]">ÖRNEK TALEP AKIŞI</p><h2 className="mt-1 text-lg font-extrabold">Müşteri talepleri</h2></div>
              <button type="button" onClick={() => setShowAllRequests(value => !value)} className="shrink-0 text-xs font-semibold text-[#e96b34] underline underline-offset-2">{showAllRequests ? "Daha az göster" : "Tümünü gör"}</button>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-[#879397]">Aşağıdaki örnek talepler paneli göstermek için üretilmiştir. Rezervasyon formundan buraya bilgi aktarılmaz.</p>
            <div className="mt-2 divide-y divide-[#edf0ef]" aria-live="polite">
              {sampleRequests.slice(0, showAllRequests ? sampleRequests.length : 3).map((row, index) => {
                const status = row.statuses[refreshCount % row.statuses.length];
                return (
                  <article key={row.code} className="py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{row.vehicle} <span className="font-normal text-[#879397]">· {row.route}</span></p>
                        <p className="mt-1 text-[11px] text-[#718087]">{row.customer} · {row.dates}</p>
                        <p className="mt-1 text-[10px] text-[#a0a9ab]">{row.code}{index === 0 ? " · örnek yeni talep" : ""}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[status]}`}>{status}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-xl border border-[#e7ebea] bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2"><CarFront size={19} className="text-[#f4773b]" /><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#f4773b]">ÖRNEK FİLO</p><h2 className="text-lg font-extrabold">Araç müsaitlikleri</h2></div></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{cars.map((car, i) => <div key={car.id} className="flex items-center gap-3 rounded-lg border border-[#edf0ef] p-3"><Image src={car.image} alt="" width={80} height={56} className="h-14 w-20 rounded-md object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{car.name}</p><p className="mt-1 text-[11px] text-[#718087]">{car.category} · ₺{formatPrice(car.price)}/gün</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${i === 1 || i === 4 ? "bg-[#fff1e9] text-[#cb6435]" : "bg-[#e9f6ef] text-[#398965]"}`}>{i === 1 || i === 4 ? "Rezerve" : "Müsait"}</span></div>)}</div>
          <p className="mt-4 flex items-center gap-2 text-[11px] text-[#879397]"><Clock3 size={14} />Durumlar örnek amaçlıdır. <CircleHelp size={14} className="ml-2" />Gerçek filo verisi gösterilmez.</p>
        </section>
      </div>
    </div>
  );
}
