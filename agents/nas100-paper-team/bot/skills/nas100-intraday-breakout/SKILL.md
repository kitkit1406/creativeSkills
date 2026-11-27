---
name: nas100-intraday-breakout
description: NAS100 closed-bar consolidation breakouts during the US cash session. Use for horizontal, pattern, or opening-range breakouts on NQ/NAS100 with cost-aware invalidation.
version: 1.0.0
---

# NAS100 Intraday Breakout

## Purpose
Trade explosive moves when NAS100 leaves a defined consolidation on closed bars during the cash session.

## Identification
- **Horizontal**: 3+ touches of the same high/low within the session or prior day.
- **Pattern**: triangle / flag / wedge completion on 5m–15m.
- **Opening-range linked**: break of the 09:30–10:00 NY range after 10:00.

## Workflow
1. Load `CME_MINI:NQ1!` 5m (and 15m bias) via `mcp-tv-get-ohlcv`.
2. Mark consolidation high/low and width in points and ATR(14).
3. Require closed bar beyond the level by a predeclared buffer (default 0.15×ATR).
4. Participation: breakout-bar volume ≥ session time-of-day median when volume is available; otherwise skip volume filter and note it.
5. Entry: next bar open after confirmed close, or first retest within 6 bars (freeze which rule for the week).
6. Stop: back inside range + buffer. Target: 1× consolidation height (R≥1.5 after costs).
7. Flat by 15:55 NY.

## Report
Type, level, buffer, entry, stop, target, R:R after costs, status `valid|watch|no-trade`.

## Key rules
- Wick alone is not an entry.
- Do not widen stops mid-trade.
- Skip when spread/slippage model eats the edge.
