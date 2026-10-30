export type Locale = "he" | "en" | "ru";

export type CategoryId =
  | "news"
  | "sport"
  | "kids"
  | "series"
  | "movies"
  | "science"
  | "music"
  | "telenovela";

export type ContentKind = "live" | "radio" | "vod";

export interface CatalogItem {
  id: string;
  kind: ContentKind;
  category?: CategoryId;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  poster: string;
  streamUrl: string;
  live?: boolean;
  premium?: boolean;
  duration?: string;
  year?: number;
}

export interface PackagePlan {
  id: string;
  name: Record<Locale, string>;
  priceUsd: number;
  days: number;
  channels: number;
  devices: number;
  features: Record<Locale, string[]>;
  highlighted?: boolean;
}

export interface DeviceInfo {
  id: string;
  name: string;
  type: "web" | "ios" | "android" | "tv";
  lastActive: string;
}
