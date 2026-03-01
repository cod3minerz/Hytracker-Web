"use client";

import Link from "next/link";
import { Star, Copy, ArrowUpCircle, Check, Sparkles, ChevronDown, ChevronUp, ThumbsUp } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import type { Server } from "../data/servers";
import { useTelegramAuth } from "../contexts/TelegramAuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ServerCardProps {
  server: Server;
  rank: number;
}

/** Fixed banner aspect ratio (e.g. 728×120) — image always fully visible, no crop. */
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
        className={`flex min-h-0 w-full overflow-hidden rounded-lg bg-muted ${className ?? ""}`}
        style={{ aspectRatio: BANNER_ASPECT }}
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
      className={`relative flex min-h-0 w-full items-center justify-center overflow-hidden rounded-lg bg-muted text-center ${className ?? ""}`}
      style={{
        aspectRatio: BANNER_ASPECT,
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="relative z-10 max-w-full break-words px-2 text-lg font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] sm:text-xl">
        {server.name}
      </span>
      <div className="absolute inset-0 bg-black/40" aria-hidden />
    </div>
  );
}

export function ServerCard({ server, rank }: ServerCardProps) {
  const [copied, setCopied] = useState(false);
  const [voted, setVoted] = useState(false);
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const { user } = useTelegramAuth();

  const checkOverflow = useCallback(() => {
    const el = descRef.current;
    if (!el || descriptionExpanded) {
      setShowExpandButton(false);
      return;
    }
    setShowExpandButton(el.scrollHeight > el.clientHeight);
  }, [descriptionExpanded]);

  useEffect(() => {
    const id = requestAnimationFrame(() => checkOverflow());
    return () => cancelAnimationFrame(id);
  }, [checkOverflow, server.description]);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => checkOverflow());
    ro.observe(el);
    return () => ro.disconnect();
  }, [checkOverflow]);

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

  const hasMonitoring = server.monitoringPlugin !== false;
  const isPopular =
    server.votes >= 500 || (hasMonitoring && server.playersOnline >= 50);

  return (
    <article className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-lg hover:border-border/80 md:flex-row md:items-stretch md:gap-4 md:p-5" style={{ borderRadius: "var(--radius-xl)" }}>
      {/* Block 1: Identity — rank, name, description, online */}
      <div className="flex min-w-0 flex-col gap-2 md:order-1 md:w-[220px] md:shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <span className="text-xs font-semibold">{rank}</span>
          </div>
          <div className="min-w-0 flex-1">
            <Link href={`/server/${server.slug}`} className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
              <h3 className="line-clamp-2 break-words text-base font-semibold leading-snug text-foreground sm:text-[1.0625rem]">
                {server.name}
              </h3>
            </Link>
            {isPopular && (
              <div className="mt-0.5 flex items-center gap-1 text-xs text-primary">
                <Sparkles className="h-3 w-3 shrink-0" />
                <span className="font-medium">Популярный</span>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <p
            ref={descRef}
            className={`text-xs leading-snug text-muted-foreground ${!descriptionExpanded ? "line-clamp-2" : ""}`}
          >
            {server.description}
          </p>
          {(showExpandButton || descriptionExpanded) && (
            <button
              type="button"
              onClick={() => setDescriptionExpanded((e) => !e)}
              className="mt-0.5 flex items-center gap-0.5 rounded text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={descriptionExpanded}
            >
              {descriptionExpanded ? (
                <>
                  Свернуть
                  <ChevronUp className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  Развернуть
                  <ChevronDown className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex items-center gap-2"
            title={hasMonitoring ? undefined : "Статистика онлайна не отслеживается"}
          >
            {hasMonitoring && (
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  server.playersOnline > 0 ? "animate-pulse" : ""
                }`}
                style={
                  server.playersOnline > 0
                    ? { backgroundColor: "var(--vote)", boxShadow: "0 0 6px var(--vote), 0 0 10px var(--vote)" }
                    : { backgroundColor: "var(--muted-foreground)", opacity: 0.5 }
                }
                aria-hidden
              />
            )}
            <span
              className={`text-sm font-semibold ${!(hasMonitoring && server.playersOnline > 0) ? "text-muted-foreground" : ""}`}
              style={
                hasMonitoring && server.playersOnline > 0
                  ? { color: "var(--vote)", textShadow: "0 0 8px rgba(5, 150, 105, 0.35)" }
                  : undefined
              }
            >
              {hasMonitoring
                ? `${server.playersOnline}/${server.playersMax}`
                : `–/${server.playersMax}`}
            </span>
            <span
              className={`text-xs font-medium ${!(hasMonitoring && server.playersOnline > 0) ? "text-muted-foreground" : ""}`}
              style={
                hasMonitoring && server.playersOnline > 0
                  ? { color: "var(--vote)", textShadow: "0 0 6px rgba(5, 150, 105, 0.25)" }
                  : undefined
              }
            >
              онлайн
            </span>
          </div>
        </div>
      </div>

      {/* Block 2: Media — banner, IP, tags */}
      <div className="flex min-w-0 flex-1 flex-col gap-2 md:order-2">
        <Link href={`/server/${server.slug}`} className="block shrink-0 rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <BannerOrPlaceholder server={server} className="w-full" />
        </Link>
        <div className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-secondary/80 px-2 py-1.5">
          <span className="min-w-0 flex-1 truncate font-mono text-xs text-foreground" title={server.ip}>
            {server.ip}
          </span>
          <button
            onClick={handleCopyIP}
            className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Скопировать IP"
          >
            {copied ? <Check className="h-3.5 w-3.5" style={{ color: "var(--vote)" }} /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {server.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Block 3: Actions — vote button, votes, stars */}
      <div className="flex flex-col gap-2 md:order-3 md:w-[160px] md:shrink-0 md:justify-center md:gap-3">
        <button
          onClick={handleVote}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:w-auto"
          style={{ backgroundColor: "var(--vote)", color: "var(--vote-foreground)" }}
        >
          <ArrowUpCircle className="h-4 w-4" />
          Голосовать
        </button>
        <div className="flex w-full gap-2 md:flex-col md:gap-3">
          <div
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium md:flex-initial"
            style={{
              backgroundColor: "var(--vote-muted)",
              color: "var(--vote-muted-foreground)",
            }}
            title="Голоса пользователей за сервер"
          >
            <ThumbsUp className="h-4 w-4 shrink-0" />
            <span className="font-semibold">
              {(voted ? server.votes + 1 : server.votes).toLocaleString("ru-RU")}
            </span>
            <span className="opacity-90">голосов</span>
          </div>
          <div
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-primary/20 px-3 py-2 text-xs font-medium md:flex-initial"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
            title="Счётчик звёзд: начисляются за активность на мониторинге и донат (не рейтинг)"
          >
            <Star className="h-4 w-4 shrink-0 text-primary fill-primary" />
            <span className="font-semibold">
              {Number.isInteger(server.rating) ? server.rating.toLocaleString("ru-RU") : Math.round(server.rating).toLocaleString("ru-RU")}
            </span>
            <span className="opacity-90">звёзд</span>
          </div>
        </div>
      </div>

      <Dialog open={voteDialogOpen} onOpenChange={setVoteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Войдите через Telegram</DialogTitle>
            <DialogDescription>
              Чтобы голосовать за сервер, войдите через Telegram в шапке сайта. Голосовать можно раз в 24 часа.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </article>
  );
}
