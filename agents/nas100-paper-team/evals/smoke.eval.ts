import { defineEval, includes } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  cases: [
    {
      id: "paper-status",
      description: "Checks paper account and stays paper-only.",
      async test(t) {
        await t.send(
          "Check the NAS100 paper account status and confirm we are paper-only.",
        );
        t.succeeded();
        t.calledTool("paperAccountStatus");
        t.check(t.reply, includes(/paper/i));
      },
    },
  ],
});
