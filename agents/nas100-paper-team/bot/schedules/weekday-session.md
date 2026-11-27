---
cron: "30 13 * * 1-5"
---

Run the NAS100 paper trading session.

1. Call `paperAccountStatus`. If halted, journal only and stop.
2. Confirm America/New_York cash session context; use Vantage `VANTAGE:NAS100` (MT5 `NAS100.r`).
3. Delegate risk check to `risk-officer`.
4. Follow the weekly freeze primary skill (default `nas100-intraday-noise-area`). Optionally ask `scalper` only if scalp overlay is on.
5. If a valid setup exists after costs, open via `paperOpenTrade` with **both** `stop` (SL) and `target` (TP). Refuse opens without TP.
6. Flatten any open paper position before the end of this turn if the NY close is near or past 15:55.
7. Summarize with explicit **SL** and **TP** prices on every open fill. Paper only — no live orders.
