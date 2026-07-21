"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Check, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface FrequentlyBoughtTogetherProps {
  currentProduct: Product;
}

export default function FrequentlyBoughtTogether({ currentProduct }: FrequentlyBoughtTogetherProps) {
  const { addToCart } = useCartStore();

  // Find 2 recommended items from other categories
  const recommendedItems = MOCK_PRODUCTS.filter(
    (p) => p.id !== currentProduct.id && p.category !== currentProduct.category
  ).slice(0, 2);

  // States to track checkboxed items
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({
    [currentProduct.id]: true, // current product always selected
    [recommendedItems[0]?.id || ""]: true,
    [recommendedItems[1]?.id || ""]: true,
  });

  const toggleItem = (id: string) => {
    if (id === currentProduct.id) return; // cannot deselect current product
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const activeProducts = [
    currentProduct,
    ...recommendedItems.filter((p) => selectedItems[p.id]),
  ];

  // Calculate prices
  const rawSubtotal = activeProducts.reduce((acc, p) => acc + p.price, 0);
  // Apply a 10% bundle discount if more than 1 item is selected!
  const isBundle = activeProducts.length > 1;
  const bundleDiscount = isBundle ? rawSubtotal * 0.1 : 0;
  const finalPrice = rawSubtotal - bundleDiscount;

  const handleAddBundle = () => {
    activeProducts.forEach((product) => {
      const size = product.sizes?.[0] || "One Size";
      const color = product.colors?.[0]?.name;
      addToCart(product, 1, size, color);
    });
  };

  if (recommendedItems.length === 0) return null;

  return (
    <div className="bg-card text-card-foreground border border-border/80 rounded-2xl p-5 sm:p-6 shadow-sm mt-8 transition-colors duration-200">
      <h3 className="text-sm font-extrabold uppercase tracking-wider mb-4 flex items-center gap-1.5">
        <ShoppingCart className="h-4 w-4 text-accent" />
        Frequently Bought Together
      </h3>

      {/* Visual Image Grid */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
        {/* Current Product Image */}
        <div className="relative h-20 w-20 rounded-xl bg-muted border overflow-hidden flex-shrink-0">
          <Image
            src={currentProduct.image || currentProduct.images[0]}
            alt={currentProduct.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        {recommendedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 sm:gap-4">
            <Plus className="h-4 w-4 text-muted-foreground" />
            <div
              className={`relative h-20 w-20 rounded-xl bg-muted border overflow-hidden flex-shrink-0 transition-opacity duration-200 ${
                selectedItems[item.id] ? "opacity-100 border-accent" : "opacity-40"
              }`}
            >
              <Image
                src={item.image || item.images[0]}
                alt={item.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Checklist selectors */}
      <div className="space-y-3 mb-6">
        {/* Current item checklist */}
        <div className="flex items-center gap-3">
          <button
            disabled
            className="h-5 w-5 bg-primary text-primary-foreground border border-primary rounded flex items-center justify-center cursor-not-allowed opacity-80"
          >
            <Check className="h-3.5 w-3.5" />
          </button>
          <div className="text-xs">
            <span className="font-bold text-foreground">This item:</span> {currentProduct.name} —{" "}
            <span className="font-extrabold text-accent">{formatPrice(currentProduct.price)}</span>
          </div>
        </div>

        {/* Recommended items checklist */}
        {recommendedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <button
              onClick={() => toggleItem(item.id)}
              className={`h-5 w-5 border rounded flex items-center justify-center transition-all cursor-pointer ${
                selectedItems[item.id]
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-card border-border hover:border-muted-foreground"
              }`}
              aria-label={`Toggle inclusion of ${item.name} in bundle`}
            >
              {selectedItems[item.id] && <Check className="h-3.5 w-3.5" />}
            </button>
            <div className="text-xs">
              <button
                onClick={() => toggleItem(item.id)}
                className="text-left font-semibold text-foreground hover:underline hover:text-accent cursor-pointer"
              >
                {item.name}
              </button>{" "}
              — <span className="font-extrabold text-accent">{formatPrice(item.price)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing summary & Buy Button */}
      <div className="pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-muted-foreground font-semibold">Total Price:</span>
            <span className="text-lg font-black text-foreground">{formatPrice(finalPrice)}</span>
            {isBundle && (
              <span className="text-xs text-muted-foreground line-through font-medium">
                {formatPrice(rawSubtotal)}
              </span>
            )}
          </div>
          {isBundle && (
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
              Bundle Discount Applied: Save 10% ({formatPrice(bundleDiscount)})!
            </p>
          )}
        </div>
        <button
          onClick={handleAddBundle}
          className="bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-bold py-2.5 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          Add Bundle to Cart
        </button>
      </div>
    </div>
  );
}
