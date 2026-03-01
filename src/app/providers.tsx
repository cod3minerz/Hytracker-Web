"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { TelegramAuthProvider } from "./contexts/TelegramAuthContext";

const Toaster = dynamic(
  () => import("./components/ui/sonner").then((m) => m.Toaster),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <TelegramAuthProvider>
        {children}
        <Toaster />
      </TelegramAuthProvider>
    </ThemeProvider>
  );
}
