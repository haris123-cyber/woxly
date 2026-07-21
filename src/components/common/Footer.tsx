import Link from "next/link";

export default function Footer() {
  return (
    <footer suppressHydrationWarning className="bg-primary-foreground text-foreground border-t border-border mt-auto transition-colors duration-200 pb-16 md:pb-0">
      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-6 gap-5 lg:gap-10">
        {/* Brand Info */}
        <div className="col-span-2 md:col-span-2 flex flex-col gap-2.5 pr-4 lg:pr-8">
          <Link href="/" className="text-2xl font-black tracking-wider">
            WOXLY
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Fresh groceries, daily essentials, and household favorites delivered to your doorstep. Shop smarter with premium quality, great prices, and fast delivery from Woxly.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-2.5 mt-1">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="#" aria-label="X (Twitter)" className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-[#FF0000] hover:bg-[#FF0000]/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Shop Catalog */}
        <div className="col-span-1 flex flex-col gap-2">
          <h3 className="text-xs font-bold capitalize">Shop</h3>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground font-medium">
            <Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link>
            <Link href="/shop?category=Vegetables" className="hover:text-foreground transition-colors">Vegetables</Link>
            <Link href="/shop?category=Fruits" className="hover:text-foreground transition-colors">Fruits</Link>
            <Link href="/shop?category=Snacks+%26+Breads" className="hover:text-foreground transition-colors">Snacks & Breads</Link>
            <Link href="/shop?category=Meat" className="hover:text-foreground transition-colors">Meat & Seafood</Link>
          </div>
        </div>

        {/* Company Links */}
        <div className="col-span-1 flex flex-col gap-2">
          <h3 className="text-xs font-bold capitalize">Company</h3>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground font-medium">
            <Link href="/about" className="hover:text-foreground transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link>
            <Link href="/press" className="hover:text-foreground transition-colors">Press</Link>
          </div>
        </div>

        {/* Help Links */}
        <div className="col-span-1 flex flex-col gap-2">
          <h3 className="text-xs font-bold capitalize">Help</h3>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground font-medium">
            <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <Link href="/shipping" className="hover:text-foreground transition-colors">Shipping</Link>
            <Link href="/returns" className="hover:text-foreground transition-colors">Returns</Link>
            <Link href="/track-order" className="hover:text-foreground transition-colors">Track Order</Link>
            <Link href="/size-guide" className="hover:text-foreground transition-colors">Size Guide</Link>
          </div>
        </div>

        {/* Legal Links */}
        <div className="col-span-1 flex flex-col gap-2">
          <h3 className="text-xs font-bold capitalize">Legal</h3>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground font-medium">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-3 md:py-5 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground font-medium">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Woxly. All rights reserved.</p>
          {/* Mock payment logos */}
          <div className="flex gap-4 text-[10px] font-bold text-foreground">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
