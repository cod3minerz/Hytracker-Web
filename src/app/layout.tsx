import "../styles/index.css";
import { ClientRoot } from "./ClientRoot";

export const metadata = {
  title: "HyTracker — мониторинг серверов Hytale",
  description: "Найдите и отслеживайте лучшие серверы Hytale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/logo.svg" as="image" />
      </head>
      <body suppressHydrationWarning>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
