"use client";

import { usePathname } from "next/navigation";
import { FileText, BookOpen, Compass, Info, ServerCrash } from "lucide-react";

const pageInfo: Record<string, { icon: React.ReactNode; title: string; description: string }> = {
  "/servers": {
    icon: <ServerCrash className="w-10 h-10 text-primary" />,
    title: "Каталог серверов",
    description: "Полный список отслеживаемых серверов с фильтрами и поиском.",
  },
  "/blog": {
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "Блог",
    description: "Новости, обновления и материалы сообщества.",
  },
  "/guides": {
    icon: <BookOpen className="w-10 h-10 text-primary" />,
    title: "Гайды",
    description: "От настройки сервера до продвинутых стратегий игры.",
  },
  "/about": {
    icon: <Info className="w-10 h-10 text-primary" />,
    title: "О нас",
    description: "Команда HyTracker и наша миссия — помогать находить лучшие серверы.",
  },
};

export function PlaceholderPage() {
  const pathname = usePathname();
  const info = pageInfo[pathname ?? ""] || {
    icon: <Compass className="w-10 h-10 text-primary" />,
    title: "Страница не найдена",
    description: "Такой страницы не существует.",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
      <div className="bg-white rounded-2xl border border-border shadow-sm p-12 md:p-16 max-w-lg mx-auto">
        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
          {info.icon}
        </div>
        <h1 className="text-[1.5rem] text-foreground mb-3" style={{ fontWeight: 700 }}>
          {info.title}
        </h1>
        <p className="text-[0.9375rem] text-muted-foreground leading-relaxed">
          {info.description}
        </p>
        <div className="mt-6 px-4 py-2.5 rounded-xl bg-accent inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[0.8125rem] text-primary" style={{ fontWeight: 500 }}>Скоро</span>
        </div>
      </div>
    </div>
  );
}
