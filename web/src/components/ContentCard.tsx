"use client";

import Link from "next/link";
import type { CatalogItem } from "@/types";
import { useAuth } from "@/lib/auth";
import { t } from "@/lib/i18n";

export function ContentCard({ item }: { item: CatalogItem }) {
  const { locale } = useAuth();

  return (
    <Link href={`/watch/${item.id}`} className="content-card">
      <div className="content-card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.poster} alt="" loading="lazy" />
        <div className="content-card-badges">
          {item.live ? <span className="badge live">{t(locale, "live")}</span> : null}
          {item.premium ? (
            <span className="badge premium">{t(locale, "premium")}</span>
          ) : null}
        </div>
      </div>
      <div className="content-card-meta">
        <h3>{item.title[locale]}</h3>
        <p>{item.description[locale]}</p>
      </div>
    </Link>
  );
}
