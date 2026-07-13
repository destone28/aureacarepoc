# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A handoff bundle from Claude Design (claude.ai/design) containing the **AureaCare POC** — a static, navigable mockup of the second product in the Aurea suite (after AureaVia, before AureaShuttle). AureaCare is the patient-facing app of the **Programma ESG Carelink**, promoted by the non-profit **Alphio APS**: eligible patients get **ESG vouchers** (funded by the Rome ESG Territorial Fund) for visits and diagnostics at certified private facilities, plus **free door-to-door medical transport** for recurring treatment cycles, with an explicit handoff to AureaShuttle. The **Coordinatore Alphio** (technical role `admin`) validates vouchers, manages the partner network and monitors ESG reporting.

The model is taken from the source document **"Alphio Carelink — Programma Nazionale (Lazio)"**. Do not reintroduce the old prepaid-wallet model: **the patient never pays and never tops up — their share is always €0.**

These are **design prototypes, not production code**. When reimplementing for a real target codebase, recreate the visual output pixel-perfectly in whatever technology fits — don't mirror the prototype's internal structure unless it happens to fit. Read HTML/CSS directly; don't render in a browser or take screenshots unless asked.

The user's primary design is `project/canvas.html` (the review hub embedding all 17 screens). Read it in full and follow its imports before implementing.

## Stack

- HTML5 + CSS3 + Vanilla JavaScript ES6+ — **zero framework**, no build step
- Open Sans via Google Fonts CDN
- SVG icons inline via `project/js/icons.js` (Feather + Tabler outline subset — no emoji)
- Persistence: `localStorage` only (auth, tweak preferences)
- Mock data hard-coded in `project/data/mock-data.js`, exposed as `window.MOCK`

## Running it

No build, no install, no tests. Open files directly in a browser:

- `project/canvas.html` — review hub with all 17 screens in phone/browser frames + live Tweaks panel
- `project/index.html` — patient flow entry (any email/password works; auth is simulated)
- `project/admin-login.html` — Coordinatore Alphio console entry (any credentials)

## Domain model (Carelink)

- **Layer 1 — Mobilità sanitaria assistita**: free door-to-door transport for fragile patients in recurring care (oncology, dialysis, neurology, paediatrics). Provided by **Samarcanda Scarl** (ISO 9001:2015), coordinated through the platform, handed off to AureaShuttle. Costs the fund **€72/ride** (€61 fare + €8 fee + €3 platform) — never the patient.
- **Layer 2 — Accesso alle cure**: each Fascia A visit or Fascia B diagnostic exam consumes **1 ESG voucher**. The fund covers the **tariffa ESG** = the facility's official price list with a **fixed contractual 15% discount**, verifiable on every invoice by the CSRD auditor. Patient share: **€0**.
- **3 access levels** (alternative): 1) clinical urgency certified by SSN/MMG · 2) ISEE < €20.000 · 3) due diligence by the ESG committee.
- **Intake**: Comuni / Regione Lazio → Associazioni (onboarding + privacy) → Coordinatore Alphio → partners.
- **Fondo ESG Territoriale Roma**: ~€9M in year 1 (Alphio fee €960.000 + Layer 1 €4.020.000 + Layer 2 €4.020.000), multi-sponsor, overseen by a local ESG committee; SROI validated ex-post by an audit firm.

**Canonical numbers** (keep consistent across pages — grep before changing any of them): year-1 targets 1.400 L1 patients · 35.100 rides · 33.500 vouchers · ~5.580 L2 patients · 52 t CO₂ ≈ 3.500 trees. YTD mock: 14.620 rides (€1.052.640) · 13.900 vouchers (€1.672.170) · Alphio fee €400.000 · committed €3.124.810 · residual €5.875.190. SROI L1 0,82–0,97x · L2 4,56–6,31x · combined 2,76–3,64x.

## Architecture

### Two parallel apps, one shared shell
- **Patient app** (10 screens): mobile-first frames at 360–440px wide. `index → onboarding → home → book-care → structures → booking → booking-summary → wallet → my-cures → profile`.
- **Admin/Coordinator console** (7 screens): desktop layout at 1440px wide. `admin-login → admin-dashboard → admin-approvals → admin-structures → admin-patients → admin-esg → admin-fund`.

Both share `js/styles.css`, `js/navigation.js`, `js/icons.js`, and `data/mock-data.js`. Each HTML file is standalone and pulls these in.

`wallet.html` keeps its filename (so links don't break) but is now **"I miei voucher ESG"** — no top-ups, no payment providers.

### Simulated SSO across the Aurea suite
`js/navigation.js` reads/writes the localStorage key **`aurea_auth_user`** (`{ email, role, apps }`). This key is the convention shared with AureaVia and AureaShuttle to simulate cross-app SSO without a backend. `requireAuth()` / `requireAdmin()` redirect to the relevant login if the key is missing or `role` doesn't match. The Coordinatore Alphio is still `role: 'admin'` — only the copy changed.

### Canvas tweaks panel
`canvas.html` embeds every screen in `<iframe>`s and exposes a live tweaks panel that writes to localStorage keys (all prefixed `aureacare_*`) and either injects CSS into iframes or reloads them:

| Key | Effect |
|---|---|
| `aureacare_accent`, `_accent_dark`, `_accent_light` | Overrides `--care-blue` CSS variables across all frames |
| `aureacare_wallet_variant` | `segmented` (default) / `single` / `dual` — switches the **voucher ring** (`renderWalletRing`) on home + wallet: notches = vouchers, single = remaining vouchers, dual = vouchers + value covered YTD |
| `aureacare_app_switcher_style` | `dropdown` / `modal` / `sheet` — switches `mountAppSwitcher` behavior |
| `aureacare_handoff_mode` | `pre-flagged` / `visual` / `sober` — variant on `booking-summary.html` |

When adding a new screen, register it in the `patientScreens` or `adminScreens` arrays in `canvas.html` and update the screen counter.

### Design system
- **Suite marker**: orange `#FF8C00` (logo, focus ring, cross-app CTAs) — inherited from AureaVia.
- **AureaCare accent**: care-blue `#3B82F6` (+ light `#E6F1FB`, dark `#1E4FBF`) for app-specific patterns (links, "Confermata" badges, hero CTA, voucher ring).
- **Programme green** `#0F6E56`: reserved for Carelink / ESG-fund accents (programme pills, impact blocks, fund KPIs). It never replaces the app accent.
- Status badge palette is fixed: pending warm, approved green, confirmed blue, completed olive, cancelled red — see `--b-*` tokens in `styles.css`.
- All icons are stroke SVG via `aIcon(name, opts)` from `icons.js` — check the name exists in `icons.js` before using it. **No emoji anywhere.**
- Microcopy is **Italian**; data is **Roma-centric**. All 18 facilities are **private and certified** (ISO 9001 / JCI): Gemelli, Bambino Gesù, Aurelia Hospital, Salvator Mundi, Mater Dei, Villa Gianicolense, IDI, etc.

### Mock data shape
`window.MOCK` exposes: `structures` (18, all `type: 'Privato convenzionato'`, with `cert` and `listing_verified`), `services` (14: 5 Fascia A `kind:'visita'` SRV-A01..A05 + 5 Fascia B `kind:'diagnostica'` SRV-B01..B05 + 4 recurring cycles `kind:'ciclo'` SRV-L01..L04, transport-covered, no price), `access_levels` (the 3 eligibility levels), `patient` (with `access` and `referred_by`), `patient_location`, `roma_center`, `vouchers` (assigned/used/movements — replaces the old `wallet`), `bookings` (8, with `list_price` / `esg_price` / `voucher_id`), `admin_requests` (12), `admin_kpi`, `admin_trend`, `admin_patients` (12, with `vouchers_left`, `access_level`, `referral`), `esg` (SROI per layer, benefits A1-A6 / B1-B3, multi-year trajectory, year-1 targets + YTD), `fund` (ESG Territorial Fund, allocation, sponsors, committee, governance, Samarcanda economics).

When adding screens that need data, extend `mock-data.js` rather than inlining. Numbers are cross-referenced by several pages (home, profile, admin-dashboard, admin-esg, admin-fund) — **grep all consumers before changing a value**, and run `node --check` on `mock-data.js` afterwards.

## What is explicitly NOT included
Real backend, real auth, **any payment flow at all** (the Carelink model has zero patient cost — do not add checkout, top-ups or payment providers), encrypted document storage (upload UI is simulated). Don't add these speculatively.
