import Link from "next/link";
import Image from "next/image";
import { Sparkles, Heart, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 py-8 md:py-16 text-foreground">

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
          Elevating Your <span className="italic font-light text-accent">Everyday</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
          Woxly was founded on a simple principle: your daily essentials shouldn't be an afterthought. We curate and deliver premium products that seamlessly blend into your modern lifestyle.
        </p>
      </section>

      {/* Our Story / Philosophy */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-4 max-w-7xl mx-auto w-full">
        <div className="order-2 lg:order-1 relative aspect-square lg:aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden bg-muted">
          <Image
            src="/images/hero_grocery_bag22.png"
            alt="Woxly brand design story"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="order-1 lg:order-2 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Form meets function, delivered to your door.
            </h2>
          </div>
          <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
            <p>
              Founded in 2026, Woxly emerged with a singular vision: to challenge standard everyday consumer products by creating items that feel premium, last longer, and elevate your personal lifestyle.
            </p>
            <p>
              We believe that modern styling should not compromise comfort or sustainability. By leveraging cutting-edge logistics, robust engineering, and timeless design schemas, our curated selection of products looks stunning and stands the test of time.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-full mt-4 text-base px-8 py-6 shadow-xl">
            <Link href="/shop">
              Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-primary/5 rounded-[3rem] p-8 md:p-16 max-w-7xl mx-auto w-full border border-border/50">
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">The Woxly Difference</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground text-base">
            We go beyond just selling products. We provide an end-to-end premium experience designed around your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Sparkles,
              title: "Curated Quality",
              desc: "Every product is meticulously vetted for durability, aesthetics, and premium materials."
            },
            {
              icon: CheckCircle2,
              title: "Lightning Delivery",
              desc: "Experience ultra-fast shipping with real-time tracking straight to your doorstep."
            },
            {
              icon: Heart,
              title: "Sustainable Focus",
              desc: "Eco-friendly packaging and ethical sourcing are at the heart of everything we do."
            },
            {
              icon: ShieldCheck,
              title: "Secure Trust",
              desc: "Shop with confidence with our 30-day money-back guarantee and secure checkout."
            }
          ].map((feature, i) => (
            <div key={i} className="bg-background p-8 rounded-3xl border border-border/50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors text-accent">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
