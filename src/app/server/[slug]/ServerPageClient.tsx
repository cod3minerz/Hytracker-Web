"use client";

import dynamic from "next/dynamic";
import type { Server } from "@/app/data/servers";

const ServerPageContent = dynamic(
  () => import("./ServerPageContent").then((m) => m.ServerPageContent),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center text-muted-foreground">
        Загрузка…
      </div>
    ),
  }
);

interface ServerPageClientProps {
  server: Server;
  similarServers: Server[];
}

export function ServerPageClient({ server, similarServers }: ServerPageClientProps) {
  return (
    <ServerPageContent server={server} similarServers={similarServers} />
  );
}
