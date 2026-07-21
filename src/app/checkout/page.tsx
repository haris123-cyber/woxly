"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, ShieldCheck, ShoppingBag, Truck, Lock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Zod Validation Schema for Checkout Form
const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z.string().min(4, "Postal code must be at least 4 characters"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  paymentMethod: z.enum(["card", "paypal", "partial_cod"]),
  // Credit card details (validated only if paymentMethod === "card")
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, addOrder } = useCartStore();

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 50;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "card",
    },
  });

  const selectedPaymentMethod = watch("paymentMethod");

  const onSubmit = async (data: CheckoutFormValues) => {
    // Simulate order placement
    const mockOrderData = {
      items: cart,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod:
        data.paymentMethod === "partial_cod"
          ? "Partial COD (10% Prepaid)"
          : data.paymentMethod === "paypal"
          ? "PayPal"
          : "Credit Card",
      shippingAddress: {
        fullName: data.fullName,
        email: data.email,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        phone: data.phone,
      },
    };

    // Add order to history
    const order = addOrder(mockOrderData);

    // Clear cart and redirect to success page
    clearCart();
    router.push(`/checkout/success?orderId=${order.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center text-xs font-semibold">
        <div className="bg-muted rounded-full p-4 mb-4">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-lg font-black uppercase text-foreground">Checkout is Empty</h1>
        <p className="text-xs text-muted-foreground mt-1">No items to checkout. Add items to cart first.</p>
        <button
          onClick={() => router.push("/shop")}
          className="mt-6 bg-foreground text-background hover:bg-foreground/90 text-xs font-bold py-3 px-8 rounded-md cursor-pointer"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  // Partial COD Calculations
  const codPrepaidAmount = total * 0.1;
  const codPayOnDeliveryAmount = total * 0.9;

  return (
    <div className="space-y-8 text-left text-xs font-semibold">
      <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">Secure Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Fields (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Customer Contact */}
          <div className="bg-background text-foreground border border-border p-6 rounded-md space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b">
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-muted-foreground mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. email@example.com"
                  {...register("email")}
                  className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${
                    errors.email ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-muted-foreground mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +1 555-0199"
                  {...register("phone")}
                  className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${
                    errors.phone ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Step 2: Shipping details */}
          <div className="bg-background text-foreground border border-border p-6 rounded-md space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b">
              2. Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-muted-foreground mb-1.5">Recipient Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  {...register("fullName")}
                  className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${
                    errors.fullName ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-muted-foreground mb-1.5">Street Address</label>
                <input
                  type="text"
                  placeholder="e.g. 123 Main Street, Apt 4B"
                  {...register("address")}
                  className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${
                    errors.address ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.address && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted-foreground mb-1.5">City</label>
                  <input
                    type="text"
                    placeholder="e.g. New York"
                    {...register("city")}
                    className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${
                      errors.city ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1.5">Postal / ZIP Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 10001"
                    {...register("postalCode")}
                    className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${
                      errors.postalCode ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.postalCode.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Payment select options */}
          <div className="bg-background text-foreground border border-border p-6 rounded-md space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b">
              3. Payment Method
            </h2>

            <div className="space-y-3">
              {/* Card selection option */}
              <label
                className={`flex items-start gap-3 p-4 border rounded-md cursor-pointer hover:bg-muted/30 transition-colors ${
                  selectedPaymentMethod === "card" ? "border-foreground bg-muted/20" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  value="card"
                  {...register("paymentMethod")}
                  className="mt-1 accent-accent"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="h-4 w-4 text-foreground" />
                    <span className="font-bold text-foreground">Credit / Debit Card</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Pay securely with Visa, Mastercard, or Amex.</p>

                  {/* Card input forms (Reveal conditionally) */}
                  {selectedPaymentMethod === "card" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
                      <div className="sm:col-span-3">
                        <label className="block text-muted-foreground mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          {...register("cardNumber")}
                          className="w-full bg-background text-foreground p-3 rounded-md border border-border focus:outline-none focus:border-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-muted-foreground mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          {...register("cardExpiry")}
                          className="w-full bg-background text-foreground p-3 rounded-md border border-border focus:outline-none focus:border-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-muted-foreground mb-1">CVC Code</label>
                        <input
                          type="text"
                          placeholder="123"
                          {...register("cardCvc")}
                          className="w-full bg-background text-foreground p-3 rounded-md border border-border focus:outline-none focus:border-foreground"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* PayPal Selection */}
              <label
                className={`flex items-start gap-3 p-4 border rounded-md cursor-pointer hover:bg-muted/30 transition-colors ${
                  selectedPaymentMethod === "paypal" ? "border-foreground bg-muted/20" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  value="paypal"
                  {...register("paymentMethod")}
                  className="mt-1 accent-accent"
                />
                <div>
                  <span className="font-bold text-foreground">PayPal</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Redirect to PayPal page to complete purchase.</p>
                </div>
              </label>

              {/* Partial COD Selection */}
              <label
                className={`flex items-start gap-3 p-4 border rounded-md cursor-pointer hover:bg-muted/30 transition-colors ${
                  selectedPaymentMethod === "partial_cod" ? "border-foreground bg-muted/20" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  value="partial_cod"
                  {...register("paymentMethod")}
                  className="mt-1 accent-accent"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">📦</span>
                    <span className="font-bold text-foreground">Partial Cash on Delivery (COD)</span>
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ml-auto">
                      Prepay 10%
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Reduce COD returns: pay <span className="font-bold text-foreground">10% prepaid</span> online today, and pay the remaining <span className="font-bold text-foreground">90% at delivery</span>.
                  </p>

                  {/* COD details panel */}
                  {selectedPaymentMethod === "partial_cod" && (
                    <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4 bg-muted/40 p-3 rounded-lg text-center">
                      <div className="border-r border-border/80">
                        <span className="text-[10px] text-muted-foreground">Pay Now (10%)</span>
                        <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{formatPrice(codPrepaidAmount)}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground">Pay at Delivery (90%)</span>
                        <p className="text-sm font-black text-foreground mt-0.5">{formatPrice(codPayOnDeliveryAmount)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Checkout Summary Card (Right Column) */}
        <aside className="bg-background text-foreground border border-border p-6 rounded-md h-fit space-y-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-foreground border-b pb-3 flex items-center gap-2">
            <Lock className="h-4 w-4" /> Checkout Summary
          </h2>

          {/* Mini items list */}
          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            {cart.map((item, index) => (
              <div key={index} className="flex gap-2.5 items-center justify-between text-[11px]">
                <div className="truncate flex-1 pr-2">
                  <span className="font-bold text-foreground">{item.product.name}</span>
                  <span className="text-muted-foreground ml-1">x{item.quantity}</span>
                  {item.selectedSize && <span className="text-muted-foreground ml-1">({item.selectedSize})</span>}
                </div>
                <span className="font-bold text-foreground">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-muted-foreground font-medium">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground font-medium">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground font-medium">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-foreground border-t border-border pt-3">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Place Order submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full mt-8 py-4 text-base font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : selectedPaymentMethod === "partial_cod" ? (
              `Pay ${formatPrice(codPrepaidAmount)} & Order`
            ) : (
              `Pay ${formatPrice(total)}`
            )}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground pt-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Secure 256-bit SSL checkout guarantee.</span>
          </div>
        </aside>
      </form>
    </div>
  );
}
