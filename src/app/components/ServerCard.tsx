"use client";

import { Star, Copy, ArrowUpCircle, Check, Monitor, Sparkles } from "lucide-react";
import { useState } from "react";
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
      className={`flex items-center justify-center rounded-lg bg-accent px-3 py-2 text-center ${className ?? ""}`}
      style={{ aspectRatio: BANNER_ASPECT }}
    >
      <span className="break-words text-sm font-medium text-foreground">{server.name}</span>
    </div>
  );
}

export function ServerCard({ server, rank }: ServerCardProps) {
  const [copied, setCopied] = useState(false);
  const [voted, setVoted] = useState(false);
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const { user } = useTelegramAuth();

  const handleCopyIP = () => {
    navigator.clipboard.writeText(server.ip).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVote = () => {
    if (!user) {
      setVoteDialogOpen(true);
      return;
    }
    setVoted(!voted);
  };

  const isPopular = server.votes >= 500 || server.playersOnline >= 50;

  return (
    <article className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:gap-5 md:flex-row md:items-stretch md:gap-6 md:p-5">
      {/* Left: rank, name, description, online + version */}
      <div className="flex min-w-0 flex-col gap-2 md:order-1 md:w-[220px] md:shrink-0 md:gap-2.5">
        <div className="flex items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <span className="text-xs font-semibold">{rank}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 break-words text-base font-semibold leading-snug text-foreground sm:text-[1.0625rem]">
              {server.name}
            </h3>
            {isPopular && (
              <div className="mt-1 flex items-center gap-1 text-xs text-primary">
                <Sparkles className="h-3 w-3 shrink-0" />
                <span className="font-medium">Популярный</span>
              </div>
            )}
          </div>
        </div>
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
          {server.description}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 ${
              server.playersOnline > 0
                ? "border-primary/20 bg-accent"
                : "border-border bg-secondary"
            }`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                server.playersOnline > 0 ? "bg-primary" : "bg-muted-foreground/50"
              }`}
            />
            <span className="text-sm font-semibold text-foreground">
              {server.playersOnline}/{server.playersMax}
            </span>
            <span className="text-xs text-muted-foreground">онлайн</span>
          </div>
        </div>
      </div>

      {/* Center: banner (fixed ratio, full image visible) → IP → tags */}
      <div className="flex min-w-0 flex-1 flex-col gap-2 md:order-2 md:gap-2.5">
        <BannerOrPlaceholder server={server} className="shrink-0" />
        <div className="flex min-w-0 items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2">
          <Monitor className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span
            className="min-w-0 flex-1 truncate font-mono text-sm text-foreground"
            title={server.ip}
          >
            {server.ip}
          </span>
          <button
            onClick={handleCopyIP}
            className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Скопировать IP"
          >
            {copied ? (
              <Check className="h-4 w-4" style={{ color: "var(--vote)" }} />
            ) : (
              <Copy className="h-4 w-4" />
            )}
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

      {/* Right: Vote button, votes count, stars count */}
      <div className="flex flex-col gap-3 md:order-3 md:w-[160px] md:shrink-0 md:justify-center">
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:flex-col sm:items-stretch md:gap-3">
          <button
            onClick={handleVote}
            className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--vote)", color: "var(--vote-foreground)" }}
          >
            <ArrowUpCircle className="h-4 w-4" />
            Голосовать
          </button>
          <div
            className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium"
            style={{
              backgroundColor: "var(--vote-muted)",
              color: "var(--vote-muted-foreground)",
            }}
          >
            <span className="font-semibold">
              {(voted ? server.votes + 1 : server.votes).toLocaleString()}
            </span>
            <span className="opacity-90">голосов</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-muted-foreground">
            <Star className="h-4 w-4 shrink-0 text-primary fill-primary" />
            <span className="font-semibold text-foreground">{server.rating.toFixed(1)}</span>
            <span>звёзд</span>
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
