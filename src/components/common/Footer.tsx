import Link from "next/link";

export default function Footer() {
  return (
    <footer suppressHydrationWarning className="bg-primary-foreground text-foreground border-t border-border mt-auto transition-colors duration-200">
      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
        {/* Brand Info */}
        <div className="col-span-2 md:col-span-2 flex flex-col gap-4 pr-4 lg:pr-8">
          <Link href="/" className="text-2xl font-black tracking-wider">
            WOXLY
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Premium quality products for your lifestyle.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-3.5 mt-2">
            {["facebook", "twitter", "instagram", "youtube"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full flex items-center justify-center text-foreground hover:bg-muted transition-colors capitalize text-[10px] font-bold"
                aria-label={social}
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Shop Catalog */}
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="text-xs font-bold capitalize">Shop</h3>
          <div className="flex flex-col gap-3 text-xs text-muted-foreground font-medium">
            <Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link>
            <Link href="/shop?category=Vegetables" className="hover:text-foreground transition-colors">Vegetables</Link>
            <Link href="/shop?category=Fruits" className="hover:text-foreground transition-colors">Fruits</Link>
            <Link href="/shop?category=Snacks+%26+Breads" className="hover:text-foreground transition-colors">Snacks & Breads</Link>
            <Link href="/shop?category=Meat" className="hover:text-foreground transition-colors">Meat & Seafood</Link>
          </div>
        </div>

        {/* Company Links */}
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="text-xs font-bold capitalize">Company</h3>
          <div className="flex flex-col gap-3 text-xs text-muted-foreground font-medium">
            <Link href="/about" className="hover:text-foreground transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link>
            <Link href="/press" className="hover:text-foreground transition-colors">Press</Link>
          </div>
        </div>

        {/* Help Links */}
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="text-xs font-bold capitalize">Help</h3>
          <div className="flex flex-col gap-3 text-xs text-muted-foreground font-medium">
            <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <Link href="/shipping" className="hover:text-foreground transition-colors">Shipping</Link>
            <Link href="/returns" className="hover:text-foreground transition-colors">Returns</Link>
            <Link href="/track-order" className="hover:text-foreground transition-colors">Track Order</Link>
            <Link href="/size-guide" className="hover:text-foreground transition-colors">Size Guide</Link>
          </div>
        </div>

        {/* Legal Links */}
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="text-xs font-bold capitalize">Legal</h3>
          <div className="flex flex-col gap-3 text-xs text-muted-foreground font-medium">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground font-medium">
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
