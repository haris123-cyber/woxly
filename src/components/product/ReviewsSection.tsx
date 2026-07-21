"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, ShieldCheck, CheckCircle2, X } from "lucide-react";
import { Review } from "@/data/products";

// Zod validation schema for writing a review
const reviewSchema = z.object({
  author: z.string().min(2, "Name must be at least 2 characters"),
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
}

export default function ReviewsSection({ reviews: initialReviews, rating }: ReviewsSectionProps) {
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [writeOpen, setWriteOpen] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const selectedRating = watch("rating");

  const onSubmit = (data: ReviewFormValues) => {
    const newReview: Review = {
      id: `r-${Date.now()}`,
      author: data.author,
      rating: data.rating,
      date: new Date().toISOString().split("T")[0],
      title: data.title,
      content: data.content,
      verified: true,
    };
    setReviewsList([newReview, ...reviewsList]);
    setWriteOpen(false);
    reset();
  };

  const filteredReviews = filterRating
    ? reviewsList.filter((r) => r.rating === filterRating)
    : reviewsList;

  // Calculate rating breakdown distribution
  const totalReviewsCount = reviewsList.length;
  const starDistribution = Array.from({ length: 5 }).map((_, idx) => {
    const stars = 5 - idx;
    const count = reviewsList.filter((r) => r.rating === stars).length;
    const percent = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
    return { stars, count, percent };
  });

  return (
    <div className="bg-card text-card-foreground border border-border/80 rounded-2xl p-5 sm:p-8 shadow-sm transition-colors duration-200">
      <h3 className="text-base font-extrabold uppercase tracking-wider mb-6">Customer Reviews</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 pb-8 border-b border-border">
        {/* Average summary */}
        <div className="flex flex-col items-center justify-center text-center p-4 bg-muted/40 rounded-xl border border-border">
          <p className="text-4xl font-black text-foreground">{rating.toFixed(1)}</p>
          <div className="flex text-amber-500 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(rating) ? "fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">
            Based on {reviewsList.length} reviews
          </p>
          <button
            onClick={() => setWriteOpen(true)}
            className="mt-4 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Breakdown bars */}
        <div className="lg:col-span-2 space-y-2 flex flex-col justify-center">
          {starDistribution.map((dist) => (
            <button
              key={dist.stars}
              onClick={() => setFilterRating(filterRating === dist.stars ? null : dist.stars)}
              className={`flex items-center gap-3 w-full text-left p-1 rounded hover:bg-muted/40 transition-colors text-xs font-medium ${
                filterRating === dist.stars ? "bg-muted/65" : ""
              }`}
            >
              <span className="w-10 text-right">{dist.stars} Star</span>
              <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${dist.percent}%` }}
                />
              </div>
              <span className="w-8 text-right text-muted-foreground">{dist.count}</span>
            </button>
          ))}
          {filterRating && (
            <button
              onClick={() => setFilterRating(null)}
              className="text-accent hover:underline text-xs self-start mt-2 font-bold cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <p className="text-center py-6 text-xs text-muted-foreground font-medium">
            No reviews matching this star rating filter.
          </p>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{rev.author}</span>
                  {rev.verified && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <ShieldCheck className="h-3 w-3" /> Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">{rev.date}</span>
              </div>
              <div className="flex text-amber-500 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < rev.rating ? "fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <h4 className="text-xs font-bold text-foreground mt-2">{rev.title}</h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{rev.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Write Review Modal */}
      {writeOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setWriteOpen(false)}
          />
          <div className="relative bg-card text-card-foreground border border-border w-full max-w-lg rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] animate-fade-in-scale">
            <button
              onClick={() => setWriteOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground rounded-lg p-1.5 hover:bg-muted"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-sm font-black uppercase tracking-wider mb-6">Write a Review</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-muted-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  {...register("author")}
                  className={`w-full bg-muted text-foreground p-3 rounded-lg border focus:outline-none focus:border-accent ${
                    errors.author ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.author && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.author.message}</p>}
              </div>

              <div>
                <label className="block text-muted-foreground mb-1.5">Rating</label>
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const stars = i + 1;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setValue("rating", stars)}
                        className="text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Select ${stars} stars`}
                      >
                        <Star
                          className={`h-6 w-6 ${
                            stars <= selectedRating ? "fill-current" : "text-gray-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground mb-1.5">Review Title</label>
                <input
                  type="text"
                  placeholder="e.g. Very comfortable and sleek"
                  {...register("title")}
                  className={`w-full bg-muted text-foreground p-3 rounded-lg border focus:outline-none focus:border-accent ${
                    errors.title ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.title && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-muted-foreground mb-1.5">Review Content</label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you liked or disliked about this product..."
                  {...register("content")}
                  className={`w-full bg-muted text-foreground p-3 rounded-lg border focus:outline-none focus:border-accent resize-none ${
                    errors.content ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.content && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.content.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-bold py-3 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" /> Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
