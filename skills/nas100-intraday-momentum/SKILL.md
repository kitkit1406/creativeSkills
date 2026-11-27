---
name: nas100-intraday-momentum
description: NAS100 short-horizon directional momentum during the cash session. Use for trend-day continuation on NQ with ADX/return regime gates and exhaustion exits.
version: 1.0.0
---

# NAS100 Intraday Momentum

## Purpose
Enter confirmed NAS100 directional moves and ride until momentum decays.

## Regime gate (freeze weekly)
On 15m: ADX(14) above training percentile (default ≥ 22) and signed return from 09:30 open aligned with trade direction.

## Workflow
1. Bias from 15m/1h structure and open-to-now return.
2. Entry on 5m: closed-bar break of prior swing in bias direction, or pullback to VWAP/EMA that holds.
3. Stop beyond structure + 0.2×ATR. Trail only with a predeclared rule (swing lows/highs or VWAP).
4. Exit on exhaustion: shrinking range + adverse close through trail, or time stop at 15:55.
5. Max 2 momentum trades per session.

## Key rules
- Do not stack correlated indicators as independent votes.
- If regime gate fails → `no-trade` (do not silently switch to mean-reversion).
