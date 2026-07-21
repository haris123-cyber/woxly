export default function ProductLoading() {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 animate-pulse">
      {/* Gallery skeleton */}
      <div className="w-full md:w-1/2">
        <div className="aspect-square bg-muted rounded-3xl" />
        <div className="flex gap-3 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-16 h-16 bg-muted rounded-xl flex-shrink-0" />
          ))}
        </div>
      </div>
      {/* Details skeleton */}
      <div className="flex-1 space-y-4 pt-2">
        <div className="h-4 bg-muted rounded w-20" />
        <div className="h-8 bg-muted rounded w-3/4" />
        <div className="h-6 bg-muted rounded w-24" />
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
          <div className="h-3 bg-muted rounded w-4/6" />
        </div>
        <div className="h-12 bg-muted rounded-xl w-full mt-6" />
      </div>
    </div>
  );
}
