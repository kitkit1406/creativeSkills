"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { GatePanel } from "@/components/GatePanel";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useAuth } from "@/lib/auth";
import { getAllCatalog, getItemById } from "@/lib/data";
import { t } from "@/lib/i18n";

export default function WatchPage() {
  const params = useParams<{ id: string }>();
  const { locale, hasActiveSub, ready } = useAuth();
  const item = getItemById(params.id);

  if (!item) {
    return (
      <>
        <h1 className="page-title">404</h1>
        <Link href="/" className="btn ghost">
          {t(locale, "back")}
        </Link>
      </>
    );
  }

  const related = getAllCatalog()
    .filter((c) => c.id !== item.id && c.kind === item.kind)
    .slice(0, 4);

  const locked = ready && !hasActiveSub;

  return (
    <div className="watch-layout">
      <div>
        {locked ? (
          <GatePanel />
        ) : (
          <VideoPlayer
            src={item.streamUrl}
            poster={item.poster}
            title={item.title[locale]}
            demoNote={t(locale, "playerDemo")}
            audioOnly={item.kind === "radio"}
          />
        )}
        <div className="watch-meta" style={{ marginTop: "1rem" }}>
          <div className="content-card-badges" style={{ position: "static", marginBottom: "0.5rem" }}>
            {item.live ? <span className="badge live">{t(locale, "live")}</span> : null}
            {item.premium ? (
              <span className="badge premium">{t(locale, "premium")}</span>
            ) : null}
          </div>
          <h1>{item.title[locale]}</h1>
          <p>{item.description[locale]}</p>
        </div>
      </div>
      <aside className="side-list">
        <h2 className="page-title" style={{ fontSize: "1.35rem" }}>
          {t(locale, "continueWatching")}
        </h2>
        {related.map((rel) => (
          <ContentCard key={rel.id} item={rel} />
        ))}
      </aside>
    </div>
  );
}
