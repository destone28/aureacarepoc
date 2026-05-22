# AureaCare · POC

**Accesso facilitato alle cure sanitarie a Roma** — mockup navigabile della seconda app della suite Aurea, pensata per pazienti che pagano prestazioni mediche tramite wallet prepagato presso strutture convenzionate, e per gli amministratori che approvano richieste e gestiscono la rete partner.

🌐 **Live demo**: <https://aureacarepoc.vercel.app>
📐 **Hub di review** (tutte le 16 schermate): <https://aureacarepoc.vercel.app/canvas.html>

---

## Cosa fa

AureaCare copre **2 attori**:

- **Paziente** · ricarica il wallet con pacchetti prepagati (€100 / €250 / €500), prenota visite/terapie/cicli presso strutture convenzionate a Roma, traccia l'impatto ESG personale (CO₂ evitata, ore caregiver risparmiate, SROI), può richiedere il trasporto sanitario via handoff verso AureaShuttle.
- **Admin** · approva o rifiuta le richieste paziente con revisione documenti (ricetta, ISEE, CIE, SPID), gestisce la rete di 18 strutture sanitarie convenzionate, monitora i KPI ESG aggregati della piattaforma (ambientale, sociale, governance, demografia).

Il servizio è **handoff-ready con AureaShuttle**: dalla pagina di conferma prenotazione, una visita con trasporto sanitario richiesto pre-compila la richiesta corsa su AureaShuttle (cross-app via link diretto).

## Modello di accesso

Il wallet AureaCare è prepagato e a scalare:

| Pacchetto | Importo | Prestazioni medie |
|---|---|---|
| Base | €100 | ~ 2-3 prestazioni |
| Plus (più scelto) | €250 | ~ 6-7 prestazioni |
| Premium | €500 | ~ 12-14 prestazioni |
| Custom | personalizzato | a scelta |

Tariffe convenzionate (range): visite specialistiche **€60-120**, terapie singole **€40-95**, cicli di cura **€560-2.200** (8-14 sedute). Tutti gli addebiti passano per il wallet, dopo approvazione admin.

## Suite Aurea

| App | Dominio | Repo |
|---|---|---|
| **AureaVia** (NCC + taxi premium, driver layer) | <https://destone28.github.io/aureaviapoc/> | [aureaviapoc](https://github.com/destone28/aureaviapoc) |
| **AureaCare** (accesso alle cure) | <https://aureacarepoc.vercel.app> | this repo |
| **AureaShuttle** (trasporto sanitario) | <https://aureashuttlepoc.vercel.app> | [aureashuttlepoc](https://github.com/destone28/aureashuttlepoc) |

SSO simulato cross-app via chiave `aurea_auth_user` in `localStorage` (convenzione condivisa con AureaVia + AureaShuttle).

## Stack

- HTML5 + CSS3 + Vanilla JS ES6+ — **zero framework**, zero build step.
- Open Sans (Google Fonts CDN), Leaflet + OpenStreetMap per le mappe.
- Persistenza: `localStorage` (auth, wallet, preferenze tweaks).
- Mock data hard-coded in [project/data/mock-data.js](project/data/mock-data.js) come `window.MOCK` — 18 strutture sanitarie Roma-centriche con coordinate reali, 25 prestazioni (10 visite + 10 terapie + 5 cicli), 8 prenotazioni paziente, 12 richieste admin, 12 pazienti registrati, blocco KPI ESG aggregato (ambientale/sociale/governance/demografia).

## Run in locale

Nessuna installazione, nessuna build. Apri direttamente i file in browser oppure servi la cartella `project/`:

```bash
cd project && python3 -m http.server 8080
# poi apri:
# http://localhost:8080/canvas.html       hub review 16 schermate + tweaks panel
# http://localhost:8080/index.html        flusso paziente
# http://localhost:8080/admin-login.html  console admin
```

Login simulato: **qualsiasi email/password va bene**.

## Struttura

```
aureacarepoc/
├── README.md
├── CLAUDE.md                  spec per agenti AI che riprendono il repo
└── project/
    ├── canvas.html                  hub review (16 schermate + 4 tweaks live)
    ├── index.html                   login paziente + modale "password dimenticata"
    ├── onboarding.html              wizard 4 step (anagrafica · documenti · indirizzo · GDPR)
    ├── home.html                    dashboard paziente + ESG personale + sponsor strip
    ├── book-care.html               catalogo prestazioni (visite / terapie / cicli)
    ├── structures.html              lista strutture + mappa OSM + filtri + sheet ordina
    ├── booking.html                 calendario + slot + pre-flag trasporto
    ├── booking-summary.html         recap + handoff cross-app verso AureaShuttle
    ├── wallet.html                  wallet ring + ricarica pacchetti + storico
    ├── my-cures.html                lista prenotazioni + modale dettaglio + fattura
    ├── profile.html                 anagrafica + documenti + ESG personale + sponsor + settings
    ├── admin-login.html             entry admin
    ├── admin-dashboard.html         KPI + dual-line chart + ultime richieste
    ├── admin-approvals.html         coda approvazioni + modale revisione documenti + mappa
    ├── admin-structures.html        CRUD strutture + mappa overview network + modale dettaglio
    ├── admin-patients.html          tabella pazienti + scheda + invia messaggio (email)
    ├── admin-esg.html                KPI ESG: ambientale / sociale / governance / demografia
    ├── assets/                       loghi sponsor (3DSprinted)
    ├── data/mock-data.js             window.MOCK
    └── js/
        ├── styles.css               design system completo (mobile-first + admin responsive)
        ├── navigation.js            auth, toast, modal, app switcher, wallet ring, Leaflet helper
        └── icons.js                 aIcon(name, opts) — Feather + Tabler subset
```

## Design system

- **Suite marker**: arancione `#FF8C00` (logo, focus ring, CTA cross-app) — invariante in tutta la suite Aurea.
- **AureaCare accent**: care-blue `#3B82F6` (CTA hero, wallet ring, link, badge "Confermata") + light `#E6F1FB` + dark `#1E4FBF`.
- 5 stati prenotazione: `pending · approved · confirmed · completed · cancelled` con palette dedicata (warm / green / blue / olive / red).
- Mappe Leaflet con tiles **CartoDB Positron** + OpenStreetMap, marker SVG inline care-blue / orange (selezione) / verde (casa paziente).
- Icone solo SVG via `aIcon()` — nessuna emoji.
- **Responsive completo**: mobile-first nei flow paziente (frame 360-440px); console admin con sidebar che diventa bottom-nav su mobile e tabelle che si trasformano in card-view.

## Canale comunicazione admin → utente

L'unico canale di comunicazione tra admin e utente, sia per le notifiche di approvazione sia per i messaggi diretti, è **email**. Niente SMS, niente push notification fuori dall'app: la mail è il canale di tracciabilità documentata previsto dal flow.

## Cosa NON è incluso

- Lato trasporto sanitario — coperto da [AureaShuttle](https://aureashuttlepoc.vercel.app).
- Backend reale, autenticazione vera, pagamenti reali (Stripe / PayPal / Google Pay sono solo card visuali).
- Storage cifrato dei documenti (upload simulato — l'admin "vede" i doc come placeholder).
- Dati di contatto paziente nei mock (email/telefono non vengono mai esposti in UI: il POC tiene solo CF, data di nascita, indirizzo).

## Crediti

Sviluppato da [Emilio Destratis](https://www.linkedin.com/in/emilio-destratis-3894b2119/) · 3DSprinted.
