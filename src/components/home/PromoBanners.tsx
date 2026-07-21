"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const BANNERS = [
  { id: 1, src: "/images/banners/banner1.png", alt: "Groceries Delivered Fresh to Your Door", href: "/shop" },
  { id: 2, src: "/images/banners/banner2.jpg", alt: "Eat Healthy, Live Better", href: "/shop?category=Vegetable" },
  { id: 3, src: "/images/banners/banner3.png", alt: "Deals You Can't Miss!", href: "/shop" },
  { id: 4, src: "/images/banners/banner4.jpg", alt: "Farm Fresh Vegetables", href: "/shop?category=Vegetable" },
  { id: 5, src: "/images/banners/banner5.jpg", alt: "Snacks & Drinks For Every Craving", href: "/shop?category=Snacks%20%26%20Breads" },
];

const AUTO_PLAY_INTERVAL = 5000;

export default function PromoBanners() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(handleNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section 
      className="relative w-full overflow-hidden py-10 select-none bg-slate-50/50 dark:bg-zinc-950/20 rounded-3xl border border-gray-100 dark:border-zinc-900/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .banners-track-container {
          --card-width: 290px;
          --card-gap: 16px;
        }
        @media (min-width: 640px) {
          .banners-track-container {
            --card-width: 520px;
            --card-gap: 20px;
          }
        }
        @media (min-width: 1024px) {
          .banners-track-container {
            --card-width: 760px;
            --card-gap: 24px;
          }
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-between items-center text-left">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Special Offers</span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mt-1">Deals of the Week</h2>
        </div>

        {/* Manual Arrow Controls */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors shadow-sm cursor-pointer"
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors shadow-sm cursor-pointer"
            aria-label="Next banner"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Carousel Track wrapper */}
      <div 
        className="banners-track-container relative w-full flex items-center h-[170px] sm:h-[300px] md:h-[420px] overflow-hidden"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(e, info) => {
            const offset = info.offset.x;
            const velocity = info.velocity.x;
            if (offset < -60 || velocity < -500) {
              handleNext();
            } else if (offset > 60 || velocity > 500) {
              handlePrev();
            }
          }}
          animate={{
            x: `calc(50% - var(--card-width) / 2 - ${activeIndex} * (var(--card-width) + var(--card-gap)))`
          }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
          className="w-full flex items-center gap-[var(--card-gap)] flex-nowrap h-full cursor-grab active:cursor-grabbing"
        >
          {BANNERS.map((banner, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={banner.id}
                animate={{
                  scale: isActive ? 1.0 : 0.94,
                  opacity: isActive ? 1.0 : 0.4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24
                }}
                className="relative flex-shrink-0 rounded-3xl overflow-hidden shadow-lg border border-border/10 bg-card cursor-pointer"
                style={{
                  width: "var(--card-width)",
                  aspectRatio: "1.91 / 1"
                }}
              >
                <Link href={banner.href} className="block w-full h-full relative" draggable={false}>
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    sizes="(max-width: 768px) 300px, (max-width: 1200px) 550px, 750px"
                    className="object-cover pointer-events-none"
                    priority={isActive}
                  />
                  
                  {/* Subtle hover gradient overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === activeIndex ? "bg-primary w-8" : "bg-muted-foreground/30 w-2.5 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
