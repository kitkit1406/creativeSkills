"use client";

import { useAuth } from "@/lib/auth";
import { t } from "@/lib/i18n";

const faqs = {
  he: [
    {
      q: "האם יש חידוש אוטומטי?",
      a: "לא. הרכישה היא חד-פעמית לתקופה שבחרת בלבד.",
    },
    {
      q: "באילו מכשירים אפשר לצפות?",
      a: "באתר (PWA) במחשב, בטלפון ובטאבלט — Android ו-iOS. אפשר להוסיף למסך הבית.",
    },
    {
      q: "מהי מהירות האינטרנט המומלצת?",
      a: "מומלץ לפחות 5 Mbps לצפייה יציבה ב-HD.",
    },
    {
      q: "האם זה תוכן אמיתי?",
      a: "זו הדגמה עם זרמי דמו ציבוריים. בפרודקשן יש לחבר מקורות מורשים בלבד.",
    },
  ],
  en: [
    {
      q: "Is there auto-renewal?",
      a: "No. Payment covers only the period you purchase.",
    },
    {
      q: "Which devices are supported?",
      a: "The web app (PWA) works on desktop, phone and tablet — Android and iOS. Add to Home Screen for an app-like experience.",
    },
    {
      q: "What internet speed is recommended?",
      a: "At least 5 Mbps for stable HD playback.",
    },
    {
      q: "Is this real licensed TV?",
      a: "This is a product demo with public sample streams. Production must use licensed sources only.",
    },
  ],
  ru: [
    {
      q: "Есть ли автопродление?",
      a: "Нет. Оплата только за выбранный период.",
    },
    {
      q: "Какие устройства поддерживаются?",
      a: "Веб-приложение (PWA) на компьютере, телефоне и планшете — Android и iOS. Добавьте на домашний экран.",
    },
    {
      q: "Какая скорость интернета нужна?",
      a: "Рекомендуется не менее 5 Мбит/с для стабильного HD.",
    },
    {
      q: "Это настоящее лицензированное ТВ?",
      a: "Это демо с публичными тестовыми потоками. В проде — только лицензированные источники.",
    },
  ],
} as const;

export default function FaqPage() {
  const { locale } = useAuth();
  const items = faqs[locale];

  return (
    <>
      <h1 className="page-title">{t(locale, "faqTitle")}</h1>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
