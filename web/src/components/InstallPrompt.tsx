"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { t } from "@/lib/i18n";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const { locale } = useAuth();
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferred || hidden) return null;

  return (
    <button
      type="button"
      className="install-chip"
      onClick={async () => {
        await deferred.prompt();
        setHidden(true);
        setDeferred(null);
      }}
    >
      {t(locale, "installApp")}
    </button>
  );
}
