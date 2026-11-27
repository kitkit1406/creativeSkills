import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  DEFAULT_CONFIG,
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
    qtyOverride: z.number().positive().optional(),
  }),
  async execute(input, ctx) {
    const state =
      ((await ctx.host.kv.get(STATE_KEY)) as PaperState | null) ?? emptyState();
    // Migrate legacy configs to Vantage defaults when fields are missing.
    state.config = { ...DEFAULT_CONFIG, ...state.config };
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
    if (qty < state.config.minLot) {
      return {
        ok: false,
        reason: `lots < ${state.config.minLot} for stop distance — skip or widen risk budget`,
        sized,
        paperOnly: true,
        venue: state.config.venue,
        symbol: state.config.symbol,
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
    return {
      ok: true,
      fill,
      sized,
      paperOnly: true,
      venue: state.config.venue,
      symbol: state.config.symbol,
      mt5Symbol: state.config.mt5Symbol,
    };
  },
});
