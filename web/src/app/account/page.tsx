"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { packages } from "@/lib/data";
import { t } from "@/lib/i18n";

export default function AccountPage() {
  const { locale, session, ready, hasActiveSub, logout, removeDevice } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (session) return;
    // Allow a beat for purchase → navigate race; then require login.
    const id = window.setTimeout(() => {
      try {
        if (localStorage.getItem("levstream-session-v1")) {
          window.location.reload();
          return;
        }
      } catch {
        /* ignore */
      }
      router.replace("/login");
    }, 80);
    return () => window.clearTimeout(id);
  }, [ready, session, router]);

  if (!session) return null;

  const plan = packages.find((p) => p.id === session.planId);

  return (
    <>
      <h1 className="page-title">{t(locale, "accountTitle")}</h1>
      <p className="page-sub">
        {t(locale, "welcome")}, {session.email}
      </p>
      <div className="account-panel">
        <dl>
          <dt>{t(locale, "status")}</dt>
          <dd>{hasActiveSub ? t(locale, "active") : t(locale, "expired")}</dd>
          <dt>{t(locale, "plan")}</dt>
          <dd>{plan ? plan.name[locale] : "—"}</dd>
          <dt>{t(locale, "expires")}</dt>
          <dd>
            {session.expiresAt
              ? new Date(session.expiresAt).toLocaleString(
                  locale === "he" ? "he-IL" : locale === "ru" ? "ru-RU" : "en-GB",
                )
              : "—"}
          </dd>
        </dl>

        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--sand)" }}>
          {t(locale, "manageDevices")}
        </h2>
        <div className="device-list">
          {session.devices.length === 0 ? (
            <p className="hint">{t(locale, "noDevices")}</p>
          ) : (
            session.devices.map((device) => (
              <div key={device.id} className="device-row">
                <div>
                  <strong>{device.name}</strong>
                  <span>
                    {device.type} ·{" "}
                    {new Date(device.lastActive).toLocaleDateString()}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn ghost sm"
                  onClick={() => removeDevice(device.id)}
                >
                  {t(locale, "removeDevice")}
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cta-row">
          <Link href="/packages" className="btn primary">
            {t(locale, "upgrade")}
          </Link>
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            {t(locale, "logout")}
          </button>
        </div>
      </div>
    </>
  );
}
