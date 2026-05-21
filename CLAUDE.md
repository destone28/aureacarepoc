# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A handoff bundle from Claude Design (claude.ai/design) containing the **AureaCare POC** — a static, navigable mockup of the second product in the Aurea suite (after AureaVia, before AureaShuttle). It is a healthcare access app: prepaid wallet, booking of visits/therapies/cycles at partner facilities in Rome, admin approval flow, and explicit handoff to AureaShuttle for medical transport.

These are **design prototypes, not production code**. When reimplementing for a real target codebase, recreate the visual output pixel-perfectly in whatever technology fits — don't mirror the prototype's internal structure unless it happens to fit. Read HTML/CSS directly; don't render in a browser or take screenshots unless asked.

The user's primary design is `project/canvas.html` (the review hub embedding all 15 screens). Read it in full and follow its imports before implementing.

## Stack

- HTML5 + CSS3 + Vanilla JavaScript ES6+ — **zero framework**, no build step
- Open Sans via Google Fonts CDN
- SVG icons inline via `project/js/icons.js` (Feather + Tabler outline subset — no emoji)
- Persistence: `localStorage` only (auth, wallet, tweak preferences)
- Mock data hard-coded in `project/data/mock-data.js`, exposed as `window.MOCK`

## Running it

No build, no install, no tests. Open files directly in a browser:

- `project/canvas.html` — review hub with all 15 screens in phone/browser frames + live Tweaks panel
- `project/index.html` — patient flow entry (any email/password works; auth is simulated)
- `project/admin-login.html` — admin console entry (any credentials)

## Architecture

### Two parallel apps, one shared shell
- **Patient app** (10 screens): mobile-first frames at 360–440px wide. `index → onboarding → home → book-care → structures → booking → booking-summary → wallet → my-cures → profile`.
- **Admin console** (5 screens): desktop layout at 1440px wide. `admin-login → admin-dashboard → admin-approvals → admin-structures → admin-patients`.

Both share `js/styles.css`, `js/navigation.js`, `js/icons.js`, and `data/mock-data.js`. Each HTML file is standalone and pulls these in.

### Simulated SSO across the Aurea suite
`js/navigation.js` reads/writes the localStorage key **`aurea_auth_user`** (`{ email, role, apps }`). This key is the convention shared with AureaVia and AureaShuttle to simulate cross-app SSO without a backend. `requireAuth()` / `requireAdmin()` redirect to the relevant login if the key is missing or `role` doesn't match.

### Canvas tweaks panel
`canvas.html` embeds every screen in `<iframe>`s and exposes a live tweaks panel that writes to localStorage keys (all prefixed `aureacare_*`) and either injects CSS into iframes or reloads them:

| Key | Effect |
|---|---|
| `aureacare_accent`, `_accent_dark`, `_accent_light` | Overrides `--care-blue` CSS variables across all frames |
| `aureacare_wallet_variant` | `segmented` (default) / `single` / `dual` — switches `renderWalletRing` mode on home + wallet |
| `aureacare_app_switcher_style` | `dropdown` / `modal` / `sheet` — switches `mountAppSwitcher` behavior |
| `aureacare_handoff_mode` | `pre-flagged` / `visual` / `sober` — variant on `booking-summary.html` |

When adding a new screen, register it in the `patientScreens` or `adminScreens` arrays in `canvas.html`.

### Design system
- **Suite marker**: orange `#FF8C00` (logo, focus ring, cross-app CTAs) — inherited from AureaVia.
- **AureaCare accent**: care-blue `#3B82F6` (+ light `#E6F1FB`, dark `#1E4FBF`) for app-specific patterns (links, "Confermata" badges, hero CTA, wallet ring).
- Status badge palette is fixed: pending warm, approved green, confirmed blue, completed olive, cancelled red — see `--b-*` tokens in `styles.css`.
- All icons are stroke SVG via `aIcon(name, opts)` from `icons.js`. **No emoji anywhere.**
- Microcopy is **Italian**; data is **Roma-centric** (Gemelli, San Camillo, Bambino Gesù, IDI, Tor Vergata, etc.).

### Mock data shape
`window.MOCK` exposes: 18 `structures`, 25 `services` (10 visite + 10 terapie + 5 cicli), 1 logged-in `patient`, 8 patient `bookings`, 12 admin `requests`, 12 `patients` (admin view). When adding screens that need data, extend `mock-data.js` rather than inlining.

## What is explicitly NOT included
Real backend, real auth, real payments (UI selectors only), interactive map (static placeholder), encrypted document storage (upload UI is simulated). Don't add these speculatively.
