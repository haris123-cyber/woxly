export default function CheckoutLoading() {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_380px] gap-10 animate-pulse">
      <div className="space-y-6">
        <div className="h-6 bg-muted rounded w-40" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 bg-muted rounded-xl" />
        ))}
        <div className="h-12 bg-primary/20 rounded-xl w-full mt-4" />
      </div>
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-32" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-14 h-14 bg-muted rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
