"use client";

import { Star } from "lucide-react";

interface Review {
  review: string;
  name: string;
}

interface ReviewsMarqueeProps {
  reviews: Review[];
}

export default function ReviewsMarquee({ reviews }: ReviewsMarqueeProps) {
  return (
    <div className="md:hidden overflow-hidden relative w-full -mx-4 px-4 sm:-mx-6 sm:px-6 py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee-track { animation: marquee-scroll 20s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}} />
      <div className="marquee-track flex flex-row gap-4 w-max">
        {[...reviews, ...reviews].map((item, i) => (
          <div
            key={i}
            className="bg-background border border-border rounded-3xl p-6 flex flex-col gap-4 shadow-sm shrink-0 w-[85vw] sm:w-[380px]"
          >
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
                <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
                  Verified Buyer
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
