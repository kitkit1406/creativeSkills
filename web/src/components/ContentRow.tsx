"use client";

import type { CatalogItem } from "@/types";
import { ContentCard } from "@/components/ContentCard";

export function ContentRow({
  title,
  items,
}: {
  title: string;
  items: CatalogItem[];
}) {
  if (!items.length) return null;
  return (
    <section className="content-row">
      <div className="section-head">
        <h2>{title}</h2>
      </div>
      <div className="content-rail">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
