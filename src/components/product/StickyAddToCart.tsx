"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface StickyAddToCartProps {
  product: Product;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  handleAddToCart: () => void;
}

export default function StickyAddToCart({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  handleAddToCart,
}: StickyAddToCartProps) {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past 550px
      if (window.scrollY > 550) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showSticky) return null;

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-40 py-3 shadow-2xl transition-all duration-300 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Product Brief */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative h-10 w-10 bg-muted rounded-md overflow-hidden flex-shrink-0 border hidden sm:block">
            <Image
              src={product.image || product.images[0]}
              alt={product.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="truncate">
            <p className="text-xs font-bold truncate text-foreground leading-snug">{product.name}</p>
            <p className="text-xs font-semibold text-accent leading-none mt-0.5">{formatPrice(product.price)}</p>
          </div>
        </div>

        {/* Options & Add To Cart action */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="bg-muted text-foreground text-[11px] font-semibold px-2 py-2 rounded-lg border border-border focus:outline-none hidden md:block cursor-pointer"
            >
              {product.colors.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-muted text-foreground text-[11px] font-semibold px-2.5 py-2 rounded-lg border border-border focus:outline-none cursor-pointer"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  Size {size}
                </option>
              ))}
            </select>
          )}

          {/* Buy Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
