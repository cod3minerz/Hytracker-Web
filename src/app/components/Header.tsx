"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Server, LogOut } from "lucide-react";
import { useTelegramAuth } from "../contexts/TelegramAuthContext";

const navLinks = [
  { label: "Главная", path: "/" },
  { label: "Серверы", path: "/servers" },
  { label: "Блог", path: "/blog" },
  { label: "Гайды", path: "/guides" },
  { label: "О нас", path: "/about" },
];

const TELEGRAM_BOT_NAME =
  typeof process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME === "string"
    ? process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME
    : "HyTrackerBot";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLocalhostHint, setShowLocalhostHint] = useState(false);
  const pathname = usePathname();
  const { user, setUser, logout } = useTelegramAuth();
  const telegramWidgetRef = useRef<HTMLDivElement>(null);
  const telegramWidgetRefMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    setShowLocalhostHint(!!isLocalhost);
  }, []);

  useEffect(() => {
    if (user) return;

    (window as unknown as { onTelegramAuth?: (u: unknown) => void }).onTelegramAuth = (data: unknown) => {
      const u = data as {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        photo_url?: string;
        auth_date: number;
        hash: string;
      };
      setUser(u);
    };

    const injectWidget = (container: HTMLDivElement | null) => {
      if (!container || container.querySelector("script")) return;
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", TELEGRAM_BOT_NAME);
      script.setAttribute("data-size", "medium");
      script.setAttribute("data-onauth", "onTelegramAuth");
      script.async = true;
      container.appendChild(script);
    };

    injectWidget(telegramWidgetRef.current);
    injectWidget(telegramWidgetRefMobile.current);

    return () => {
      delete (window as unknown as { onTelegramAuth?: () => void }).onTelegramAuth;
    };
  }, [user, setUser]);

  const displayName = user
    ? user.username
      ? `@${user.username}`
      : [user.first_name, user.last_name].filter(Boolean).join(" ")
    : "";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Server className="h-5 w-5 text-white" />
            </div>
            <span
              className="text-[1.25rem] tracking-tight text-foreground"
              style={{ fontWeight: 700 }}
            >
              Hy<span className="text-primary">tracker</span>
            </span>
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`rounded-lg px-3.5 py-2 text-[0.875rem] transition-colors ${
                    isActive
                      ? "bg-accent text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex md:items-center md:gap-3">
            {user ? (
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary pl-1 pr-3 py-1.5">
                {user.photo_url ? (
                  <img
                    src={user.photo_url}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
                    {(user.first_name?.[0] ?? "?").toUpperCase()}
                  </div>
                )}
                <span className="max-w-[120px] truncate text-sm font-medium text-foreground">
                  {displayName}
                </span>
                <button
                  onClick={logout}
                  className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Выйти"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Войти с Telegram</span>
                <div ref={telegramWidgetRef} className="[&>script]:inline [&>iframe]:max-h-10" />
              </div>
            )}
          </div>

          <button
            className="rounded-lg p-2 transition-colors hover:bg-secondary md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border pb-4 pt-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3.5 py-2.5 text-[0.875rem] transition-colors ${
                      isActive
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 border-t border-border pt-4">
              {user ? (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3">
                  {user.photo_url ? (
                    <img
                      src={user.photo_url}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                      {(user.first_name?.[0] ?? "?").toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {displayName}
                    </p>
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="text-xs text-muted-foreground underline hover:text-foreground"
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-foreground">Войти с Telegram</span>
                  <div ref={telegramWidgetRefMobile} className="min-h-[40px] [&>iframe]:max-h-10" />
                  {showLocalhostHint && (
                    <p className="text-xs text-muted-foreground">
                      На продакшене укажите домен в @BotFather: /setdomain
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
