import { Server, Users } from "lucide-react";
import { BlurHeading } from "./BlurHeading";

export interface HeroStats {
  totalServers: number;
  totalPlayers: number;
  serversOnlineCount: number;
}

export function HeroSection({ stats }: { stats?: HeroStats }) {
  const totalServers = stats?.totalServers ?? 0;
  const totalPlayers = stats?.totalPlayers ?? 0;
  const serversOnlineCount = stats?.serversOnlineCount ?? 0;

  return (
    <section className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        {/* Live stats badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 mb-6"
          style={{
            backgroundColor: "var(--vote-muted)",
            fontWeight: 500,
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--vote)" }}
          />
          <span className="text-[0.8125rem]" style={{ color: "var(--vote-muted-foreground)" }}>
            Живая статистика
          </span>
        </div>

        {/* Heading */}
        <BlurHeading
          as="h1"
          text="Найдите свой сервер Hytale"
          className="mb-4 text-[2rem] tracking-tight text-foreground sm:text-[2.5rem] md:text-[3rem]"
          style={{ fontWeight: 800, lineHeight: 1.1 }}
          animateBy="words"
          direction="top"
          delay={120}
          getWordClassName={(i) => (i >= 2 ? "text-primary" : "")}
        />

        {/* Subtitle */}
        <p className="text-[1rem] sm:text-[1.0625rem] text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          Лучшие серверы Hytale. Фильтры по режиму, онлайну и сообществу — найдите место для игры.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-3 rounded-2xl bg-secondary border border-border sm:px-6 sm:gap-8">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 shrink-0 text-muted-foreground" />
            <span className="text-[0.9375rem] text-foreground font-semibold">{totalServers}</span>
            <span className="text-[0.8125rem] text-muted-foreground">серверов</span>
          </div>
          <div className="hidden h-5 w-px shrink-0 bg-border sm:block" aria-hidden />
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 shrink-0 text-primary" />
            <span className="text-[0.9375rem] text-primary font-semibold">{totalPlayers}</span>
            <span className="text-[0.8125rem] text-muted-foreground">играют сейчас</span>
          </div>
          <div className="hidden h-5 w-px shrink-0 bg-border sm:block" aria-hidden />
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--vote)", boxShadow: "0 0 8px var(--vote), 0 0 14px var(--vote)" }}
              aria-hidden
            />
            <span
              className="text-[0.9375rem] font-semibold"
              style={{ color: "var(--vote)", textShadow: "0 0 12px rgba(5, 150, 105, 0.4)" }}
            >
              {serversOnlineCount}
            </span>
            <span
              className="text-[0.8125rem] font-medium"
              style={{ color: "var(--vote)", textShadow: "0 0 8px rgba(5, 150, 105, 0.3)" }}
            >
              онлайн
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
