---
name: nas100-weekly-improvement
description: Weekly self-improvement loop for the NAS100 paper desk — measure, change one lever, freeze next week's playbook. Use every week and after major drawdowns.
version: 1.0.0
---

# NAS100 Weekly Improvement

## Purpose
Improve the paper desk with one controlled change per week (hillclimb discipline).

## Cadence
Run every Sunday 17:00 UTC (or next quiet slot). Input: prior week journal + ledger.

## Loop
1. **Measure** — expectancy R, profit factor, max DD, rule-break count, per-skill breakdown, cost drag.
2. **Name one failure mode** — e.g. "ORB stops too tight after costs".
3. **Change one lever** — entry buffer, session filter, skill promotion/demotion, size, or halt threshold.
4. **Freeze next week playbook** — primary skill, backup skill, scalp overlay on/off, exact parameters.
5. **Lock** — write the freeze into the paper config; do not change mid-week unless daily loss halt trips a safety patch.

## Promotion rules
- Promote a skill only with ≥20 paper trades and positive net expectancy after costs.
- Demote if 2 consecutive weeks of negative expectancy at ≥10 trades.
- Prefer `nas100-intraday-noise-area` as the research-backed candidate when ORB is flat/negative.

## Output template
```
### Week N review
- Metrics: …
- Failure mode: …
- Lever change: …
- Next freeze: …
- Halt status: …
```
