export type Side = "long" | "short";

export type PaperConfig = {
  symbol: string;
  equity: number;
  pointValue: number;
  spreadPoints: number;
  slippagePoints: number;
  riskPerTradePct: number;
  dailyLossHaltPct: number;
  weeklyLossHaltPct: number;
  primarySkill: string;
  backupSkill: string;
  scalpOverlay: boolean;
  weekId: string;
};

export type PaperFill = {
  id: string;
  openedAt: string;
  closedAt?: string;
  skill: string;
  side: Side;
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

export type PaperState = {
  config: PaperConfig;
  fills: PaperFill[];
  dayPnl: number;
  weekPnl: number;
  halted: boolean;
  haltReason?: string;
  lastWeeklyReview?: string;
};

export const DEFAULT_CONFIG: PaperConfig = {
  // Prices from NQ front month; size as Micro (MNQ) so 0.5% risk fits realistic stops.
  symbol: "CME_MINI:NQ1!",
  equity: 50_000,
  pointValue: 2,
  spreadPoints: 1,
  slippagePoints: 0.25,
  riskPerTradePct: 0.5,
  dailyLossHaltPct: 2,
  weeklyLossHaltPct: 5,
  primarySkill: "nas100-intraday-noise-area",
  backupSkill: "nas100-intraday-opening-range",
  scalpOverlay: true,
  weekId: "week-1",
};

export const STATE_KEY = "nas100.paper.state";

export function roundTripCostPoints(config: PaperConfig): number {
  return config.spreadPoints + 2 * config.slippagePoints;
}

export function sizeFromStop(
  config: PaperConfig,
  entry: number,
  stop: number,
): { qty: number; riskDollars: number; stopPoints: number } {
  const stopPoints = Math.abs(entry - stop);
  const riskDollars = (config.equity * config.riskPerTradePct) / 100;
  if (stopPoints <= 0) {
    return { qty: 0, riskDollars, stopPoints: 0 };
  }
  const qty = Math.floor(riskDollars / (stopPoints * config.pointValue));
  return { qty, riskDollars, stopPoints };
}

export function applyClose(
  fill: PaperFill,
  exit: number,
  config: PaperConfig,
  status: PaperFill["status"],
  closedAt: string,
): PaperFill {
  const direction = fill.side === "long" ? 1 : -1;
  const rawPoints = (exit - fill.entry) * direction;
  const points = rawPoints - fill.costs;
  const pnl = points * config.pointValue * fill.qty;
  const stopPoints = Math.abs(fill.entry - fill.stop) || 1;
  const rMultiple = points / stopPoints;
  return {
    ...fill,
    exit,
    closedAt,
    points,
    pnl,
    rMultiple,
    status,
  };
}

export function emptyState(config: PaperConfig = DEFAULT_CONFIG): PaperState {
  return {
    config,
    fills: [],
    dayPnl: 0,
    weekPnl: 0,
    halted: false,
  };
}
