"use client";

import Link from "next/link";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Star,
  Copy,
  Check,
  ThumbsUp,
  ArrowUpCircle,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Trophy,
  Globe,
  MessageCircle,
  Send,
  Users,
  Zap,
} from "lucide-react";
import type { Server } from "@/app/data/servers";
import { getMockOnline24h } from "@/app/data/chartData";
import { useTelegramAuth } from "@/app/contexts/TelegramAuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { OnlineChart } from "@/app/components/OnlineChart";
import { SimilarServerCard } from "@/app/components/SimilarServerCard";

const BANNER_ASPECT = 728 / 120;

function BannerOrPlaceholder({
  server,
  className,
}: {
  server: Server;
  className?: string;
}) {
  const [bannerError, setBannerError] = useState(false);
  const showBanner = server.banner && !bannerError;

  if (showBanner) {
    return (
      <div
        className={`flex min-h-0 w-full overflow-hidden rounded-xl bg-muted ${className ?? ""}`}
        style={{ aspectRatio: BANNER_ASPECT, borderRadius: "var(--radius-xl)" }}
      >
        <img
          src={server.banner!}
          alt=""
          className="h-full w-full object-contain object-center"
          onError={() => setBannerError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex min-h-0 w-full items-center justify-center overflow-hidden rounded-xl text-center ${className ?? ""}`}
      style={{
        aspectRatio: BANNER_ASPECT,
        borderRadius: "var(--radius-xl)",
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="relative z-10 max-w-full break-words px-4 text-xl font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] sm:text-2xl">
        {server.name}
      </span>
      <div className="absolute inset-0 bg-black/40" aria-hidden />
    </div>
  );
}

interface ServerPageContentProps {
  server: Server;
  similarServers: Server[];
}

export function ServerPageContent({
  server,
  similarServers,
}: ServerPageContentProps) {
  const [copied, setCopied] = useState(false);
  const [voted, setVoted] = useState(false);
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const { user } = useTelegramAuth();

  const hasMonitoring = server.monitoringPlugin !== false;

  const checkDescOverflow = useCallback(() => {
    const el = descRef.current;
    if (!el || descriptionExpanded) {
      setShowExpandButton(false);
      return;
    }
    setShowExpandButton(el.scrollHeight > el.clientHeight);
  }, [descriptionExpanded]);

  useEffect(() => {
    const id = requestAnimationFrame(() => checkDescOverflow());
    return () => cancelAnimationFrame(id);
  }, [checkDescOverflow, server.description]);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => checkDescOverflow());
    ro.observe(el);
    return () => ro.disconnect();
  }, [checkDescOverflow]);

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopyIP = () => {
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    navigator.clipboard.writeText(server.ip).catch(() => {});
    setCopied(true);
    copyTimeoutRef.current = setTimeout(() => {
      copyTimeoutRef.current = null;
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleVote = () => {
    if (!user) {
      setVoteDialogOpen(true);
      return;
    }
    setVoted(!voted);
  };

  const starsDisplay = Number.isInteger(server.rating)
    ? server.rating.toLocaleString("ru-RU")
    : Math.round(server.rating).toLocaleString("ru-RU");
  const votesDisplay = (voted ? server.votes + 1 : server.votes).toLocaleString(
    "ru-RU"
  );

  const online24hData = useMemo(() => getMockOnline24h(server.slug), [server.slug]);
  const peak24h = useMemo(
    () => Math.max(...online24hData.map((d) => d.online)),
    [online24hData],
  );
  const avg24h = useMemo(
    () =>
      Math.round(
        online24hData.reduce((a, d) => a + d.online, 0) / online24hData.length,
      ),
    [online24hData],
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav
        className="mb-6 text-sm text-muted-foreground"
        aria-label="Хлебные крошки"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link
              href="/"
              className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-foreground"
            >
              Главная
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/"
              className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-foreground"
            >
              Сервер
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="truncate text-foreground" aria-current="page">
            {server.name}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mb-8">
        <BannerOrPlaceholder server={server} className="mb-4 w-full" />
        <h1 className="font-heading mb-3 text-2xl font-medium text-foreground sm:text-3xl">
          {server.name}
        </h1>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <div
            className="inline-flex items-center gap-2"
            title={
              hasMonitoring ? undefined : "Статистика онлайна не отслеживается"
            }
          >
            {hasMonitoring && (
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  server.playersOnline > 0 ? "animate-pulse" : ""
                }`}
                style={
                  server.playersOnline > 0
                    ? {
                        backgroundColor: "var(--vote)",
                        boxShadow:
                          "0 0 6px var(--vote), 0 0 10px var(--vote)",
                      }
                    : {
                        backgroundColor: "var(--muted-foreground)",
                        opacity: 0.5,
                      }
                }
                aria-hidden
              />
            )}
            <span
              className="text-sm font-semibold"
              style={
                hasMonitoring && server.playersOnline > 0
                  ? {
                      color: "var(--vote)",
                      textShadow:
                        "0 0 8px rgba(5, 150, 105, 0.35)",
                    }
                  : { color: "var(--muted-foreground)" }
              }
            >
              {hasMonitoring
                ? `${server.playersOnline}/${server.playersMax} онлайн`
                : `–/${server.playersMax} онлайн`}
            </span>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-secondary/80 px-3 py-2">
          <span
            className="min-w-0 flex-1 truncate font-mono text-sm text-foreground"
            title={server.ip}
          >
            {server.ip}
          </span>
          <button
            onClick={handleCopyIP}
            className="shrink-0 rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Скопировать IP"
          >
            {copied ? (
              <Check
                className="h-4 w-4"
                style={{ color: "var(--vote)" }}
              />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleVote}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              backgroundColor: "var(--vote)",
              color: "var(--vote-foreground)",
            }}
          >
            <ArrowUpCircle className="h-4 w-4" />
            Голосовать
          </button>
          <div
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium"
            style={{
              backgroundColor: "var(--vote-muted)",
              color: "var(--vote-muted-foreground)",
            }}
            title="Голоса пользователей за сервер"
          >
            <ThumbsUp className="h-4 w-4 shrink-0" />
            <span className="font-semibold">{votesDisplay}</span>
            <span className="opacity-90">голосов</span>
          </div>
          <div
            className="inline-flex items-center gap-2 rounded-lg border border-primary/20 px-3 py-2 text-xs font-medium"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
            }}
            title="Начисляются за активность на мониторинге и донат"
          >
            <Star className="h-4 w-4 shrink-0 fill-primary text-primary" />
            <span className="font-semibold">{starsDisplay}</span>
            <span className="opacity-90">звёзд</span>
          </div>
        </div>
      </section>

      {/* О сервере */}
      <section className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6" style={{ borderRadius: "var(--radius-xl)" }}>
        <h2 className="font-heading mb-3 text-xl font-medium text-foreground">
          О сервере
        </h2>
        <div className="mb-4">
          <p
            ref={descRef}
            className={`text-sm leading-relaxed text-muted-foreground ${
              !descriptionExpanded ? "line-clamp-6" : ""
            }`}
          >
            {server.description}
          </p>
          {(showExpandButton || descriptionExpanded) && (
            <button
              type="button"
              onClick={() => setDescriptionExpanded((e) => !e)}
              className="mt-2 flex items-center gap-1 rounded text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={descriptionExpanded}
            >
              {descriptionExpanded ? (
                <>
                  Свернуть
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Развернуть
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {server.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Подключение */}
      <section className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6" style={{ borderRadius: "var(--radius-xl)" }}>
        <h2 className="font-heading mb-3 text-xl font-medium text-foreground">
          Как подключиться
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-lg font-semibold text-foreground">
            {server.ip}
          </span>
          <button
            onClick={handleCopyIP}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {copied ? (
              <Check className="h-4 w-4" style={{ color: "var(--vote)" }} />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            Скопировать
          </button>
        </div>
      </section>

      {/* Статистика онлайна — график */}
      <section
        className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        style={{ borderRadius: "var(--radius-xl)" }}
      >
        <div className="border-b border-border bg-muted/30 px-5 py-4 sm:px-6">
          <h2 className="font-heading flex items-center gap-2 text-xl font-medium text-foreground">
            <TrendingUp className="h-5 w-5" style={{ color: "var(--vote)" }} />
            Статистика онлайна
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Онлайн игроков за последние 24 часа (тестовые данные; при подключении плагина мониторинга будут реальные).
          </p>
        </div>
        <div className="p-4 sm:p-5">
          <div className="h-[280px] w-full sm:h-[320px]">
            <OnlineChart data={online24hData} className="h-full w-full" />
          </div>
          <div className="mt-4 flex flex-wrap gap-4 rounded-xl bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Средний за сутки</span>
              <span className="text-sm font-semibold tabular-nums text-foreground">{avg24h}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Пик за сутки</span>
              <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--vote)" }}>{peak24h}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Рекорд онлайна */}
      <section
        className="mb-8 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-muted/30 shadow-sm"
        style={{ borderRadius: "var(--radius-xl)" }}
      >
        <div className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: "var(--vote-muted)", color: "var(--vote)" }}
            >
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-medium text-foreground">
                Рекорд онлайна
              </h2>
              <p className="text-sm text-muted-foreground">
                Максимум игроков на сервере
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tabular-nums" style={{ color: "var(--vote)" }}>
              {server.playersMax}
            </span>
            <span className="text-muted-foreground">игроков</span>
          </div>
        </div>
      </section>

      {/* Контакты (заглушка) */}
      <section className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6" style={{ borderRadius: "var(--radius-xl)" }}>
        <h2 className="font-heading mb-3 text-xl font-medium text-foreground">
          Контакты
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Ссылки появятся после добавления владельцем сервера.
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-4 w-4 shrink-0" />
            Сайт: не указан
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="h-4 w-4 shrink-0" />
            Discord: не найден
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <Send className="h-4 w-4 shrink-0" />
            Telegram: не указан
          </li>
        </ul>
      </section>

      {/* В цифрах */}
      <section className="mb-8">
        <h2 className="font-heading mb-4 text-xl font-medium text-foreground">
          В цифрах
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              Онлайн
            </div>
            <div className="flex items-center gap-2">
              {hasMonitoring && (
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    server.playersOnline > 0 ? "animate-pulse" : ""
                  }`}
                  style={
                    server.playersOnline > 0
                      ? { backgroundColor: "var(--vote)", boxShadow: "0 0 6px var(--vote)" }
                      : { backgroundColor: "var(--muted-foreground)", opacity: 0.5 }
                  }
                />
              )}
              <span
                className="text-lg font-semibold tabular-nums"
                style={
                  hasMonitoring && server.playersOnline > 0
                    ? { color: "var(--vote)" }
                    : undefined
                }
              >
                {hasMonitoring
                  ? `${server.playersOnline}/${server.playersMax}`
                  : `–/${server.playersMax}`}
              </span>
            </div>
          </div>
          <div
            className="rounded-xl border border-border p-4 shadow-sm"
            style={{
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--vote-muted)",
              color: "var(--vote-muted-foreground)",
            }}
          >
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium opacity-90">
              <ThumbsUp className="h-3.5 w-3.5" />
              Голоса
            </div>
            <span className="text-lg font-semibold tabular-nums">{votesDisplay}</span>
          </div>
          <div
            className="rounded-xl border border-primary/20 p-4 shadow-sm"
            style={{
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
            }}
          >
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium opacity-90">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              Звёзды
            </div>
            <span className="text-lg font-semibold tabular-nums">{starsDisplay}</span>
          </div>
          <div
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Zap className="h-3.5 w-3.5" style={{ color: "var(--vote)" }} />
              Пик за сутки
            </div>
            <span className="text-lg font-semibold tabular-nums" style={{ color: "var(--vote)" }}>
              {peak24h}
            </span>
          </div>
        </div>
      </section>

      {/* Похожие серверы */}
      {similarServers.length > 0 && (
        <section className="mb-8">
          <h2 className="font-heading mb-4 text-xl font-medium text-foreground">
            Похожие серверы
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {similarServers.map((s) => (
              <SimilarServerCard key={s.id} server={s} />
            ))}
          </div>
        </section>
      )}

      <Dialog open={voteDialogOpen} onOpenChange={setVoteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Войдите через Telegram</DialogTitle>
            <DialogDescription>
              Чтобы голосовать за сервер, войдите через Telegram в шапке сайта.
              Голосовать можно раз в 24 часа.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
