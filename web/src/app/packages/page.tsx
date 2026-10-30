"use client";

import { useAuth } from "@/lib/auth";
import { packages } from "@/lib/data";
import { t } from "@/lib/i18n";

export default function PackagesPage() {
  const { locale, activatePlan } = useAuth();

  return (
    <>
      <h1 className="page-title">{t(locale, "packagesTitle")}</h1>
      <p className="page-sub">{t(locale, "packagesSub")}</p>
      <div className="packages-grid">
        {packages.map((plan) => (
          <article
            key={plan.id}
            className={plan.highlighted ? "package hot" : "package"}
          >
            <h3>{plan.name[locale]}</h3>
            <div className="price">
              ${plan.priceUsd.toFixed(2)}{" "}
              <small>
                / {plan.days} {t(locale, "days")}
              </small>
            </div>
            <ul>
              <li>
                {plan.channels} {t(locale, "channels")}
              </li>
              <li>
                {plan.devices} {t(locale, "simultaneous")}
              </li>
              {plan.features[locale].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              type="button"
              className="btn primary block"
              onClick={() => {
                activatePlan(plan.id, plan.days, "viewer@levstream.demo");
                // Full navigation so account reads the persisted session.
                window.location.assign("/account");
              }}
            >
              {t(locale, "buy")}
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
