"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DeviceInfo, Locale } from "@/types";
import { defaultLocale } from "@/lib/i18n";

const STORAGE_KEY = "levstream-session-v1";

export interface Session {
  email: string;
  planId: string | null;
  expiresAt: string | null;
  devices: DeviceInfo[];
  locale: Locale;
}

interface AuthContextValue {
  ready: boolean;
  session: Session | null;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  login: (email: string) => void;
  logout: () => void;
  activatePlan: (planId: string, days: number, email?: string) => void;
  removeDevice: (id: string) => void;
  hasActiveSub: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

function saveSession(session: Session | null) {
  if (typeof window === "undefined") return;
  if (!session) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function defaultDevice(): DeviceInfo {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  let type: DeviceInfo["type"] = "web";
  if (/iPhone|iPad/i.test(ua)) type = "ios";
  else if (/Android/i.test(ua)) type = "android";
  return {
    id: `dev-${Date.now()}`,
    name: type === "web" ? "Browser" : type.toUpperCase(),
    type,
    lastActive: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const existing = loadSession();
    if (existing) {
      setSession(existing);
      setLocaleState(existing.locale || defaultLocale);
    } else {
      const savedLocale = localStorage.getItem("levstream-locale") as Locale | null;
      if (savedLocale) setLocaleState(savedLocale);
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Session | null) => {
    setSession(next);
    saveSession(next);
  }, []);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      localStorage.setItem("levstream-locale", next);
      if (session) {
        const updated = { ...session, locale: next };
        persist(updated);
      }
    },
    [persist, session],
  );

  const login = useCallback(
    (email: string) => {
      const device = defaultDevice();
      const next: Session = {
        email,
        planId: session?.planId ?? null,
        expiresAt: session?.expiresAt ?? null,
        devices: session?.devices?.length ? session.devices : [device],
        locale,
      };
      persist(next);
    },
    [locale, persist, session],
  );

  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  const activatePlan = useCallback(
    (planId: string, days: number, email?: string) => {
      const expires = new Date();
      expires.setDate(expires.getDate() + days);
      const existing = loadSession();
      const base: Session = existing ??
        session ?? {
          email: email || "viewer@levstream.demo",
          planId: null,
          expiresAt: null,
          devices: [defaultDevice()],
          locale,
        };
      persist({
        ...base,
        email: email || base.email,
        planId,
        expiresAt: expires.toISOString(),
        locale,
        devices: base.devices.length ? base.devices : [defaultDevice()],
      });
    },
    [locale, persist, session],
  );

  const removeDevice = useCallback(
    (id: string) => {
      if (!session) return;
      persist({
        ...session,
        devices: session.devices.filter((d) => d.id !== id),
      });
    },
    [persist, session],
  );

  const hasActiveSub = useMemo(() => {
    if (!session?.planId || !session.expiresAt) return false;
    return new Date(session.expiresAt).getTime() > Date.now();
  }, [session]);

  const value = useMemo(
    () => ({
      ready,
      session,
      locale,
      setLocale,
      login,
      logout,
      activatePlan,
      removeDevice,
      hasActiveSub,
    }),
    [
      ready,
      session,
      locale,
      setLocale,
      login,
      logout,
      activatePlan,
      removeDevice,
      hasActiveSub,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
