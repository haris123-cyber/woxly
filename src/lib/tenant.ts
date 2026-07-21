export interface TenantConfig {
  id: string;
  name: string;
  domain: string;
  theme: "default" | "premium";
  contact: {
    email: string;
    phone: string;
  };
  features: {
    enableBlog: boolean;
    enableLiveSocialProof: boolean;
  };
}

const tenants: Record<string, TenantConfig> = {
  default: {
    id: "default",
    name: "Woxly Default",
    domain: "woxly.store",
    theme: "default",
    contact: {
      email: "hello@woxly.store",
      phone: "1-800-WOXLY",
    },
    features: {
      enableBlog: true,
      enableLiveSocialProof: true,
    },
  },
  premium: {
    id: "premium",
    name: "Woxly Premium",
    domain: "premium.woxly.store",
    theme: "premium",
    contact: {
      email: "vip@woxly.store",
      phone: "1-800-WOXLY-VIP",
    },
    features: {
      enableBlog: false,
      enableLiveSocialProof: false, // Less noisy for luxury brands
    },
  },
};

export function getTenantConfig(): TenantConfig {
  // In a real app, this might come from the request hostname in middleware,
  // or a build-time environment variable.
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || "default";
  return tenants[tenantId] || tenants["default"];
}
