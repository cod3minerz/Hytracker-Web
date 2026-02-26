import "../styles/index.css";
import { Providers } from "./providers";
import { Layout } from "./components/Layout";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
