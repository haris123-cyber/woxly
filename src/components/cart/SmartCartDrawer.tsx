"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { MOCK_PRODUCTS } from "@/data/products";

export default function SmartCartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCartStore();

  // Cart reservation countdown timer (10 mins)
  const [secondsLeft, setSecondsLeft] = useState(600);

  useEffect(() => {
    if (!isCartOpen) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCartOpen]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${String(s).padStart(2, "0")}`;
  };

  // Calculate cart pricing
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 50;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const neededForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  // Quick upsell recommendation (product not in cart)
  const upsellProduct = MOCK_PRODUCTS.find(
    (product) => !cart.some((item) => item.product.id === product.id)
  );

  const { addToCart } = useCartStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={() => setCartOpen(false)}
      >
        <div 
          className="w-[calc(100vw-2.5rem)] md:w-screen max-w-md bg-background text-foreground border-l border-border flex flex-col shadow-2xl h-full animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-4 py-6 border-b border-border sm:px-6 flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-black tracking-wide uppercase">Your Cart ({cart.length})</h2>
              {cart.length > 0 && (
                <div className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-medium">
                  <Clock className="h-3.5 w-3.5 animate-pulse" />
                  <span>Items reserved for <span className="font-mono font-bold">{formatTimer(secondsLeft)}</span></span>
                </div>
              )}
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 -mr-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close cart drawer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <Trash2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold">Your cart is empty</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[240px]">
                  Add items to your cart to see them here and unlock free shipping!
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    window.location.href = "/shop";
                  }}
                  className="mt-6 bg-foreground text-background hover:bg-foreground/90 text-xs font-bold py-3 px-6 rounded-md transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress Indicator */}
                <div className="bg-muted/40 p-4 rounded-xl border border-border">
                  <div className="flex justify-between items-center text-xs font-medium mb-2">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5" /> You qualify for FREE Shipping!
                      </span>
                    ) : (
                      <span>
                        Spend <span className="font-bold text-accent">{formatPrice(neededForFreeShipping)}</span> more for Free Shipping
                      </span>
                    )}
                    <span className="text-muted-foreground">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                      className="flex gap-4 py-4 border-b border-border last:border-b-0"
                    >
                      <div className="relative h-20 w-20 bg-muted rounded-md overflow-hidden flex-shrink-0 border">
                        <Image
                          src={item.product.image || item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex justify-between text-sm font-semibold">
                          <h3 className="truncate hover:underline">
                            <Link href={`/product/${item.product.slug}`} onClick={() => setCartOpen(false)}>
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="ml-4 text-accent">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {item.product.category}
                          {item.selectedSize && ` • Size: ${item.selectedSize}`}
                          {item.selectedColor && ` • Color: ${item.selectedColor}`}
                        </p>

                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-border rounded-md bg-background overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                  item.selectedSize,
                                  item.selectedColor
                                )
                              }
                              className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.selectedSize,
                                  item.selectedColor
                                )
                              }
                              className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
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
                            className="text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1 p-2 hover:bg-red-50/10 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dynamic Upsell Widget */}
                {upsellProduct && (
                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center gap-4">
                    <div className="relative h-14 w-14 rounded-lg bg-muted flex-shrink-0 overflow-hidden border">
                      <Image
                        src={upsellProduct.image || upsellProduct.images[0]}
                        alt={upsellProduct.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                        Frequently Bought Together
                      </p>
                      <h4 className="text-xs font-semibold truncate mt-0.5 text-foreground">
                        {upsellProduct.name}
                      </h4>
                      <p className="text-xs font-bold text-accent mt-0.5">
                        {formatPrice(upsellProduct.price)}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        addToCart(
                          upsellProduct,
                          1,
                          upsellProduct.sizes?.[0] || "One Size",
                          upsellProduct.colors?.[0]?.name
                        )
                      }
                      className="bg-foreground text-background hover:bg-foreground/90 text-[10px] font-bold px-3 py-2 rounded-md transition-all flex items-center justify-center cursor-pointer"
                    >
                      Add +
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Checkout Section (Fixed Bottom) */}
          {cart.length > 0 && (
            <div className="border-t border-border px-4 py-6 sm:px-6 bg-card">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                <span>Shipping</span>
                <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? "FREE" : "Calculated at checkout"}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full bg-foreground hover:bg-foreground/90 text-background text-center font-bold py-3.5 px-4 rounded-md transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer text-sm"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="w-full border border-foreground hover:bg-muted text-foreground text-center font-bold py-3 px-4 rounded-md transition-all flex items-center justify-center text-xs"
                >
                  View Full Cart
                </Link>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Secure 256-bit SSL encrypted checkout.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
