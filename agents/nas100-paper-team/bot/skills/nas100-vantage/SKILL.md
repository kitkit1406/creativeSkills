---
name: nas100-vantage
description: Vantage Markets venue playbook for NAS100 cash CFD — MT5 symbol, lot rules, hours, swap avoidance, and paper-desk mapping. Use when the broker is Vantage, MT5 NAS100.r, or VANTAGE:NAS100.
version: 1.0.0
---

# NAS100 on Vantage

## Purpose
Map every desk action to **Vantage Markets** Nasdaq-100 cash CFD conventions.

## Identity
| Item | Value |
| --- | --- |
| Broker | Vantage Markets |
| Product | NAS100 cash CFD |
| TradingView | `VANTAGE:NAS100` |
| MT5 (typical) | `NAS100.r` |
| Also listed | `NAS100`, `NAS100ft` (future — do not mix with cash book) |

If Market Watch shows a different suffix, freeze that exact string in the weekly config and journal it.

## Execution notes
- Market execution / IOC-style fills — expect slippage; do not assume requotes.
- Attach hard stop in the **paper ledger** at entry (and on live only if Catherine authorizes).
- Lot grid: min **0.1**, step **0.1**. Normalize before any size proposal.
- Prefer cash session edge; treat Asia liquidity as context unless the weekly freeze opens it.

## Paper desk mapping
1. Bars & levels from `VANTAGE:NAS100`.
2. Size with `nas100-risk-and-sizing` using $1/point/lot.
3. Open/close only via paper tools until live is explicitly enabled.
4. Flat by 15:55 America/New_York to skip overnight swap in the paper mandate.

## Handoffs
- Instrument detail → `nas100-instrument`
- Strategies → `nas100-intraday-*` / `nas100-scalping-*`
- Orchestration → `nas100-paper-trading-desk`

## Key rules
- Never confuse cash CFD with `NAS100ft` futures CFD.
- Never invent Vantage margin/leverage — read from the account or skip.
- Paper only by default.
