"use client";

import { ContentCard } from "@/components/ContentCard";
import { useAuth } from "@/lib/auth";
import { liveChannels } from "@/lib/data";
import { t } from "@/lib/i18n";

export default function LivePage() {
  const { locale } = useAuth();

  return (
    <>
      <h1 className="page-title">{t(locale, "navLive")}</h1>
      <p className="page-sub">{t(locale, "allChannels")}</p>
      <div className="catalog-grid">
        {liveChannels.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
