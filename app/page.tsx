import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, Headset, MapPin, Shield, Sparkles } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { CarCard } from "@/components/car-card";
import { DemoNotice } from "@/components/site-chrome";
import { cars } from "@/lib/cars";

const steps = [
  { icon: MapPin, title: "Rotanı belirle", text: "Alış noktanı ve sana uygun tarihleri seç." },
  { icon: Sparkles, title: "Aracını keşfet", text: "İhtiyaçlarına uygun araçları karşılaştır." },
  { icon: CalendarCheck, title: "Yola hazır ol", text: "Demo akışında seçimini tamamla, özetini gör." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#102e35]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,28,34,.86)_0%,rgba(7,28,34,.65)_43%,rgba(7,28,34,.08)_100%)]" />
        <div className="absolute inset-0 bg-[url('/images/hero-road.jpg')] bg-cover bg-[center_56%]" />
        <div className="relative page-shell flex min-h-[550px] flex-col justify-center pb-10 pt-14 text-white sm:min-h-[610px]">
          <div className="max-w-[620px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-[#f4773b]" />Yolculuğunuzun iyi tarafı</span>
            <h1 className="mt-6 max-w-[590px] text-[42px] font-extrabold leading-[1.06] tracking-[-.055em] sm:text-[57px]">Rotanı çiz.<br /><span className="text-[#ff9465]">Yola iyi çık.</span></h1>
            <p className="mt-5 max-w-[420px] text-[15px] leading-7 text-white/75">İhtiyacına uygun aracı seç, kendi yolculuğunun keyfini çıkar. Kolayca planla, özgürce keşfet.</p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-white/85"><span className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#ff9465]" />Her rotaya uygun seçenek</span><span className="flex items-center gap-2"><Shield size={15} className="text-[#ff9465]" />Şeffaf demo deneyimi</span></div>
          </div>
          <div className="mt-10 w-full max-w-[1040px]"><SearchForm /></div>
          <p className="mt-3 text-[11px] text-white/65">Örnek arama deneyimi. Gerçek araç müsaitliği kontrol edilmez.</p>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">SENİN ROTANA UYGUN</p><h2 className="section-title">Öne çıkan araçlar</h2><p className="mt-3 max-w-[500px] text-sm leading-6 text-[#718087]">Şehir içinden hafta sonu kaçamağına, farklı ihtiyaçlar için seçilmiş örnek filo.</p></div><Link href="/cars" className="btn-secondary w-fit">Tüm araçları gör <ArrowRight size={15} /></Link></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cars.filter(car => car.featured).map(car => <CarCard key={car.id} car={car} />)}</div>
      </section>

      <section id="how-it-works" className="bg-[#f4f7f6] py-16 sm:py-20">
        <div className="page-shell">
          <div className="max-w-[560px]"><p className="eyebrow">ÜÇ KOLAY ADIM</p><h2 className="section-title">İyi bir yolculuk kolay başlar.</h2><p className="mt-3 text-sm leading-6 text-[#718087]">Aracını bulmaktan seçimini gözden geçirmeye kadar anlaşılır bir deneyim.</p></div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">{steps.map((step, index) => <article key={step.title} className="rounded-xl border border-[#e6ebea] bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1e9] text-[#e96b34]"><step.icon size={21} /></span><p className="mt-5 text-[11px] font-bold tracking-[.12em] text-[#f4773b]">0{index + 1}</p><h3 className="mt-2 text-lg font-extrabold tracking-[-.03em]">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#718087]">{step.text}</p></article>)}</div>
        </div>
      </section>

      <section id="faq" className="page-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">MERAK EDİLENLER</p><h2 className="section-title">Sık sorulan sorular</h2><p className="mt-3 max-w-[380px] text-sm leading-6 text-[#718087]">Aşağıdaki bilgiler deneyimi anlatmak için hazırlanmış örnek demo metinleridir.</p><div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#f4f7f6] px-4 py-3 text-xs font-semibold text-[#526469]"><Headset size={16} className="text-[#f4773b]" />Yalnızca demo bilgilendirmesi</div></div>
          <div className="divide-y divide-[#e7ebea]">{[
            ["Depozito gerekiyor mu?", "Bu demo depozito almaz ve herhangi bir ödeme yapmaz. Gerçek kiralama koşulları işletmeye göre değişebilir."],
            ["Aracı hangi yakıtla teslim etmeliyim?", "Bu ekranda yakıt politikası yalnızca örnek olarak yer alır. Gerçek teslimat şartı değildir."],
            ["Rezervasyonumu iptal edebilir miyim?", "Demo rezervasyon kaydetmez; bu nedenle iptal işlemi de yapılmaz. Gerçek iptal şartları için ilgili işletme koşulları incelenmelidir."],
            ["Buradan araç kiralayabilir miyim?", "Hayır. RotaCar sunum demosudur. Form göndermek yalnızca ekranda sahte bir onay gösterir; lütfen gerçek kişisel bilgi girmeyin."],
          ].map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold marker:hidden">{question}<span className="text-xl font-normal text-[#f4773b] transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-[650px] text-sm leading-6 text-[#718087]">{answer}</p></details>)}</div>
        </div>
        <div className="mt-12"><DemoNotice /></div>
      </section>
    </>
  );
}
