"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  Zap,
  Home,
  Compass,
  Tag,
  FileText,
  Phone
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { MOCK_PRODUCTS, Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function Header() {
  const router = useRouter();
  const { cart, theme, toggleTheme, setCartOpen, wishlist } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search autocomplete states
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Total cart items count (guarded with mounted to prevent hydration mismatch with localStorage)
  const cartItemCount = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  useEffect(() => {
    setMounted(true);
    // Apply theme from store on mount
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Handle outside click for search suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update suggestions on search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 1) {
      const filtered = MOCK_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // limit to 5 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (slug: string) => {
    router.push(`/product/${slug}`);
    setSearchQuery("");
    setShowSuggestions(false);
  };


  return (
    <>
      <header className="sticky top-0 z-40 w-full  bg-primary text-primary-foreground border-b border-primary/10 transition-colors duration-200">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4 lg:gap-8">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-primary-foreground rounded-lg hover:bg-primary-foreground/10 focus:outline-none"
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="text-2xl font-black tracking-wider flex items-center gap-2">
              <ShoppingBag className="h-7 w-7 text-accent" />
              Woxly
            </Link>
          </div>

          {/* Desktop Search Bar (Centered & Large) */}
          <div ref={autocompleteRef} className="relative hidden md:block flex-1 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} suppressHydrationWarning>
              <div className="relative flex items-center bg-white rounded-full shadow-sm overflow-hidden border-2 border-transparent focus-within:border-accent transition-colors" suppressHydrationWarning>
                <input
                  type="search"
                  suppressHydrationWarning
                  placeholder="Search for Grocery, Stores, Vegetable or Meat..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                  className="w-full bg-transparent text-gray-900 text-sm pl-6 pr-12 py-3.5 focus:outline-none placeholder:text-gray-500 font-medium"
                />
                <button type="submit" aria-label="Search" suppressHydrationWarning className="absolute right-4 text-gray-400 hover:text-gray-700 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Suggestions Box */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-14 left-0 z-50 w-full bg-card text-card-foreground border border-border rounded-xl shadow-2xl overflow-hidden py-2 animate-fade-in-scale">
                <p className="text-[10px] text-muted-foreground px-4 py-1.5 uppercase font-bold tracking-wider">
                  Suggestions
                </p>
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => selectSuggestion(product.slug)}
                    className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-muted transition-colors duration-150"
                  >
                    <div className="relative h-10 w-10 bg-muted rounded overflow-hidden flex-shrink-0 border">
                      <Image
                        src={product.image || product.images[0]}
                        alt={product.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold truncate text-foreground">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="ml-auto text-xs font-bold text-accent">
                      {formatPrice(product.price)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-primary-foreground tracking-wide">
              <Zap className="h-4 w-4 text-accent fill-accent" />
              <span>Order now and get it within <span className="text-accent">15 min!</span></span>
            </div>

            <div className="flex items-center gap-3">
              {/* Auth Links */}
              <div className="hidden sm:flex items-center gap-3 mr-2 border-r border-primary-foreground/20 pr-4">

                <Link href="/login" className="text-sm font-bold bg-accent text-accent-foreground px-4 py-2 rounded-full shadow-sm hover:bg-accent/90 transition-all">
                  Login
                </Link>
              </div>

              <button
                suppressHydrationWarning
                onClick={() => setCartOpen(true)}
                className="relative hidden sm:flex items-center justify-center h-10 w-10 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
                aria-label="Open Cart"
              >
                <ShoppingBag className="h-5 w-5 text-primary" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-primary">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Avatar */}
              <Link href="/account" className="h-10 w-10 bg-accent rounded-full border-2 border-white/20 overflow-hidden hidden sm:flex items-center justify-center hover:opacity-90 transition-opacity">
                <User className="h-5 w-5 text-accent-foreground" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide-out Sidebar Navigation Drawer */}
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div
            className={`absolute top-0 left-0 bottom-0 w-[300px] bg-background shadow-2xl transition-transform duration-300 transform flex flex-col ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black tracking-wider flex items-center gap-2 text-primary">
                <ShoppingBag className="h-6 w-6 text-accent" />
                Woxly
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
                aria-label="Close Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
              <p className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Navigation</p>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted font-semibold text-sm text-foreground transition-colors"
              >
                <Home className="h-5 w-5 text-muted-foreground" />
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted font-semibold text-sm text-foreground transition-colors"
              >
                <Compass className="h-5 w-5 text-muted-foreground" />
                Shop All
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted font-semibold text-sm text-foreground transition-colors"
              >
                <FileText className="h-5 w-5 text-muted-foreground" />
                About Us
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted font-semibold text-sm text-foreground transition-colors"
              >
                <FileText className="h-5 w-5 text-muted-foreground" />
                Blog
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted font-semibold text-sm text-foreground transition-colors"
              >
                <Phone className="h-5 w-5 text-muted-foreground" />
                Contact
              </Link>

              <div className="h-px bg-border/50 my-4 mx-3" />
              <p className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Categories</p>

              {["Vegetable", "Snacks & Breads", "Fruits", "Chicken legs", "Milk & Dairy"].map((cat) => (
                <Link
                  key={cat}
                  href={`/shop?category=${encodeURIComponent(cat)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted font-medium text-sm text-foreground transition-colors"
                >
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {cat}
                </Link>
              ))}

              <div className="h-px bg-border/50 my-4 mx-3" />

              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted font-semibold text-sm text-foreground transition-colors mt-2"
              >
                <User className="h-5 w-5 text-muted-foreground" />
                Account
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border md:hidden h-16 flex items-center justify-around px-2 pb-safe shadow-lg transition-colors duration-200">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground active:text-accent w-14 h-12"
        >
          <Home className="h-5 w-5" />
          <span className="text-[9px] mt-0.5 font-medium">Home</span>
        </Link>
        <Link
          href="/shop"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground active:text-accent w-14 h-12"
        >
          <Compass className="h-5 w-5" />
          <span className="text-[9px] mt-0.5 font-medium">Shop</span>
        </Link>
        <Link
          href="/search"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground active:text-accent w-14 h-12"
        >
          <Search className="h-5 w-5" />
          <span className="text-[9px] mt-0.5 font-medium">Search</span>
        </Link>
        <button
          suppressHydrationWarning
          onClick={() => setCartOpen(true)}
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground active:text-accent w-14 h-12 relative cursor-pointer"
        >
          <ShoppingBag className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute top-1.5 right-2 bg-accent text-accent-foreground text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          <span className="text-[9px] mt-0.5 font-medium">Cart</span>
        </button>
      </nav>
    </>
  );
}
