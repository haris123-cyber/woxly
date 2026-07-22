"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const PromoBanners = dynamic(() => import("@/components/home/PromoBanners"), { ssr: false });
const ReviewsMarquee = dynamic(() => import("@/components/home/ReviewsMarquee"), { ssr: false });
const ApiProducts = dynamic(() => import("@/components/home/ApiProducts"), { ssr: false });

export function LazyPromoBanners() {
  return (
    <Suspense fallback={<div className="h-[170px] sm:h-[300px] md:h-[420px] rounded-3xl bg-muted/30 animate-pulse mt-8" />}>
      <PromoBanners />
    </Suspense>
  );
}

interface ReviewsMarqueeProps {
  reviews: { review: string; name: string }[];
}

export function LazyReviewsMarquee({ reviews }: ReviewsMarqueeProps) {
  return (
    <Suspense fallback={null}>
      <ReviewsMarquee reviews={reviews} />
    </Suspense>
  );
}

export function LazyApiProducts() {
  return (
    <Suspense fallback={<div className="h-64 rounded-2xl bg-muted/30 animate-pulse mt-8 mx-1 sm:mx-6 lg:mx-8" />}>
      <ApiProducts />
    </Suspense>
  );
}
