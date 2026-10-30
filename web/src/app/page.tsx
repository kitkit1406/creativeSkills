"use client";

import Link from "next/link";
import { ContentRow } from "@/components/ContentRow";
import { useAuth } from "@/lib/auth";
import { t } from "@/lib/i18n";
import { liveChannels, radioStations, vodItems } from "@/lib/data";

export default function HomePage() {
  const { locale } = useAuth();
  const movies = vodItems.filter((i) => i.category === "movies");
  const series = vodItems.filter(
    (i) => i.category === "series" || i.category === "telenovela",
  );

  return (
    <>
      <section className="hero">
        <div className="hero-media" />
        <div className="hero-copy">
          <p className="hero-brand">{t(locale, "brand")}</p>
          <h1 className="hero-title">{t(locale, "tagline")}</h1>
          <p className="hero-support">{t(locale, "heroSupport")}</p>
          <div className="cta-row">
            <Link href="/live" className="btn primary">
              {t(locale, "ctaWatch")}
            </Link>
            <Link href="/packages" className="btn ghost">
              {t(locale, "ctaPackages")}
            </Link>
          </div>
        </div>
      </section>

      <div className="feature-strip">
        <article className="feature">
          <h3>{t(locale, "liveNow")}</h3>
          <p>{t(locale, "liveNowBody")}</p>
        </article>
        <article className="feature">
          <h3>{t(locale, "catchUp")}</h3>
          <p>{t(locale, "catchUpBody")}</p>
        </article>
        <article className="feature">
          <h3>{t(locale, "radioIsrael")}</h3>
          <p>{t(locale, "radioIsraelBody")}</p>
        </article>
      </div>

      <ContentRow title={t(locale, "liveNow")} items={liveChannels} />
      <ContentRow title={t(locale, "radioIsrael")} items={radioStations} />
      <ContentRow title={t(locale, "mostWatchedMovies")} items={movies} />
      <ContentRow title={t(locale, "mostWatchedShows")} items={series} />
    </>
  );
}
