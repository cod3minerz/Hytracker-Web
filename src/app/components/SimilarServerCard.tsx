"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Star, Copy, Check, ThumbsUp } from "lucide-react";
import type { Server } from "@/app/data/servers";

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
        className={`flex min-h-0 w-full overflow-hidden rounded-t-xl bg-muted ${className ?? ""}`}
        style={{ aspectRatio: BANNER_ASPECT }}
      >
        <img
          src={server.banner!}
          alt=""
          className="h-full w-full object-cover object-center"
          onError={() => setBannerError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex min-h-0 w-full items-center justify-center overflow-hidden rounded-t-xl text-center ${className ?? ""}`}
      style={{
        aspectRatio: BANNER_ASPECT,
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="relative z-10 line-clamp-2 max-w-full break-words px-2 text-base font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] sm:text-lg">
        {server.name}
      </span>
      <div className="absolute inset-0 bg-black/40" aria-hidden />
    </div>
  );
}

interface SimilarServerCardProps {
  server: Server;
}

export function SimilarServerCard({ server }: SimilarServerCardProps) {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMonitoring = server.monitoringPlugin !== false;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
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

  return (
    <Link
      href={`/server/${server.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ borderRadius: "var(--radius-xl)" }}
    >
      <BannerOrPlaceholder server={server} className="shrink-0" />

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
          {server.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {server.description}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className="text-xs font-semibold tabular-nums"
            style={
              hasMonitoring && server.playersOnline > 0
                ? { color: "var(--vote)" }
                : undefined
            }
          >
            {hasMonitoring
              ? `${server.playersOnline}/${server.playersMax} онлайн`
              : `–/${server.playersMax} онлайн`}
          </span>
          {server.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--vote-muted)",
              color: "var(--vote-muted-foreground)",
            }}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span className="font-semibold tabular-nums">
              {server.votes.toLocaleString("ru-RU")}
            </span>
          </div>
          <div
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 px-2.5 py-1.5 text-xs"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
            }}
          >
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="font-semibold tabular-nums">
              {Number.isInteger(server.rating)
                ? server.rating.toLocaleString("ru-RU")
                : Math.round(server.rating).toLocaleString("ru-RU")}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-2.5 py-1.5">
          <span
            className="min-w-0 flex-1 truncate font-mono text-xs text-foreground"
            title={server.ip}
          >
            {server.ip}
          </span>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Скопировать IP"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" style={{ color: "var(--vote)" }} />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
