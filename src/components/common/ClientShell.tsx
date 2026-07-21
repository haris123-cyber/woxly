"use client";

import dynamic from "next/dynamic";

// ssr:false must live in a Client Component in Next.js 16+
const AnnouncementBar = dynamic(() => import("@/components/common/AnnouncementBar"), { ssr: false });
const LiveSocialProof = dynamic(() => import("@/components/common/LiveSocialProof"), { ssr: false });

export default function ClientShell({ enableSocialProof }: { enableSocialProof: boolean }) {
  return (
    <>
      <AnnouncementBar />
      {enableSocialProof && <LiveSocialProof />}
    </>
  );
}
