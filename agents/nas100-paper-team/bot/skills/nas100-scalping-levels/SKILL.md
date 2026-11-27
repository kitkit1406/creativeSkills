---
name: nas100-scalping-levels
description: NAS100 level-rejection scalps at VWAP, prior day high/low, and round numbers. Use for quick mean-reversion ticks on NQ.
version: 1.0.0
---

# NAS100 Scalping — Levels

## Purpose
Trade quick rejections at predeclared NAS100 levels.

## Levels to mark each session
- Prior day high/low/close
- Session VWAP
- Opening range high/low after 10:00
- Round numbers (every 50–100 NQ points)

## Workflow
1. Wait for price to tag level.
2. Require closed 1m rejection (wick through, close back inside).
3. Stop beyond wick extreme + 0.5 point buffer.
4. Target: 1.5–2.0R toward VWAP or next level.
5. Cancel if not filled within 3 minutes.

## Key rules
- No chase after a clean break-and-hold through the level.
- Skip when 1m ATR is below the cost floor.
