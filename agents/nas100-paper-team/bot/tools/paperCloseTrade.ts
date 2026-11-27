import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  STATE_KEY,
  applyClose,
  emptyState,
  type PaperState,
} from "../lib/paperLedger.js";

export default defineTool({
  description:
    "Close the open NAS100 paper trade at a given exit price and update day/week P&L and halt flags.",
  effect: "write",
  inputSchema: z.object({
    exit: z.number(),
    status: z
      .enum(["closed", "stopped", "target", "flat"])
      .default("closed"),
    tradeId: z.string().optional(),
  }),
  async execute(input, ctx) {
    const state =
      ((await ctx.host.kv.get(STATE_KEY)) as PaperState | null) ?? emptyState();
    const open = state.fills.find(
      (f) =>
        f.status === "open" &&
        (input.tradeId ? f.id === input.tradeId : true),
    );
    if (!open) {
      return { ok: false, reason: "no open trade", paperOnly: true };
    }
    const closed = applyClose(
      open,
      input.exit,
      state.config,
      input.status,
      new Date().toISOString(),
    );
    state.fills = state.fills.map((f) => (f.id === open.id ? closed : f));
    state.dayPnl += closed.pnl ?? 0;
    state.weekPnl += closed.pnl ?? 0;
    const dayHalt =
      (state.config.equity * state.config.dailyLossHaltPct) / 100;
    const weekHalt =
      (state.config.equity * state.config.weeklyLossHaltPct) / 100;
    if (state.dayPnl <= -dayHalt) {
      state.halted = true;
      state.haltReason = "daily loss halt";
    }
    if (state.weekPnl <= -weekHalt) {
      state.halted = true;
      state.haltReason = "weekly loss halt";
    }
    await ctx.host.kv.put(STATE_KEY, state);
    return {
      ok: true,
      fill: closed,
      dayPnl: state.dayPnl,
      weekPnl: state.weekPnl,
      halted: state.halted,
      haltReason: state.haltReason ?? null,
      paperOnly: true,
    };
  },
});
