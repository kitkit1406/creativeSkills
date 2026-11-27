---
name: nas100-intraday-noise-area
description: NAS100 noise-area intraday momentum — trade breaks of a volatility band around the cash open. Use for half-hour checks from 10:00–15:30 NY on NQ.
version: 1.0.0
---

# NAS100 Noise-Area Momentum

## Purpose
Capture full-session NAS100 momentum when price leaves a "normal" noise band around the open. Inspired by published intraday-momentum / noise-area research (educational adaptation for paper trading).

## Definitions
- Session open O = 09:30 NY open.
- σ = average |close − open| / open over the prior 14 cash sessions (or ATR-based proxy when history is short).
- Upper = max(O, prior close) × (1+σ); Lower = min(O, prior close) × (1−σ). After a gap, widen by the gap as documented in the weekly config.

## Workflow
1. At each half-hour mark 10:00, 10:30, …, 15:30 NY, evaluate the completed bar.
2. Long if close > upper; short if close < lower; else flat/hold.
3. Exit / reverse when a check finds price on the other side of the band (optional VWAP stop: long exits below max(upper, VWAP)).
4. Forced flat at 16:00 NY.
5. Size: exposure = min(4, 2% / 14-day daily vol) × equity (paper). Hard disaster stop 3% away.

## Key rules
- Decisions only on scheduled checks — ignore intra-interval spikes.
- One position at a time.
- Record every check even when no trade (for weekly learning).
