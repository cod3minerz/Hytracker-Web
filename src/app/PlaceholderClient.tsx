"use client";

import dynamic from "next/dynamic";

const PlaceholderPage = dynamic(
  () => import("./pages/PlaceholderPage").then((m) => m.PlaceholderPage),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground">
        Загрузка…
      </div>
    ),
  }
);

export function PlaceholderClient() {
  return <PlaceholderPage />;
}
