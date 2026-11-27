---
name: nas100-scalping-momentum
description: NAS100 1m–5m momentum scalps. Use for short-hold Nasdaq-100 trades when spread and slippage still leave positive expectancy.
version: 1.0.0
---

# NAS100 Scalping — Momentum

## Purpose
Capture small NAS100 thrusts on 1m with 5m bias.

## Setup
- 5m EMA slope or open-to-now bias aligned.
- 1m closed momentum bar (range ≥ 0.4×ATR(1m,14)) with close in upper/lower 25% of its range.
- Cost gate: target ≥ 2.5× modeled round-turn cost.

## Execution
- Entry: next 1m open or limit inside bar.
- Stop: 1.0–1.5× 1m ATR beyond entry extreme.
- Target: 1.5R or first opposing micro-structure.
- Time stop: 8 minutes.
- Max concurrent scalps: 1. Max losers then pause: 3.

## Session
Prefer London/NY overlap and first 90 minutes of cash. Avoid 12:00–13:30 NY unless volatility expands.
