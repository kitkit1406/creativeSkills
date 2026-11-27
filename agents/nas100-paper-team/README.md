# nas100-paper-team

Agent SDK desk that paper-trades NAS100 and improves weekly.

## Venue
**Vantage Markets** NAS100 cash CFD — TradingView `VANTAGE:NAS100`, MT5 `NAS100.r`. Sized in lots ($1/point/lot, min 0.1).

## Roles
- Desk lead (this agent)
- `intraday-trader`, `scalper`, `risk-officer`, `weekly-coach` subagents

## Schedules (UTC)
| Schedule | Cron | Purpose |
| --- | --- | --- |
| `weekday-session` | `30 13 * * 1-5` | Weekday paper session (~08:30 America/New_York) |
| `weekly-improvement` | `0 17 * * 0` | Sunday improvement freeze |

## Local
```bash
npm install
npx @grok/agent-sdk validate --dir .
npx tsc --noEmit
npx @grok/agent-sdk tool call paperAccountStatus --dir . --input '{}'
npx @grok/agent-sdk login   # needed for model turns + TradingView account MCP
npx @grok/agent-sdk dev
```

TradingView: after `agent-sdk login`, copy `bot/mcp-connections/account.ts.example` to `account.ts` so the desk can read live bars. Without it, the paper ledger still works — never invent prices.

## Disclaimer
Educational paper trading only. Not financial advice.
