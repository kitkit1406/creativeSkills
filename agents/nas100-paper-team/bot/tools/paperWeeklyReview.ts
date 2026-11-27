import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import { STATE_KEY, emptyState, type PaperState } from "../lib/paperLedger.js";

export default defineTool({
  description:
    "Compute NAS100 paper week metrics and optionally store the weekly improvement note + next freeze.",
  effect: "idempotent",
  inputSchema: z.object({
    reviewNote: z.string().optional(),
    nextPrimarySkill: z.string().optional(),
    nextBackupSkill: z.string().optional(),
    nextScalpOverlay: z.boolean().optional(),
    nextWeekId: z.string().optional(),
  }),
  async execute(input, ctx) {
    const state =
      ((await ctx.host.kv.get(STATE_KEY)) as PaperState | null) ?? emptyState();
    const closed = state.fills.filter((f) => f.status !== "open" && f.rMultiple != null);
    const wins = closed.filter((f) => (f.rMultiple ?? 0) > 0);
    const losses = closed.filter((f) => (f.rMultiple ?? 0) <= 0);
    const sumR = closed.reduce((a, f) => a + (f.rMultiple ?? 0), 0);
    const sumWin = wins.reduce((a, f) => a + (f.pnl ?? 0), 0);
    const sumLoss = Math.abs(losses.reduce((a, f) => a + (f.pnl ?? 0), 0));
    const bySkill: Record<string, { n: number; sumR: number; pnl: number }> = {};
    for (const f of closed) {
      const row = bySkill[f.skill] ?? { n: 0, sumR: 0, pnl: 0 };
      row.n += 1;
      row.sumR += f.rMultiple ?? 0;
      row.pnl += f.pnl ?? 0;
      bySkill[f.skill] = row;
    }
    const metrics = {
      trades: closed.length,
      winRate: closed.length ? wins.length / closed.length : 0,
      expectancyR: closed.length ? sumR / closed.length : 0,
      profitFactor:
        sumLoss > 0 ? sumWin / sumLoss : sumWin > 0 ? null : 0,
      weekPnl: state.weekPnl,
      bySkill,
    };
    if (input.nextPrimarySkill) state.config.primarySkill = input.nextPrimarySkill;
    if (input.nextBackupSkill) state.config.backupSkill = input.nextBackupSkill;
    if (input.nextScalpOverlay !== undefined)
      state.config.scalpOverlay = input.nextScalpOverlay;
    if (input.nextWeekId) {
      state.config.weekId = input.nextWeekId;
      state.weekPnl = 0;
      state.dayPnl = 0;
      state.halted = false;
      state.haltReason = undefined;
    }
    if (input.reviewNote) state.lastWeeklyReview = input.reviewNote;
    await ctx.host.kv.put(STATE_KEY, state);
    return {
      metrics,
      config: state.config,
      lastWeeklyReview: state.lastWeeklyReview ?? null,
      paperOnly: true,
    };
  },
});
