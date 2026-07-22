"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function ProductCard({ product, priority = false }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const wishlist = useCartStore((s) => s.wishlist);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted ? wishlist.some((p) => p.id === product.id) : false;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const isApiProduct = String(product.id).startsWith("api-");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const size = product.sizes?.[0] || "One Size";
    const color = product.colors?.[0]?.name;
    addToCart(product, 1, size, color);
    router.push("/cart");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const imageClass = `transition-transform duration-300 pointer-events-none ${
    isApiProduct ? "object-contain p-4 bg-white" : "object-cover"
  } ${isHovered ? "scale-105" : "scale-100"}`;

  return (
    <div
      className="group relative flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image and Overlay Controls */}
      <div className="relative aspect-square w-full bg-muted rounded-2xl overflow-hidden mb-3">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {discountPercent && (
            <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.featured && (
            <span className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border border-border/10">
              Popular
            </span>
          )}
          {!product.inStock && (
            <span className="bg-zinc-800 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          suppressHydrationWarning
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors duration-200 cursor-pointer ${
            isWishlisted
              ? "bg-white text-red-500 shadow-sm"
              : "bg-white text-muted-foreground hover:text-foreground shadow-sm"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Product Main Image */}
        <Link href={`/product/${product.slug}`} className="relative block h-full w-full">
          {product.image || (product.images && product.images.length > 0) ? (
            <Image
              src={product.image || product.images[0]}
              alt={product.name || "Product Image"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={imageClass}
              priority={priority}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/50 text-muted-foreground">
              <span className="text-[10px] font-bold uppercase tracking-wider">No Image</span>
            </div>
          )}
        </Link>

        {/* Desktop Quick Actions Overlay */}
        <div
          className={`absolute bottom-4 left-0 right-0 z-10 px-4 hidden md:flex gap-2 justify-center transition-all duration-200 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <button
            suppressHydrationWarning
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-colors disabled:bg-zinc-400 disabled:cursor-not-allowed cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="bg-background hover:bg-muted text-foreground border border-border p-2.5 rounded-xl shadow-lg flex items-center justify-center transition-colors"
            aria-label="View Details"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Info Details Section */}
      <div className="flex flex-col flex-grow text-left">
        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
          {product.category}
        </span>

        <h3 className="text-xs font-bold tracking-wide mt-1 line-clamp-1 group-hover:text-muted-foreground transition-colors">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm font-extrabold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Add to Cart */}
          <button
            suppressHydrationWarning
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="md:hidden bg-primary text-primary-foreground hover:bg-primary/90 p-2 rounded-xl transition-colors disabled:bg-zinc-400 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
