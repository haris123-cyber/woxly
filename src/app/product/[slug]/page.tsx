"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Star, Heart, ShieldCheck, ChevronRight } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import ProductGallery from "@/components/product/ProductGallery";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import FrequentlyBoughtTogether from "@/components/product/FrequentlyBoughtTogether";
import ReviewsSection from "@/components/product/ReviewsSection";
import ProductCard from "@/components/product/ProductCard";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: React.Usable<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const { addToCart, toggleWishlist, wishlist } = useCartStore();

  // Find product by slug
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  // States for purchase options
  const [selectedSize, setSelectedSize] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState<"description" | "specs" | "shipping">("description");

  // Sync default options when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || "One Size");
      setSelectedColor(product.colors?.[0]?.name || "");
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center">
        <span className="text-4xl">❌</span>
        <h1 className="text-lg font-black mt-4 uppercase">Product Not Found</h1>
        <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
          The product you are looking for does not exist or has been removed from our catalog.
        </p>
        <Link
          href="/shop"
          className="mt-6 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold py-2.5 px-6 rounded-xl"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some((p) => p.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  // Find related products (same category, excluding current)
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // Calculate discount percentage if original price exists
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground text-left">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-foreground transition-colors">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground truncate max-w-[180px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* Main product summary columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="space-y-6">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Right Column: Checkout Info Form */}
        <div className="space-y-6 text-left text-xs font-semibold">
          {/* Header titles & ratings */}
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mt-1">
                {product.name}
              </h1>
              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2 rounded-full transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isWishlisted
                    ? "bg-red-50 text-red-500 scale-105"
                    : "bg-muted hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-[10px] font-medium">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-center gap-3 pb-4">
            <span className="text-2xl font-black text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through font-medium">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Description brief */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Stock status indicator */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${product.inStock ? "bg-emerald-500" : "bg-red-500 animate-ping"}`} />
              <span className="text-xs font-bold text-foreground">
                {product.inStock
                  ? product.stockCount <= 5
                    ? `Only ${product.stockCount} left in stock! Order soon.`
                    : "In Stock & Ready to Ship"
                  : "Out of Stock"}
              </span>
            </div>
            {/* Live views indicator */}
            <p className="text-[10px] text-muted-foreground/80 font-medium">
              🔥 <span className="text-foreground font-bold">15 people</span> are viewing this product right now
            </p>
          </div>

          {/* Configuration swatches */}
          <div className="space-y-5 pt-2">
            {/* Color Swatch */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-xs text-foreground font-bold">
                  Color: <span className="text-muted-foreground font-medium">{selectedColor}</span>
                </span>
                <div className="flex gap-2.5 mt-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                        selectedColor === c.name ? "border-foreground ring-1 ring-offset-2 ring-foreground" : "border-border"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select color ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Swatch */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground font-bold">
                    Size: <span className="text-muted-foreground font-medium">{selectedSize}</span>
                  </span>
                  <button className="text-[10px] text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-h-[40px] min-w-[40px] border rounded-md font-semibold flex items-center justify-center transition-all cursor-pointer text-xs ${
                        selectedSize === size
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background border-border hover:border-muted-foreground text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-foreground font-bold">Quantity</label>
                <div className="flex items-center border border-border rounded-md bg-background overflow-hidden h-10 w-32 flex-shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 hover:bg-muted text-muted-foreground hover:text-foreground h-full transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold text-xs text-center w-full">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 hover:bg-muted text-muted-foreground hover:text-foreground h-full transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-foreground hover:bg-foreground/90 text-background text-xs font-bold py-3.5 rounded-md transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  Add to Cart - {formatPrice(product.price)}
                </button>
                
                {/* Buy Now */}
                <button
                  disabled={!product.inStock}
                  className="w-full bg-background border border-foreground hover:bg-muted text-foreground text-xs font-bold py-3.5 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-muted disabled:text-muted-foreground disabled:border-border disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Live views indicator */}
          <p className="text-[10px] text-muted-foreground font-medium flex items-center justify-center gap-2 pt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-bold text-foreground">15 people</span> are viewing this right now
          </p>

          {/* Value Propositions */}
          <div className="pt-2 flex justify-center gap-6 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="text-foreground">🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-foreground">🔄</span>
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-foreground">🛡️</span>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="text-left border-t border-border mt-12 pt-8">
        {/* Tabs Headers */}
        <div className="flex gap-6 text-[11px] font-bold">
          {["description", "specs", "shipping"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-2 transition-all cursor-pointer capitalize ${
                activeTab === tab
                  ? "border-b-2 border-foreground text-foreground"
                  : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "specs" ? "Specifications" : tab === "reviews" ? `Reviews (${product.reviewCount})` : tab === "shipping" ? "Shipping & Returns" : tab}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="py-6 text-xs text-muted-foreground leading-relaxed font-semibold">
          {activeTab === "description" && (
            <div className="space-y-4">
              <p>{product.longDescription || product.description}</p>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-md">
              <table className="w-full border-collapse">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.name} className="border-b border-border last:border-b-0">
                      <td className="py-2.5 font-bold text-foreground w-1/3">{spec.name}</td>
                      <td className="py-2.5 text-muted-foreground">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-2">
              <p className="font-bold text-foreground">Fast, Reliable Standard Shipping</p>
              <p>All items are processed within 1-2 business days. Shipping times range between 3-5 business days depending on location.</p>
              <p className="font-bold text-foreground mt-4">Hassle-Free Returns</p>
              <p>We want you to love your purchase. If you're not entirely satisfied, returns are accepted within 30 days of delivery. Prepaid return labels are provided.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 text-left border-t border-border pt-12">
          <h2 className="text-sm font-bold text-foreground">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Floating Sticky Add to Cart */}
      <StickyAddToCart
        product={product}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}
