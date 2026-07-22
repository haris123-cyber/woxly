"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, ChevronDown, RefreshCw, X, Star, Search } from "lucide-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search/URL Query Parameters
  const initialCategory = searchParams.get("category") || "All Products";
  const searchQuery = searchParams.get("q") || "";

  // Core Filter states
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");

  // Mobile drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch API products on mount
  useEffect(() => {
    async function fetchApiProducts() {
      try {
        const res = await fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json", { cache: "force-cache" });
        const data = await res.json();
        
        const mappedProducts: Product[] = data.map((apiProd: any) => ({
          id: `api-${apiProd.id}`,
          name: apiProd.name || apiProd.title || "Product",
          slug: `api-${apiProd.id}`,
          price: (apiProd.priceCents / 100) || apiProd.price || 0,
          rating: apiProd.rating?.stars || apiProd.rating?.rate || 4.5,
          reviewCount: apiProd.rating?.count || Math.floor(Math.random() * 200),
          description: apiProd.description,
          images: [apiProd.image],
          image: apiProd.image,
          category: apiProd.category,
          inStock: true,
          stockCount: 50,
          details: ["API Product", "Fetched dynamically", "Free shipping"],
          specs: [{ name: "Category", value: apiProd.category }],
          vendor: "API Partner"
        }));
        
        setAllProducts([...MOCK_PRODUCTS, ...mappedProducts]);
      } catch (error) {
        console.error("Failed to fetch API products", error);
      }
    }
    fetchApiProducts();
  }, []);

  // Sync Category from search parameters
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);
 
  // Lock body scroll when mobile filters are open
  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const brandsList = Array.from(new Set(allProducts.map(p => p.vendor).filter(Boolean))) as string[];

  // Dynamic Categories
  const categoriesMap = new Map<string, number>();
  allProducts.forEach(p => {
    categoriesMap.set(p.category, (categoriesMap.get(p.category) || 0) + 1);
  });
  const dynamicCategories = [
    { name: "All Products", count: allProducts.length },
    ...Array.from(categoriesMap.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
  ];

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory("All Products");
    setPriceRange([0, 300]);
    setSelectedBrands([]);
    setMinRating(null);
    setSortBy("featured");
    router.push("/shop");
  };

  // Filter Logic
  const filteredProducts = allProducts.filter((product) => {
    // Category check
    if (
      selectedCategory !== "All Products" &&
      product.category.toLowerCase() !== selectedCategory.toLowerCase()
    ) {
      return false;
    }

    // Search query check
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Price check
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Brand check
    if (selectedBrands.length > 0) {
      const matchBrand = selectedBrands.some(
        (brand) =>
          product.vendor?.toLowerCase() === brand.toLowerCase()
      );
      if (!matchBrand) return false;
    }

    // Rating check
    if (minRating !== null && product.rating < minRating) {
      return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // Default Featured: original array index
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-left border-b border-border/50 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">
            {selectedCategory === "All Products" ? "All Products" : selectedCategory}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Showing 1–{sortedProducts.length} of {allProducts.length} products
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-4 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-start mt-4 sm:mt-0">
          <button
            suppressHydrationWarning
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-1.5 border border-border px-3.5 py-2 rounded-md text-xs font-semibold bg-background text-foreground cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-background text-foreground text-xs font-bold px-2 py-1 focus:outline-none cursor-pointer border-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground font-semibold">Show:</span>
            <select className="bg-background text-foreground text-xs font-bold px-2 py-1 focus:outline-none cursor-pointer border-none">
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop only) */}
        <aside className="hidden md:block space-y-6 text-xs font-semibold text-left">
          {/* Categories Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-foreground">
              Categories
            </h3>
            <div className="flex flex-col gap-1">
              {dynamicCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left py-2 px-3 rounded-md transition-colors flex justify-between items-center cursor-pointer ${selectedCategory === cat.name
                    ? "bg-muted text-foreground font-bold"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                >
                  <span className="text-xs">{cat.name}</span>
                  <span className="text-[10px] opacity-70">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-bold text-foreground">
              Filters
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-foreground">Price Range</h4>
              <div className="pt-2 px-1">
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-3 font-semibold">
                  <span>{formatPrice(0)}</span>
                  <span className="text-foreground">{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold text-foreground">
              Brands
            </h3>
            <div className="flex flex-col gap-3">
              {brandsList.map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary"
                  />
                  <span className="text-xs text-muted-foreground hover:text-foreground font-medium">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold text-foreground">
              Rating
            </h3>
            <div className="flex flex-col gap-3">
              {[5, 4, 3, 2, 1].map((ratingVal) => (
                <button
                  key={ratingVal}
                  onClick={() => setMinRating(minRating === ratingVal ? null : ratingVal)}
                  className={`flex items-center gap-2 text-left w-full hover:underline transition-colors font-medium ${minRating === ratingVal ? "font-bold" : "text-muted-foreground"
                    }`}
                >
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < ratingVal ? "fill-current" : "text-border"}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] opacity-70">({ratingVal * 12})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={handleResetFilters}
            className="w-full border border-border hover:bg-muted text-foreground py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Reset Filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="md:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center justify-center border border-dashed border-border rounded-3xl p-6 bg-card gap-2">
              <Search className="h-8 w-8 text-slate-400" />
              <h3 className="text-sm font-bold mt-2">No Products Found</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
                We couldn't find any products matching your filters. Try resetting your filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold py-2.5 px-6 rounded-xl cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 4} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-xs bg-background text-foreground border-r border-border flex flex-col shadow-2xl h-full animate-slide-up">
              <div className="px-4 py-6 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-wider">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 -mr-2 text-muted-foreground hover:text-foreground rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 text-xs font-semibold text-left">
                {/* Category */}
                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider border-b pb-2">
                    Categories
                  </h3>
                  <div className="flex flex-col gap-1.5 pt-1.5">
                    {dynamicCategories.map((cat) => (
                      <button
                        key={cat.name}
                        suppressHydrationWarning
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          setMobileFiltersOpen(false);
                        }}
                        className={`w-full text-left py-2 px-2.5 rounded-lg flex justify-between items-center cursor-pointer ${selectedCategory === cat.name
                          ? "bg-primary text-primary-foreground font-bold"
                          : "hover:bg-muted text-muted-foreground"
                          }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[9px] opacity-80">({cat.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider border-b pb-2">
                    Price Range
                  </h3>
                  <div className="pt-2 px-1">
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-2">
                      <span>Min: {formatPrice(priceRange[0])}</span>
                      <span>Max: {formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider border-b pb-2">
                    Brands
                  </h3>
                  <div className="flex flex-col gap-2 pt-1.5">
                    {brandsList.map((brand) => (
                      <label key={brand} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="h-4 w-4 rounded border-border text-primary cursor-pointer"
                        />
                        <span className="text-muted-foreground font-medium">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider border-b pb-2">
                    Rating
                  </h3>
                  <div className="flex flex-col gap-2.5 pt-1.5">
                    {[5, 4, 3].map((ratingVal) => (
                      <button
                        key={ratingVal}
                        suppressHydrationWarning
                        onClick={() => {
                          setMinRating(minRating === ratingVal ? null : ratingVal);
                          setMobileFiltersOpen(false);
                        }}
                        className={`flex items-center gap-2 text-left w-full font-medium ${minRating === ratingVal ? "text-accent font-bold" : "text-muted-foreground"
                          }`}
                      >
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < ratingVal ? "fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span>{ratingVal === 5 ? "5 Stars" : `${ratingVal} Stars & Up`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border bg-card">
                <button
                  suppressHydrationWarning
                  onClick={() => {
                    handleResetFilters();
                    setMobileFiltersOpen(false);
                  }}
                  className="w-full border border-border hover:bg-muted text-foreground py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-20 flex flex-col items-center justify-center">
        <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground mt-2 font-bold">Loading store...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
