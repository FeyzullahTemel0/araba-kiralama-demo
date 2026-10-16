export type CarCategory = "Ekonomik" | "Sedan" | "SUV" | "Premium";
export type FuelType = "Benzin" | "Dizel" | "Hibrit";

export type Car = {
  id: string;
  name: string;
  category: CarCategory;
  price: number;
  transmission: "Otomatik" | "Manuel";
  fuel: FuelType;
  seats: number;
  luggage: number;
  image: string;
  imageAlt: string;
  description: string;
  featured?: boolean;
  badge?: string;
};

export const cars: Car[] = [
  { id: "city", name: "Şehir Mini", category: "Ekonomik", price: 1190, transmission: "Manuel", fuel: "Benzin", seats: 4, luggage: 2, image: "/images/city-car.jpg", imageAlt: "Şehir içinde park edilmiş kompakt hatchback otomobil", description: "Şehir içi pratikliği ve kolay park deneyimiyle kısa rotaların favorisi.", featured: true, badge: "Şehir favorisi" },
  { id: "comfort", name: "Konfor Sedan", category: "Sedan", price: 1740, transmission: "Otomatik", fuel: "Dizel", seats: 5, luggage: 3, image: "/images/sedan.jpg", imageAlt: "Yolda ilerleyen modern sedan otomobil", description: "Uzun yolda sessiz ve dengeli bir sürüş için tasarlanan ferah sedan.", featured: true, badge: "Çok tercih edilen" },
  { id: "family", name: "Aile SUV", category: "SUV", price: 2390, transmission: "Otomatik", fuel: "Benzin", seats: 5, luggage: 4, image: "/images/suv.jpg", imageAlt: "Doğa rotasında modern SUV", description: "Geniş bagaj alanı ve yüksek sürüş pozisyonuyla aile rotalarına hazır.", featured: true, badge: "Geniş iç hacim" },
  { id: "hybrid", name: "Hibrit Yol", category: "Sedan", price: 2190, transmission: "Otomatik", fuel: "Hibrit", seats: 5, luggage: 3, image: "/images/hybrid.jpg", imageAlt: "Gün batımında yolda hibrit sedan otomobil", description: "Akıcı otomatik sürüşü verimli hibrit güç ile buluşturan modern sedan.", featured: true, badge: "Hibrit" },
  { id: "weekend", name: "Hafta Sonu", category: "SUV", price: 2690, transmission: "Otomatik", fuel: "Dizel", seats: 5, luggage: 4, image: "/images/weekend-suv.jpg", imageAlt: "Dağ manzaralı yolda SUV otomobil", description: "Yeni yerler keşfetmek isteyenler için konforlu ve çok yönlü bir yol arkadaşı.", badge: "Yeni" },
  { id: "executive", name: "Executive", category: "Premium", price: 3890, transmission: "Otomatik", fuel: "Benzin", seats: 5, luggage: 3, image: "/images/premium.jpg", imageAlt: "Şehirde modern premium sınıf otomobil", description: "Özenli detaylar, geniş yaşam alanı ve rafine bir sürüş deneyimi.", badge: "Premium" },
];

export const categories = ["Tümü", "Ekonomik", "Sedan", "SUV", "Premium"] as const;
export const formatPrice = (price: number) => new Intl.NumberFormat("tr-TR").format(price);
