import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Fuel, Gauge, Luggage, ShieldCheck, Users } from "lucide-react";
import { cars, formatPrice } from "@/lib/cars";

export function generateStaticParams() {
  return cars.map(car => ({ id: car.id }));
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = cars.find(item => item.id === id);
  if (!car) notFound();
  return (
    <div className="page-shell py-8 sm:py-12">
      <Link href="/cars" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#627277] hover:text-[#f4773b]"><ArrowLeft size={16} />Araçlara dön</Link>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#edf1ef] sm:aspect-[16/10]"><Image src={car.image} alt={car.imageAlt} fill sizes="(max-width: 1024px) 100vw, 60vw" loading="eager" className="object-cover" /><span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-2 text-xs font-bold">{car.category}</span></div>
          <div className="mt-7"><p className="eyebrow">ARAÇ ÖZELLİKLERİ</p><h2 className="mt-2 text-xl font-extrabold tracking-[-.035em]">Her detay düşünülmüş.</h2><p className="mt-2 text-sm leading-6 text-[#718087]">{car.description}</p></div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{[{ icon: Gauge, label: "Vites", value: car.transmission }, { icon: Fuel, label: "Yakıt", value: car.fuel }, { icon: Users, label: "Koltuk", value: `${car.seats} kişi` }, { icon: Luggage, label: "Bagaj", value: `${car.luggage} valiz` }].map(spec => <div key={spec.label} className="rounded-xl border border-[#e7ebea] p-4"><spec.icon size={17} className="text-[#f4773b]" /><p className="mt-3 text-[11px] text-[#78858a]">{spec.label}</p><p className="mt-1 text-sm font-bold">{spec.value}</p></div>)}</div>
        </div>
        <aside className="h-fit rounded-2xl border border-[#e7ebea] p-5 sm:p-7 lg:sticky lg:top-[96px]">
          <p className="text-xs font-bold uppercase tracking-[.12em] text-[#f4773b]">ÖRNEK ARAÇ DETAYI</p><h1 className="mt-3 text-3xl font-extrabold tracking-[-.055em]">{car.name}</h1><p className="mt-2 text-sm text-[#718087]">{car.category} sınıfı · {car.transmission} · {car.fuel}</p>
          <div className="my-6 border-y border-[#e7ebea] py-5"><span className="text-3xl font-extrabold tracking-[-.05em]">₺{formatPrice(car.price)}</span><span className="ml-2 text-sm text-[#718087]">/ örnek gün fiyatı</span></div>
          <h2 className="text-sm font-extrabold">Demo kiralama özeti</h2><ul className="mt-4 grid gap-3 text-sm text-[#617176]">{["Toplam ücret tarih seçimine göre örneklenir", "Ödeme veya depozito alınmaz", "Gerçek müsaitlik kontrolü yapılmaz", "Gerçek kiralama şartı değildir"].map(item => <li key={item} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#48a17f]" />{item}</li>)}</ul>
          <Link href={`/booking?car=${car.id}`} className="btn-primary mt-7 w-full">Bu aracı seç <ArrowLeft size={16} className="rotate-180" /></Link>
          <p className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-[#859195]"><ShieldCheck size={15} className="mt-0.5 shrink-0" />Yalnızca demo. Rezervasyon ve kişisel bilgiler hiçbir yere gönderilmez.</p>
        </aside>
      </div>
    </div>
  );
}
