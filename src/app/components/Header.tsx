"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTelegramAuth } from "../contexts/TelegramAuthContext";

const navLinks = [
  { label: "Главная", path: "/" },
  { label: "Серверы", path: "/servers" },
  { label: "Блог", path: "/blog" },
  { label: "О нас", path: "/about" },
];

const TELEGRAM_BOT_NAME =
  typeof process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME === "string"
    ? process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME
    : "hytracker_bot";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user, setUser, logout } = useTelegramAuth();
  const isDark = resolvedTheme === "dark";
  const telegramWidgetRef = useRef<HTMLDivElement>(null);
  const telegramWidgetRefMobile = useRef<HTMLDivElement>(null);

  // Колбэк авторизации — вешаем один раз и не снимаем
  useEffect(() => {
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
    return () => {
      delete (window as unknown as { onTelegramAuth?: () => void }).onTelegramAuth;
    };
  }, [setUser]);

  const injectWidget = useCallback((container: HTMLDivElement | null) => {
    if (!container || container.querySelector("script")) return;
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", TELEGRAM_BOT_NAME);
    script.setAttribute("data-size", "medium");
    script.setAttribute("data-radius", "12");
    script.setAttribute("data-onauth", "onTelegramAuth");
    script.async = true;
    container.appendChild(script);
  }, []);

  // Десктоп: виджет в DOM с самого начала
  useEffect(() => {
    if (user) return;
    injectWidget(telegramWidgetRef.current);
  }, [user, injectWidget]);

  // Мобильный: виджет вставляем только когда меню открыто (контейнер появляется в DOM)
  useEffect(() => {
    if (user || !mobileMenuOpen) return;
    const id = requestAnimationFrame(() => {
      injectWidget(telegramWidgetRefMobile.current);
    });
    return () => cancelAnimationFrame(id);
  }, [user, mobileMenuOpen, injectWidget]);

  const displayName = user
    ? user.username
      ? `@${user.username}`
      : [user.first_name, user.last_name].filter(Boolean).join(" ")
    : "";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
            src="/logo.svg"
            alt="HyTracker"
            width={140}
            height={36}
            className="h-9 w-auto"
            priority
            unoptimized
          />
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

          <div className="hidden md:flex md:items-center md:gap-2">
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label={isDark ? "Светлая тема" : "Тёмная тема"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
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
              <div className="bg-blue-500/10 [&_script]:inline [&_iframe]:block [&_iframe]:!max-h-10">
                <div ref={telegramWidgetRef} className="[&>script]:inline [&>iframe]:block" />
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
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <button
                type="button"
                onClick={() => { setTheme(isDark ? "light" : "dark"); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[0.875rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                style={{ fontWeight: 500 }}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {isDark ? "Светлая тема" : "Тёмная тема"}
              </button>
            </div>
            <div className="mt-2 border-t border-border pt-4">
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
                <div className="bg-blue-500/10 min-h-[40px] [&_script]:inline [&_iframe]:block [&_iframe]:!max-h-10">
                  <div ref={telegramWidgetRefMobile} className="[&>script]:inline [&>iframe]:block" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
