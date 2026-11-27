---
name: nas100-intraday-pullback
description: NAS100 trend pullback entries on 5m/15m. Use when buying dips or selling rallies in an established intraday Nasdaq-100 trend.
version: 1.0.0
---

# NAS100 Intraday Pullback

## Purpose
Enter with the intraday trend after a measured retracement on NAS100.

## Workflow
1. Define trend on 15m with objective swing rule (HH/HL or LH/LL).
2. Measure pullback depth as % of prior impulse on 5m.
3. Entry zone: tested band (default 38–62% of impulse) coinciding with VWAP or prior swing.
4. Trigger: closed 5m rejection in trend direction.
5. Stop beyond pullback extreme + buffer. Target prior impulse high/low then trail.
6. Invalid if higher-timeframe structure breaks. Flat by 15:55.

## Key rules
- No counter-trend "catch the knife" without a weekly fade mandate.
- One pullback attempt per impulse.
