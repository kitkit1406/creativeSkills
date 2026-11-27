---
name: nas100-intraday-gap
description: NAS100 cash-open gap continuation and fade setups. Use when analyzing the 09:30 NY open gap versus prior close on NQ/NAS100.
version: 1.0.0
---

# NAS100 Intraday Gap

## Purpose
Trade the cash-open gap on NAS100 with a frozen continuation-or-fade rule for the week.

## Definitions
- Gap % = (Open_09:30 − Prior_Close) / Prior_Close
- Gap points = Open_09:30 − Prior_Close (NQ points)

## Workflow
1. Pull prior session close and today 1m/5m from open via `mcp-tv-get-ohlcv`.
2. Classify gap size vs 20-day |gap| median: small / normal / large.
3. Check overnight news/calendar with `mcp-tv-get-economic-calendar` and `mcp-tv-get-news`.
4. Choose one weekly rule:
   - **Continuation**: after first 5m close holds beyond open in gap direction.
   - **Fade**: after first reclaim of prior close with rejection of gap extreme.
5. Stop beyond gap extreme (+ buffer). Target: prior close (fade) or 1R measured move (continuation).
6. No new entries after 11:30 NY. Flat by 15:55.

## Key rules
- Never both continue and fade the same gap in one session.
- Skip large gaps on major event days unless the weekly mandate allows event risk.
