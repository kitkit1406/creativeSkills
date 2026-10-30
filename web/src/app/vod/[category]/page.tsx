"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { useAuth } from "@/lib/auth";
import { categories, getVodByCategory } from "@/lib/data";
import { t } from "@/lib/i18n";
import type { CategoryId } from "@/types";

export default function VodCategoryPage() {
  const params = useParams<{ category: string }>();
  const { locale } = useAuth();
  const category = params.category as CategoryId;
  const meta = categories.find((c) => c.id === category);
  const items = getVodByCategory(category);

  return (
    <>
      <Link href="/vod" className="chip" style={{ marginBottom: "1rem" }}>
        ← {t(locale, "back")}
      </Link>
      <h1 className="page-title">
        {meta ? meta.label[locale] : t(locale, "navVod")}
      </h1>
      <p className="page-sub">{t(locale, "browseCategories")}</p>
      <div className="catalog-grid">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
