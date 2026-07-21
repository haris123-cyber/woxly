import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw, Box } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import ReviewsMarquee from "@/components/home/ReviewsMarquee";
import NewsletterForm from "@/components/home/NewsletterForm";

export default function HomePage() {
  const bestSellers = MOCK_PRODUCTS.slice(0, 4);
  const newArrivals = MOCK_PRODUCTS.slice(4, 8);

  const reviews = [
    { review: "The produce is incredibly fresh, and the delivery is always on time. A lifesaver for my busy schedule!", name: "Amelia R." },
    { review: "I love the organic selection. Everything from vegetables to daily dairy is top-notch quality.", name: "Marcus L." },
    { review: "Woxly has completely replaced my weekly supermarket trips. The 15-minute delivery is just magical.", name: "Sofia K." },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative bg-primary rounded-b-[3rem] md:rounded-b-[5rem] overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12 md:pb-24 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 -mt-px shadow-2xl">
        {/* Left Info Column */}
        <div className="flex-1 flex flex-col items-start gap-6 z-10 max-w-2xl text-left">
          <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tight leading-[1.05] text-primary-foreground animate-hero-fade">
            We bring the store to your door
          </h1>

          <p className="text-base text-primary-foreground/80 leading-relaxed max-w-md font-medium">
            Get organic produce and sustainably sourced groceries delivery at up to 4% off grocery.
          </p>

          <div className="mt-4">
            <Link
              href="/shop"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95 inline-block"
            >
              Shop now
            </Link>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="flex-1 relative w-full flex items-center justify-center min-h-[250px] md:min-h-[450px] mt-2 md:mt-0">
          <div className="relative w-full h-[250px] md:h-full max-w-[320px] md:max-w-[500px] md:aspect-square z-10">
            <Image
              src="/images/hero_grocery_bag22.png"
              alt="Fresh groceries in a reusable green bag"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain drop-shadow-2xl"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Gromuse Style Categories Grid */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 max-w-7xl mx-auto mb-16">
        <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-3 md:grid md:grid-cols-6 md:gap-3 md:overflow-visible snap-x">
          {[
            { name: "Vegetable",       subtitle: "Local market",      img: "/images/products/grocery_cabbage.png" },
            { name: "Snacks & Breads", subtitle: "In-store delivery", img: "/images/products/grocery_lays.png" },
            { name: "Fruits",          subtitle: "Chemical free",     img: "/images/products/grocery_avocado.png" },
            { name: "Meat",            subtitle: "Frozen Meat",       img: "/images/products/grocery_beef.png" },
            { name: "Home",            subtitle: "Essentials",        img: "/images/products/home_candles.png" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/shop?category=${cat.name}`}
              className="group flex-shrink-0 w-32 md:w-auto bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col overflow-hidden snap-start"
            >
              <div className="relative w-full h-24 overflow-hidden bg-gray-50">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col text-left p-3">
                <span className="text-[12px] font-semibold text-gray-900 group-hover:text-primary transition-colors leading-tight">{cat.name}</span>
                <span className="text-[9px] text-gray-500 mt-0.5">{cat.subtitle}</span>
              </div>
            </Link>
          ))}

          {/* See All Card */}
          <Link
            href="/shop"
            className="group flex-shrink-0 w-32 md:w-auto bg-accent rounded-2xl shadow-sm border border-accent/20 hover:shadow-md transition-all flex flex-col items-center justify-center snap-start gap-3 min-h-[136px]"
          >
            <div className="bg-white text-accent-foreground h-10 w-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <ArrowRight className="h-4 w-4" />
            </div>
            <span className="text-[12px] font-semibold text-accent-foreground">See all</span>
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Best Sellers</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mt-2">Loved by 1000+ customers</h2>
          </div>
          <Link href="/shop" className="text-xs font-bold text-foreground hover:text-primary flex items-center gap-1 transition-colors">
            Shop all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Grocery Collection Banner */}
      <section className="rounded-[2.5rem] bg-primary text-white p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
        <div className="flex-1 space-y-6 z-10">
          <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10">
            FARM FRESH
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
            Daily Essentials.<br />Delivered Fast.
          </h2>
          <p className="text-sm text-slate-300 font-medium max-w-md leading-relaxed">
            Fresh organic produce, dairy, and household essentials. Order now and get it at your door in under 15 minutes.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/shop"
              className="bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold py-3.5 px-8 rounded-full transition-colors flex items-center gap-2"
            >
              Shop Groceries <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop"
              className="bg-transparent text-white border border-slate-600 hover:bg-white/5 text-xs font-bold py-3.5 px-8 rounded-full transition-colors"
            >
              View Lookbook
            </Link>
          </div>
        </div>

        <div className="flex-1 flex gap-4 w-full h-full z-10">
          <div className="relative aspect-[3/4] w-1/2 rounded-2xl overflow-hidden transform translate-y-4 shadow-xl bg-white/5">
            <Image src="/images/products/grocery_cabbage.png" alt="Fresh Cabbage" fill sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] w-1/2 rounded-2xl overflow-hidden transform -translate-y-4 shadow-xl bg-white/5">
            <Image src="/images/products/grocery_avocado.png" alt="Fresh Avocado" fill sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" className="object-cover" />
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-primary/30 blur-[100px] rounded-full pointer-events-none" />
      </section>

      {/* New Arrivals */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Fresh In</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mt-2">New arrivals</h2>
          </div>
          <Link href="/shop" className="text-xs font-bold text-foreground hover:text-primary flex items-center gap-1 transition-colors">
            See all new <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Woxly & Reviews */}
      <div className="space-y-24">
        <section className="space-y-5">
          <div className="flex items-end justify-between">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Why Woxly</span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground mt-1">Details that make<br className="md:hidden" /> the difference</h2>
            </div>
            <Link href="/shop" className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors flex-shrink-0">
              Shop now <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:pt-12 md:pb-12">
            {[
              { icon: Truck,       title: "Lightning Delivery",   desc: "At your door in under 15 min.", badge: "15 min" },
              { icon: ShieldCheck, title: "Freshness Guaranteed", desc: "Sourced daily from local farms.", badge: "100% Fresh" },
              { icon: RotateCcw,   title: "Easy Replacements",    desc: "We replace it, no questions.",   badge: "No hassle" },
              { icon: Box,         title: "Eco-Friendly",         desc: "100% recyclable packaging.",     badge: "Zero waste" },
            ].map((feature, i) => (
              <Link key={i} href="/shop" className="group bg-background border border-border rounded-2xl p-3.5 md:p-6 flex flex-col gap-2.5 md:gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="self-start bg-primary/10 p-2 md:p-2.5 rounded-xl text-primary">
                  <feature.icon className="h-3.5 w-3.5 md:h-5 md:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-primary">{feature.badge}</span>
                  <h3 className="font-semibold text-[11px] md:text-sm text-foreground mt-0.5 leading-tight">{feature.title}</h3>
                  <p className="text-[9px] md:text-xs text-muted-foreground mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mt-2">What customers say</h2>
          </div>

          {/* Mobile Auto-scrolling — client island (framer-motion) */}
          <ReviewsMarquee reviews={reviews} />

          {/* Desktop Grid Reviews — pure server HTML */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {reviews.map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-3xl p-8 flex flex-col gap-6 shadow-sm">
                <div className="flex gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-medium text-foreground leading-relaxed flex-grow">
                  &ldquo;{item.review}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-foreground">
                    {item.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">{item.name}</span>
                    <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-blue-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-[2.5rem] p-12 md:p-20 text-center flex flex-col items-center shadow-sm">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-4">Join the list</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
          Get 10% off your first order.
        </h2>
        <p className="text-sm text-muted-foreground font-medium mt-4 max-w-sm mx-auto">
          Early access to drops, member-only prices, and thoughtfully curated stories. No spam.
        </p>
        <NewsletterForm />
      </section>
    </div>
  );
}
