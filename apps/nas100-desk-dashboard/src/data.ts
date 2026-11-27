export type Role = {
  id: string;
  title: string;
  kind: "lead" | "subagent";
  owns: string;
};

export type Skill = {
  id: string;
  group: "intraday" | "scalping" | "ops" | "venue";
  blurb: string;
};

export type Schedule = {
  name: string;
  cron: string;
  when: string;
  purpose: string;
};

export const VENUE = {
  broker: "Vantage Markets",
  tv: "VANTAGE:NAS100",
  mt5: "NAS100.r",
  pointValue: 1,
  minLot: 0.1,
  lotStep: 0.1,
  spreadPoints: 1.2,
  slippagePoints: 0.3,
};

export const ROLES: Role[] = [
  {
    id: "desk-lead",
    title: "Desk lead (nas100-paper-team)",
    kind: "lead",
    owns: "Session plan, ledger integrity, final go/no-go",
  },
  {
    id: "intraday-trader",
    title: "intraday-trader",
    kind: "subagent",
    owns: "Breakout, gap, momentum, news, pullback, range, ORB, noise-area",
  },
  {
    id: "scalper",
    title: "scalper",
    kind: "subagent",
    owns: "1m–5m momentum / levels / range under session protocol",
  },
  {
    id: "risk-officer",
    title: "risk-officer",
    kind: "subagent",
    owns: "Lot sizing, 2% daily / 5% weekly halts",
  },
  {
    id: "weekly-coach",
    title: "weekly-coach",
    kind: "subagent",
    owns: "Sunday measure → one lever → freeze next playbook",
  },
];

export const SKILLS: Skill[] = [
  { id: "nas100-vantage", group: "venue", blurb: "Vantage MT5 / TV mapping" },
  { id: "nas100-instrument", group: "venue", blurb: "Sessions, costs, lot rules" },
  { id: "nas100-intraday-breakout", group: "intraday", blurb: "Closed-bar breakouts" },
  { id: "nas100-intraday-gap", group: "intraday", blurb: "Cash-open gap continue/fade" },
  { id: "nas100-intraday-momentum", group: "intraday", blurb: "Trend-day continuation" },
  { id: "nas100-intraday-news", group: "intraday", blurb: "Macro event windows" },
  { id: "nas100-intraday-pullback", group: "intraday", blurb: "Trend pullbacks" },
  { id: "nas100-intraday-range", group: "intraday", blurb: "Chop mean-reversion" },
  { id: "nas100-intraday-opening-range", group: "intraday", blurb: "09:30–10:00 ORB" },
  { id: "nas100-intraday-noise-area", group: "intraday", blurb: "Half-hour noise-band momentum" },
  { id: "nas100-scalping-momentum", group: "scalping", blurb: "1m thrust scalps" },
  { id: "nas100-scalping-levels", group: "scalping", blurb: "VWAP / PDH rejections" },
  { id: "nas100-scalping-range", group: "scalping", blurb: "Micro-range fades" },
  { id: "nas100-scalping-session", group: "scalping", blurb: "Preflight & tilt breaks" },
  { id: "nas100-risk-and-sizing", group: "ops", blurb: "Lot risk math" },
  { id: "nas100-trade-journal", group: "ops", blurb: "Trade logs & metrics" },
  { id: "nas100-paper-trading-desk", group: "ops", blurb: "Desk orchestration" },
  { id: "nas100-weekly-improvement", group: "ops", blurb: "Weekly hillclimb freeze" },
];

export const SCHEDULES: Schedule[] = [
  {
    name: "weekday-session",
    cron: "30 13 * * 1-5",
    when: "Weekdays 13:30 UTC (~08:30 America/New_York)",
    purpose: "Run the Vantage paper session",
  },
  {
    name: "weekly-improvement",
    cron: "0 17 * * 0",
    when: "Sunday 17:00 UTC",
    purpose: "Measure, change one lever, freeze next week",
  },
];

export const SETUP = [
  {
    title: "Install the skills plugin",
    detail:
      "In Cursor: Customize → From GitHub → kitkit1406/creativeSkills → install creative-skills.",
  },
  {
    title: "Open the Agent SDK project",
    detail: "agents/nas100-paper-team — npm install && npx @grok/agent-sdk validate --dir .",
  },
  {
    title: "Sign in for model turns",
    detail: "npx @grok/agent-sdk login (needed for playground / hosted runs).",
  },
  {
    title: "Optional live bars",
    detail:
      "Connect TradingView in Cursor, then copy bot/mcp-connections/account.ts.example → account.ts.",
  },
  {
    title: "Confirm Vantage symbol",
    detail: "MT5 Market Watch: NAS100.r (or your account’s exact NAS100 suffix).",
  },
  {
    title: "Deploy the desk agent (optional)",
    detail:
      "From a machine with a Cursor service account: npx @grok/agent-sdk deploy --dir agents/nas100-paper-team",
  },
];

export const SAMPLE_QUOTE = {
  symbol: "VANTAGE:NAS100",
  last: 26693.47,
  asOf: "2026-11-27 04:22 UTC (sample from desk verification)",
};
