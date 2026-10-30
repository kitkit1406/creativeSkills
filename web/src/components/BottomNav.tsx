"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { t } from "@/lib/i18n";

const items = [
  { href: "/", key: "navHome", icon: "⌂" },
  { href: "/live", key: "navLive", icon: "▷" },
  { href: "/radio", key: "navRadio", icon: "◎" },
  { href: "/vod", key: "navVod", icon: "▣" },
  { href: "/account", key: "navAccount", icon: "☺" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { locale, session } = useAuth();

  return (
    <nav className="bottom-nav" aria-label="Mobile">
      {items.map((item) => {
        const href =
          item.href === "/account" && !session ? "/login" : item.href;
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href) ||
              (item.href === "/account" && pathname.startsWith("/login"));
        return (
          <Link
            key={item.href}
            href={href}
            className={active ? "bottom-link active" : "bottom-link"}
          >
            <span aria-hidden>{item.icon}</span>
            <small>{t(locale, item.key)}</small>
          </Link>
        );
      })}
    </nav>
  );
}
