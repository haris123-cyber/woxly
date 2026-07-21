"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// ssr:false must live in a Client Component in Next.js 16+
const AnnouncementBar = dynamic(() => import("@/components/common/AnnouncementBar"), { ssr: false });
const LiveSocialProof = dynamic(() => import("@/components/common/LiveSocialProof"), { ssr: false });

const ANNOUNCEMENT_ROUTES = new Set(["/", "/shop"]);

export default function ClientShell({ enableSocialProof }: { enableSocialProof: boolean }) {
  const pathname = usePathname();
  const showAnnouncement = ANNOUNCEMENT_ROUTES.has(pathname);

  return (
    <>
      {showAnnouncement && <AnnouncementBar />}
      {enableSocialProof && <LiveSocialProof />}
    </>
  );
}
