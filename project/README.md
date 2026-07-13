# AureaCare — POC mockup

Mockup statico e navigabile di **AureaCare**, secondo prodotto della suite Aurea (dopo AureaVia e prima di AureaShuttle) e **app ufficiale del Programma ESG Carelink** promosso da **Alphio APS**. Accesso alle cure senza costi per il paziente: **voucher ESG** finanziati dal Fondo ESG Territoriale di Roma, prestazioni di Fascia A/B presso strutture private certificate ISO 9001/JCI con **sconto fisso 15%**, **trasporto gratuito porta-a-porta** per le cure ricorsive (Samarcanda Scarl) con handoff esplicito verso AureaShuttle, validazione dei voucher da parte del **Coordinatore Alphio**. POC limitato all'area del Comune di Roma.

Fonte del modello: documento *"Alphio Carelink — Programma Nazionale (Lazio)"*.

## Stack

- HTML5 + CSS3 + Vanilla JavaScript ES6+ (zero framework)
- Open Sans via Google Fonts CDN
- Icone SVG inline (subset Feather + Tabler outline) via `js/icons.js`
- Persistenza: `localStorage` (auth condivisa con AureaVia / AureaShuttle, tweak preferences)
- Dati mock hard-coded in `data/mock-data.js`: 18 strutture private certificate a Roma, 14 prestazioni (5 Fascia A + 5 Fascia B + 4 cicli ricorsivi Layer 1), 3 livelli di accesso, voucher ESG del paziente, 8 prenotazioni, 12 richieste da validare, 12 pazienti, KPI ESG e blocco `fund` (Fondo ESG Territoriale ~€9M + governance)

## Struttura del progetto

```
aureacarepoc/
├── canvas.html               # Hub di review con tutte le 17 schermate + Tweaks panel
│
├── index.html                # Lato paziente — login unificato Aurea + intro Programma Carelink
├── onboarding.html           # Wizard 4 step: anagrafica + segnalazione → livello di accesso + documenti → indirizzo → consensi
├── home.html                 # Dashboard paziente (voucher residui, prossima cura, ESG personale, sponsor del Fondo)
├── book-care.html            # Catalogo: Fascia A (visite) / Fascia B (diagnostica) / cure ricorsive (trasporto)
├── structures.html           # Mappa Roma + strutture private certificate ISO 9001 / JCI
├── booking.html              # Calendario + bottom sheet slot + trasporto gratuito Layer 1
├── booking-summary.html      # Recap a costo zero (listino → tariffa ESG → €0) + handoff AureaShuttle
├── wallet.html               # Voucher ESG: ring, "come funziona", richiesta voucher, storico movimenti
├── my-cures.html             # Tab stati + modale dettaglio + fattura verificabile CSRD
├── profile.html              # Anagrafica, card Programma Carelink, documenti, ESG personale, settings
│
├── admin-login.html          # Console Coordinatore Alphio: login
├── admin-dashboard.html      # KPI (voucher validati, valore coperto dal Fondo, SROI) + dual-line chart
├── admin-approvals.html      # Coda + modale centrale di revisione e validazione voucher
├── admin-structures.html     # Rete Layer 2: strutture certificate + sconto contrattuale 15%
├── admin-patients.html       # Tabella pazienti + livello di accesso + segnalato da + scheda
├── admin-esg.html            # KPI ESG: SROI L1/L2, benefici A1-A6 / B1-B3, drop-out, ambiente
├── admin-fund.html           # Fondo ESG Territoriale Roma: allocazione, burn-rate, sponsor, governance
│
├── js/
│   ├── styles.css            # Token + componenti + layout (eredita AureaVia + accent care)
│   ├── navigation.js         # Auth, toast, confirm dialog, app switcher, voucher ring renderer
│   └── icons.js              # Set SVG inline (Feather/Tabler subset)
│
├── data/
│   └── mock-data.js          # Tutti i dati mock — esposti come window.MOCK
│
└── README.md
```

## Come provare

1. Apri `canvas.html` per la vista d'insieme con tutte le 17 schermate in cornici phone (paziente) e browser (console Coordinatore).
2. Apri `index.html` per percorrere il flusso paziente reale: qualunque email/password lavora (auth simulata).
3. Da `index.html` link in basso porta su `admin-login.html`, la console del Coordinatore Alphio (anche qui qualsiasi credenziale).

## Sistema di design

### Colori
- **Suite**: arancione `#FF8C00` come marker comune (logo, focus ring, CTA cross-app)
- **AureaCare accent**: care-blue `#3B82F6` (fiducia clinica) + light `#E6F1FB` + dark `#1E4FBF`
- **Verde programma** `#0F6E56`: accenti Carelink / Fondo ESG (pill programma, blocchi impatto, KPI del fondo)
- **Stati prestazione**: pending warm, approved green, confirmed blue, completed olive, cancelled red

### Tipografia
- Open Sans 400/600/700, line-height 1.6 per la leggibilità anche su mobile a 360px

### Pattern AureaCare-specific
- **Voucher ring segmentato**: 12 tacche, una per voucher ESG assegnato (variante: singolo / doppio)
- **Banner Roma**: sticky su `onboarding.html` step 3 e `structures.html`, fondo `#E6F1FB`
- **Handoff AureaShuttle**: la domanda "serve trasporto?" appare già nel calendario; per i cicli il trasporto è incluso e preselezionato; il summary mostra il riepilogo cross-app con la corsa Samarcanda gratuita
- **Riga economica a costo zero**: listino barrato → tariffa ESG (−15%) → coperto dal Fondo → **a tuo carico €0**
- **App switcher**: dropdown 3 brand-card (default), con varianti modale e bottom sheet

## Tweaks live

`canvas.html` espone un pannello in basso a destra che permette di:

| Tweak | Valori | Effetto |
|---|---|---|
| Care accent · hue | Soft blue / Teal / Indigo / Verde clinico | Aggiorna `--care-blue` su tutte le 17 schermate live |
| Voucher ring | Segmentato / Singolo / Doppio | Cambia il pattern su `home.html` e `wallet.html` (chiave `aureacare_wallet_variant`) |
| App switcher | Dropdown / Modale / Bottom sheet | Cambia il pattern di apertura dell'icona griglia |
| Handoff Shuttle | Pre-flagged / Visuale / Sobrio | Cambia la card sul summary |

Le scelte sono persistite in `localStorage` (chiavi `aureacare_*`) e applicate dinamicamente.

## Accesso unificato (concept)

Il login scrive in `localStorage` la chiave `aurea_auth_user` con `{ email, role, apps }`. Stessa chiave usata da AureaVia e AureaShuttle per simulare SSO senza backend reale. Il ruolo tecnico del Coordinatore Alphio resta `role: 'admin'` (cambia solo il copy).

L'icona griglia 3×3 in header apre l'app switcher con 3 card: **AureaVia**, **AureaShuttle** (trasporto sanitario · corse Samarcanda) e **AureaCare** (current, evidenziata).

## Deploy

Repo pronto per essere pushato su `github.com/destone28/aureacarepoc` e deployato su Vercel o GitHub Pages — nessun build step, è statico.

## Cosa NON è incluso

- Backend reale o autenticazione vera
- **Pagamenti**: nel modello Carelink il paziente non paga e non ricarica nulla (quota a carico €0). Nessun checkout, nessun wallet prepagato.
- Storage cifrato dei documenti (UI di upload simulata)

## Note di design

- AureaCare condivide griglia, componenti, font e radius con AureaVia. L'unico delta sistematico è l'accent care-blue per i pattern dell'app (link, badge "Confermata", CTA hero, voucher ring), più il verde programma per gli elementi Carelink / Fondo ESG.
- L'arancione AureaVia rimane sempre presente come marker di suite: logo, hover, focus ring, CTA cross-app.
- Tutte le icone sono SVG inline a stroke (Feather/Tabler outline) — nessuna emoji.
- Microcopy in italiano credibile, dati Roma-centrici (Gemelli, Bambino Gesù, IDI, Aurelia Hospital, Villa Gianicolense, Salvator Mundi, ecc. — tutte strutture private convenzionate al Layer 2).

---

**Suite Aurea** · v0.2 POC · Programma ESG Carelink
