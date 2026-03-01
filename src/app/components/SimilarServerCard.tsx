"use client";

import Link from "next/link";
import { useState } from "react";
import { Star, Copy, Check, ThumbsUp, TrendingUp } from "lucide-react";
import type { Server } from "@/app/data/servers";
import { getMockOnline24h } from "@/app/data/chartData";
import { SparklineChart } from "@/app/components/SparklineChart";

const BANNER_ASPECT = 728 / 120;

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++)
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

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

  const hue = hashString(server.name) % 360;
  const bg = `hsl(${hue}, 28%, 92%)`;
  return (
    <div
      className={`flex items-center justify-center rounded-t-xl px-3 py-2 text-center ${className ?? ""}`}
      style={{
        aspectRatio: BANNER_ASPECT,
        backgroundColor: bg,
        backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(0,0,0,0.04) 6px, rgba(0,0,0,0.04) 12px)`,
      }}
    >
      <span className="line-clamp-2 break-words text-sm font-medium text-foreground">
        {server.name}
      </span>
    </div>
  );
}

interface SimilarServerCardProps {
  server: Server;
}

export function SimilarServerCard({ server }: SimilarServerCardProps) {
  const [copied, setCopied] = useState(false);
  const hasMonitoring = server.monitoringPlugin !== false;
  const onlineData = getMockOnline24h(server.slug);
  const peakOnline = Math.max(...onlineData.map((d) => d.online));
  const avgOnline =
    onlineData.reduce((a, d) => a + d.online, 0) / onlineData.length;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(server.ip).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        <div className="mt-2 flex flex-wrap gap-1.5">
          {server.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-border/80 bg-muted/40 p-2.5">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-muted-foreground">
              Онлайн за 24 ч
            </span>
            <span
              className="text-xs font-semibold tabular-nums"
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
          <div className="h-8 w-full">
            <SparklineChart data={onlineData} color="var(--vote)" />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>Пик: {peakOnline}</span>
            <span>Сред: {Math.round(avgOnline)}</span>
          </div>
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
