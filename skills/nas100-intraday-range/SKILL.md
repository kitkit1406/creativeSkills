---
name: nas100-intraday-range
description: NAS100 range-bound mean-reversion during low-trend cash sessions. Use when ADX is weak and price oscillates between session levels.
version: 1.0.0
---

# NAS100 Intraday Range

## Purpose
Fade extremes inside a defined NAS100 session range when trend energy is low.

## Workflow
1. Confirm range: ADX(14) 15m below weekly threshold (default < 18) and clear session high/low.
2. Buy lower quartile / sell upper quartile with closed-bar rejection.
3. Stop outside range + buffer. Target mid-range or opposite quartile (R≥1.2 after costs).
4. Abort all range trades on a closed break of the range (hand off to breakout skill).
5. Prefer 11:00–14:00 NY lunch chop; avoid first 30 minutes unless range is already established.

## Key rules
- Cap at 3 range trades/day.
- Do not average losers.
