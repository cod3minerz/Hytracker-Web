import { Server, Users, Globe } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-white border-b border-border">
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
        <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] tracking-tight text-foreground mb-4" style={{ fontWeight: 800, lineHeight: 1.1 }}>
          Найдите свой{" "}
          <span className="text-primary">сервер Hytale</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[1rem] sm:text-[1.0625rem] text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          Лучшие серверы Hytale. Фильтры по режиму, онлайну и сообществу — найдите место для игры.
        </p>

        {/* Stats */}
        <div className="inline-flex items-center gap-6 sm:gap-8 px-6 py-3 rounded-2xl bg-secondary border border-border">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-muted-foreground" />
            <span className="text-[0.9375rem] text-foreground" style={{ fontWeight: 600 }}>693</span>
            <span className="text-[0.8125rem] text-muted-foreground">серверов</span>
          </div>
          <div className="w-px h-5 bg-border" />
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-[0.9375rem] text-primary" style={{ fontWeight: 600 }}>356</span>
            <span className="text-[0.8125rem] text-muted-foreground">играют сейчас</span>
          </div>
          <div className="w-px h-5 bg-border" />
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-[0.9375rem] text-foreground" style={{ fontWeight: 600 }}>249</span>
            <span className="text-[0.8125rem] text-muted-foreground">онлайн</span>
          </div>
        </div>
      </div>
    </section>
  );
}
