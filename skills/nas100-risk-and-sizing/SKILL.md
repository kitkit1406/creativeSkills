---
name: nas100-risk-and-sizing
description: Position sizing and risk limits for Vantage NAS100 CFD paper trading (lot-based). Use before every order and during weekly risk review.
version: 1.1.0
---

# NAS100 Risk and Sizing (Vantage)

## Defaults (paper)
| Limit | Value |
| --- | --- |
| Risk per trade | 0.5% equity (intraday) / 0.25% (scalp) |
| Daily loss halt | 2.0% equity |
| Weekly loss halt | 5.0% equity |
| Max open positions | 1 NAS100 directional |
| Max correlated add | 0 |
| Point value | $1 / point / 1.0 lot |
| Min lot / step | 0.1 / 0.1 |

## Sizing
```
lots = floor( risk_dollars / (stop_points × 1) / 0.1 ) × 0.1
```
If lots < 0.1 → skip. Do not round up through the risk budget.

## Rules
- Size from stop distance; never from conviction adjectives.
- Reduce size 50% after daily loss reaches 1%.
- Hard stop always attached in the ledger at entry.
- Overnight holds are off by default (swap + gap risk).
