"use client";

import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("./pages/HomePage").then((m) => m.HomePage), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground">
      Загрузка…
    </div>
  ),
});

export function HomeClient() {
  return <HomePage />;
}
