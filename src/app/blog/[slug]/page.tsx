"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, User, MessageSquare, XCircle } from "lucide-react";
import { MOCK_BLOGS } from "@/data/blogs";

export default function BlogDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = typeof rawSlug === "string" ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] : "";
  const post = MOCK_BLOGS.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center text-xs font-semibold gap-2">
        <XCircle className="h-8 w-8 text-red-500" />
        <h1 className="text-lg font-black uppercase text-foreground mt-2">Article Not Found</h1>
        <p className="text-xs text-muted-foreground mt-1">The blog article you are looking for does not exist.</p>
        <Link
          href="/blog"
          className="mt-6 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold py-2.5 px-6 rounded-xl"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-left text-xs font-semibold">
      {/* Back button */}
      <Link
        href="/blog"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs font-bold self-start"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Articles
      </Link>

      {/* Main article content card */}
      <article className="bg-card text-card-foreground border border-border p-5 sm:p-8 rounded-3xl space-y-6 shadow-sm">
        {/* Article metadata Header */}
        <div className="space-y-4">
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-muted-foreground text-[10px] pb-4 border-b border-border/80">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>By {post.author}</span>
            </div>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Feature image banner */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted border">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        {/* Body content prose */}
        <div className="text-sm text-muted-foreground leading-relaxed space-y-4 font-medium pt-2">
          <p>{post.content}</p>
          <p>
            Curating items that match your daily lifestyles isn't just about fashion. It's about finding that intersection where technology meets design and creates pure aesthetic utility. From shoes that have large supportive air bubbles to cotton hoodies that are double-layered for durability, our details are built to withstand the test of modern everyday use.
          </p>
        </div>
      </article>

      {/* Comments section */}
      <div className="bg-card border border-border p-5 sm:p-8 rounded-3xl space-y-6">
        <h3 className="text-xs font-black uppercase tracking-wider text-foreground border-b pb-3 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-accent" /> Comments (1)
        </h3>

        <div className="space-y-4">
          <div className="bg-muted/40 p-4 rounded-xl text-left border">
            <div className="flex justify-between items-center text-[10px] text-muted-foreground mb-1.5">
              <span className="font-bold text-foreground">Robert Lee</span>
              <span>2 days ago</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Excellent insights! The breakdown of minimalist wardrobe essentials makes curating everyday outfits much easier. Quality over quantity always wins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
