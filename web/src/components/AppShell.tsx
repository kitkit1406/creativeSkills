"use client";

import { useEffect, type ReactNode } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/lib/auth";
import { dirFor, t } from "@/lib/i18n";

export function AppShell({ children }: { children: ReactNode }) {
  const { locale, ready } = useAuth();

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = dirFor(locale);
  }, [locale, ready]);

  return (
    <div className="app-shell">
      <div className="atmosphere" aria-hidden />
      <Header />
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <p>{t(locale, "webAppNote")}</p>
        <p className="legal">{t(locale, "footerLegal")}</p>
      </footer>
      <BottomNav />
    </div>
  );
}
