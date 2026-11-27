# creativeSkills

Cursor plugin with skills for creative marketing, product builds, and a NAS100 paper-trading desk.

## Skills

### Creative & product
| Skill | Use when |
| --- | --- |
| `creative-marketing` | Telegram ads, Canva briefs, CRM tutorials, short promo video/copy |
| `app-and-website-designer` | UX, IA, visual direction, wireframes, design systems |
| `cto` | Architecture, stack, engineering standards, delivery decisions |
| `web-and-app-designer` | Implementing polished web/app UI in code |
| `web-and-app-inspector` | Reviewing built surfaces for UX, a11y, responsive, and polish |

### NAS100 intraday
| Skill | Use when |
| --- | --- |
| `nas100-instrument` | Symbols, sessions, costs, data conventions |
| `nas100-intraday-breakout` | Consolidation / level breakouts |
| `nas100-intraday-gap` | Cash-open gap continue / fade |
| `nas100-intraday-momentum` | Trend-day continuation |
| `nas100-intraday-news` | Macro event windows |
| `nas100-intraday-pullback` | Trend pullback entries |
| `nas100-intraday-range` | Mean-reversion in chop |
| `nas100-intraday-opening-range` | Classic 09:30–10:00 ORB |
| `nas100-intraday-noise-area` | Half-hour noise-band momentum |

### NAS100 scalping
| Skill | Use when |
| --- | --- |
| `nas100-scalping-momentum` | 1m–5m thrust scalps |
| `nas100-scalping-levels` | VWAP / PDH / round-number rejections |
| `nas100-scalping-range` | Micro-range fades |
| `nas100-scalping-session` | Session preflight, tilt breaks, flat-check |

### Desk ops
| Skill | Use when |
| --- | --- |
| `nas100-risk-and-sizing` | Position size and halt limits |
| `nas100-trade-journal` | Trade logs and metrics |
| `nas100-paper-trading-desk` | Orchestrating the paper team |
| `nas100-weekly-improvement` | Weekly measure → one lever → freeze |

## Paper-trading team agent

See [`agents/nas100-paper-team/`](agents/nas100-paper-team/) for an Agent SDK team that:

- Paper-trades NAS100 (`CME_MINI:NQ1!`) with a simulated ledger
- Delegates to intraday, scalper, risk, and weekly-coach subagents
- Runs weekday session + Sunday improvement schedules

```bash
cd agents/nas100-paper-team
npm install
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk dev
```

## Install (plugin)

In Cursor: **Customize → From GitHub Repository** and import `kitkit1406/creativeSkills`, then install the `creative-skills` plugin.

## Layout

```text
.cursor-plugin/
  plugin.json
  marketplace.json
skills/
  …creative + nas100 skills…
agents/
  nas100-paper-team/   # Agent SDK paper desk
```

## Disclaimer

Skills and the paper team are for education and simulation only. They are not financial advice. Past simulated results do not predict live trading outcomes.
