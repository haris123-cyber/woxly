import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6 text-left">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Delivery Information</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Shipping & Delivery Policy</h1>
      </div>

      <div className="space-y-6 bg-background border border-border rounded-2xl p-8 shadow-sm">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-foreground">1. Express 15-Minute Delivery</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All fresh grocery orders placed within our local hub zones are dispatched immediately via eco-friendly electric bikes and delivered to your doorstep in 15-30 minutes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-foreground">2. Delivery Fees</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Orders over $35 receive FREE delivery. Orders under $35 incur a flat $2.99 local delivery fee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-foreground">3. Real-Time Tracking</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Once your order is confirmed, track your courier in real-time via the <Link href="/track-order" className="text-primary underline font-bold">Track Order</Link> page.
          </p>
        </section>
      </div>
    </div>
  );
}
