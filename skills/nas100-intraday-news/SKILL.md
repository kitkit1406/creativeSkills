---
name: nas100-intraday-news
description: NAS100 event-driven trading around scheduled US macro releases. Use for CPI, NFP, FOMC, and other high-impact calendars affecting Nasdaq-100.
version: 1.0.0
---

# NAS100 Intraday News

## Purpose
Trade NAS100 volatility around scheduled US releases with surprise scoring and execution gates.

## Workflow
1. Pull today's high-impact US events via `mcp-tv-get-economic-calendar`.
2. Record consensus, prior, and actual from primary sources when available.
3. Standardized surprise = (Actual − Consensus) / rolling surprise σ when history exists.
4. Pre-plan scenarios; do not assume a headline beat maps to one NQ direction.
5. Enter only after spread/liquidity gate and a closed-bar trigger (default wait ≥ 2 five-minute bars post-release unless mandate says otherwise).
6. Size from stress stop (wider ATR multiple). Flat by 15:55.

## Key rules
- Never use embargoed or material nonpublic information.
- Skip conflicting clustered releases.
- Paper desk default: stand aside 2 minutes before through 2 minutes after Tier-1 prints unless this skill is the active weekly playbook.
