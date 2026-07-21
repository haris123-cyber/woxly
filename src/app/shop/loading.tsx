export default function ShopLoading() {
  return (
    <div className="flex gap-8 animate-pulse">
      {/* Sidebar skeleton */}
      <div className="hidden lg:block w-64 flex-shrink-0 space-y-4">
        <div className="h-6 bg-muted rounded w-24" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded w-full" />
        ))}
      </div>
      {/* Grid skeleton */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-muted rounded-2xl" />
            <div className="h-3 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
