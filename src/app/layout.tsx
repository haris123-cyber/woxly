import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ClientShell from "@/components/common/ClientShell";
import { getTenantConfig } from "@/lib/tenant";

// Load only the weights actually used in CSS
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  preload: true,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const tenant = getTenantConfig();
  return {
    title: {
      default: "Woxly Store – Fresh Groceries Delivered",
      template: "%s | Woxly Store",
    },
    description:
      "Shop fresh organic groceries, daily essentials and more. Fast 15-minute delivery from Woxly Store.",
    metadataBase: new URL(`https://${tenant.domain}`),
    openGraph: {
      title: "Woxly Store – Fresh Groceries Delivered",
      description:
        "Shop fresh organic groceries, daily essentials and more. Fast 15-minute delivery from Woxly Store.",
      siteName: tenant.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Woxly Store – Fresh Groceries Delivered",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D5A4A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tenant = getTenantConfig();

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased font-outfit`}
      data-tenant={tenant.id}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <Header />
        <ClientShell enableSocialProof={tenant.features.enableLiveSocialProof} />
        <main className="flex-1 w-full max-w-7xl mx-auto px-0 pt-0 pb-24 md:pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
