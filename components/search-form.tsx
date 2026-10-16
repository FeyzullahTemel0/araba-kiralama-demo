"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search } from "lucide-react";

export function SearchForm() {
  const router = useRouter();
  const [pickup, setPickup] = useState("İstanbul");
  const [start, setStart] = useState("2026-11-02T10:00");
  const [end, setEnd] = useState("2026-11-05T10:00");
  const locations = ["İstanbul", "Ankara", "İzmir", "Antalya"];
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ location: pickup, start, end });
    router.push(`/cars?${params.toString()}`);
  }
  return (
    <form onSubmit={submit} className="grid gap-3 rounded-xl bg-white p-4 shadow-[0_18px_55px_rgba(10,36,43,.2)] sm:grid-cols-2 sm:p-5 lg:grid-cols-[1.05fr_1fr_1fr_auto] lg:items-end">
      <label><span className="field-label flex items-center gap-1.5"><MapPin size={13} />ALIŞ NOKTASI</span><select className="field-control" value={pickup} onChange={event => setPickup(event.target.value)}>{locations.map(location => <option key={location}>{location}</option>)}</select></label>
      <label><span className="field-label flex items-center gap-1.5"><CalendarDays size={13} />ALIŞ TARİHİ / SAATİ</span><input className="field-control" type="datetime-local" value={start} onChange={event => setStart(event.target.value)} required /></label>
      <label><span className="field-label flex items-center gap-1.5"><CalendarDays size={13} />TESLİM TARİHİ / SAATİ</span><input className="field-control" type="datetime-local" min={start} value={end} onChange={event => setEnd(event.target.value)} required /></label>
      <button className="btn-primary !w-full sm:col-span-2 lg:col-span-1" type="submit"><Search size={17} />Araçları göster</button>
    </form>
  );
}
