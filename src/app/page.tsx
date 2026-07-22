import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw, Box, Leaf } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import ReviewsMarquee from "@/components/home/ReviewsMarquee";
import NewsletterForm from "@/components/home/NewsletterForm";
import PromoBanners from "@/components/home/PromoBanners";
import ApiProducts from "@/components/home/ApiProducts";


export default function HomePage() {
  const bestSellers = MOCK_PRODUCTS.slice(0, 4);
  const newArrivals = MOCK_PRODUCTS.slice(4, 8);
  const fashionProducts = MOCK_PRODUCTS.filter(p => p.category === "Fashion");

  const reviews = [
    { review: "The produce is incredibly fresh, and the delivery is always on time. A lifesaver for my busy schedule!", name: "Amelia R." },
    { review: "I love the organic selection. Everything from vegetables to daily dairy is top-notch quality.", name: "Marcus L." },
    { review: "Woxly has completely replaced my weekly supermarket trips. The 15-minute delivery is just magical.", name: "Sofia K." },
  ];

  return (
    <div className="pt-0 pb-20">
      <div className="p-0 m-0">
        <section
          className="relative h-[320px] sm:h-[450px] md:h-[700px] overflow-hidden"
        >
          <div
            className="
    absolute inset-0
    bg-no-repeat
    bg-[length:180%]
    sm:bg-[length:140%]
    md:bg-cover
  "
            style={{
              backgroundImage: "url('/images/bgimage-desktop.png')",
              backgroundPosition: "center -1px", // Moves image down
            }}
          />

          {/* Optional overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent md:from-black/35 md:via-black/30" />

          {/* Content */}

          <div className="relative z-20 max-w-[220px] sm:max-w-[280px] md:max-w-xl px-4 sm:px-6 lg:px-16 py-8 md:py-20">

            {/* Badge */}





            {/* Heading */}

            <h1 className="mt-3 text-[1.9rem] leading-[0.9] sm:text-[2.8rem] md:text-7xl lg:text-[5.5rem] font-black text-white font-playfair">

              Groceries,

              <br />

              delivered

              <br />

              with <span className="text-lime-300">care.</span>

            </h1>



            {/* Description */}

            <p className="mt-2 text-[11px] sm:text-sm md:text-lg text-white/90 leading-4 md:leading-7 max-w-[180px] md:max-w-md">

              Organic produce, pantry essentials and more delivered fresh to your door.

            </p>



            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-3 mt-5 md:mt-12 lg:mt-16">

              <Link

                href="/shop"

                className="group inline-flex items-center gap-1.5 md:gap-3 bg-lime-400 text-black text-[11px] md:text-base font-semibold py-1.5 md:py-3 px-3 md:px-7 rounded-full shadow-md w-fit transition-all"
              >
                <span>Shop Now</span>

                <div className="bg-black text-white rounded-full p-1">
                  <ArrowRight className="w-4 h-4" />

                </div>

              </Link>



              <Link

                href="/deals"
                className="inline-flex items-center justify-center border border-white/40 bg-white/10 backdrop-blur-md text-white text-[11px] md:text-base font-semibold py-1.5 md:py-3 px-4 md:px-8 rounded-full w-fit transition-all"              >

                Explore Deals

              </Link>

            </div>



          </div>

          {/* Features - Positioned Bottom Right */}
          <div className="absolute bottom-2 right-3 sm:bottom-6 sm:right-6 md:bottom-10 md:right-12 z-20">
            <div className="flex gap-3 sm:gap-6 md:gap-8">
              {[
                { icon: Leaf, title: "100% Organic" },
                { icon: Truck, title: "Fast Delivery" },
                { icon: ShieldCheck, title: "Secure Payment" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center text-white drop-shadow-md"
                >
                  <div className="bg-white/20 backdrop-blur-md p-1.5 md:p-2.5 rounded-full mb-1 md:mb-2 shadow-sm">
                    <item.icon className="w-3 h-3 md:w-5 md:h-5" />
                  </div>
                  <span className="text-[6px] md:text-sm font-semibold whitespace-nowrap">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>

      {/* Gromuse Style Categories Grid */}
      <section className="px-1 sm:px-6 lg:px-8  relative z-20 max-w-7xl mx-auto mt-5 -mb-10">
        <div className="text-left mb-3">
          <h2 className="text-1xl md:text-2xl font-black tracking-tight text-foreground mt-2">Shop by Category</h2>
        </div>
        <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-3 md:grid md:grid-cols-6 md:gap-3 md:overflow-visible snap-x">
          {[
            { name: "Vegetable", subtitle: "Local market", img: "/images/products/grocery_cabbage.png" },
            { name: "Snacks & Breads", subtitle: "In-store delivery", img: "/images/products/grocery_lays.png" },
            { name: "Fruits", subtitle: "Chemical free", img: "/images/products/grocery_avocado.png" },
            { name: "Meat", subtitle: "Frozen Meat", img: "/images/products/grocery_beef.png" },
            { name: "Home", subtitle: "Essentials", img: "/images/products/home_candles.png" },
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

      {/* Promo Banners Peeking Carousel */}
      <PromoBanners />

      {/* Best Sellers */}
      <section className="space-y-4 px-1 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-end justify-between">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Best Sellers</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mt-2">Loved by 1000+ customers</h2>
          </div>
          <Link
            href="/shop"
            className="flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-bold text-foreground hover:text-primary transition-colors"
          >
            Shop all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Grocery Collection Banner */}
      <section className="rounded-[2.5rem] bg-primary text-white p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative px-1 sm:px-6 lg:px-8 mt-8">
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

        <div className="flex-1 flex gap-4 w-full h-full z-10 px-1 sm:px-6 lg:px-8">
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
      <section className="space-y-2 px-1 sm:px-6 lg:px-8 mt-8">
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

      {/* Fashion Promo Banner & Collection */}
      <section className="space-y-2 mt-8">
        <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden w-full shadow-md border border-border/10">
          <Link href="/shop?category=Fashion" className="block w-full relative group">
            <Image
              src="/images/banners/fashion_banner.jpg"
              alt="Limited Time 50% Off Fashion Items"
              width={1280}
              height={670}
              className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-500"
              priority={false}
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </Link>
        </div>

        {/* Fashion Collection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-5">
          {fashionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>


      <ApiProducts />



      {/* Why Woxly & Reviews */}
      <div className="space-y-0 mt-8">
        <section className="-space-y-0">
          <div className="flex items-end justify-between ">
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
              { icon: Truck, title: "Lightning Delivery", desc: "At your door in under 15 min.", badge: "15 min" },
              { icon: ShieldCheck, title: "Freshness Guaranteed", desc: "Sourced daily from local farms.", badge: "100% Fresh" },
              { icon: RotateCcw, title: "Easy Replacements", desc: "We replace it, no questions.", badge: "No hassle" },
              { icon: Box, title: "Eco-Friendly", desc: "100% recyclable packaging.", badge: "Zero waste" },
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

        <section className="-space-y-0 mt-5 ">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mt-2">What customers say</h2>
          </div>

          {/* Mobile Auto-scrolling — client island (framer-motion) */}
          <ReviewsMarquee reviews={reviews} />

          {/* Desktop Grid Reviews — pure server HTML */}
          <div className="hidden md:grid md:grid-cols-3 gap-0 mt-8">
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
      <section className="-mb-25  -sm:mb-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-blue-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-[2.5rem] py-10 px-8 md:py-14 md:px-16 mt-5 text-center flex flex-col items-center shadow-sm">
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
