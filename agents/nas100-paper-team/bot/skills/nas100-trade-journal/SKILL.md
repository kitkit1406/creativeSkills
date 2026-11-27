---
name: nas100-trade-journal
description: Structured NAS100 paper trade journaling and metrics. Use after every trade and when preparing the weekly improvement review.
version: 1.0.0
---

# NAS100 Trade Journal

## Per-trade record
- id, timestamp (NY), skill used, symbol, side
- entry, stop, target, exit, points, R, costs
- setup screenshot refs / bar timestamps
- thesis (1 line), outcome vs thesis, rule breaks

## Daily rollup
Trades, win%, expectancy R, profit factor, max DD, time-of-day heatmap, skill breakdown.

## Weekly rollup
Same metrics plus: which skill had edge, which failed cost gate, proposed rule freezes for next week.

## Key rules
- Log scratches and skipped valid setups too.
- No deleting losing trades.
