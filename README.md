# AureaCare · POC

**L'app di accesso alle cure del Programma ESG Carelink** — mockup navigabile della seconda app della suite Aurea, allineata al documento *"Alphio Carelink — Programma Nazionale (Lazio)"*.

Il paziente **non paga nulla**: le prestazioni sono coperte da **voucher ESG** finanziati dal **Fondo ESG Territoriale di Roma** (~€9M anno 1) e il trasporto porta-a-porta per le cure ricorsive è **gratuito**. Il programma è promosso da **Alphio APS**; la piattaforma tecnologica è coordinata da **AureaVia Srl Innovativa**.

🌐 **Live demo**: <https://aureacarepoc.vercel.app>
📐 **Hub di review** (tutte le 17 schermate): <https://aureacarepoc.vercel.app/canvas.html>

---

## Cosa fa

AureaCare copre **2 attori**:

- **Paziente** · si registra (accesso con credenziali, codice di segnalazione dell'ente, documento del solo livello di accesso scelto), prenota visite di Fascia A e diagnostica di Fascia B presso strutture private certificate ISO 9001 / JCI a Roma (**ricetta medica obbligatoria**), attiva il **trasporto gratuito porta-a-porta** per i cicli di cure ricorsive (handoff verso AureaShuttle), compila il questionario di raccolta informazioni e traccia l'impatto ESG personale (CO₂ evitata, ore caregiver risparmiate, drop-out evitati).
- **Coordinatore Alphio** (ruolo tecnico `admin`) · **valida i voucher** con revisione documenti e livello di accesso, scarica la **fattura verificabile CSRD**, gestisce la rete di 18 strutture private convenzionate, coordina le corse Samarcanda, monitora i KPI ESG (SROI per layer, benefici monetizzati, aderenza terapeutica) e il **Fondo ESG Territoriale** con la sua governance.

### L'app paziente non espone alcuna componente economica

Scelta di prodotto, su indicazione del cliente: nelle schermate paziente **non compare nulla di monetario o contabile** — nessun importo, listino, sconto, tariffa ESG, saldo o contatore voucher. Al paziente viene comunicata solo la **garanzia non numerica** del programma: *"Prestazione coperta dal Programma Carelink · nessun costo a tuo carico"*, *"Trasporto porta-a-porta gratuito"*.

Il modello economico (listino, **sconto fisso 15%**, tariffa ESG, voucher, Fondo ESG, SROI, sponsor, **fattura verificabile CSRD**) vive **interamente nella console del Coordinatore Alphio**: sono i requisiti di verificabilità CSRD del documento di programma, e restano intatti lì.

Il servizio è **handoff-ready con AureaShuttle**: le corse sono erogate da **Samarcanda Scarl** (certificata ISO 9001:2015) e costano **€72/corsa al programma** (€61 tariffa + €8 fee + €3 piattaforma) — mai al paziente. Il costo è visibile solo in console.

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

### Requisiti obbligatori e dichiarazioni storicizzate

- **ISEE obbligatorio in registrazione**: l'upload del Modello ISEE blocca l'avanzamento del wizard se assente.
- **Ricetta medica obbligatoria in prenotazione**: il CTA "Conferma" resta disabilitato finché il paziente non usa la ricetta già verificata o non ne carica una nuova. La ricetta compare nel recap e come requisito obbligatorio nel modale di revisione del Coordinatore.
- **Due dichiarazioni obbligatorie e storicizzate** (accettate in onboarding, consultabili in `profile.html`): (a) la documentazione caricata è veritiera, (b) autorizzazione al contatto con le autorità competenti per eventuali verifiche. Di ognuna si conservano data/ora, versione del testo e canale di accettazione; lo **storico** è visibile al paziente (con ricevuta scaricabile) e al Coordinatore nella scheda paziente.
- **Accesso con sole credenziali**: **SPID e CIE sono stati rimossi** dall'intero POC su indicazione del committente. Nessuna identità digitale, nessuna precompilazione anagrafica: `index.html` espone il solo form email/password. La *carta d'identità* resta come **documento** da caricare, con la sua scadenza — è un requisito documentale, non un metodo di accesso.

### Questionario di raccolta informazioni · **bozza da validare**

Il questionario accoglie informazioni in **3 momenti**:

| Momento | Dove | Cosa raccoglie |
|---|---|---|
| **Censimento anagrafico** | `onboarding.html` · step 4 "Il tuo percorso di cura" | patologia / area di cura, ciclo di cure ricorsive in corso + frequenza, struttura di riferimento, autonomia negli spostamenti, caregiver, esenzioni attive, consenso ai dati sanitari |
| **In fase di prenotazione** | `booking.html` | motivo della prestazione, urgenza percepita, bisogno di trasporto, accompagnatore, necessità particolari (sedia a rotelle, barella, assistenza) — oltre alla ricetta obbligatoria |
| **Dopo la visita** | `follow-up.html` | visita svolta o meno, prestazione successiva prescritta, valutazione 1-5 del trasporto, difficoltà incontrate, richiesta di ricontatto, nota libera |

Il follow-up è agganciato dalle cure **approvate con data passata** (`my-cures.html`, CTA "Com'è andata la visita?") e da un banner in `home.html`; le risposte sono persistite in `localStorage` (`aureacare_followup_<bookingId>`) e l'esito dell'ultimo questionario è mostrato al Coordinatore in `admin-patients.html`.

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
- Mock data hard-coded in [project/data/mock-data.js](project/data/mock-data.js) come `window.MOCK` — 18 strutture private certificate Roma-centriche con coordinate reali, 14 prestazioni (5 Fascia A + 5 Fascia B + 4 cicli ricorsivi Layer 1), 3 livelli di accesso, `patient` (con `declarations` + `declarations_history`), `patient_followups`, voucher e movimenti (consumati dalla console), 8 prenotazioni, 12 richieste da validare, 12 pazienti registrati, blocco KPI ESG e blocco `fund` (Fondo ESG Territoriale + governance).

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
    ├── canvas.html                  hub review (17 schermate + 3 tweaks live)
    ├── index.html                   login paziente (sole credenziali) + intro Programma Carelink
    ├── onboarding.html              wizard 5 step (anagrafica · livello di accesso + ISEE obbligatorio · indirizzo · questionario clinico [bozza] · consensi + dichiarazioni obbligatorie)
    ├── home.html                    dashboard paziente: stato programma (non numerico) + prossima cura + ESG personale + sponsor del Fondo
    ├── book-care.html               catalogo: Fascia A · Fascia B · cure ricorsive (pill "Coperta dal programma", nessun prezzo)
    ├── structures.html              strutture private certificate + mappa OSM + filtri (JCI, certificazione)
    ├── booking.html                 calendario + slot + ricetta obbligatoria + questionario di prenotazione + trasporto gratuito Layer 1
    ├── booking-summary.html         recap senza importi + handoff cross-app verso AureaShuttle
    ├── my-cures.html                cure In attesa / Approvate + modale dettaglio + CTA "Com'è andata la visita?"
    ├── follow-up.html               questionario post-visita (bozza) — persistito in localStorage
    ├── profile.html                 anagrafica + Programma Carelink + documenti + dichiarazioni obbligatorie e storico + ESG
    ├── admin-login.html             console Coordinatore Alphio
    ├── admin-dashboard.html         KPI (voucher validati, valore coperto dal Fondo, SROI) + chart
    ├── admin-approvals.html         coda validazione voucher + modale revisione documenti + fattura verificabile CSRD + mappa
    ├── admin-structures.html        rete Layer 2: strutture certificate ISO/JCI + sconto 15%
    ├── admin-patients.html          scheda paziente: livello di accesso, segnalato da, dichiarazioni, questionario post-visita, fattura CSRD
    ├── admin-esg.html               KPI ESG: SROI per layer, benefici A1-A6 / B1-B3, drop-out, ambiente
    ├── admin-fund.html              Fondo ESG Territoriale Roma: allocazione, burn-rate, sponsor, governance
    ├── assets/                       loghi sponsor (3DSprinted)
    ├── data/mock-data.js             window.MOCK
    └── js/
        ├── styles.css               design system completo (mobile-first + admin responsive)
        ├── navigation.js            auth, toast, modal, app switcher, Leaflet helper
        └── icons.js                 aIcon(name, opts) — Feather + Tabler subset
```

La bottom nav del paziente ha **4 voci**: Home · **Prenota** (`book-care.html`) · Cure · Profilo. La pagina Wallet **non esiste più**: le prestazioni non sono erogate direttamente dalla piattaforma e il modello voucher resta lato Coordinatore.

## Design system

- **Suite marker**: arancione `#FF8C00` (logo, focus ring, CTA cross-app) — invariante in tutta la suite Aurea.
- **AureaCare accent**: care-blue `#3B82F6` (CTA hero, link, badge, elementi dell'app) + light `#E6F1FB` + dark `#1E4FBF`.
- **Verde programma** `#0F6E56`: accenti dedicati al Programma ESG Carelink / Fondo ESG (pill programma, pill "Coperta dal programma", blocchi impatto, KPI del fondo). Non sostituisce l'accent dell'app.
- **Stati delle cure lato paziente: solo 2** — `pending` ("In attesa") e `approved` ("Approvate"). I token `--b-*` degli altri stati restano in `styles.css` perché la console del Coordinatore li usa ancora.
- Mappe Leaflet con tiles **CartoDB Positron** + OpenStreetMap, marker SVG inline care-blue / orange (selezione) / verde (casa paziente).
- Icone solo SVG via `aIcon()` — nessuna emoji.
- **Responsive completo**: mobile-first nei flow paziente (frame 360-440px); console admin con sidebar che diventa bottom-nav su mobile e tabelle che si trasformano in card-view.

## Canale comunicazione Coordinatore → paziente

L'unico canale di comunicazione tra Coordinatore Alphio e paziente, sia per le notifiche di validazione voucher sia per i messaggi diretti, è **email**. Niente SMS, niente push notification fuori dall'app: la mail è il canale di tracciabilità documentata previsto dal flow.

## Revisione cliente — cosa è cambiato

Seconda tornata di appunti del committente, tutti recepiti senza aggiungere servizi o strumenti esterni: dove serviva un documento firmato o un PDF, lo produce il browser.

| Punto sollevato | Come è stato risolto |
|---|---|
| Perché è sempre obbligatorio l'ISEE? | Non lo è più. I tre livelli di accesso sono alternativi, quindi è obbligatorio **solo il documento del livello scelto** (`access_levels[].doc_key`), più la carta d'identità. Onboarding e coda approvazioni applicano la stessa regola. |
| PDF da scaricare per le condizioni | Condizioni, informativa privacy e dichiarazioni sono testi **versionati con data e impronta** (`js/program-docs.js`), consultabili a video e scaricabili in PDF tramite la stampa del browser. Nessuna libreria, nessun generatore server-side. |
| Sottoscrizione non rifiutabile delle dichiarazioni · firma qualificata | Le dichiarazioni si firmano con **firma elettronica avanzata**: dopo la spunta serve un codice monouso, e restano conservati tipo di firma, metodo, riferimento OTP, marca temporale, origine e impronta del testo. Nel POC l'OTP è simulato e mostrato a schermo. |
| I documenti scadono · alert 1 mese prima | Ogni documento porta una **scadenza**; a 30 giorni scatta l'avviso in home, il badge nel profilo e la segnalazione al Coordinatore. Un documento **scaduto blocca le nuove richieste**; le cure già approvate restano valide. |
| La segnalazione la fa l'utente stesso? | No. La registrazione chiede il **codice di segnalazione** rilasciato dall'ente, e il sistema ne ricava ente e associazione (`referralFromCode`). Il canale non è più autodichiarato. Stessi prefissi su AureaShuttle: un solo codice per la suite. |
| Se il caregiver accompagna, come si calcolano le ore risparmiate? | Non si contano tutte. Paziente da solo → **3,4 h** liberate; caregiver comunque a bordo → **1,2 h** (guida, parcheggio, attesa). Il dato arriva dalla domanda già posta in prenotazione. Le ore rendicontate sono **nette**: 16.440 contro 20.400 lorde. |
| Se viene usato il taxi, non consuma CO₂? | Sì, ed è sottratta. Il bilancio è esplicito: **40,6 t evitate lorde − 19,2 t emesse dalla flotta = 21,4 t nette**, l'unico dato rendicontato e l'unico confrontato col target. |
| Data in formato americano, orario su 24h | I selettori nativi del browser seguono la lingua del sistema: sono stati **sostituiti con controlli propri** (`gg/mm/aaaa` e `hh:mm` su 24 ore, calendario compatto disegnato a mano) su AureaShuttle, che è dove comparivano. AureaCare usa già slot orari espliciti. |

I punti su validazione della corsa, notifiche del pick-up, modifica del luogo di prelievo e taratura dei tempi per difficoltà motoria riguardano il trasporto e sono risolti nel repo **AureaShuttle**, con cui questo POC è allineato.

## Disponibilità: preferenza, non prenotazione

La piattaforma **non è collegata alle agende delle strutture convenzionate** e nessuna integrazione è stata ipotizzata. Il mockup lo dice invece di nasconderlo:

- Il paziente indica **giorno e fascia oraria preferiti** (`MOCK.time_bands`), non uno slot. Il calendario propone i giorni di apertura della struttura, senza inventare orari liberi o occupati.
- Le prenotazioni in attesa portano la **fascia richiesta** e nessun orario; l'orario compare solo a conferma avvenuta.
- L'appuntamento **nasce nella console**: il Coordinatore verifica la disponibilità con la struttura e fissa lì l'orario, che il paziente riceve come appuntamento definitivo. Senza orario concordato la validazione non passa.
- Le disponibilità mostrate nell'elenco strutture sono **orientative**, comunicate dalle strutture stesse: servono a scegliere, non a prenotare.

È stato inoltre rimosso ovunque il vincolo esplicito di **2-4 ore lavorative** per la validazione: il copy dice che il Coordinatore verifica e conferma, senza promettere tempi.

## Questioni aperte (To Be)

Punti sollevati dal cliente che **non sono decidibili in autonomia**: nel mockup sono resi in modo esplicito ma provvisorio, in attesa di validazione.

| # | Questione aperta | Come è resa oggi nel mockup |
|---|---|---|
| 1 | **Perimetro delle prestazioni prenotabili**: solo visite, o anche altri servizi? | Il catalogo espone tutto: Fascia A (visite), Fascia B (diagnostica) e cicli di cure ricorsive con trasporto. Restringere il perimetro alle sole visite è una scelta di programma, non tecnica. |
| 2 | **Modalità di verifica dell'ISEE** | L'upload è **simulato** e il documento risulta "verificato dal Coordinatore Alphio". Nessuna integrazione INPS: non è stata ipotizzata di proposito. |
| 3 | **Modalità di verifica della ricetta medica** | Idem: upload simulato, ricetta "verificata dal Coordinatore Alphio". Nessuna integrazione con tessera sanitaria / ricetta dematerializzata. |
| 4 | **Valore di legge della firma** | Il POC implementa una **firma elettronica avanzata** con OTP simulato. Se il programma richiede la firma *qualificata* (certificato su dispositivo, prestatore accreditato) serve un prestatore di servizi fiduciari: è una scelta di compliance con un costo, non una modifica di interfaccia. |
| 5 | **Come conoscere la disponibilità reale delle strutture** | Oggi nessuna integrazione: il paziente esprime una preferenza e il Coordinatore concorda l'appuntamento con la struttura. Le alternative — integrazione con le agende delle 18 strutture, oppure un pannello in cui ogni struttura pubblica le proprie finestre — hanno costi e oneri di gestione molto diversi, ed è una scelta di programma. |

## Cosa NON è incluso

- Lato trasporto sanitario — coperto da [AureaShuttle](https://aureashuttlepoc.vercel.app).
- Backend reale, autenticazione vera. **Nessun pagamento**: nel modello Carelink il paziente non paga e non ricarica nulla, la quota a suo carico è sempre €0.
- Storage cifrato dei documenti (upload simulato — il Coordinatore "vede" i doc come placeholder).
- Dati di contatto paziente nei mock (email/telefono non vengono mai esposti in UI: il POC tiene solo CF, data di nascita, indirizzo).

## Fonte

Il modello rappresentato è quello del documento **"Alphio Carelink — Programma Nazionale (Lazio)"**: numeri, tariffe, SROI, governance e livelli di accesso del mockup seguono quel documento.

## Crediti

Sviluppato da [Emilio Destratis](https://www.linkedin.com/in/emilio-destratis-3894b2119/) · 3DSprinted.
