"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { t } from "@/lib/i18n";

export default function LoginPage() {
  const { locale, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    login(email.trim());
    router.push("/account");
  };

  return (
    <>
      <h1 className="page-title">{t(locale, "loginTitle")}</h1>
      <form className="form-panel" onSubmit={onSubmit}>
        <label htmlFor="email">{t(locale, "email")}</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">{t(locale, "password")}</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn primary block">
          {t(locale, "loginAction")}
        </button>
        <p className="hint">{t(locale, "demoHint")}</p>
      </form>
    </>
  );
}
