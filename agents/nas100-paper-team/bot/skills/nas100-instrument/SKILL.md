---
name: nas100-instrument
description: NAS100 / Nasdaq-100 instrument context for Vantage Markets CFD — symbols, sessions, lot sizing, costs, and data conventions. Use when trading or analyzing NAS100, US100, USTEC, NQ, or Nasdaq-100 CFDs/futures, especially on Vantage.
version: 1.1.0
---

# NAS100 Instrument (Vantage)

## Purpose
Standardize Nasdaq-100 references for the paper desk on **Vantage Markets**.

## Canonical symbols
| Role | Symbol | Notes |
| --- | --- | --- |
| Primary venue (desk default) | **Vantage** | Cash CFD |
| TradingView feed | `VANTAGE:NAS100` | US 100 Cash CFD |
| MT5 / MT4 symbol | `NAS100.r` (or `NAS100`) | Confirm in Market Watch — suffix can vary by account |
| Futures reference (optional) | `CME_MINI:NQ1!` | Cross-check only; not the paper fill book |
| Cash index | `TVC:NDX` | Spot — not the CFD |

Always state `VANTAGE:NAS100` for bars and the MT5 symbol for any platform notes.

## Contract & sizing (Vantage cash CFD)
| Spec | Paper default |
| --- | --- |
| Contract size | 1 index point |
| Point value | **$1 per point per 1.0 lot** |
| Min lot / step | **0.1 / 0.1** |
| Digits | 2 |
| Quote | USD |

`lots = floor( (equity × risk%) / (stop_points × $1) / 0.1 ) × 0.1`  
If lots < 0.1 → skip the trade.

## Sessions
Vantage NAS100 CFD trades nearly 24h (typical window ~23:00–21:00 GMT; confirm in the terminal). Desk still keys **strategy decisions** to US cash clocks:

| Window | America/New_York | Desk use |
| --- | --- | --- |
| Cash open / OR | 09:30–10:00 | Opening range |
| Core cash | 09:30–16:00 | Default intraday / noise-area |
| London/NY overlap | 08:00–11:00 | Preferred scalps |
| Flat-by (paper) | 15:55–16:00 | No overnight paper holds (avoid swap) |

Report times to Catherine in Europe/London with zone label; convert from NY/GMT explicitly.

## Cost model (paper default — freeze weekly)
- Spread: ~1.2 points (re-measure from live quote; raw/standard accounts differ)
- Slippage: 0.3 point per side on marketable orders
- Commission: 0 on typical standard; raw accounts — use account schedule
- Swap: charged if held overnight — paper desk flattens before NY close to avoid it

Reject setups when expected edge ≤ modeled round-turn cost.

## Data rules
- Prefer closed bars; forming bars are context only.
- Intervals: 1m/5m scalps; 5m/15m intraday; 1h bias.
- Pull `VANTAGE:NAS100` via TradingView `mcp-tv-get-ohlcv` (and calendar/news tools as needed).

## Key rules
- Paper-only unless Catherine explicitly authorizes live Vantage capital.
- Never invent fills — log mid/spread assumptions.
- One Vantage NAS100 book per paper week.
