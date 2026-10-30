# LevStream

Demo streaming web + installable PWA inspired by the product shape of Israeli TV aggregators (live TV, radio, VOD, packages, multi-language).

## What you get

- **Live TV** channel grid with HLS demo playback
- **Radio** stations with audio-focused player
- **VOD** catalog (news, sport, kids, series, movies, …)
- **Packages** with one-time demo subscription gating
- **Account / devices** management (local demo session)
- **Hebrew / English / Russian** with RTL support
- **PWA** manifest + service worker (Add to Home Screen)

## Important

This ships **public sample streams only**. It is not a clone of any third-party catalog and must not be used to retransmit copyrighted channels without licenses. Wire licensed CDN/HLS sources and a real payments backend before production.

## Run

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo login: any email/password. Buy a package to unlock playback.

## Stack

Next.js (App Router), React, TypeScript, Tailwind, hls.js.
