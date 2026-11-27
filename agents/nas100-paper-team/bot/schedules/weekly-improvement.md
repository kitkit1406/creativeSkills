---
cron: "0 17 * * 0"
---

Run the NAS100 weekly self-improvement review.

1. Call `paperWeeklyReview` for metrics (do not invent trades).
2. Delegate analysis to `weekly-coach`.
3. Change exactly one lever for next week.
4. Freeze `primarySkill`, `backupSkill`, `scalpOverlay`, and a new `weekId` via `paperWeeklyReview` / `paperUpdateConfig`.
5. Output the Week N review template from `nas100-weekly-improvement`.
6. Paper only. Do not enable live trading.
