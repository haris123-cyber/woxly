"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ShoppingBag, Truck } from "lucide-react";
import { useCartStore, Order } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { orders } = useCartStore();
  const [order, setOrder] = useState<Order | null>(null);

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      const match = orders.find((o) => o.id === orderId);
      if (match) {
        setOrder(match);
      }
    }
  }, [orderId, orders]);

  if (!order) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center text-xs font-semibold">
        <span className="text-3xl">📭</span>
        <h1 className="text-lg font-black uppercase text-foreground mt-4">Order Details Loading</h1>
        <p className="text-xs text-muted-foreground mt-1">We are retrieving your order details. Please stand by...</p>
        <Link
          href="/"
          className="mt-6 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold py-2.5 px-6 rounded-xl"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  // Estimate delivery date: 5 days from today
  const deliveryEstimate = new Date();
  deliveryEstimate.setDate(deliveryEstimate.getDate() + 5);
  const formattedEstimate = deliveryEstimate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left text-xs font-semibold">
      {/* Visual Success card */}
      <div className="bg-card border border-border p-6 sm:p-10 rounded-3xl text-center space-y-4 shadow-sm">
        <div className="flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">
          Thank you for your order!
        </h1>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          Your order has been placed successfully. We have sent a confirmation email to{" "}
          <span className="font-bold text-foreground">{order.shippingAddress.email}</span> with your receipt.
        </p>

        <div className="pt-4 flex flex-wrap gap-3 justify-center">
          <Link
            href={`/track-order?orderId=${order.id}`}
            className="bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Truck className="h-4 w-4" /> Track Your Order
          </Link>
          <Link
            href="/shop"
            className="border border-border bg-card hover:bg-muted text-foreground text-xs font-bold py-3 px-6 rounded-xl transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Order Details box */}
      <div className="bg-card border border-border p-6 rounded-2xl space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b">
          Order Summary Details
        </h2>

        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border/80 text-[11px]">
          <div>
            <span className="text-muted-foreground block">Order Number</span>
            <span className="font-bold text-foreground">{order.id}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Estimated Delivery</span>
            <span className="font-bold text-foreground">{formattedEstimate}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Payment Method</span>
            <span className="font-bold text-foreground">{order.paymentMethod}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Shipping Service</span>
            <span className="font-bold text-foreground">Standard Delivery</span>
          </div>
        </div>

        {/* Itemized list */}
        <div className="space-y-3 pb-4 border-b border-border/80">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-[11px]">
              <div>
                <span className="font-bold text-foreground">{item.product.name}</span>
                <span className="text-muted-foreground ml-1">x{item.quantity}</span>
                {item.selectedSize && <span className="text-muted-foreground ml-1">({item.selectedSize})</span>}
              </div>
              <span className="font-bold text-foreground">{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Total math */}
        <div className="space-y-2 text-[11px] text-right">
          <div className="flex justify-between">
            <span className="text-muted-foreground font-medium">Subtotal</span>
            <span className="text-foreground font-bold">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-medium">Shipping</span>
            <span className="text-foreground font-bold">{order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-medium">Tax</span>
            <span className="text-foreground font-bold">{formatPrice(order.tax)}</span>
          </div>
          <div className="flex justify-between text-sm font-black text-foreground pt-2 border-t border-border/50">
            <span>Total Amount Paid</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-20">
        <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-muted-foreground mt-2 font-bold">Rendering receipt...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
