# creativeSkills

Cursor plugin with skills for creative marketing and product build work.

## Skills

| Skill | Use when |
| --- | --- |
| `creative-marketing` | Telegram ads, Canva briefs, CRM tutorials, short promo video/copy |
| `app-and-website-designer` | UX, IA, visual direction, wireframes, design systems |
| `cto` | Architecture, stack, engineering standards, delivery decisions |
| `web-and-app-designer` | Implementing polished web/app UI in code |
| `web-and-app-inspector` | Reviewing built surfaces for UX, a11y, responsive, and polish |

## Install

In Cursor: **Customize → From GitHub Repository** and import `kitkit1406/creativeSkills` (requires the `.cursor-plugin/marketplace.json` in this repo), then install the `creative-skills` plugin.

## Layout

```text
.cursor-plugin/
  plugin.json
  marketplace.json
skills/
  creative-marketing/SKILL.md
  app-and-website-designer/SKILL.md
  cto/SKILL.md
  web-and-app-designer/SKILL.md
  web-and-app-inspector/SKILL.md
nearxx/
  index.html
  styles.css
  app.js
```

## NEARXX demo

Static recreation of the provider onboarding Step 1 screen (“Your name and contact”):

```bash
cd nearxx && python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`.
