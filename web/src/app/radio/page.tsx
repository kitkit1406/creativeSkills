"use client";

import { ContentCard } from "@/components/ContentCard";
import { useAuth } from "@/lib/auth";
import { radioStations } from "@/lib/data";
import { t } from "@/lib/i18n";

export default function RadioPage() {
  const { locale } = useAuth();

  return (
    <>
      <h1 className="page-title">{t(locale, "navRadio")}</h1>
      <p className="page-sub">{t(locale, "radioIsrael")}</p>
      <div className="catalog-grid">
        {radioStations.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
