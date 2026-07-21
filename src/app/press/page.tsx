import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";

export default function PressPage() {
  const articles = [
    { title: "Woxly Raises $15M to Expand 15-Minute Grocery Delivery", date: "July 2026", outlet: "TechCrunch" },
    { title: "How Woxly is Empowering Local Organic Farmers", date: "June 2026", outlet: "Forbes" },
    { title: "The Sustainable Future of Ultrafast E-Commerce", date: "May 2026", outlet: "Wired" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Press & Media</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Woxly in the News</h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          Latest press releases, media coverage, and brand assets.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Recent Press Coverage</h2>
        <div className="grid gap-4">
          {articles.map((art, i) => (
            <div key={i} className="bg-background border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{art.outlet} • {art.date}</span>
                <h3 className="font-bold text-sm text-foreground">{art.title}</h3>
              </div>
              <Link href="/contact" className="self-start md:self-auto border border-border hover:bg-muted text-foreground text-xs font-bold px-5 py-2.5 rounded-xl transition-colors">
                Read Article
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
