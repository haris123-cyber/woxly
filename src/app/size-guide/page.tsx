import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function SizeGuidePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6 text-left">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Produce & Portion Guide</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Size & Weight Guide</h1>
      </div>

      <div className="space-y-6 bg-background border border-border rounded-2xl p-8 shadow-sm">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Our produce is weighed and packaged to give you maximum freshness. Here is a handy portion reference:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="border border-border p-4 rounded-xl space-y-1">
            <h3 className="font-bold text-sm text-foreground">Leafy Greens</h3>
            <p className="text-xs text-muted-foreground">Standard bunch (~250g - 300g)</p>
          </div>
          <div className="border border-border p-4 rounded-xl space-y-1">
            <h3 className="font-bold text-sm text-foreground">Root Vegetables</h3>
            <p className="text-xs text-muted-foreground">Pack of 500g / 1kg options</p>
          </div>
          <div className="border border-border p-4 rounded-xl space-y-1">
            <h3 className="font-bold text-sm text-foreground">Fresh Fruits</h3>
            <p className="text-xs text-muted-foreground">Sold in 4-pack, 6-pack, or 1kg bags</p>
          </div>
          <div className="border border-border p-4 rounded-xl space-y-1">
            <h3 className="font-bold text-sm text-foreground">Dairy & Bakery</h3>
            <p className="text-xs text-muted-foreground">Standard 500ml / 1L / 400g loaves</p>
          </div>
        </div>
      </div>
    </div>
  );
}
