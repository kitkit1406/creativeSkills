"use client";

import { useAuth } from "@/lib/auth";
import { localeLabels, locales } from "@/lib/i18n";
import type { Locale } from "@/types";

export function LanguageSwitcher() {
  const { locale, setLocale } = useAuth();

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          className={locale === code ? "lang-btn active" : "lang-btn"}
          onClick={() => setLocale(code as Locale)}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}
