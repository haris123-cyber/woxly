"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to mock cycle
          return { hours: 2, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="bg-announcementbar text-primary-foreground text-xs py-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-1 relative z-10 -mb-[1px]">
      <div className="flex items-center gap-1.5 font-medium tracking-wide">
        <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
        <span>FLASH SALE: USE CODE <span className="text-amber-400 font-bold">WOXLY20</span> FOR 20% OFF!</span>
      </div>
      <div className="flex items-center gap-3 text-[11px] opacity-90">
        <span>Free Shipping on orders over ₹50</span>
        <div className="flex items-center gap-1 font-mono bg-white/10 px-2 py-0.5 rounded border border-white/5">
          <span>Ends in</span>
          <span className="text-amber-400 font-bold" suppressHydrationWarning>
            {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
