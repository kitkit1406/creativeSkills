"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { IsraelClock } from "@/components/IsraelClock";

const links = [
  { href: "/", key: "navHome" },
  { href: "/live", key: "navLive" },
  { href: "/radio", key: "navRadio" },
  { href: "/vod", key: "navVod" },
  { href: "/packages", key: "navPackages" },
  { href: "/faq", key: "navFaq" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { locale, session, hasActiveSub } = useAuth();

  return (
    <header className="site-header">
      <div className="header-top">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden>
            ל
          </span>
          <span className="brand-text">{t(locale, "brand")}</span>
        </Link>
        <div className="header-tools">
          <IsraelClock />
          <LanguageSwitcher />
          {session ? (
            <Link href="/account" className="header-account">
              {t(locale, "navAccount")}
              <span className={hasActiveSub ? "dot on" : "dot"} />
            </Link>
          ) : (
            <Link href="/login" className="btn ghost sm">
              {t(locale, "navLogin")}
            </Link>
          )}
        </div>
      </div>
      <nav className="header-nav" aria-label="Primary">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={active ? "nav-link active" : "nav-link"}
            >
              {t(locale, link.key)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
