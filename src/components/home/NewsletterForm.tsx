"use client";

export default function NewsletterForm() {
  return (
    <form
      className="mt-8 flex w-full max-w-md mx-auto relative"
      onSubmit={(e) => e.preventDefault()}
      suppressHydrationWarning
    >
      <input
        type="email"
        placeholder="you@company.com"
        suppressHydrationWarning
        className="w-full bg-background border border-border rounded-full py-4 pl-6 pr-32 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
      />
      <button
        type="submit"
        suppressHydrationWarning
        className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold px-6 rounded-full transition-all"
      >
        Subscribe
      </button>
    </form>
  );
}
