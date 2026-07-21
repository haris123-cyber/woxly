import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    { q: "How fast is Woxly delivery?", a: "We deliver within 15 to 30 minutes for standard local orders in participating regions." },
    { q: "Where do you source your produce?", a: "Our fruits and vegetables are sourced daily directly from certified organic local farms." },
    { q: "What is your return/replacement policy?", a: "If any item arrives damaged or unsatisfactory, request a replacement within 24 hours in your account for an instant refund or reshipment." },
    { q: "Is there a minimum order amount?", a: "No minimum order requirement! Orders above $35 qualify for free delivery." },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6 text-left">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Help Center</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Frequently Asked Questions</h1>
      </div>

      <div className="grid gap-4">
        {faqs.map((item, i) => (
          <div key={i} className="bg-background border border-border rounded-2xl p-6 space-y-2 shadow-sm">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary shrink-0" />
              {item.q}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed pl-6">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
