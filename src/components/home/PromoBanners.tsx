"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const touchStartX = useRef<number | null>(null);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % BANNERS.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(handleNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden py-8 mt-8 select-none bg-slate-50/50 dark:bg-zinc-950/20 rounded-2xl border border-gray-100 dark:border-zinc-900/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .banners-track-container {
          --card-width: calc(100vw - 32px);
          --card-gap: 12px;
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
        @media (min-width: 1280px) {
          .banners-track-container {
            --card-width: 900px;
          }
        }
        @keyframes progress-fill { from { width: 0% } to { width: 100% } }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-between items-center text-left">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Special Offers</span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mt-1">Deals of the Week</h2>
        </div>
      </div>

      {/* Carousel Track wrapper */}
      <div
        className="banners-track-container relative w-full flex items-center h-[220px] sm:h-[320px] md:h-[460px] lg:h-[640px] -mt-6 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="w-full flex items-center gap-[var(--card-gap)] flex-nowrap h-full"
          style={{
            transform: `translateX(calc(50% - var(--card-width) / 2 - ${activeIndex} * (var(--card-width) + var(--card-gap))))`,
            transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
            willChange: "transform",
          }}
        >
          {BANNERS.map((banner, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={banner.id}
                className="relative flex-shrink-0 rounded-3xl overflow-hidden shadow-lg border border-border/10 bg-card cursor-pointer"
                style={{
                  width: "var(--card-width)",
                  aspectRatio: "16 / 9",
                  transform: isActive ? "scale(1)" : "scale(0.95)",
                  opacity: isActive ? 1 : 0,
                  transition: "transform 0.5s ease, opacity 0.5s ease",
                }}
              >
                <Link href={banner.href} className="block w-full h-full relative" draggable={false}>
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    sizes="(max-width: 768px) 300px, (max-width: 1200px) 550px, 750px"
                    className="object-cover pointer-events-none"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        {/* Mobile Dots */}
        <div className="flex gap-2 sm:hidden">
          {BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                ? "w-6 bg-primary"
                : "w-2 bg-gray-300 dark:bg-zinc-600"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Desktop Progress Bars */}
        <div className="hidden sm:flex gap-2 w-56">
          {BANNERS.map((_, index) => (
            <div
              key={index}
              className="relative h-1.5 flex-1 rounded-full bg-gray-300 dark:bg-zinc-700 overflow-hidden cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              {index === activeIndex && (
                <div
                  key={activeIndex}
                  className="absolute left-0 top-0 h-full bg-primary rounded-full"
                  style={{
                    animation: `progress-fill ${AUTO_PLAY_INTERVAL}ms linear forwards`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
