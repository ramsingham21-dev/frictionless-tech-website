# Frictionless Tech website

Marketing site for Frictionless Tech, built with Next.js 16 (App Router), React 19, three.js via React Three Fiber, and Remotion.
The look is a Vox-style paper theme: newsprint, cut paper, masking tape and an amber highlighter, with golden-ratio type and spacing. See [DESIGN.md](DESIGN.md) for the palette, type scale and motion choices.

## Run it

Needs Node 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run build && npm start
```

## Where to edit things

| What | Where |
| --- | --- |
| All page copy, contact details, team, statuses | `lib/content.ts` |
| Colours, type, spacing, glass, motion | `app/globals.css` (tokens at the top) |
| Team photos and bios | `public/team/` and `team.founders` in `lib/content.ts` |
| Team player card | `components/reactbits/ProfileCard.tsx` and `.css` (adapted from React Bits) |
| Loading screen | `components/Loader.tsx` (timing at the top of the file) |
| Logo | `components/Logo.tsx` (traced from the official artwork; recolour with CSS `color` and `--logo-dot`). Standalone files in `public/brand/` |
| How It Works scan animation | `remotion/ScanStory.tsx` (timeline in `remotion/constants.ts`) |
| Component status badges (Implemented, In testing, Planned) | `status` on each item in `technology.layers` |
| Privacy Policy and Terms text | `app/privacy/page.tsx`, `app/terms/page.tsx` |
| Live domain for metadata, sitemap and robots | `site.url` in `lib/content.ts` |

Any text written as `[FILL: ...]` shows on the page as a dashed placeholder chip. Replace it with the real value and the chip disappears. To find every open slot:

```bash
grep -rn "\[FILL:" lib app
```

## How It Works animation (Remotion)

The scan walkthrough is a Remotion composition, `remotion/ScanStory.tsx`. On the site it is embedded with `@remotion/player` and never plays by itself: the scroll position of the five steps picks the frame, so scrolling scrubs the scan forwards and backwards (`components/sections/HowItWorks.tsx`). Each step owns 60 frames of the 300-frame timeline.

Preview or edit it in Remotion Studio:

```bash
npm run remotion:studio
```

Render it as a video, for a pitch deck or social post:

```bash
npm run remotion:render
```

Remotion is free for individuals and companies of up to three people. Larger teams need a Remotion company license; see https://remotion.dev/license.

## Header

The header starts tall with the full stacked logo and shrinks to the logo mark over the first 180px of scroll. The distance is `SHRINK_DISTANCE` in `components/Header.tsx`; the two heights are `--hdr-top` and `--hdr-min` in `app/globals.css`.

## Enquiry form

The form validates the visitor's entries in their browser and opens the visitor's configured email application with a draft addressed to `frictionlesstech2026@gmail.com`. The visitor must review the draft and press **Send**. The website does not transmit or store the draft, and no email-service credentials or environment variables are required for this hand-off approach.

For automatic server-side email delivery in the future, connect a dedicated email service and update the privacy notice to describe that provider and the data it processes. Do not add API keys or SMTP passwords to client-side code or commit them to Git.

## Deploy

Push the contents of the `frictionless-tech-website` folder to the root of a Git repository and import it in Vercel. The current `site.url` is set to `https://frictionless-tech-website.vercel.app`; after deployment, verify the actual production URL in Vercel and update `site.url` in `lib/content.ts` if Vercel shows a different domain or you connect a custom domain.

## File tree

```
website/
├── app/
│   ├── privacy/page.tsx       Privacy Policy
│   ├── terms/page.tsx         Terms and Conditions
│   ├── globals.css            design tokens and all styles
│   ├── layout.tsx             fonts, metadata, ambient background
│   ├── not-found.tsx          404 page
│   ├── page.tsx               home page, section order
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── sections/              Hero, Band, Bring, About, Solution, HowItWorks (Remotion Player),
│   │                          Benefits, Technology, Team, Contact, ContactForm
│   ├── three/
│   │   ├── GateScene.tsx      3D checkout gate, basket, signal rings (procedural, no model files)
│   │   └── HeroStage.tsx      lazy loads the scene, live readout overlay
│   ├── Loader.tsx             loading screen
│   ├── Highlight.tsx          highlighter stroke for headings
│   ├── reactbits/ProfileCard  team player card (React Bits, adapted)
│   ├── Logo.tsx               official logo as inline SVG (full, wordmark, mark)
│   ├── logoPaths.ts           traced vector paths for the logo
│   ├── Button.tsx             pill + circle buttons
│   ├── Fill.tsx               renders [FILL: ...] placeholder chips
│   ├── Footer.tsx, Header.tsx (shrinking logo), LegalPage.tsx
│   ├── Icons.tsx
│   └── RevealObserver.tsx     scroll fade-in
├── lib/
│   ├── content.ts             all site copy
│   └── enquiry.ts             shared form validation
├── remotion/
│   ├── ScanStory.tsx          the five-step scan composition
│   ├── constants.ts           timeline, size, palette
│   ├── Root.tsx, index.ts     Remotion Studio and render entry
└── public/                    icon.svg, brand/ (logo SVGs), team/
```

## Performance and accessibility

* The 3D scene is code split and loads after the page, pauses when scrolled out of view, and renders one still frame for visitors who prefer reduced motion.
* The Remotion walkthrough only does work while it is near the viewport, and with reduced motion it jumps to the finished state of each step instead of scrubbing.
* Semantic landmarks, a skip link, labelled form fields with inline errors, keyboard-operable tabs (arrow keys), visible focus rings and `prefers-reduced-motion` support throughout.
* Fonts are self-hosted at build time through `next/font`.
