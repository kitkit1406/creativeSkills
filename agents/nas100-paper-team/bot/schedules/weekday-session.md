---
cron: "30 13 * * 1-5"
---

Run the NAS100 paper trading session.

1. Call `paperAccountStatus`. If halted, journal only and stop.
2. Confirm America/New_York cash session context; use `CME_MINI:NQ1!`.
3. Delegate risk check to `risk-officer`.
4. Follow the weekly freeze primary skill (default `nas100-intraday-noise-area`). Optionally ask `scalper` only if scalp overlay is on.
5. If a valid setup exists after costs, open and manage via paper tools only.
6. Flatten any open paper position before the end of this turn if the NY close is near or past 15:55.
7. Summarize decisions, fills, and open risk. Paper only — no live orders.
