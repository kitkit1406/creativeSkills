"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ContentCard } from "@/components/ContentCard";
import { useAuth } from "@/lib/auth";
import { categories, vodItems } from "@/lib/data";
import { t } from "@/lib/i18n";
import type { CategoryId } from "@/types";

export default function VodPage() {
  const { locale } = useAuth();
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const items = useMemo(() => {
    if (category === "all") return vodItems;
    return vodItems.filter((item) => item.category === category);
  }, [category]);

  return (
    <>
      <h1 className="page-title">{t(locale, "navVod")}</h1>
      <p className="page-sub">{t(locale, "browseCategories")}</p>
      <div className="category-chips">
        <button
          type="button"
          className={category === "all" ? "chip active" : "chip"}
          onClick={() => setCategory("all")}
        >
          {t(locale, "allChannels")}
        </button>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/vod/${cat.id}`}
            className={category === cat.id ? "chip active" : "chip"}
            onClick={(e) => {
              e.preventDefault();
              setCategory(cat.id);
            }}
          >
            {cat.label[locale]}
          </Link>
        ))}
      </div>
      <div className="catalog-grid">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
