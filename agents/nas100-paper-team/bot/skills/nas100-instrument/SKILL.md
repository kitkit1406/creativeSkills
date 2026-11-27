---
name: nas100-instrument
description: NAS100 / Nasdaq-100 instrument context — symbols, sessions, costs, and data conventions for paper and live study. Use when trading or analyzing NAS100, US100, USTEC, NQ, or Nasdaq-100 CFDs/futures.
version: 1.0.0
---

# NAS100 Instrument

## Purpose
Standardize how the desk refers to Nasdaq-100 so every strategy skill uses the same symbol, session clock, and cost assumptions.

## Canonical symbols
| Role | Symbol | Notes |
| --- | --- | --- |
| Primary paper feed | `CME_MINI:NQ1!` | Front-month E-mini Nasdaq-100 (TradingView) |
| CFD aliases | NAS100, US100, USTEC | Broker-dependent; map once per venue |
| Cash index | `TVC:NDX` | Spot index — not tradeable CFD |

Always state the exact `EXCHANGE:TICKER` used for bars and fills.

## Sessions (America/New_York)
| Window | Clock | Desk use |
| --- | --- | --- |
| Pre-market | 04:00–09:30 | Context only unless a skill allows it |
| Cash open / OR | 09:30–10:00 | Opening range construction |
| Core cash | 09:30–16:00 | Default intraday window |
| London/NY overlap | 08:00–11:00 | Higher liquidity for scalps |
| Flat-by | 15:55–16:00 | No overnight NAS100 paper positions |

Convert all timestamps to America/New_York before decisions. Report times with zone label.

## Cost model (paper default)
Freeze these assumptions in the paper ledger before a week starts:
- Spread: 1.0 NQ point round-turn equivalent (adjust per venue study)
- Slippage: 0.25 point per side on marketable orders
- Commission: 0 unless venue-specific
- Point value: paper desk defaults to **MNQ $2/point** sizing on NQ prices; E-mini NQ = $20/point if explicitly configured

Reject a setup when expected edge ≤ modeled round-turn cost.

## Data rules
- Prefer closed bars for signals; forming bars are context only.
- Intraday intervals: 1m / 5m for scalps; 5m / 15m for intraday; 1h for bias.
- Use TradingView `mcp-tv-get-ohlcv`, `mcp-tv-get-technicals-rating`, `mcp-tv-get-economic-calendar`, `mcp-tv-get-news`.

## Key rules
- Paper-only unless Catherine explicitly authorizes live capital.
- Never invent fills — record price, time, spread, and slippage assumptions.
- One instrument book per paper account week (NQ front month).
