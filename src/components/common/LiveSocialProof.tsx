"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";

interface PurchaseNotification {
  name: string;
  location: string;
  productName: string;
  productSlug: string;
  productImage: string;
  timeAgo: string;
}

const MOCK_LOCATIONS = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "London, UK", "Toronto, ON",
  "Sydney, AU", "Berlin, DE", "Paris, FR", "Miami, FL", "Austin, TX"
];

const MOCK_NAMES = [
  "Sarah", "John", "Emma", "David", "Michael", "Emily", "James", "Jessica",
  "Daniel", "Olivia", "Sophia", "Matthew", "Chloe", "Andrew", "Grace"
];

export default function LiveSocialProof() {
  const [notification, setNotification] = useState<PurchaseNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 6 seconds
    const initialTimeout = setTimeout(() => {
      triggerNewNotification();
    }, 6000);

    // Set up repeating interval
    const interval = setInterval(() => {
      triggerNewNotification();
    }, 25000); // Trigger every 25 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const triggerNewNotification = () => {
    const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    const randomName = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
    const randomLocation = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
    const minutesAgo = Math.floor(Math.random() * 58) + 2;

    setNotification({
      name: randomName,
      location: randomLocation,
      productName: randomProduct.name,
      productSlug: randomProduct.slug,
      productImage: randomProduct.image || randomProduct.images[0],
      timeAgo: `${minutesAgo}m ago`,
    });

    setIsVisible(true);

    // Hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  };

  if (!notification) return null;

  return (
    <div
      className={`fixed bottom-20 md:bottom-6 left-4 z-50 max-w-[320px] bg-card text-card-foreground p-3.5 rounded-xl border border-border shadow-xl transition-all duration-500 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground rounded-full p-0.5 hover:bg-muted"
        aria-label="Close notification"
      >
        <X className="h-3 w-3" />
      </button>

      <div className="flex gap-3 pr-4">
        <div className="relative h-14 w-14 rounded-lg bg-muted flex-shrink-0 overflow-hidden border border-border">
          <Image
            src={notification.productImage}
            alt={notification.productName}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col text-xs justify-center">
          <p className="font-medium flex items-center gap-1">
            <span className="text-amber-500 font-bold">{notification.name}</span>
            <span className="text-muted-foreground">in {notification.location}</span>
          </p>
          <p className="text-muted-foreground mt-0.5 leading-snug">
            Purchased{" "}
            <Link
              href={`/product/${notification.productSlug}`}
              className="text-foreground hover:underline font-semibold"
            >
              {notification.productName}
            </Link>
          </p>
          <span className="text-[10px] text-muted-foreground/80 mt-1 flex items-center gap-1">
            <ShoppingBag className="h-2.5 w-2.5 text-emerald-500" />
            {notification.timeAgo} • Verified Purchase
          </span>
        </div>
      </div>
    </div>
  );
}
