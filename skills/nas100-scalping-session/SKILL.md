---
name: nas100-scalping-session
description: NAS100 scalping session protocol — preflight, risk caps, tilt breaks, and flat-check. Use at start/end of every scalping session and after consecutive losers.
version: 1.0.0
---

# NAS100 Scalping Session

## Purpose
Operate a disciplined NAS100 scalp session so the desk survives variance.

## Preflight
1. Confirm paper account equity, open risk, and daily loss used.
2. Check spread proxy via recent 1m high-low vs median.
3. Set session loss limit: 1.0% equity (default).
4. Set max trades: 12.
5. Load levels and 5m bias.

## During
- Track every fill: time, side, price, stop, target, slippage vs mid.
- After 3 consecutive losers → 10-minute pause.
- Hit session loss limit → stop trading; journal only.

## Close
1. Flat all NAS100 scalps by 15:50 NY.
2. Verify no open orders/positions in the paper ledger.
3. Emit session metrics: trades, win rate, expectancy R, max DD, rule breaks.

## Key rules
- Scalps never hold overnight.
- No revenge size increases.
