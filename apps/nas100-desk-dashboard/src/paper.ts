import { VENUE } from "./data";

export type Fill = {
  id: string;
  openedAt: string;
  closedAt?: string;
  skill: string;
  side: "long" | "short";
  qty: number;
  entry: number;
  stop: number;
  target?: number;
  exit?: number;
  points?: number;
  rMultiple?: number;
  pnl?: number;
  costs: number;
  status: "open" | "closed" | "stopped" | "target" | "flat";
  notes?: string;
};

export type Ledger = {
  equity: number;
  dayPnl: number;
  weekPnl: number;
  primarySkill: string;
  backupSkill: string;
  weekId: string;
  fills: Fill[];
};

const KEY = "nas100-desk-ledger-v1";

export function defaultLedger(): Ledger {
  return {
    equity: 50_000,
    dayPnl: 0,
    weekPnl: 0,
    primarySkill: "nas100-intraday-noise-area",
    backupSkill: "nas100-intraday-opening-range",
    weekId: "week-1",
    fills: [],
  };
}

export function loadLedger(): Ledger {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultLedger();
    return { ...defaultLedger(), ...JSON.parse(raw) };
  } catch {
    return defaultLedger();
  }
}

export function saveLedger(ledger: Ledger) {
  localStorage.setItem(KEY, JSON.stringify(ledger));
}

export function roundTripCost(): number {
  return Number((VENUE.spreadPoints + 2 * VENUE.slippagePoints).toFixed(2));
}

export function sizeLots(equity: number, entry: number, stop: number, riskPct = 0.5) {
  const stopPoints = Math.abs(entry - stop);
  const riskDollars = (equity * riskPct) / 100;
  if (stopPoints <= 0) return { qty: 0, riskDollars, stopPoints: 0 };
  const raw = riskDollars / (stopPoints * VENUE.pointValue);
  let qty = Math.floor(raw / VENUE.lotStep + 1e-9) * VENUE.lotStep;
  if (qty < VENUE.minLot) qty = 0;
  return { qty: Number(qty.toFixed(2)), riskDollars, stopPoints };
}

export function closeFill(fill: Fill, exit: number, status: Fill["status"]): Fill {
  const direction = fill.side === "long" ? 1 : -1;
  const rawPoints = (exit - fill.entry) * direction;
  const points = rawPoints - fill.costs;
  const pnl = points * VENUE.pointValue * fill.qty;
  const stopPoints = Math.abs(fill.entry - fill.stop) || 1;
  return {
    ...fill,
    exit,
    closedAt: new Date().toISOString(),
    points,
    pnl,
    rMultiple: points / stopPoints,
    status,
  };
}
