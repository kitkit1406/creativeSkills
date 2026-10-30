"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { t } from "@/lib/i18n";

export function IsraelClock() {
  const { locale } = useAuth();
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat(locale === "he" ? "he-IL" : locale === "ru" ? "ru-RU" : "en-GB", {
          timeZone: "Asia/Jerusalem",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [locale]);

  return (
    <div className="israel-clock" aria-live="polite">
      <span>{t(locale, "israelTime")}</span>
      <strong>{time}</strong>
    </div>
  );
}
