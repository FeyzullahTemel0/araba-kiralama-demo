import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Fuel, Gauge, Luggage, Users } from "lucide-react";
import type { Car } from "@/lib/cars";
import { formatPrice } from "@/lib/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#e7ebea] bg-white transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,46,53,.1)]">
      <Link href={`/cars/${car.id}`} className="block" aria-label={`${car.name} detaylarını görüntüle`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#e8edeb]">
          <Image src={car.image} alt={car.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
          {car.badge && <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#21474e] shadow-sm">{car.badge}</span>}
          <span className="absolute bottom-3 right-3 rounded-full bg-[#102e35]/90 px-3 py-1.5 text-[10px] font-bold text-white">{car.category}</span>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3"><div><h3 className="text-[17px] font-extrabold tracking-[-.035em]">{car.name}</h3><p className="mt-1 text-xs text-[#78858a]">{car.category} sınıfı</p></div><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f6f5] text-[#21474e] group-hover:bg-[#f4773b] group-hover:text-white"><ArrowUpRight size={16} /></span></div>
          <div className="mt-4 grid grid-cols-2 gap-y-3 border-t border-[#edf0ef] pt-4 text-[11px] text-[#68777c]"><span className="flex items-center gap-2"><Gauge size={14} />{car.transmission}</span><span className="flex items-center gap-2"><Fuel size={14} />{car.fuel}</span><span className="flex items-center gap-2"><Users size={14} />{car.seats} koltuk</span><span className="flex items-center gap-2"><Luggage size={14} />{car.luggage} valiz</span></div>
          <div className="mt-5 flex items-end justify-between"><span><strong className="text-[21px] font-extrabold tracking-[-.04em]">₺{formatPrice(car.price)}</strong><span className="ml-1 text-[11px] text-[#7e8b8e]">/ gün</span></span><span className="text-xs font-bold text-[#f4773b]">Detayları gör</span></div>
        </div>
      </Link>
    </article>
  );
}
