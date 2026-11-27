---
name: nas100-intraday-opening-range
description: NAS100 opening-range (09:30–10:00 NY) breakout and position rules. Use for classic ORB-style intraday Nasdaq-100 paper trades.
version: 1.0.0
---

# NAS100 Opening Range

## Purpose
Trade the break of the first 30-minute cash range on NAS100.

## Rule (weekly freeze)
| Item | Default |
| --- | --- |
| OR window | 09:30–10:00 America/New_York inclusive |
| Signal | First closed 5m beyond OR high/low after 10:00 |
| Stop | Opposite OR side (or OR midpoint if width > 1.5×ATR) |
| Target | 1R then optional runner to 2R |
| Forced exit | 15:55 NY |
| Max trades | 1 per direction per day |

## Workflow
1. Build OR high/low from 1m or 5m bars.
2. Wait for closed break with buffer 0.1×ATR.
3. Size from stop distance and 0.5% account risk (paper default).
4. Log OR width — skip days when OR width < 8 NQ points or > 80 points (illiquid or already extended).

## Honesty note
Plain ORB edges on Nasdaq have degraded in some public research after ~2021 once costs are included. Treat this as a paper hypothesis; prefer `nas100-intraday-noise-area` when the weekly coach promotes it.
