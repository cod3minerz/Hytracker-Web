"use client";

import dynamic from "next/dynamic";

const Providers = dynamic(
  () => import("./providers").then((m) => m.Providers),
  { ssr: false }
);

const Layout = dynamic(
  () => import("./components/Layout").then((m) => m.Layout),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="h-14 shrink-0 border-b border-border" />
        <main className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Загрузка…
        </main>
      </div>
    ),
  }
);

export function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
  );
}
