import type { CatalogItem, CategoryId, PackagePlan } from "@/types";

/** Demo / public sample streams only — replace with licensed HLS/CDN sources in production. */
const DEMO_BBB =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const DEMO_ELEPHANTS =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const DEMO_SINTEL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";
const DEMO_TEARS =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
const DEMO_LIVE_FALLBACK = DEMO_BBB;

const poster = (seed: string, hue: number) =>
  `https://picsum.photos/seed/${seed}/640/360`;

export const categories: {
  id: CategoryId;
  label: { he: string; en: string; ru: string };
}[] = [
  { id: "news", label: { he: "חדשות", en: "News", ru: "Новости" } },
  { id: "sport", label: { he: "ספורט", en: "Sport", ru: "Спорт" } },
  { id: "kids", label: { he: "ילדים", en: "Kids", ru: "Детям" } },
  { id: "series", label: { he: "סדרות", en: "Series", ru: "Сериалы" } },
  {
    id: "telenovela",
    label: { he: "טלנובלות", en: "Telenovela", ru: "Теленовеллы" },
  },
  { id: "movies", label: { he: "סרטים", en: "Movies", ru: "Фильмы" } },
  {
    id: "science",
    label: { he: "מדע וטבע", en: "Science & Nature", ru: "Наука и природа" },
  },
  { id: "music", label: { he: "מוזיקה", en: "Music", ru: "Музыка" } },
];

export const liveChannels: CatalogItem[] = [
  {
    id: "live-news-1",
    kind: "live",
    category: "news",
    title: {
      he: "ערוץ חדשות מרכזי",
      en: "Central News",
      ru: "Центральные новости",
    },
    description: {
      he: "שידור חי 24/7 — דמו",
      en: "Live 24/7 — demo feed",
      ru: "Прямой эфир 24/7 — демо",
    },
    poster: poster("lev-news-1", 210),
    streamUrl: DEMO_LIVE_FALLBACK,
    live: true,
  },
  {
    id: "live-news-2",
    kind: "live",
    category: "news",
    title: {
      he: "אקטואליה בערב",
      en: "Evening Current Affairs",
      ru: "Вечерняя актуалка",
    },
    description: {
      he: "תוכניות אקטואליה בשידור חי",
      en: "Live current-affairs programming",
      ru: "Прямые общественно-политические передачи",
    },
    poster: poster("lev-news-2", 200),
    streamUrl: DEMO_LIVE_FALLBACK,
    live: true,
  },
  {
    id: "live-sport-1",
    kind: "live",
    category: "sport",
    title: {
      he: "ספורט לייב",
      en: "Sport Live",
      ru: "Спорт Live",
    },
    description: {
      he: "משחקים ואירועי ספורט — דמו",
      en: "Matches and sports events — demo",
      ru: "Матчи и спорт — демо",
    },
    poster: poster("lev-sport-1", 140),
    streamUrl: DEMO_SINTEL,
    live: true,
    premium: true,
  },
  {
    id: "live-kids-1",
    kind: "live",
    category: "kids",
    title: {
      he: "ערוץ ילדים",
      en: "Kids Channel",
      ru: "Детский канал",
    },
    description: {
      he: "תוכן לילדים בשידור רציף",
      en: "Continuous kids programming",
      ru: "Непрерывный детский контент",
    },
    poster: poster("lev-kids-1", 40),
    streamUrl: DEMO_BBB,
    live: true,
  },
  {
    id: "live-music-1",
    kind: "live",
    category: "music",
    title: {
      he: "מוזיקה חיה",
      en: "Live Music",
      ru: "Живая музыка",
    },
    description: {
      he: "קליפים והופעות",
      en: "Clips and performances",
      ru: "Клипы и выступления",
    },
    poster: poster("lev-music-1", 300),
    streamUrl: DEMO_ELEPHANTS,
    live: true,
  },
  {
    id: "live-nature-1",
    kind: "live",
    category: "science",
    title: {
      he: "טבע ומסעות",
      en: "Nature & Journeys",
      ru: "Природа и путешествия",
    },
    description: {
      he: "תיעוד טבע באיכות HD",
      en: "Nature documentaries in HD",
      ru: "Документалистика о природе в HD",
    },
    poster: poster("lev-nature-1", 160),
    streamUrl: DEMO_TEARS,
    live: true,
    premium: true,
  },
];

export const radioStations: CatalogItem[] = [
  {
    id: "radio-1",
    kind: "radio",
    title: {
      he: "גל ישראלי",
      en: "Israeli Wave",
      ru: "Израильская волна",
    },
    description: {
      he: "מוזיקה ישראלית 24/7",
      en: "Israeli music 24/7",
      ru: "Израильская музыка 24/7",
    },
    poster: poster("lev-radio-1", 220),
    streamUrl: DEMO_BBB,
    live: true,
  },
  {
    id: "radio-2",
    kind: "radio",
    title: {
      he: "חדשות ברדיו",
      en: "News Radio",
      ru: "Новостное радио",
    },
    description: {
      he: "עדכונים כל שעה",
      en: "Hourly updates",
      ru: "Обновления каждый час",
    },
    poster: poster("lev-radio-2", 190),
    streamUrl: DEMO_ELEPHANTS,
    live: true,
  },
  {
    id: "radio-3",
    kind: "radio",
    title: {
      he: "מזרחית חמה",
      en: "Mizrahi Hot",
      ru: "Мизрахи хит",
    },
    description: {
      he: "להיטים מזרחיים",
      en: "Mizrahi hits",
      ru: "Мизрахи хиты",
    },
    poster: poster("lev-radio-3", 25),
    streamUrl: DEMO_SINTEL,
    live: true,
  },
  {
    id: "radio-4",
    kind: "radio",
    title: {
      he: "קלאסיקה קלה",
      en: "Easy Classics",
      ru: "Лёгкая классика",
    },
    description: {
      he: "מוזיקה רגועה לעבודה",
      en: "Calm music for focus",
      ru: "Спокойная музыка для работы",
    },
    poster: poster("lev-radio-4", 250),
    streamUrl: DEMO_TEARS,
    live: true,
  },
];

export const vodItems: CatalogItem[] = [
  {
    id: "vod-movie-1",
    kind: "vod",
    category: "movies",
    title: {
      he: "ארנב גדול (דמו)",
      en: "Big Buck Bunny (Demo)",
      ru: "Большой Бак Банни (демо)",
    },
    description: {
      he: "סרט דמו פתוח לצפייה",
      en: "Open demo film for playback testing",
      ru: "Открытый демо-фильм для проверки плеера",
    },
    poster: poster("lev-vod-m1", 80),
    streamUrl: DEMO_BBB,
    duration: "10:34",
    year: 2008,
  },
  {
    id: "vod-movie-2",
    kind: "vod",
    category: "movies",
    title: {
      he: "חלום הפילים",
      en: "Elephants Dream",
      ru: "Сон слонов",
    },
    description: {
      he: "סרט אנימציה לדוגמה",
      en: "Sample animated short",
      ru: "Демонстрационный анимационный фильм",
    },
    poster: poster("lev-vod-m2", 260),
    streamUrl: DEMO_ELEPHANTS,
    duration: "10:53",
    year: 2006,
    premium: true,
  },
  {
    id: "vod-movie-3",
    kind: "vod",
    category: "movies",
    title: {
      he: "סינטל",
      en: "Sintel",
      ru: "Синтел",
    },
    description: {
      he: "הרפתקה קצרה באיכות גבוהה",
      en: "A short adventure in high quality",
      ru: "Короткое приключение в высоком качестве",
    },
    poster: poster("lev-vod-m3", 30),
    streamUrl: DEMO_SINTEL,
    duration: "14:48",
    year: 2010,
  },
  {
    id: "vod-series-1",
    kind: "vod",
    category: "series",
    title: {
      he: "דמעות של פלדה — פרק 1",
      en: "Tears of Steel — Ep 1",
      ru: "Слёзы стали — эп. 1",
    },
    description: {
      he: "פרק דמו לסדרה",
      en: "Demo episode",
      ru: "Демо-эпизод",
    },
    poster: poster("lev-vod-s1", 350),
    streamUrl: DEMO_TEARS,
    duration: "12:14",
    year: 2012,
    premium: true,
  },
  {
    id: "vod-kids-1",
    kind: "vod",
    category: "kids",
    title: {
      he: "שעת סיפור",
      en: "Story Time",
      ru: "Время сказок",
    },
    description: {
      he: "תוכן ידידותי לילדים (דמו)",
      en: "Kid-friendly demo content",
      ru: "Детский демо-контент",
    },
    poster: poster("lev-vod-k1", 50),
    streamUrl: DEMO_BBB,
    duration: "10:34",
    year: 2024,
  },
  {
    id: "vod-news-1",
    kind: "vod",
    category: "news",
    title: {
      he: "סיכום השבוע",
      en: "Week in Review",
      ru: "Итоги недели",
    },
    description: {
      he: "הקלטת catch-up עד 14 יום — דמו",
      en: "Catch-up recording up to 14 days — demo",
      ru: "Запись catch-up до 14 дней — демо",
    },
    poster: poster("lev-vod-n1", 200),
    streamUrl: DEMO_ELEPHANTS,
    duration: "28:00",
    year: 2026,
  },
  {
    id: "vod-sport-1",
    kind: "vod",
    category: "sport",
    title: {
      he: "היילights של המשחק",
      en: "Match Highlights",
      ru: "Обзор матча",
    },
    description: {
      he: "סיכום משחק — דמו",
      en: "Game summary — demo",
      ru: "Обзор игры — демо",
    },
    poster: poster("lev-vod-sp1", 120),
    streamUrl: DEMO_SINTEL,
    duration: "8:20",
    year: 2026,
    premium: true,
  },
  {
    id: "vod-tel-1",
    kind: "vod",
    category: "telenovela",
    title: {
      he: "אהבה בתל אביב",
      en: "Love in Tel Aviv",
      ru: "Любовь в Тель-Авиве",
    },
    description: {
      he: "פרק דמו לטלנובלה",
      en: "Telenovela demo episode",
      ru: "Демо-эпизод теленовеллы",
    },
    poster: poster("lev-vod-t1", 10),
    streamUrl: DEMO_TEARS,
    duration: "42:00",
    year: 2025,
  },
  {
    id: "vod-sci-1",
    kind: "vod",
    category: "science",
    title: {
      he: "המדבר בלילה",
      en: "Desert at Night",
      ru: "Пустыня ночью",
    },
    description: {
      he: "תיעוד טבע — דמו",
      en: "Nature documentary — demo",
      ru: "Документальный фильм о природе — демо",
    },
    poster: poster("lev-vod-sc1", 170),
    streamUrl: DEMO_BBB,
    duration: "52:00",
    year: 2023,
  },
  {
    id: "vod-music-1",
    kind: "vod",
    category: "music",
    title: {
      he: "קונצרט חוף",
      en: "Beach Concert",
      ru: "Концерт на пляже",
    },
    description: {
      he: "הופעה חיה — דמו",
      en: "Live performance — demo",
      ru: "Живое выступление — демо",
    },
    poster: poster("lev-vod-mu1", 280),
    streamUrl: DEMO_SINTEL,
    duration: "65:00",
    year: 2024,
    premium: true,
  },
];

export const packages: PackagePlan[] = [
  {
    id: "basic",
    name: { he: "בסיסי", en: "Basic", ru: "Базовый" },
    priceUsd: 14.99,
    days: 30,
    channels: 20,
    devices: 2,
    features: {
      he: [
        "20 ערוצי לייב",
        "רדיו ישראלי",
        "VOD נבחר",
        "2 מכשירים במקביל",
      ],
      en: [
        "20 live channels",
        "Israeli radio",
        "Selected VOD",
        "2 devices at once",
      ],
      ru: [
        "20 каналов live",
        "Израильское радио",
        "Избранный VOD",
        "2 устройства одновременно",
      ],
    },
  },
  {
    id: "full",
    name: { he: "חבילה מלאה", en: "Full Package", ru: "Полный пакет" },
    priceUsd: 29.99,
    days: 30,
    channels: 90,
    devices: 5,
    highlighted: true,
    features: {
      he: [
        "90 ערוצים כולל פרימיום",
        "הקלטות עד 14 יום אחורה",
        "VOD מלא + סדרות וסרטים",
        "5 מכשירים במקביל",
        "תמיכה בעברית, אנגלית ורוסית",
      ],
      en: [
        "90 channels including premium",
        "Catch-up up to 14 days",
        "Full VOD + series & movies",
        "5 devices at once",
        "Hebrew, English & Russian support",
      ],
      ru: [
        "90 каналов включая премиум",
        "Записи до 14 дней назад",
        "Полный VOD + сериалы и фильмы",
        "5 устройств одновременно",
        "Поддержка иврита, английского и русского",
      ],
    },
  },
  {
    id: "quarter",
    name: { he: "רבעון", en: "Quarterly", ru: "Квартал" },
    priceUsd: 74.99,
    days: 90,
    channels: 90,
    devices: 5,
    features: {
      he: [
        "כל מה שבחבילה המלאה",
        "3 חודשים במחיר מוזל",
        "ללא חידוש אוטומטי",
      ],
      en: [
        "Everything in Full Package",
        "3 months at a discount",
        "No auto-renewal",
      ],
      ru: [
        "Всё из полного пакета",
        "3 месяца со скидкой",
        "Без автопродления",
      ],
    },
  },
];

export function getAllCatalog(): CatalogItem[] {
  return [...liveChannels, ...radioStations, ...vodItems];
}

export function getItemById(id: string): CatalogItem | undefined {
  return getAllCatalog().find((item) => item.id === id);
}

export function getVodByCategory(category: CategoryId): CatalogItem[] {
  return vodItems.filter((item) => item.category === category);
}
