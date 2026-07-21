import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6 text-left">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Customer Satisfaction</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Returns & Replacements</h1>
      </div>

      <div className="space-y-6 bg-background border border-border rounded-2xl p-8 shadow-sm">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-foreground">100% Freshness Guarantee</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Due to the perishable nature of fresh produce, we offer instant replacements or store credits for any items that arrive damaged, incorrect, or below your expectations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-foreground">How to Request a Replacement</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Go to your <Link href="/account" className="text-primary underline font-bold">Account Orders</Link>, select your recent order, and click &ldquo;Request Replacement&rdquo; within 24 hours of delivery.
          </p>
        </section>
      </div>
    </div>
  );
}
