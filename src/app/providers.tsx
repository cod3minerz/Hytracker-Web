"use client";

import { ThemeProvider } from "next-themes";
import { TelegramAuthProvider } from "./contexts/TelegramAuthContext";
import { Toaster } from "./components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TelegramAuthProvider>
        {children}
        <Toaster />
      </TelegramAuthProvider>
    </ThemeProvider>
  );
}
