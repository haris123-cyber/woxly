"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { MOCK_PRODUCTS } from "@/data/products";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, addToCart } = useCartStore();

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 50;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const neededForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  // Recommendations: products not in cart
  const recommendedItems = MOCK_PRODUCTS.filter(
    (product) => !cart.some((item) => item.product.id === product.id)
  ).slice(0, 3);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center text-xs font-semibold">
        <div className="bg-muted rounded-full p-4 mb-4">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-lg font-black uppercase tracking-wider text-foreground">Your Cart is Empty</h1>
        <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
          Before you can check out, you must add some products to your shopping cart.
        </p>
        <Link
          href="/shop"
          className="mt-6 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold py-3 px-8 rounded-xl"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left text-xs font-semibold">
      <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">Shopping Cart</h1>

      {/* Free Shipping Tracker Banner */}
      <div className="bg-card text-card-foreground border border-border p-5 rounded-2xl">
        <p className="font-bold mb-2">
          {subtotal >= FREE_SHIPPING_THRESHOLD ? (
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Congratulations! You have unlocked Free Standard Shipping.</span>
          ) : (
            <span>
              You are only <span className="text-accent">{formatPrice(neededForFreeShipping)}</span> away from unlocking <span className="font-bold">Free Shipping</span>!
            </span>
          )}
        </p>
        <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List (Left Columns) */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
              className="bg-card text-card-foreground border border-border p-4 rounded-2xl flex gap-4"
            >
              <div className="relative h-20 w-20 bg-muted rounded-xl overflow-hidden flex-shrink-0 border">
                <Image
                  src={item.product.image || item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start text-xs font-bold">
                  <h3 className="truncate text-foreground hover:underline">
                    <Link href={`/product/${item.product.slug}`}>{item.product.name}</Link>
                  </h3>
                  <span className="text-accent">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Category: {item.product.category}
                  {item.selectedSize && ` • Size: ${item.selectedSize}`}
                  {item.selectedColor && ` • Color: ${item.selectedColor}`}
                </p>

                {/* Adjust Quantities & Remove */}
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex items-center border border-border rounded-lg bg-card overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                      className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-2.5 font-bold text-center w-8">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                      className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor
                      )
                    }
                    className="text-muted-foreground hover:text-red-500 flex items-center gap-1 p-2 rounded hover:bg-red-500/10 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Upsells block */}
          {recommendedItems.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-foreground">You might also like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedItems.map((rec) => (
                  <div key={rec.id} className="bg-card text-card-foreground border border-border p-3 rounded-2xl flex flex-col justify-between h-full">
                    <div className="flex gap-3 sm:flex-col sm:gap-2">
                      <div className="relative h-14 w-14 sm:h-28 sm:w-full rounded-lg bg-muted overflow-hidden flex-shrink-0 border">
                        <Image
                          src={rec.image || rec.images[0]}
                          alt={rec.name}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </div>
                      <div className="truncate text-left text-[11px]">
                        <h4 className="font-bold text-foreground truncate hover:underline">
                          <Link href={`/product/${rec.slug}`}>{rec.name}</Link>
                        </h4>
                        <span className="font-extrabold text-accent">{formatPrice(rec.price)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(rec, 1, rec.sizes?.[0] || "One Size", rec.colors?.[0]?.name)}
                      className="bg-primary hover:bg-primary/95 text-primary-foreground text-[10px] font-extrabold py-2 px-3 rounded-lg w-full mt-3 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing Summary (Right Column) */}
        <aside className="bg-card text-card-foreground border border-border p-5 rounded-2xl h-fit space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-foreground border-b pb-3">Order Summary</h2>

          <div className="space-y-2.5 pb-4 border-b border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground font-medium">Subtotal</span>
              <span className="text-foreground font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-medium">Shipping</span>
              <span className="text-foreground font-bold">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : formatPrice(4.99)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-medium">Estimated Tax</span>
              <span className="text-foreground font-bold">{formatPrice(subtotal * 0.08)}</span>
            </div>
          </div>

          <div className="flex justify-between text-sm font-black text-foreground pt-1">
            <span>Total</span>
            <span>{formatPrice(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99) + subtotal * 0.08)}</span>
          </div>

          <Link
            href="/checkout"
            className="w-full bg-primary hover:bg-primary/95 text-primary-foreground text-center font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer mt-4"
          >
            Proceed to Checkout <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground pt-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Secure 256-bit SSL encrypted checkout.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
