"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CarCard } from "@/components/car-card";
import { categories, cars } from "@/lib/cars";

export function CarFinder() {
  const params = useSearchParams();
  const [category, setCategory] = useState("Tümü");
  const [transmission, setTransmission] = useState("Tümü");
  const [fuel, setFuel] = useState("Tümü");
  const [maxPrice, setMaxPrice] = useState(4500);
  const filtered = useMemo(() => cars.filter(car =>
    (category === "Tümü" || car.category === category) &&
    (transmission === "Tümü" || car.transmission === transmission) &&
    (fuel === "Tümü" || car.fuel === fuel) &&
    car.price <= maxPrice
  ), [category, transmission, fuel, maxPrice]);
  const pickup = params.get("location");
  const start = params.get("start");
  const end = params.get("end");
  function clearFilters() {
    setCategory("Tümü");
    setTransmission("Tümü");
    setFuel("Tümü");
    setMaxPrice(4500);
  }
  return (
    <div className="page-shell py-9 sm:py-12">
      <div className="mb-7 rounded-xl bg-[#102e35] px-5 py-5 text-white sm:flex sm:items-center sm:justify-between sm:px-7">
        <div><p className="text-xs font-bold uppercase tracking-[.13em] text-[#ff9b70]">ÖRNEK ARAÇ FİLOSU</p><h1 className="mt-2 text-2xl font-extrabold tracking-[-.04em] sm:text-3xl">Aradığın yol arkadaşı burada.</h1>
          {pickup && start && end && <p className="mt-2 text-xs text-white/70">{pickup} · {new Date(start).toLocaleString("tr-TR")} – {new Date(end).toLocaleString("tr-TR")}</p>}
        </div><span className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-2 text-xs text-white/80 sm:mt-0">{filtered.length} araç bulundu</span>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[230px_1fr]">
        <aside className="rounded-xl border border-[#e7ebea] bg-white p-5 lg:sticky lg:top-[92px]">
          <div className="flex items-center justify-between"><h2 className="text-sm font-extrabold">Filtreler</h2><button type="button" onClick={clearFilters} className="text-xs font-semibold text-[#e96b34] underline underline-offset-2">Temizle</button></div>
          <fieldset className="mt-5"><legend className="field-label">ARAÇ SINIFI</legend><div className="grid grid-cols-2 gap-2 lg:grid-cols-1">{categories.map(value => <button type="button" key={value} onClick={() => setCategory(value)} aria-pressed={category === value} className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold ${category === value ? "border-[#102e35] bg-[#102e35] text-white" : "border-[#e7ebea] text-[#526469] hover:bg-[#f5f7f6]"}`}>{value}</button>)}</div></fieldset>
          <label className="mt-5 block"><span className="field-label">VİTES</span><select className="field-control" value={transmission} onChange={event => setTransmission(event.target.value)}><option>Tümü</option><option>Otomatik</option><option>Manuel</option></select></label>
          <label className="mt-4 block"><span className="field-label">YAKIT</span><select className="field-control" value={fuel} onChange={event => setFuel(event.target.value)}><option>Tümü</option><option>Benzin</option><option>Dizel</option><option>Hibrit</option></select></label>
          <label className="mt-5 block"><span className="field-label flex justify-between"><span>GÜNLÜK EN FAZLA</span><span>₺{new Intl.NumberFormat("tr-TR").format(maxPrice)}</span></span><input type="range" min="1000" max="4500" step="100" value={maxPrice} onChange={event => setMaxPrice(Number(event.target.value))} className="w-full accent-[#f4773b]" aria-label="En yüksek günlük fiyat" /></label>
        </aside>
        <section aria-label="Filtrelenmiş araçlar">
          {filtered.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map(car => <CarCard key={car.id} car={car} />)}</div> :
            <div className="rounded-xl border border-dashed border-[#ccd5d2] px-6 py-16 text-center"><h2 className="text-lg font-bold">Bu filtrelerle araç bulunamadı</h2><p className="mt-2 text-sm text-[#718087]">Farklı bir sınıf veya fiyat aralığı deneyebilirsin.</p><button type="button" onClick={clearFilters} className="btn-secondary mt-5">Filtreleri temizle</button></div>}
        </section>
      </div>
    </div>
  );
}
