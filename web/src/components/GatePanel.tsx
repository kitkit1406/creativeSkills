"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { t } from "@/lib/i18n";

export function GatePanel() {
  const { locale } = useAuth();
  return (
    <div className="gate-panel" role="status">
      <h2>{t(locale, "gateTitle")}</h2>
      <p>{t(locale, "gateBody")}</p>
      <div className="cta-row">
        <Link href="/packages" className="btn primary">
          {t(locale, "gateBuy")}
        </Link>
        <Link href="/login" className="btn ghost">
          {t(locale, "gateLogin")}
        </Link>
      </div>
    </div>
  );
}
