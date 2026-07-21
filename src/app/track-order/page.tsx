"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, MapPin, Truck, Calendar, Check, Clock, UserSearch } from "lucide-react";
import { useCartStore, Order } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

// Schema for tracking form
const trackingSchema = z.object({
  orderId: z.string().min(5, "Order ID must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
});

type TrackingFormValues = z.infer<typeof trackingSchema>;

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const { orders } = useCartStore();
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const queryOrderId = searchParams.get("orderId");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TrackingFormValues>({
    resolver: zodResolver(trackingSchema),
  });

  // Sync order ID from URL params on mount
  useEffect(() => {
    if (queryOrderId) {
      const match = orders.find((o) => o.id === queryOrderId);
      if (match) {
        setActiveOrder(match);
        setValue("orderId", match.id);
        setValue("email", match.shippingAddress.email);
      } else {
        setSearchAttempted(true);
      }
    }
  }, [queryOrderId, orders, setValue]);

  const onSubmit = (data: TrackingFormValues) => {
    setSearchAttempted(true);
    const match = orders.find(
      (o) =>
        o.id.toLowerCase() === data.orderId.trim().toLowerCase() &&
        o.shippingAddress.email.toLowerCase() === data.email.trim().toLowerCase()
    );
    if (match) {
      setActiveOrder(match);
    } else {
      setActiveOrder(null);
    }
  };

  // Timeline Step Status resolver
  const getStepStatus = (status: Order["status"], stepIndex: number) => {
    const statuses: Order["status"][] = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
    const currentStatusIndex = statuses.indexOf(status);

    // If status is "Cancelled"
    if (status === "Cancelled") {
      return "cancelled";
    }

    if (stepIndex <= currentStatusIndex) {
      return "completed";
    } else if (stepIndex === currentStatusIndex + 1) {
      return "active";
    } else {
      return "pending";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left text-xs font-semibold">
      <div className="space-y-4">
        <h1 className="text-2xl font-black uppercase tracking-wider text-center text-foreground">
          Track Your Order
        </h1>
        <p className="text-xs text-muted-foreground text-center max-w-sm mx-auto">
          Enter your 15-digit order number and email address to view real-time status.
        </p>

        {/* Tracking Search Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-background text-foreground border border-border p-6 rounded-md space-y-4 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground mb-1.5">Order Number</label>
              <input
                type="text"
                placeholder="e.g. WOXLY-3004-12345"
                {...register("orderId")}
                className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${
                  errors.orderId ? "border-red-500" : "border-border"
                }`}
              />
              {errors.orderId && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.orderId.message}</p>}
            </div>
            <div>
              <label className="block text-muted-foreground mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="e.g. customer@example.com"
                {...register("email")}
                className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-foreground hover:bg-foreground/90 text-background font-bold py-3.5 rounded-md transition-all shadow-sm flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
          >
            <Search className="h-4 w-4" /> Locate Order
          </button>
        </form>
      </div>

      {/* Tracker Status Results */}
      {activeOrder ? (
        <div className="space-y-6">
          {/* Status Timeline visualization */}
          <div className="bg-background border border-border p-6 rounded-md space-y-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-foreground border-b pb-3">
              Order Journey Status
            </h2>

            {activeOrder.status === "Cancelled" ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center">
                <p className="font-bold">This order has been Cancelled.</p>
                <p className="text-[10px] opacity-80 mt-0.5">Please contact customer support for further information.</p>
              </div>
            ) : (
              <div className="relative pl-6 space-y-8 border-l border-border/80 ml-2">
                {[
                  { title: "Order Placed", desc: "We received your order request", icon: Calendar },
                  { title: "Processing", desc: "Your items are being packed", icon: Clock },
                  { title: "Shipped", desc: "Package handed over to carrier", icon: Truck },
                  { title: "Delivered", desc: "Arrived at destination address", icon: MapPin },
                ].map((step, idx) => {
                  const stepStatus = getStepStatus(activeOrder.status, idx);
                  return (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <span
                        className={`absolute -left-[31px] top-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          stepStatus === "completed"
                            ? "bg-foreground border-foreground text-background"
                            : stepStatus === "active"
                            ? "bg-background border-foreground ring-4 ring-foreground/10 animate-pulse"
                            : "bg-background border-border text-muted-foreground"
                        }`}
                      >
                        {stepStatus === "completed" && <Check className="h-2.5 w-2.5" />}
                      </span>

                      <div className="text-left">
                        <h4
                          className={`text-xs font-bold ${
                            stepStatus === "completed"
                              ? "text-foreground"
                              : stepStatus === "active"
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details Overview Box */}
          <div className="bg-background border border-border p-6 rounded-md space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-foreground border-b pb-3">
              Shipment Information
            </h2>
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border/80 text-[11px]">
              <div>
                <span className="text-muted-foreground block">Shipping Carrier</span>
                <span className="font-bold text-foreground">Woxly Express</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Tracking ID</span>
                <span className="font-bold text-foreground">WX-{activeOrder.id.slice(-8)}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground block">Destination Address</span>
                <span className="font-bold text-foreground">
                  {activeOrder.shippingAddress.fullName}, {activeOrder.shippingAddress.address},{" "}
                  {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.postalCode}
                </span>
              </div>
            </div>

            {/* Items tracker */}
            <div className="space-y-2">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-wider block">
                Items Package
              </span>
              <div className="space-y-2">
                {activeOrder.items.map((item, index) => (
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
            </div>
          </div>
        </div>
      ) : (
        searchAttempted && (
          <div className="text-center py-8 border border-dashed border-border rounded-md p-6 bg-background text-xs flex flex-col items-center gap-2">
            <UserSearch className="h-8 w-8 text-slate-400" />
            <h3 className="font-bold text-foreground">No Order Found</h3>
            <p className="text-muted-foreground mt-0.5 max-w-[280px] mx-auto">
              We couldn't locate any order matching that Order ID and email. Please check your credentials and try again.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-20">
        <div className="h-8 w-8 border-4 border-foreground border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-muted-foreground mt-2 font-bold">Connecting tracking servers...</p>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
