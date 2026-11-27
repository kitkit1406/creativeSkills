import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import { STATE_KEY, emptyState, type PaperState } from "../lib/paperLedger.js";

export default defineTool({
  description: "List NAS100 paper fills, optionally filtered by status or skill.",
  effect: "read",
  inputSchema: z.object({
    status: z
      .enum(["open", "closed", "stopped", "target", "flat", "any"])
      .default("any"),
    skill: z.string().optional(),
    limit: z.number().int().positive().max(100).default(50),
  }),
  async execute(input, ctx) {
    const state =
      ((await ctx.host.kv.get(STATE_KEY)) as PaperState | null) ?? emptyState();
    let fills = [...state.fills].reverse();
    if (input.status !== "any") {
      fills = fills.filter((f) => f.status === input.status);
    }
    if (input.skill) {
      fills = fills.filter((f) => f.skill === input.skill);
    }
    return {
      fills: fills.slice(0, input.limit),
      total: fills.length,
      paperOnly: true,
    };
  },
});
