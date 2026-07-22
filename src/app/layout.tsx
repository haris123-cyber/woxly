import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ClientShell from "@/components/common/ClientShell";
import { getTenantConfig } from "@/lib/tenant";

// Reduced from 6 weights to 3 — every extra weight is a separate network request (render-blocking)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const tenant = getTenantConfig();
  return {
    title: `Woxly Store - Fresh produce and groceries`,
    description: `Experience premium, modern, high-performing mobile-first shopping with Woxly Store.`,
    metadataBase: new URL(`https://${tenant.domain}`),
    openGraph: {
      title: `Woxly Store - Fresh produce and groceries`,
      description: `Experience premium, modern, high-performing mobile-first shopping with Woxly Store.`,
      siteName: tenant.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `Woxly Store - Fresh produce and groceries`,
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tenant = getTenantConfig();

  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} h-full antialiased font-outfit`} data-tenant={tenant.id} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200" suppressHydrationWarning>
        <Header />
        {/* ClientShell holds all ssr:false lazy components (required by Next.js 16) */}
        <ClientShell enableSocialProof={tenant.features.enableLiveSocialProof} />
        <main className="flex-1 w-full max-w-7xl mx-auto px-0 pt-0 pb-24 md:pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
