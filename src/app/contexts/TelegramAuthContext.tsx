"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

const STORAGE_KEY = "hytracker_telegram_user";

function loadStoredUser(): TelegramUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TelegramUser;
  } catch {
    return null;
  }
}

function saveUser(user: TelegramUser | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
}

type TelegramAuthContextValue = {
  user: TelegramUser | null;
  setUser: (user: TelegramUser | null) => void;
  logout: () => void;
};

const TelegramAuthContext = createContext<TelegramAuthContextValue | null>(null);

export function TelegramAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<TelegramUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUserState(loadStoredUser());
    setMounted(true);
  }, []);

  const setUser = useCallback((next: TelegramUser | null) => {
    setUserState(next);
    saveUser(next);
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
    saveUser(null);
  }, []);

  const value: TelegramAuthContextValue = { user: mounted ? user : null, setUser, logout };

  return (
    <TelegramAuthContext.Provider value={value}>
      {children}
    </TelegramAuthContext.Provider>
  );
}

export function useTelegramAuth() {
  const ctx = useContext(TelegramAuthContext);
  if (!ctx) throw new Error("useTelegramAuth must be used within TelegramAuthProvider");
  return ctx;
}
