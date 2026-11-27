---
name: nas100-risk-and-sizing
description: Position sizing and risk limits for NAS100 paper trading. Use before every order and during weekly risk review.
version: 1.0.0
---

# NAS100 Risk and Sizing

## Defaults (paper)
| Limit | Value |
| --- | --- |
| Risk per trade | 0.5% equity (intraday) / 0.25% (scalp) |
| Daily loss halt | 2.0% equity |
| Weekly loss halt | 5.0% equity |
| Max open positions | 1 NAS100 directional |
| Max correlated add | 0 |

## Sizing
`contracts = floor( risk_dollars / (stop_points × point_value) )`
Paper desk default point_value = **$2 (MNQ)**. Use $20 only when the weekly freeze explicitly selects E-mini. If contracts < 1 → skip or tighten stop / raise risk budget.

## Rules
- Size from stop distance; never from conviction adjectives.
- Reduce size 50% after daily loss reaches 1%.
- Hard stop always attached in the ledger at entry.
