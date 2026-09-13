# AureaCare — POC mockup

Mockup statico e navigabile di **AureaCare**, secondo prodotto della suite Aurea (dopo AureaVia e prima di AureaShuttle) e **app ufficiale del Programma ESG Carelink** promosso da **Alphio APS**. Accesso alle cure senza costi per il paziente: prestazioni di Fascia A/B presso strutture private certificate ISO 9001/JCI, **trasporto gratuito porta-a-porta** per le cure ricorsive (Samarcanda Scarl) con handoff esplicito verso AureaShuttle, validazione dei voucher da parte del **Coordinatore Alphio**. POC limitato all'area del Comune di Roma.

Fonte del modello: documento *"Alphio Carelink — Programma Nazionale (Lazio)"*.

## Confine della componente economica

**L'app paziente non espone nulla di monetario**: niente importi, listino, sconto 15%, tariffa ESG, saldo o contatore voucher. Al paziente arriva solo la garanzia **non numerica** del programma — *"Prestazione coperta dal Programma Carelink · nessun costo a tuo carico"*, *"Trasporto porta-a-porta gratuito"*.

Tutto il modello economico (listino, sconto fisso 15%, tariffa ESG, voucher, Fondo ESG ~€9M, SROI, sponsor, **fattura verificabile CSRD**) vive nella **console del Coordinatore Alphio**: sono i requisiti di verificabilità CSRD del documento di programma e lì restano integri.

## Stack

- HTML5 + CSS3 + Vanilla JavaScript ES6+ (zero framework)
- Open Sans via Google Fonts CDN
- Icone SVG inline (subset Feather + Tabler outline) via `js/icons.js`
- Persistenza: `localStorage` (auth condivisa con AureaVia / AureaShuttle, tweak preferences)
- Dati mock hard-coded in `data/mock-data.js`: 18 strutture private certificate a Roma, 14 prestazioni (5 Fascia A + 5 Fascia B + 4 cicli ricorsivi Layer 1), 3 livelli di accesso, `patient` con `declarations` + `declarations_history`, `patient_followups`, voucher e movimenti (usati dalla console), 8 prenotazioni (stati `pending` / `approved`), 12 richieste da validare, 12 pazienti, KPI ESG e blocco `fund` (Fondo ESG Territoriale ~€9M + governance)

## Struttura del progetto

```
aureacarepoc/
├── canvas.html               # Hub di review con tutte le 17 schermate + Tweaks panel
│
├── index.html                # Lato paziente — login unificato Aurea + CIE simulata + intro Carelink
├── onboarding.html           # Wizard 5 step: anagrafica → livello di accesso + ISEE obbligatorio → indirizzo → questionario clinico (bozza) → consensi + dichiarazioni obbligatorie
├── home.html                 # Dashboard paziente (stato programma non numerico, prossima cura, ESG personale, sponsor del Fondo)
├── book-care.html            # Catalogo: Fascia A (visite) / Fascia B (diagnostica) / cure ricorsive (trasporto) — pill "Coperta dal programma"
├── structures.html           # Mappa Roma + strutture private certificate ISO 9001 / JCI
├── booking.html              # Calendario + bottom sheet slot + ricetta obbligatoria + questionario di prenotazione + trasporto gratuito Layer 1
├── booking-summary.html      # Recap senza importi (prestazione, struttura, ricetta allegata) + handoff AureaShuttle
├── my-cures.html             # Tab "In attesa" / "Approvate" + modale dettaglio + CTA "Com'è andata la visita?"
├── follow-up.html            # Questionario post-visita (bozza) — risposte in localStorage
├── profile.html              # Anagrafica, Programma Carelink, documenti, dichiarazioni obbligatorie + storico, ESG personale
│
├── admin-login.html          # Console Coordinatore Alphio: login
├── admin-dashboard.html      # KPI (voucher validati, valore coperto dal Fondo, SROI) + dual-line chart
├── admin-approvals.html      # Coda + modale di revisione e validazione voucher + fattura verificabile CSRD
├── admin-structures.html     # Rete Layer 2: strutture certificate + sconto contrattuale 15%
├── admin-patients.html       # Tabella pazienti + scheda: dichiarazioni, questionario post-visita, fattura CSRD
├── admin-esg.html            # KPI ESG: SROI L1/L2, benefici A1-A6 / B1-B3, drop-out, ambiente
├── admin-fund.html           # Fondo ESG Territoriale Roma: allocazione, burn-rate, sponsor, governance
│
├── js/
│   ├── styles.css            # Token + componenti + layout (eredita AureaVia + accent care)
│   ├── navigation.js         # Auth, toast, confirm dialog, app switcher, helper Leaflet
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
- **Verde programma** `#0F6E56`: accenti Carelink / Fondo ESG (pill programma, pill "Coperta dal programma", blocchi impatto, KPI del fondo)
- **Stati delle cure lato paziente: solo 2** — pending warm ("In attesa") e approved green ("Approvate"). I token `--b-*` di confirmed / completed / cancelled restano in `styles.css`: li usa ancora la console.

### Tipografia
- Open Sans 400/600/700, line-height 1.6 per la leggibilità anche su mobile a 360px

### Pattern AureaCare-specific
- **Bottom nav paziente a 4 voci**: Home · Prenota (`book-care.html`) · Cure · Profilo. Nessuna voce Voucher: la pagina wallet non esiste più.
- **Copertura dichiarata, non contabilizzata**: pill verde "Coperta dal programma" sul catalogo e riga "Coperta dal Programma Carelink · nessun costo a tuo carico" nel recap. Zero cifre lato paziente.
- **Banner Roma**: sticky su `onboarding.html` step 3 e `structures.html`, fondo `#E6F1FB`
- **Handoff AureaShuttle**: la domanda "serve trasporto?" appare già nel calendario; per i cicli il trasporto è incluso e preselezionato; il summary mostra il riepilogo cross-app con la corsa Samarcanda gratuita
- **App switcher**: dropdown 3 brand-card (default), con varianti modale e bottom sheet

## Tweaks live

`canvas.html` espone un pannello in basso a destra che permette di:

| Tweak | Valori | Effetto |
|---|---|---|
| Care accent · hue | Soft blue / Teal / Indigo / Verde clinico | Aggiorna `--care-blue` su tutte le 17 schermate live |
| App switcher | Dropdown / Modale / Bottom sheet | Cambia il pattern di apertura dell'icona griglia |
| Handoff Shuttle | Pre-flagged / Visuale / Sobrio | Cambia la card sul summary |

Le scelte sono persistite in `localStorage` (chiavi `aureacare_*`) e applicate dinamicamente. Il tweak **Voucher ring** (chiave `aureacare_wallet_variant`) è stato **rimosso** insieme alla pagina wallet: era un contatore economico e non ha più posto nell'app paziente.

## Accesso unificato (concept)

Il login scrive in `localStorage` la chiave `aurea_auth_user` con `{ email, role, apps }`. Stessa chiave usata da AureaVia e AureaShuttle per simulare SSO senza backend reale. Il ruolo tecnico del Coordinatore Alphio resta `role: 'admin'` (cambia solo il copy).

L'icona griglia 3×3 in header apre l'app switcher con 3 card: **AureaVia**, **AureaShuttle** (trasporto sanitario · corse Samarcanda) e **AureaCare** (current, evidenziata).

## Deploy

Repo pronto per essere pushato su `github.com/destone28/aureacarepoc` e deployato su Vercel o GitHub Pages — nessun build step, è statico.

## Questioni aperte (To Be)

Sollevate dal cliente e **non decidibili in autonomia** — nel mockup sono rese in modo provvisorio, in attesa di validazione:

1. **Perimetro delle prestazioni prenotabili**: solo visite o anche altri servizi? Oggi il catalogo espone Fascia A, Fascia B e cicli con trasporto.
2. **Modalità di verifica dell'ISEE**: upload simulato, documento "verificato dal Coordinatore Alphio". Nessuna integrazione INPS ipotizzata.
3. **Modalità di verifica della ricetta medica**: idem — nessuna integrazione con tessera sanitaria o ricetta dematerializzata.
4. **Contenuto del questionario**: è una **bozza proposta**, marcata a video, da validare col cliente prima di trattarla come requisito.
5. **Valore di legge della firma**: il POC implementa una **firma elettronica avanzata** (OTP simulato + marca temporale + impronta del testo). La firma *qualificata* richiede un prestatore di servizi fiduciari accreditato: è una scelta di compliance con un costo, non una modifica di interfaccia.

## Revisione cliente — cosa è cambiato

Documento obbligatorio **per livello di accesso** (l'ISEE non è più richiesto a tutti) · **codice di segnalazione** al posto del canale autodichiarato · **scadenze documentali** con avviso a 30 giorni e blocco delle nuove richieste · **firma elettronica avanzata** sulle dichiarazioni · condizioni, privacy e dichiarazioni **scaricabili in PDF** dalla stampa del browser · **CO₂ netta** delle emissioni della flotta · **ore caregiver nette** degli accompagnamenti effettivi · **SPID rimosso**, resta la sola CIE.

Il modulo condiviso di queste funzioni è `js/program-docs.js`; l'equivalente su AureaShuttle vive in coda a `js/navigation.js`.

## Cosa NON è incluso

- Backend reale o autenticazione vera (la CIE è un flusso **simulato**: nessun Identity Provider, nessuna libreria, nessun logo esterno). **SPID è stato rimosso dal POC** su indicazione del committente.
- **Pagamenti**: nel modello Carelink il paziente non paga e non ricarica nulla. Nessun checkout, nessun wallet prepagato.
- Storage cifrato dei documenti (UI di upload simulata)
- Verifiche automatiche di ISEE e ricetta (vedi "Questioni aperte")

## Note di design

- AureaCare condivide griglia, componenti, font e radius con AureaVia. L'unico delta sistematico è l'accent care-blue per i pattern dell'app (link, badge, CTA hero), più il verde programma per gli elementi Carelink / Fondo ESG.
- L'arancione AureaVia rimane sempre presente come marker di suite: logo, hover, focus ring, CTA cross-app.
- Tutte le icone sono SVG inline a stroke (Feather/Tabler outline) — nessuna emoji.
- Microcopy in italiano credibile, dati Roma-centrici (Gemelli, Bambino Gesù, IDI, Aurelia Hospital, Villa Gianicolense, Salvator Mundi, ecc. — tutte strutture private convenzionate al Layer 2).

---

**Suite Aurea** · v0.2 POC · Programma ESG Carelink
