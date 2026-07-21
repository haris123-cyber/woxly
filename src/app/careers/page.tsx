import Link from "next/link";
import { ArrowLeft, Briefcase, CheckCircle2 } from "lucide-react";

export default function CareersPage() {
  const positions = [
    { title: "Senior Frontend Engineer (Next.js)", dept: "Engineering", type: "Remote / Full-time" },
    { title: "Supply Chain Manager", dept: "Operations", type: "On-site / Full-time" },
    { title: "UI/UX Product Designer", dept: "Design", type: "Hybrid / Full-time" },
    { title: "Customer Delight Specialist", dept: "Support", type: "Remote / Full-time" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Join Our Team</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Build the Future of Fast Groceries</h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          We&apos;re on a mission to redefine local delivery with sustainable practices, fresh local produce, and lightning-fast fulfillment.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Open Positions</h2>
        <div className="grid gap-4">
          {positions.map((pos, i) => (
            <div key={i} className="bg-background border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-foreground">{pos.title}</h3>
                <div className="flex gap-3 text-xs text-muted-foreground font-medium">
                  <span>{pos.dept}</span>
                  <span>•</span>
                  <span>{pos.type}</span>
                </div>
              </div>
              <Link href="/contact" className="self-start md:self-auto bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold px-5 py-2.5 rounded-xl transition-all">
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
