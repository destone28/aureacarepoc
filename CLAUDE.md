# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A handoff bundle from Claude Design (claude.ai/design) containing the **AureaCare POC** — a static, navigable mockup of the second product in the Aurea suite (after AureaVia, before AureaShuttle). AureaCare is the patient-facing app of the **Programma ESG Carelink**, promoted by the non-profit **Alphio APS**: eligible patients get **ESG vouchers** (funded by the Rome ESG Territorial Fund) for visits and diagnostics at certified private facilities, plus **free door-to-door medical transport** for recurring treatment cycles, with an explicit handoff to AureaShuttle. The **Coordinatore Alphio** (technical role `admin`) validates vouchers, manages the partner network and monitors ESG reporting.

The model is taken from the source document **"Alphio Carelink — Programma Nazionale (Lazio)"**. Do not reintroduce the old prepaid-wallet model: **the patient never pays and never tops up — their share is always €0.**

## The economic boundary (hard rule)

Per the client's notes, **the patient app exposes no economic component at all**. In `index`, `onboarding`, `home`, `book-care`, `structures`, `booking`, `booking-summary`, `my-cures`, `follow-up`, `profile` there must be **no `€` symbol, no price, no price list, no ESG tariff, no discount or `−15%`, no voucher counter or voucher ID, no balance, no "a tuo carico €0", no €72/ride, no voucher ring**. `grep -n "€" ` over those files must return **zero**.

What *is* correct and must stay is the **non-numeric** coverage guarantee: *"Prestazione coperta dal Programma Carelink"*, *"Trasporto porta-a-porta gratuito"*, *"Nessun costo a tuo carico"* (no figures, no currency). That is the programme's promise to a fragile patient, not accounting.

The **entire economic model lives in the `admin-*` console** — price list, fixed 15% discount, ESG tariff, vouchers, ESG Fund, SROI, sponsors, and the **verifiable CSRD invoice** (`downloadInvoice` in `admin-approvals.html` + `admin-patients.html`). These are the document's CSRD verifiability requirements: **do not strip them from admin**, and do not leak them back into the patient app.

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
- **Patient app** (10 screens): mobile-first frames at 360–440px wide. `index → onboarding → home → book-care → structures → booking → booking-summary → my-cures → follow-up → profile`.
- **Admin/Coordinator console** (7 screens): desktop layout at 1440px wide. `admin-login → admin-dashboard → admin-approvals → admin-structures → admin-patients → admin-esg → admin-fund`.

Both share `js/styles.css`, `js/navigation.js`, `js/icons.js`, and `data/mock-data.js`. Each HTML file is standalone and pulls these in.

**`wallet.html` has been deleted** — the patient has no voucher page (the services aren't delivered by the platform, and the voucher model belongs to the Coordinator). Don't recreate it, and don't link to it. The patient bottom nav has **4 items**: Home (`home.html`) · **Prenota** (`book-care.html`) · Cure (`my-cures.html`) · Profilo (`profile.html`).

### Patient-side rules that came from the client's notes
- **Care states are only two**: `pending` ("In attesa") and `approved` ("Approvate"). `confirmed` / `completed` / `cancelled` must not appear in patient UI (tabs, badges, filters, counters). Their `--b-*` tokens stay in `styles.css` — admin still uses them. An **approved booking with a past date = a visit that took place** (that's what drives the follow-up CTA).
- **Mandatory, historicized declarations**: `patient.declarations` (truthful docs · authorization to contact the competent authorities) + `patient.declarations_history` + `patient.signature`. Accepted in onboarding (blocking), **signed with an advanced electronic signature** (see below), shown with their history and a printable receipt in `profile.html`, and surfaced to the Coordinator in `admin-patients.html`.
- **The required document depends on the access level, not on everyone.** The three levels are alternatives, so `access_levels[].doc_key` names the single document each one requires — `urgenza` / `isee` / `duediligence`. ISEE is required only at level 2. The CIE is always required. Onboarding step 2 recomputes the mandatory set when the level changes; `admin-approvals.html` validates against the same rule. **Do not put ISEE back as a universal requirement.**
- **Entry is by referral code, never self-declared.** Onboarding asks for a *codice di segnalazione* issued by the referring body; `MOCK.referralFromCode()` resolves the body and the association from its prefix (`RMCM` / `RMRL` / `RMAS` / `RMMG`). AureaShuttle uses the same prefixes and the same helper, so one code works across the suite. Don't reintroduce a dropdown of channels.
- **Documents expire and the patient is warned 30 days ahead.** `patient.docs[].expires` plus `docExpiryState()` / `expiringDocs()` in `js/program-docs.js`. Rendered as a banner on `home.html`, as badges in `profile.html`, as a blocker on `booking.html`, and as a review blocker in `admin-approvals.html` / `admin-patients.html`. An expired document suspends new requests; already-approved care stays valid.
- **Advanced electronic signature (FEA) on the blocking declarations.** `requestFeaSignature()` asks for a one-time code before the signature is recorded, and stores type, method, OTP reference, timestamp, origin and document hash. The OTP is **simulated and shown on screen** — the point is the shape of the retained record, not a real delivery. Don't wire a real OTP provider.
- **Programme documents are versioned and downloadable as PDF.** `PROGRAM_DOCS` in `js/program-docs.js` holds the texts (conditions · privacy · declarations) with version, date and hash; `openProgramDoc()` shows them and `printProgramDoc()` opens a print view so the browser's "Save as PDF" produces the file. **No PDF library, no server-side generator** — don't add one.
- **CIE login** in `index.html` is **simulated** (no real IdP, no library, no external logos — text buttons only). `admin-login.html` does not use it. **SPID has been removed from the whole POC** on the client's instruction: CIE is the only digital identity in the programme. Don't reintroduce it.

### Simulated SSO across the Aurea suite
`js/navigation.js` reads/writes the localStorage key **`aurea_auth_user`** (`{ email, role, apps }`). This key is the convention shared with AureaVia and AureaShuttle to simulate cross-app SSO without a backend. `requireAuth()` / `requireAdmin()` redirect to the relevant login if the key is missing or `role` doesn't match. The Coordinatore Alphio is still `role: 'admin'` — only the copy changed.

### Canvas tweaks panel
`canvas.html` embeds every screen in `<iframe>`s and exposes a live tweaks panel that writes to localStorage keys (all prefixed `aureacare_*`) and either injects CSS into iframes or reloads them:

| Key | Effect |
|---|---|
| `aureacare_accent`, `_accent_dark`, `_accent_light` | Overrides `--care-blue` CSS variables across all frames |
| `aureacare_app_switcher_style` | `dropdown` / `modal` / `sheet` — switches `mountAppSwitcher` behavior |
| `aureacare_handoff_mode` | `prefilled` (default) / `visual` / `sobrio` — variant on `booking-summary.html` |

The old `aureacare_wallet_variant` key (voucher ring) is **gone** together with `renderWalletRing` — the ring was an economic counter and has no place in the patient app. Don't reintroduce either.

When adding a new screen, register it in the `patientScreens` or `adminScreens` arrays in `canvas.html` and update the screen counter.

### Design system
- **Suite marker**: orange `#FF8C00` (logo, focus ring, cross-app CTAs) — inherited from AureaVia.
- **AureaCare accent**: care-blue `#3B82F6` (+ light `#E6F1FB`, dark `#1E4FBF`) for app-specific patterns (links, badges, hero CTA).
- **Programme green** `#0F6E56`: reserved for Carelink / ESG-fund accents (programme pills, the "Coperta dal programma" pill, impact blocks, fund KPIs). It never replaces the app accent.
- Status badge palette is fixed: pending warm, approved green, confirmed blue, completed olive, cancelled red — see `--b-*` tokens in `styles.css`. **Patient screens only ever use pending + approved**; the other three are admin-only.
- All icons are stroke SVG via `aIcon(name, opts)` from `icons.js` — check the name exists in `icons.js` before using it. **No emoji anywhere.**
- Microcopy is **Italian**; data is **Roma-centric**. All 18 facilities are **private and certified** (ISO 9001 / JCI): Gemelli, Bambino Gesù, Aurelia Hospital, Salvator Mundi, Mater Dei, Villa Gianicolense, IDI, etc.

### Mock data shape
`window.MOCK` exposes: `structures` (18, all `type: 'Privato convenzionato'`, with `cert` and `listing_verified`), `services` (14: 5 Fascia A `kind:'visita'` SRV-A01..A05 + 5 Fascia B `kind:'diagnostica'` SRV-B01..B05 + 4 recurring cycles `kind:'ciclo'` SRV-L01..L04, transport-covered, no price), `access_levels` (the 3 eligibility levels), `patient` (with `access`, `referred_by`, `docs`, `declarations`, `declarations_history`), `patient_followups` (post-visit questionnaire results, read by `admin-patients.html`), `patient_location`, `roma_center`, `vouchers` (assigned/used/movements), `bookings` (8, statuses limited to `pending` / `approved`, each with `list_price` / `esg_price` / `voucher_id`), `admin_requests` (12), `admin_kpi`, `admin_trend`, `admin_patients` (12, with `vouchers_left`, `access_level`, `referral`), `esg` (SROI per layer, benefits A1-A6 / B1-B3, multi-year trajectory, year-1 targets + YTD), `fund` (ESG Territorial Fund, allocation, sponsors, committee, governance, Samarcanda economics).

The economic fields on `bookings` (`list_price`, `esg_price`, `voucher_id`) are **kept on purpose**: they feed the CSRD invoice in the console. They are simply never rendered in the patient app.

When adding screens that need data, extend `mock-data.js` rather than inlining. Numbers are cross-referenced by several pages (home, profile, admin-dashboard, admin-esg, admin-fund) — **grep all consumers before changing a value**, and run `node --check` on `mock-data.js` afterwards.

## What is explicitly NOT included
Real backend, real auth (CIE is a simulated flow — no IdP, no library; **SPID is removed, don't add it back**), **any payment flow at all** (the Carelink model has zero patient cost — do not add checkout, top-ups or payment providers), encrypted document storage (upload UI is simulated). Don't add these speculatively.

## Open questions (To Be) — do not resolve unilaterally

These came from the client and are **not settled**. If a task touches them, keep the current provisional rendering and flag the question rather than inventing an answer:

1. **Scope of bookable services** — visits only, or other services too? Today the catalogue exposes Fascia A visits, Fascia B diagnostics and recurring cycles with transport.
2. **How the ISEE is verified** — upload is simulated and the document reads "verificato dal Coordinatore Alphio". **No INPS integration** has been assumed. Don't add one.
3. **How the medical prescription is verified** — same: simulated upload, verified by the Coordinator. **No tessera sanitaria / dematerialized-prescription integration.** Don't add one.

## Net impact metrics — don't quietly turn them back into gross

Two metrics were corrected in the client review and the correction is the point; both are **net**, and the arithmetic is written into `mock-data.js` so it can be checked.

- **CO₂**: `esg.environmental` carries `co2_gross_t` (private car kilometres avoided × factor) minus `co2_fleet_t` (service fleet kilometres × factor) = `co2_ytd_t`, the only figure rendered and the only one compared to the 52 t target. The programme does not book its own emissions as a saving. `admin-esg.html` shows the three rows explicitly.
- **Caregiver hours**: `esg.caregiver` splits visits into `visits_alone` (3,4 h freed) and `visits_accompanied` (1,2 h freed — driving, parking and waiting only), giving `net_h`. The per-booking input is `bookings[].companion`, collected by the "Sarai accompagnato?" question in `booking.html`. AureaShuttle nets the same way on `esgAggregate` using ride-level `caregiver_onboard`.

Changing either figure means changing its derivation too — grep both repos before touching them.
