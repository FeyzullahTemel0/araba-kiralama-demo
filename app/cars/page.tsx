import { Suspense } from "react";
import { CarFinder } from "@/components/car-finder";

export default function CarsPage() {
  return <Suspense fallback={<div className="page-shell py-16 text-sm text-[#718087]">Araçlar yükleniyor...</div>}><CarFinder /></Suspense>;
}
