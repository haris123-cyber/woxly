"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, MailOpen } from "lucide-react";
import { MOCK_PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [inputVal, setInputVal] = useState(query);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    setInputVal(query);
    if (query.trim()) {
      const filtered = MOCK_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  const popularProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-8 text-left text-xs font-semibold">
      {/* Search Input Box */}
      <div className="max-w-xl mx-auto space-y-4">
        <h1 className="text-xl font-black uppercase tracking-wider text-center text-foreground">
          Search Products
        </h1>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search sneakers, clothing, accessories..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-card text-foreground text-sm pl-11 pr-4 py-3.5 rounded-full border border-border focus:border-accent focus:outline-none shadow-sm transition-all"
            />
          </div>
        </form>
      </div>

      {/* Query status titles */}
      {query && (
        <div className="border-b border-border pb-4">
          <p className="text-sm font-bold text-foreground">
            Search results for: <span className="text-accent">"{query}"</span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            We found {results.length} matching products.
          </p>
        </div>
      )}

      {/* Results grid or zero state */}
      {query && results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12 border border-dashed border-border rounded-3xl p-6 bg-card flex flex-col items-center gap-2">
          <MailOpen className="h-8 w-8 text-slate-400" />
          <h3 className="text-sm font-bold">No Results Found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-[280px] mx-auto">
            We couldn't find any products matching your query. Double check the spelling or explore other items.
          </p>
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground font-medium text-xs">
          Enter a search query to search through our catalog.
        </div>
      )}

      {/* Popular Recommendations Fallback (always helpful to keep converting) */}
      {(results.length === 0) && (
        <section className="space-y-6 pt-6">
          <h2 className="text-base font-black uppercase tracking-wider text-foreground">
            Popular Recommendations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {popularProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-20">
        <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-muted-foreground mt-2 font-bold">Searching database...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
