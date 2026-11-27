import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  STATE_KEY,
  emptyState,
  roundTripCostPoints,
  sizeFromStop,
  type PaperFill,
  type PaperState,
  type Side,
} from "../lib/paperLedger.js";

export default defineTool({
  description:
    "Open a NAS100 paper trade with hard stop. Refuses when halted, already in a position, or size is zero. Never places live broker orders.",
  effect: "write",
  inputSchema: z.object({
    skill: z.string(),
    side: z.enum(["long", "short"]),
    entry: z.number(),
    stop: z.number(),
    target: z.number().optional(),
    notes: z.string().optional(),
    qtyOverride: z.number().int().positive().optional(),
  }),
  async execute(input, ctx) {
    const state =
      ((await ctx.host.kv.get(STATE_KEY)) as PaperState | null) ?? emptyState();
    if (state.halted) {
      return {
        ok: false,
        reason: state.haltReason ?? "account halted",
        paperOnly: true,
      };
    }
    if (state.fills.some((f) => f.status === "open")) {
      return {
        ok: false,
        reason: "already has an open NAS100 position",
        paperOnly: true,
      };
    }
    const sized = sizeFromStop(state.config, input.entry, input.stop);
    const qty = input.qtyOverride ?? sized.qty;
    if (qty < 1) {
      return {
        ok: false,
        reason: "qty < 1 for stop distance — skip or use MNQ multiplier",
        sized,
        paperOnly: true,
      };
    }
    const fill: PaperFill = {
      id: `pt-${Date.now()}`,
      openedAt: new Date().toISOString(),
      skill: input.skill,
      side: input.side as Side,
      qty,
      entry: input.entry,
      stop: input.stop,
      target: input.target,
      costs: roundTripCostPoints(state.config),
      status: "open",
      notes: input.notes,
    };
    state.fills.push(fill);
    await ctx.host.kv.put(STATE_KEY, state);
    return { ok: true, fill, sized, paperOnly: true };
  },
});
