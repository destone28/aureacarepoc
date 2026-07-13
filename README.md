# AureaCare · POC

**L'app di accesso alle cure del Programma ESG Carelink** — mockup navigabile della seconda app della suite Aurea, allineata al documento *"Alphio Carelink — Programma Nazionale (Lazio)"*.

Il paziente **non paga nulla**: le prestazioni sono coperte da **voucher ESG** finanziati dal **Fondo ESG Territoriale di Roma** (~€9M anno 1) e il trasporto porta-a-porta per le cure ricorsive è **gratuito**. Il programma è promosso da **Alphio APS**; la piattaforma tecnologica è coordinata da **AureaVia Srl Innovativa**.

🌐 **Live demo**: <https://aureacarepoc.vercel.app>
📐 **Hub di review** (tutte le 17 schermate): <https://aureacarepoc.vercel.app/canvas.html>

---

## Cosa fa

AureaCare copre **2 attori**:

- **Paziente** · riceve **voucher ESG** assegnati dal Coordinatore Alphio (1 voucher = 1 prestazione, quota a suo carico **€0**), prenota visite di Fascia A e diagnostica di Fascia B presso strutture private certificate ISO 9001 / JCI a Roma, attiva il **trasporto gratuito porta-a-porta** per i cicli di cure ricorsive (handoff verso AureaShuttle), traccia l'impatto ESG personale (CO₂ evitata, ore caregiver risparmiate, drop-out evitati).
- **Coordinatore Alphio** (ruolo tecnico `admin`) · **valida i voucher** con revisione documenti e livello di accesso, gestisce la rete di 18 strutture private convenzionate, coordina le corse Samarcanda, monitora i KPI ESG (SROI per layer, benefici monetizzati, aderenza terapeutica) e il **Fondo ESG Territoriale** con la sua governance.

Il servizio è **handoff-ready con AureaShuttle**: le corse sono erogate da **Samarcanda Scarl** (certificata ISO 9001:2015) e costano **€72/corsa al programma** (€61 tariffa + €8 fee + €3 piattaforma) — mai al paziente.

## Modello di accesso

Il programma ha **due layer**:

- **Layer 1 — Mobilità sanitaria assistita**: trasporto gratuito porta-a-porta per pazienti fragili in cure ricorsive (oncologia, dialisi, neurologia, pediatria). Erogato da Samarcanda, coperto dal Fondo.
- **Layer 2 — Accesso alle cure**: voucher ESG spendibili in strutture private certificate. Il fondo copre la **tariffa ESG** = listino ufficiale della struttura con **sconto fisso contrattuale del 15%**, verificabile su ogni fattura dal revisore CSRD.

L'accesso al Layer 2 richiede **almeno uno** di questi 3 requisiti, verificati dal Coordinatore Alphio:

| Livello | Requisito | Documento |
|---|---|---|
| 1 | **Urgenza clinica** | Certificata da SSN / MMG |
| 2 | **ISEE < €20.000** | Attestazione ISEE in corso di validità |
| 3 | **Due diligence** | Valutazione documentale del Comitato ESG |

I pazienti arrivano **segnalati** da Comuni / Regione Lazio → Associazioni (che curano onboarding e privacy) → Coordinatore Alphio.

### Convenzione Terzo Settore — sconto fisso 15%

| Fascia A · Visite specialistiche | Listino privato | Tariffa ESG |
|---|---|---|
| Prima visita oncologica | €150–200 | €150–170 |
| Visita oncologica di controllo | €100–150 | €100–120 |
| Prima visita cardiologica | €120–200 | €120–170 |
| Prima visita neurologica | €120–200 | €120–170 |
| Visita nefrologica | €90–150 | €90–120 |

| Fascia B · Diagnostica strumentale | Listino privato | Tariffa ESG |
|---|---|---|
| RMN cranio/rachide | €280–400 | €280–340 |
| TC total body | €200–350 | €200–297,50 |
| Ecografia addome | €100–180 | €100–153 |
| PET scan oncologico | €1.000–1.400 | €1.000–1.190 |
| Scintigrafia ossea | €250–400 | €250–340 |

Le **cure ricorsive** (Layer 1) non consumano voucher e non hanno prezzo a carico del paziente: il programma copre il trasporto per tutte le sedute (2 tratte a seduta).

## Fondo ESG Territoriale · Roma · Anno 1

Fondo **€9.000.000** — Fee Alphio APS (scaglioni 15/10/7%) €960.000 · Layer 1 mobilità €4.020.000 · Layer 2 voucher €4.020.000. Alimentato da sponsor ESG nazionali e territoriali, plafond welfare delle Compagnie di Assicurazione e contributi comunali/regionali.

**Target anno 1**: 1.400 pazienti L1 · 35.100 corse · 33.500 voucher · ~5.580 pazienti L2 · 52 t CO₂ evitate ≈ 3.500 alberi.
**Avanzamento YTD (mock)**: impegnato €3.124.810 (corse 14.620 × €72 = €1.052.640 · voucher 13.900 per €1.672.170 · fee €400.000), residuo **€5.875.190**.
**SROI**: L1 0,82–0,97x · L2 4,56–6,31x · combinato 2,76–3,64x → valore sociale €24,8M–32,7M, validato ex-post da primaria società di revisione.

Governance: **Comitato ESG locale** (Alphio APS + Comune di Roma + sponsor territoriali) e supervisione nazionale Alphio APS / AureaVia Srl. Vedi `admin-fund.html`.

## Suite Aurea

| App | Dominio | Repo |
|---|---|---|
| **AureaVia** (NCC + taxi premium, driver layer) | <https://destone28.github.io/aureaviapoc/> | [aureaviapoc](https://github.com/destone28/aureaviapoc) |
| **AureaCare** (accesso alle cure · Programma Carelink) | <https://aureacarepoc.vercel.app> | this repo |
| **AureaShuttle** (trasporto sanitario · corse Samarcanda) | <https://aureashuttlepoc.vercel.app> | [aureashuttlepoc](https://github.com/destone28/aureashuttlepoc) |

SSO simulato cross-app via chiave `aurea_auth_user` in `localStorage` (convenzione condivisa con AureaVia + AureaShuttle).

## Stack

- HTML5 + CSS3 + Vanilla JS ES6+ — **zero framework**, zero build step.
- Open Sans (Google Fonts CDN), Leaflet + OpenStreetMap per le mappe.
- Persistenza: `localStorage` (auth, preferenze tweaks).
- Mock data hard-coded in [project/data/mock-data.js](project/data/mock-data.js) come `window.MOCK` — 18 strutture private certificate Roma-centriche con coordinate reali, 14 prestazioni (5 Fascia A + 5 Fascia B + 4 cicli ricorsivi Layer 1), 3 livelli di accesso, voucher ESG del paziente, 8 prenotazioni, 12 richieste da validare, 12 pazienti registrati, blocco KPI ESG e blocco `fund` (Fondo ESG Territoriale + governance).

## Run in locale

Nessuna installazione, nessuna build. Apri direttamente i file in browser oppure servi la cartella `project/`:

```bash
cd project && python3 -m http.server 8080
# poi apri:
# http://localhost:8080/canvas.html       hub review 17 schermate + tweaks panel
# http://localhost:8080/index.html        flusso paziente
# http://localhost:8080/admin-login.html  console Coordinatore Alphio
```

Login simulato: **qualsiasi email/password va bene**.

## Struttura

```
aureacarepoc/
├── README.md
├── CLAUDE.md                  spec per agenti AI che riprendono il repo
└── project/
    ├── canvas.html                  hub review (17 schermate + 4 tweaks live)
    ├── index.html                   login paziente + intro Programma Carelink
    ├── onboarding.html              wizard 4 step (anagrafica + canale di segnalazione · livello di accesso + documenti · indirizzo · GDPR)
    ├── home.html                    dashboard paziente + voucher residui + ESG personale + sponsor del Fondo
    ├── book-care.html               catalogo: Fascia A · Fascia B · cure ricorsive (trasporto)
    ├── structures.html              strutture private certificate + mappa OSM + filtri (JCI, certificazione)
    ├── booking.html                 calendario + slot + trasporto gratuito Layer 1
    ├── booking-summary.html         recap a costo zero + handoff cross-app verso AureaShuttle
    ├── wallet.html                  voucher ESG: ring, "come funziona", richiesta voucher, storico
    ├── my-cures.html                lista prenotazioni + modale dettaglio + fattura verificabile CSRD
    ├── profile.html                 anagrafica + card Programma Carelink + documenti + ESG + sponsor
    ├── admin-login.html             console Coordinatore Alphio
    ├── admin-dashboard.html         KPI (voucher validati, valore coperto dal Fondo, SROI) + chart
    ├── admin-approvals.html         coda validazione voucher + modale revisione documenti + mappa
    ├── admin-structures.html        rete Layer 2: strutture certificate ISO/JCI + sconto 15%
    ├── admin-patients.html          tabella pazienti + livello di accesso + segnalato da
    ├── admin-esg.html               KPI ESG: SROI per layer, benefici A1-A6 / B1-B3, drop-out, ambiente
    ├── admin-fund.html              Fondo ESG Territoriale Roma: allocazione, burn-rate, sponsor, governance
    ├── assets/                       loghi sponsor (3DSprinted)
    ├── data/mock-data.js             window.MOCK
    └── js/
        ├── styles.css               design system completo (mobile-first + admin responsive)
        ├── navigation.js            auth, toast, modal, app switcher, voucher ring, Leaflet helper
        └── icons.js                 aIcon(name, opts) — Feather + Tabler subset
```

## Design system

- **Suite marker**: arancione `#FF8C00` (logo, focus ring, CTA cross-app) — invariante in tutta la suite Aurea.
- **AureaCare accent**: care-blue `#3B82F6` (CTA hero, voucher ring, link, badge "Confermata") + light `#E6F1FB` + dark `#1E4FBF`.
- **Verde programma** `#0F6E56`: accenti dedicati al Programma ESG Carelink / Fondo ESG (pill programma, blocchi impatto, KPI del fondo). Non sostituisce l'accent dell'app.
- 5 stati prenotazione: `pending · approved · confirmed · completed · cancelled` con palette dedicata (warm / green / blue / olive / red).
- Mappe Leaflet con tiles **CartoDB Positron** + OpenStreetMap, marker SVG inline care-blue / orange (selezione) / verde (casa paziente).
- Icone solo SVG via `aIcon()` — nessuna emoji.
- **Responsive completo**: mobile-first nei flow paziente (frame 360-440px); console admin con sidebar che diventa bottom-nav su mobile e tabelle che si trasformano in card-view.

## Canale comunicazione Coordinatore → paziente

L'unico canale di comunicazione tra Coordinatore Alphio e paziente, sia per le notifiche di validazione voucher sia per i messaggi diretti, è **email**. Niente SMS, niente push notification fuori dall'app: la mail è il canale di tracciabilità documentata previsto dal flow.

## Cosa NON è incluso

- Lato trasporto sanitario — coperto da [AureaShuttle](https://aureashuttlepoc.vercel.app).
- Backend reale, autenticazione vera. **Nessun pagamento**: nel modello Carelink il paziente non paga e non ricarica nulla, la quota a suo carico è sempre €0.
- Storage cifrato dei documenti (upload simulato — il Coordinatore "vede" i doc come placeholder).
- Dati di contatto paziente nei mock (email/telefono non vengono mai esposti in UI: il POC tiene solo CF, data di nascita, indirizzo).

## Fonte

Il modello rappresentato è quello del documento **"Alphio Carelink — Programma Nazionale (Lazio)"**: numeri, tariffe, SROI, governance e livelli di accesso del mockup seguono quel documento.

## Crediti

Sviluppato da [Emilio Destratis](https://www.linkedin.com/in/emilio-destratis-3894b2119/) · 3DSprinted.
