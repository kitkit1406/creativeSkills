import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  DEFAULT_CONFIG,
  STATE_KEY,
  emptyState,
  roundTripCostPoints,
  type PaperState,
} from "../lib/paperLedger.js";

export default defineTool({
  description:
    "Read the NAS100 paper account: equity, P&L, open fills, halt status, and weekly config.",
  effect: "read",
  inputSchema: z.object({}),
  async execute(_input, ctx) {
    const existing = (await ctx.host.kv.get(STATE_KEY)) as PaperState | null;
    const state = existing ?? emptyState();
    state.config = { ...DEFAULT_CONFIG, ...state.config };
    if (!existing) {
      await ctx.host.kv.put(STATE_KEY, state);
    } else {
      await ctx.host.kv.put(STATE_KEY, state);
    }
    const open = state.fills.filter((f) => f.status === "open");
    const closed = state.fills.filter((f) => f.status !== "open");
    return {
      venue: state.config.venue,
      symbol: state.config.symbol,
      mt5Symbol: state.config.mt5Symbol,
      config: state.config,
      equity: state.config.equity + state.weekPnl,
      dayPnl: state.dayPnl,
      weekPnl: state.weekPnl,
      halted: state.halted,
      haltReason: state.haltReason ?? null,
      openPositions: open,
      closedCount: closed.length,
      roundTripCostPoints: roundTripCostPoints(state.config),
      lastWeeklyReview: state.lastWeeklyReview ?? null,
      paperOnly: true,
    };
  },
});
