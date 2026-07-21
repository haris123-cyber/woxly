import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowRight } from "lucide-react";
import { MOCK_BLOGS } from "@/data/blogs";

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col gap-16 py-8 md:py-16 text-foreground max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Woxly Journal</span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
          The <span className="italic font-light text-accent">Daily</span> Edit
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
          Insights, recipes, and lifestyle guides curated for everyday living.
        </p>
      </div>

      {/* Grid of posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MOCK_BLOGS.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col bg-card border border-border/50 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full bg-muted overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Tags overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-widest">
                <span>{post.date}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="pt-6 mt-auto flex items-center justify-between text-xs text-muted-foreground font-medium border-t border-border/50">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-accent font-bold group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
