import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6 text-left">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Privacy & Tech</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Cookie Policy</h1>
      </div>

      <div className="space-y-6 bg-background border border-border rounded-2xl p-8 shadow-sm text-xs text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-foreground">How We Use Cookies</h2>
          <p>
            Woxly uses essential cookies to save your shopping cart, maintain your session login state, and remember your theme preferences. We do not sell your personal data to third parties.
          </p>
        </section>
      </div>
    </div>
  );
}
