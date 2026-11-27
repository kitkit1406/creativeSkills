import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  DEFAULT_CONFIG,
  STATE_KEY,
  emptyState,
  type PaperConfig,
  type PaperState,
} from "../lib/paperLedger.js";

export default defineTool({
  description:
    "Update the NAS100 paper weekly freeze: primary/backup skills, scalp overlay, risk limits, or reset day P&L. Does not enable live trading.",
  effect: "write",
  inputSchema: z.object({
    primarySkill: z.string().optional(),
    backupSkill: z.string().optional(),
    scalpOverlay: z.boolean().optional(),
    riskPerTradePct: z.number().positive().max(2).optional(),
    dailyLossHaltPct: z.number().positive().max(10).optional(),
    weeklyLossHaltPct: z.number().positive().max(20).optional(),
    weekId: z.string().optional(),
    resetDayPnl: z.boolean().optional(),
    clearHalt: z.boolean().optional(),
    weeklyReviewNote: z.string().optional(),
  }),
  async execute(input, ctx) {
    const state =
      ((await ctx.host.kv.get(STATE_KEY)) as PaperState | null) ?? emptyState();
    const next: PaperConfig = { ...DEFAULT_CONFIG, ...state.config };
    if (input.primarySkill) next.primarySkill = input.primarySkill;
    if (input.backupSkill) next.backupSkill = input.backupSkill;
    if (input.scalpOverlay !== undefined) next.scalpOverlay = input.scalpOverlay;
    if (input.riskPerTradePct !== undefined)
      next.riskPerTradePct = input.riskPerTradePct;
    if (input.dailyLossHaltPct !== undefined)
      next.dailyLossHaltPct = input.dailyLossHaltPct;
    if (input.weeklyLossHaltPct !== undefined)
      next.weeklyLossHaltPct = input.weeklyLossHaltPct;
    if (input.weekId) next.weekId = input.weekId;
    state.config = next;
    if (input.resetDayPnl) state.dayPnl = 0;
    if (input.clearHalt) {
      state.halted = false;
      state.haltReason = undefined;
    }
    if (input.weeklyReviewNote) {
      state.lastWeeklyReview = input.weeklyReviewNote;
    }
    await ctx.host.kv.put(STATE_KEY, state);
    return { ok: true, config: state.config, paperOnly: true };
  },
});
