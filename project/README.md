# AureaCare — POC mockup

Mockup statico e navigabile di **AureaCare**, secondo prodotto della suite Aurea (dopo AureaVia e prima di AureaShuttle). Accesso alle cure: wallet prepagato a scalare, prenotazione visite/terapie/cicli presso strutture convenzionate, approvazione admin, handoff esplicito verso AureaShuttle per il trasporto sanitario. POC limitato all'area del Comune di Roma.

## Stack

- HTML5 + CSS3 + Vanilla JavaScript ES6+ (zero framework)
- Open Sans via Google Fonts CDN
- Icone SVG inline (subset Feather + Tabler outline) via `js/icons.js`
- Persistenza: `localStorage` (auth condivisa con AureaVia / AureaShuttle, wallet, tweak preferences)
- Dati mock hard-coded in `data/mock-data.js` (18 strutture Roma, 25 prestazioni, 8 prenotazioni paziente, 12 richieste admin, 12 pazienti)

## Struttura del progetto

```
aureacarepoc/
├── canvas.html               # Hub di review con tutte le 15 schermate + Tweaks panel
│
├── index.html                # Lato paziente — login unificato Aurea
├── onboarding.html           # Wizard 4 step: anagrafica → documenti → indirizzo → consensi
├── home.html                 # Dashboard paziente
├── book-care.html            # Catalogo: visita / terapia / ciclo
├── structures.html           # Mappa Roma + lista strutture convenzionate
├── booking.html              # Calendario + bottom sheet slot + pre-flag trasporto
├── booking-summary.html      # Recap + handoff AureaShuttle pre-flagged
├── wallet.html               # Ring segmentato + pacchetti + storico movimenti
├── my-cures.html             # Tab stati + modale dettaglio
├── profile.html              # Anagrafica, documenti, ESG personale, settings
│
├── admin-login.html          # Console admin: login
├── admin-dashboard.html      # KPI + dual-line chart (prestazioni + SROI) + ultime richieste
├── admin-approvals.html      # Coda + modale centrale di revisione
├── admin-structures.html     # CRUD strutture partner
├── admin-patients.html       # Tabella pazienti + scheda dettaglio
│
├── js/
│   ├── styles.css            # Token + componenti + layout (eredita AureaVia + accent care)
│   ├── navigation.js         # Auth, toast, confirm dialog, app switcher, wallet ring renderer
│   └── icons.js              # Set SVG inline (Feather/Tabler subset)
│
├── data/
│   └── mock-data.js          # Tutti i dati mock — esposti come window.MOCK
│
└── README.md
```

## Come provare

1. Apri `canvas.html` per la vista d'insieme con tutte le 15 schermate in cornici phone (paziente) e browser (admin).
2. Apri `index.html` per percorrere il flusso paziente reale: qualunque email/password lavora (auth simulata).
3. Da `index.html` link in basso "Sei un amministratore?" porta su `admin-login.html` (anche qui qualsiasi credenziale).

## Sistema di design

### Colori
- **Suite**: arancione `#FF8C00` come marker comune (logo, focus ring, CTA cross-app)
- **AureaCare accent**: care-blue `#3B82F6` (fiducia clinica) + light `#E6F1FB` + dark `#1E4FBF`
- **Stati prestazione**: pending warm, approved green, confirmed blue, completed olive, cancelled red

### Tipografia
- Open Sans 400/600/700, line-height 1.6 per la leggibilità anche su mobile a 360px

### Pattern AureaCare-specific
- **Wallet ring segmentato**: 12 tacche, una per prestazione (variante: singolo / doppio)
- **Banner Roma**: sticky su `onboarding.html` step 3 e `structures.html`, fondo `#E6F1FB`
- **Handoff AureaShuttle pre-flagged**: la domanda "serve trasporto?" appare già nel calendario; il summary mostra direttamente il riepilogo cross-app se sì
- **App switcher**: dropdown 3 brand-card (default), con varianti modale e bottom sheet

## Tweaks live

`canvas.html` espone un pannello in basso a destra che permette di:

| Tweak | Valori | Effetto |
|---|---|---|
| Care accent · hue | Soft blue / Teal / Indigo / Verde clinico | Aggiorna `--care-blue` su tutte le 15 schermate live |
| Wallet ring | Segmentato / Singolo / Doppio | Cambia il pattern su `home.html` e `wallet.html` |
| App switcher | Dropdown / Modale / Bottom sheet | Cambia il pattern di apertura dell'icona griglia |
| Handoff Shuttle | Pre-flagged / Visuale / Sobrio | Cambia la card sul summary |

Le scelte sono persistite in `localStorage` (chiavi `aureacare_*`) e applicate dinamicamente.

## Accesso unificato (concept)

Il login scrive in `localStorage` la chiave `aurea_auth_user` con `{ email, role, apps }`. Stessa chiave usata (in futuro) da AureaVia e AureaShuttle per simulare SSO senza backend reale.

L'icona griglia 3×3 in header apre l'app switcher con 3 card: **AureaVia** (link al POC live), **AureaShuttle** (placeholder "Coming soon") e **AureaCare** (current, evidenziata).

## Deploy

Repo pronto per essere pushato su `github.com/destone28/aureacarepoc` e deployato su Vercel o GitHub Pages — nessun build step, è statico.

```bash
git init
git add .
git commit -m "AureaCare POC: paziente + admin + canvas hub"
git remote add origin https://github.com/destone28/aureacarepoc.git
git push -u origin main
```

## Cosa NON è incluso

- Backend reale o autenticazione vera
- Pagamenti reali (Stripe/PayPal/Google Pay solo come UI selector)
- Mappa interattiva (placeholder statico stile Booking)
- Storage cifrato dei documenti (UI di upload simulata)

## Note di design

- AureaCare condivide griglia, componenti, font e radius con AureaVia. L'unico delta sistematico è l'accent care-blue per i pattern dell'app (link, badge "Confermata", CTA hero, wallet ring).
- L'arancione AureaVia rimane sempre presente come marker di suite: logo, hover, focus ring, CTA wallet (gradient `#FF8C00 → #FFA500`), CTA cross-app.
- Tutte le icone sono SVG inline a stroke (Feather/Tabler outline) — nessuna emoji.
- Microcopy in italiano credibile, dati Roma-centrici (Gemelli, San Camillo, Bambino Gesù, IDI, Tor Vergata, Aurelia Hospital, Don Gnocchi, ecc.).

---

**Suite Aurea** · v0.1 POC · maggio 2026
