"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Box
} from "lucide-react";
import { useCartStore, Order } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

// Profile Validation Schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone must be at least 8 digits"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function AccountContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { orders, wishlist, toggleWishlist, addToCart } = useCartStore();

  const activeTabParam = searchParams.get("tab") || "dashboard";
  const [activeTab, setActiveTab] = useState(activeTabParam);

  useEffect(() => {
    setActiveTab(activeTabParam);
  }, [activeTabParam]);

  const changeTab = (tab: string) => {
    router.push(`/account?tab=${tab}`);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  // React Hook Form for profile
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+1 555-0199",
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    // Simulate updating profile info
  };

  return (
    <div className="space-y-8 text-left text-xs font-semibold">
      <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Mobile Quick Actions */}
        <div className="md:hidden">

          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "orders", label: "My Orders", icon: ShoppingBag, badge: orders.length },
              { id: "wishlist", label: "Wishlist", icon: Heart, badge: wishlist.length },
              { id: "addresses", label: "Addresses", icon: MapPin },
              { id: "profile", label: "Profile", icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id)}
                  className={`relative flex items-center gap-3 rounded-2xl border px-4 py-4 transition-all
          ${isActive
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:bg-muted"
                    }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                  />

                  <span
                    className={`text-sm font-medium ${isActive ? "text-primary" : "text-foreground"
                      }`}
                  >
                    {tab.label}
                  </span>


                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Sidebar (Desktop only) */}
        <aside className="hidden md:block bg-background text-foreground border border-border px-5 p-4 rounded-md h-fit space-y-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: User },
            { id: "orders", label: "My Orders", icon: ShoppingBag, badge: orders.length },
            { id: "wishlist", label: "Wishlist", icon: Heart, badge: wishlist.length },
            { id: "profile", label: "Edit Profile", icon: User },
            { id: "addresses", label: "Saved Addresses", icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`w-full text-left py-3 px-4 rounded-md flex items-center gap-3 transition-colors cursor-pointer ${activeTab === tab.id
                  ? "bg-muted text-foreground font-bold"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`ml-auto text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center ${activeTab === tab.id ? "bg-foreground text-background" : "bg-muted text-foreground"
                      }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

        </aside>

        {/* Tab panels (Right Column) */}
        <div className="md:col-span-3">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="bg-background border border-border p-6 rounded-md space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary">
                  Welcome Back
                </span>

                <h2 className="mt-2 text-3xl font-black text-foreground">
                  Hello, John Doe 👋
                </h2>

                <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-7">
                  Manage your orders, wishlist, saved addresses and profile
                  information from one place. Continue shopping or track your
                  latest purchases below.
                </p>

                <div className="flex gap-3 mt-6">

                  <Link
                    href="/shop"
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                  >
                    Continue Shopping
                  </Link>

                  <Link
                    href="/track-order"
                    className="border border-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition"
                  >
                    Track Order
                  </Link>

                </div>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-border/80 p-4 rounded-md flex items-center gap-4 bg-muted/20">
                  <ShoppingBag className="h-8 w-8 text-foreground flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Total Orders</span>
                    <p className="text-lg font-black text-foreground">{orders.length}</p>
                  </div>
                </div>
                <div className="border border-border/80 p-4 rounded-md flex items-center gap-4 bg-muted/20">
                  <Heart className="h-8 w-8 text-foreground flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Wishlist Items</span>
                    <p className="text-lg font-black text-foreground">{wishlist.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-foreground mb-4">
                My Orders ({orders.length})
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-border rounded-md bg-background flex flex-col items-center justify-center gap-2">
                  <Box className="h-8 w-8 text-slate-400" />
                  <p className="text-xs font-semibold text-foreground mt-1">No Orders Placed Yet</p>
                  <Link
                    href="/shop"
                    className="mt-4 bg-foreground text-background hover:bg-foreground/90 text-xs font-bold py-3 px-6 rounded-md inline-block"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-background border border-border rounded-md overflow-hidden shadow-sm">
                    {/* Order metadata Header */}
                    <div className="bg-muted/30 px-4 py-3 border-b border-border/80 flex flex-wrap items-center justify-between gap-3 text-[10px] text-muted-foreground">
                      <div>
                        <span>Order Date: </span>
                        <span className="font-bold text-foreground">{order.date}</span>
                      </div>
                      <div>
                        <span>Order ID: </span>
                        <span className="font-bold text-foreground">{order.id}</span>
                      </div>
                      <span
                        className={`font-black uppercase tracking-wider px-2 py-0.5 rounded text-[8px] ${order.status === "Delivered"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : order.status === "Cancelled"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Order details body */}
                    <div className="p-4 space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center">
                          <div className="relative h-12 w-12 bg-muted rounded border overflow-hidden flex-shrink-0">
                            <Image
                              src={item.product.image || item.product.images[0]}
                              alt={item.product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-foreground truncate">{item.product.name}</h4>
                            <p className="text-[9px] text-muted-foreground mt-0.5">
                              Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`}
                            </p>
                          </div>
                          <span className="font-extrabold text-foreground">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      ))}

                      {/* Action buttons */}
                      <div className="pt-4 border-t border-border/60 flex items-center justify-between flex-wrap gap-3">
                        <div className="text-[11px]">
                          <span className="text-muted-foreground">Total: </span>
                          <span className="font-extrabold text-foreground">{formatPrice(order.total)}</span>
                        </div>
                        <Link
                          href={`/track-order?orderId=${order.id}`}
                          className="bg-foreground hover:bg-foreground/90 text-background text-[10px] font-bold py-2 px-4 rounded-md flex items-center gap-1"
                        >
                          Track Package
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-foreground mb-4">
                My Wishlist ({wishlist.length})
              </h2>

              {wishlist.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-border rounded-md bg-background flex flex-col items-center justify-center gap-2">
                  <Heart className="h-8 w-8 text-slate-400" />
                  <p className="text-xs font-semibold text-foreground mt-1">Your Wishlist is Empty</p>
                  <Link
                    href="/shop"
                    className="mt-4 bg-foreground text-background hover:bg-foreground/90 text-xs font-bold py-3 px-6 rounded-md inline-block"
                  >
                    Explore Shop
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map((product) => (
                    <div key={product.id} className="bg-background border border-border p-4 rounded-md flex gap-4 items-center shadow-sm">
                      <div className="relative h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0 border">
                        <Image
                          src={product.image || product.images[0]}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-foreground truncate hover:underline">
                          <Link href={`/product/${product.slug}`}>{product.name}</Link>
                        </h4>
                        <p className="text-foreground font-bold mt-0.5">{formatPrice(product.price)}</p>
                        <button
                          onClick={() => {
                            addToCart(product, 1, product.sizes?.[0] || "One Size", product.colors?.[0]?.name);
                            router.push("/cart");
                          }}
                          className="bg-foreground hover:bg-foreground/90 text-background text-[10px] font-bold px-3 py-1.5 rounded-md mt-2 cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="text-muted-foreground hover:text-red-500 p-2 rounded-md hover:bg-red-500/10 cursor-pointer flex-shrink-0"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile tab */}
          {activeTab === "profile" && (
            <div className="bg-background border border-border p-6 rounded-md space-y-6">
              <h2 className="text-sm font-black uppercase tracking-wider text-foreground border-b pb-3">
                Edit Profile Information
              </h2>

              {isSubmitSuccessful && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4 text-xs font-semibold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-muted-foreground mb-1.5">Full Name</label>
                    <input
                      type="text"
                      {...register("fullName")}
                      className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${errors.fullName ? "border-red-500" : "border-border"
                        }`}
                    />
                    {errors.fullName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-muted-foreground mb-1.5">Email Address</label>
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${errors.email ? "border-red-500" : "border-border"
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-muted-foreground mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className={`w-full bg-background text-foreground p-3 rounded-md border focus:outline-none focus:border-foreground ${errors.phone ? "border-red-500" : "border-border"
                        }`}
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone.message}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-foreground hover:bg-foreground/90 text-background font-bold py-3 px-6 rounded-md transition-all shadow-sm cursor-pointer text-xs uppercase tracking-wider"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="bg-background border border-border p-6 rounded-md space-y-6">
              <h2 className="text-sm font-black uppercase tracking-wider text-foreground border-b pb-3">
                Saved Addresses
              </h2>

              <div className="space-y-4">
                <div className="border border-border p-4 rounded-md relative text-left">
                  <span className="absolute top-3 right-3 bg-muted text-foreground text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded">
                    Default
                  </span>
                  <p className="font-bold text-foreground">John Doe</p>
                  <p className="text-muted-foreground mt-1 leading-relaxed">
                    123 Main Street, Apt 4B<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                  <p className="text-muted-foreground mt-2">Phone: +1 555-0199</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-20">
        <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-muted-foreground mt-2 font-bold">Synchronizing client portal...</p>
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}
