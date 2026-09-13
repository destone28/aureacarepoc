/* AureaCare — documenti di programma, scadenze e sottoscrizione FEA
   ============================================================
   Nasce dalla revisione cliente. Tre esigenze, tutte risolte senza aggiungere
   servizi esterni: il browser è l'unico strumento necessario.

   1) «PDF da scaricare per le condizioni?»
      I testi vivono in PROGRAM_DOCS, versionati. openProgramDoc() li mostra a
      video, printProgramDoc() apre una finestra di stampa: "Salva come PDF" del
      browser produce il PDF. Nessuna libreria, nessun generatore server-side.

   2) «Come non è rifiutabile la sottoscrizione delle dichiarazioni? Firma
      qualificata»
      requestFeaSignature() chiede un secondo fattore legato alla persona (OTP)
      prima di registrare la sottoscrizione, e conserva marca temporale, hash
      del testo e riferimento OTP. Nel POC l'OTP è simulato e visibile a
      schermo: quello che conta è il modello del dato conservato.

   3) «I documenti scadono (es. Isee, carta identità) alert 1 mese prima»
      docExpiryState() classifica ogni documento in valido / in scadenza /
      scaduto usando la stessa data di riferimento della demo, con soglia di
      preavviso a 30 giorni.
   ============================================================ */

// ---------- Scadenze documentali ----------

const DOC_EXPIRY_WARN_DAYS = 30;

// Data di riferimento della demo: la stessa usata dal questionario post-visita.
function docToday() {
  return (typeof DEMO_TODAY !== 'undefined') ? DEMO_TODAY : new Date();
}

// Le date dei documenti sono in formato italiano gg/mm/aaaa.
function parseItDate(str) {
  const m = String(str || '').trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  return isNaN(d.getTime()) ? null : d;
}

function formatItDate(date) {
  if (!date) return '—';
  const p = n => String(n).padStart(2, '0');
  return `${p(date.getDate())}/${p(date.getMonth() + 1)}/${date.getFullYear()}`;
}

/* Stato di un documento rispetto alla sua scadenza.
   → { state, days, label, badge, expires }
     state: 'none' (senza scadenza) | 'valid' | 'expiring' | 'expired'
     days : giorni mancanti (negativi se scaduto) */
function docExpiryState(expires) {
  const d = parseItDate(expires);
  if (!d) return { state: 'none', days: null, label: '', badge: '', expires: null };
  const ms = d - docToday();
  const days = Math.ceil(ms / 86400000);
  if (days < 0)  return { state: 'expired',  days, label: `Scaduto il ${expires}`,      badge: 'badge--cancelled', expires };
  if (days <= DOC_EXPIRY_WARN_DAYS)
                 return { state: 'expiring', days, label: days === 0 ? `Scade oggi` : `Scade tra ${days} giorni · ${expires}`, badge: 'badge--pending', expires };
  return           { state: 'valid',    days, label: `Valido fino al ${expires}`, badge: 'badge--approved', expires };
}

/* Documenti del paziente che richiedono attenzione, ordinati per urgenza.
   Usato dal banner di home e dalla scheda paziente della console. */
function expiringDocs(docs) {
  const src = docs || ((window.MOCK && MOCK.patient && MOCK.patient.docs) || {});
  return Object.keys(src)
    .map(k => Object.assign({ key: k, name: src[k].name }, docExpiryState(src[k].expires)))
    .filter(d => d.state === 'expiring' || d.state === 'expired')
    .sort((a, b) => a.days - b.days);
}

// ---------- Documenti di programma (testi versionati) ----------

const PROGRAM_DOCS = {
  conditions: {
    id:      'CARELINK-COND',
    title:   'Condizioni del Programma ESG Carelink',
    version: 'v1.0',
    date:    '04/01/2026',
    hash:    'a7f3c9d2e1b48065fa2c7d31e9b40a5c',
    sections: [
      ['1 · Che cos\'è il Programma Carelink',
       'Il Programma ESG Carelink è promosso da Alphio APS, ente non profit, ed è finanziato dal Fondo ESG Territoriale di Roma. Garantisce ai pazienti ammessi prestazioni sanitarie presso strutture private certificate e, per le cure ricorrenti, il trasporto porta-a-porta. Il Programma non è un\'assicurazione e non sostituisce il Servizio Sanitario Nazionale.'],
      ['2 · Nessun costo a carico del paziente',
       'Tutte le prestazioni autorizzate e tutte le corse erogate nell\'ambito del Programma sono interamente coperte dal Fondo ESG Territoriale. Al paziente non è richiesto alcun pagamento, alcuna anticipazione e alcuna ricarica, in nessun momento e per nessuna prestazione. Chiunque richieda un pagamento a nome del Programma va segnalato al Coordinatore Alphio.'],
      ['3 · Requisiti di accesso',
       'L\'accesso richiede almeno uno dei seguenti requisiti, alternativi tra loro: urgenza clinica certificata dal Servizio Sanitario Nazionale o dal medico di medicina generale; ISEE sotto la soglia stabilita dal Programma; valutazione di due diligence del Comitato ESG locale. Per ciascun livello è richiesto il solo documento che lo comprova. La verifica è a cura del Coordinatore Alphio.'],
      ['4 · Ingresso su segnalazione',
       'L\'ingresso nel Programma avviene su segnalazione di un ente del territorio — Comune, Regione Lazio, associazione convenzionata o medico di medicina generale. L\'ente rilascia al paziente un codice di segnalazione, che va indicato in fase di registrazione: è il codice a identificare l\'ente segnalante, non una dichiarazione del paziente.'],
      ['5 · Documentazione e validità',
       'I documenti caricati devono essere in corso di validità. Il Programma avvisa il paziente trenta giorni prima della scadenza di ciascun documento. Un documento scaduto sospende la possibilità di richiedere nuove prestazioni fino al rinnovo; le prestazioni già autorizzate non vengono revocate.'],
      ['6 · Prescrizione medica',
       'Ogni prestazione richiede una prescrizione medica in corso di validità: è il presupposto clinico dell\'autorizzazione. In assenza di prescrizione verificata la richiesta non può essere approvata dal Coordinatore Alphio.'],
      ['7 · Trasporto sanitario',
       'Il trasporto porta-a-porta è riservato ai cicli di cura ricorrenti ed è erogato da Samarcanda Scarl, certificata ISO 9001:2015, tramite l\'applicazione AureaShuttle. L\'orario di prelievo è calcolato dal sistema a partire dall\'orario dell\'appuntamento. Il servizio è gratuito e l\'annullamento non comporta penali.'],
      ['8 · Dichiarazioni obbligatorie',
       'L\'ammissione al Programma richiede la sottoscrizione della dichiarazione di veridicità della documentazione e dell\'autorizzazione alle verifiche presso le autorità competenti. Le dichiarazioni sono sottoscritte con firma elettronica avanzata e conservate con marca temporale. Una dichiarazione non veritiera comporta l\'esclusione dal Programma e la revoca delle prestazioni già autorizzate.'],
      ['9 · Trattamento dei dati',
       'I dati anagrafici, clinici e documentali sono trattati per la sola finalità di erogazione del servizio, secondo l\'informativa privacy allegata. I documenti sono visibili al solo Coordinatore Alphio. I dati di impatto pubblicati dal Programma sono aggregati e anonimizzati.'],
      ['10 · Durata e recesso',
       'L\'adesione al Programma non ha durata predeterminata e il paziente può recedere in qualsiasi momento dall\'area Privacy del profilo, senza oneri. Le dichiarazioni obbligatorie non sono revocabili singolarmente: la loro revoca coincide con l\'uscita dal Programma.']
    ]
  },

  privacy: {
    id:      'CARELINK-GDPR',
    title:   'Informativa privacy — Programma ESG Carelink',
    version: 'v1.0',
    date:    '04/01/2026',
    hash:    'd41c8b7e05a9f236c1b8074ed2395f0a',
    sections: [
      ['Titolare del trattamento',
       'Alphio APS, ente promotore del Programma ESG Carelink, in qualità di titolare. Il Coordinatore Alphio è l\'unico soggetto abilitato alla consultazione dei documenti caricati.'],
      ['Dati trattati',
       'Dati anagrafici e di residenza, codice fiscale, documento di identità, documentazione del requisito di accesso, prescrizioni mediche, percorso di cura dichiarato, esiti del questionario di follow-up. Non vengono trattati dati di pagamento: il Programma non prevede alcuna transazione a carico del paziente.'],
      ['Finalità e base giuridica',
       'Erogazione delle prestazioni e del trasporto sanitario (esecuzione del rapporto), verifica dei requisiti di accesso (obbligo di rendicontazione verso il Fondo ESG e i suoi revisori), rendicontazione di impatto in forma aggregata e anonimizzata (interesse legittimo).'],
      ['Comunicazione a terzi',
       'I dati strettamente necessari all\'erogazione sono comunicati alla struttura sanitaria presso cui è prenotata la prestazione e, per il solo trasporto, a Samarcanda Scarl. Nessun dato individuale è comunicato agli sponsor del Fondo, che ricevono esclusivamente dati aggregati.'],
      ['Conservazione',
       'I documenti e le dichiarazioni sono conservati per la durata dell\'adesione e per i dieci anni successivi, termine richiesto dalla verificabilità CSRD delle rendicontazioni del Fondo.'],
      ['Diritti dell\'interessato',
       'Accesso, rettifica, cancellazione, limitazione, portabilità e opposizione. Le richieste si inoltrano dall\'area Privacy del profilo; la procedura di cancellazione si conclude entro trenta giorni.']
    ]
  },

  declarations: {
    id:      'CARELINK-DICH',
    title:   'Dichiarazioni obbligatorie del Programma',
    version: 'v1.0',
    date:    '04/01/2026',
    hash:    'f1902d4ba7c36e58d0142b9c7e3a6510',
    sections: [
      ['Dichiarazione di veridicità della documentazione',
       'Il sottoscritto dichiara che la documentazione caricata nella piattaforma AureaCare è veritiera e riferita alla propria posizione. È consapevole che una dichiarazione non veritiera comporta l\'esclusione dal Programma ESG Carelink e la revoca delle prestazioni già autorizzate, oltre alle conseguenze previste dalla legge per le dichiarazioni mendaci.'],
      ['Autorizzazione alle verifiche',
       'Il sottoscritto autorizza il Coordinatore Alphio a contattare le autorità competenti per le verifiche sui requisiti di accesso e sui documenti presentati, nei limiti strettamente necessari all\'accertamento.'],
      ['Modalità di sottoscrizione',
       'Le dichiarazioni sono sottoscritte con firma elettronica avanzata: alla spunta segue un codice monouso inviato all\'indirizzo e-mail verificato del sottoscrittore. Della sottoscrizione sono conservati data e ora, versione del testo, impronta del documento e riferimento del codice monouso. Le dichiarazioni non sono revocabili singolarmente e sono storicizzate: ogni riconferma genera una nuova voce.']
    ]
  }
};

// ---------- Modale generico (riusa .confirm-overlay di styles.css) ----------
// AureaCare non ha un modale informativo generico: qui ne serve uno con corpo
// scrollabile e più azioni. Resta locale a questo modulo per non toccare il
// comportamento dei modali già montati nelle singole pagine.
function openDocModal(opts) {
  document.querySelectorAll('.doc-overlay').forEach(el => el.remove());
  const overlay = document.createElement('div');
  overlay.className = 'confirm-overlay doc-overlay';
  const buttons = (opts.actions || []).map((a, i) =>
    `<button class="btn ${a.kind === 'primary' ? 'btn--care' : 'btn--secondary'}" style="flex:1" data-act="${i}">${a.label}</button>`
  ).join('');
  overlay.innerHTML = `
    <div class="confirm-dialog" style="max-width:520px;width:min(520px,92vw);text-align:left">
      <h3 class="confirm-title" style="text-align:left">${opts.title}</h3>
      <div style="max-height:min(52vh,460px);overflow-y:auto;margin:4px 0 16px;text-align:left">${opts.bodyHtml || ''}</div>
      <div class="confirm-actions">${buttons}</div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelectorAll('[data-act]').forEach(btn => {
    const a = opts.actions[Number(btn.dataset.act)];
    btn.onclick = () => {
      if (!a.keepOpen) overlay.remove();
      if (a.onClick) a.onClick(overlay);
    };
  });
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  const focusable = overlay.querySelector('input, button');
  if (focusable) setTimeout(() => focusable.focus(), 60);
  return overlay;
}

function closeDocModal() {
  document.querySelectorAll('.doc-overlay').forEach(el => el.remove());
}

// ---------- Visualizzazione e stampa ----------

function programDocHtml(doc) {
  return doc.sections.map(([h, body]) =>
    `<h4 style="font-size:14px;font-weight:700;margin:18px 0 6px">${h}</h4>
     <p style="font-size:13.5px;line-height:1.6;color:var(--dark-gray);margin:0">${body}</p>`
  ).join('');
}

/* Mostra il documento in un modale, con il pulsante di download PDF. */
function openProgramDoc(key) {
  const doc = PROGRAM_DOCS[key];
  if (!doc) return;
  const meta = `<p class="caption" style="margin:0 0 4px">Versione <span class="font-mono">${doc.version}</span> · in vigore dal ${doc.date}</p>
                <p class="caption font-mono" style="margin:0;word-break:break-all">Impronta del testo: ${doc.hash}</p>`;
  openDocModal({
    title: doc.title,
    bodyHtml: `${meta}<div style="margin-top:8px">${programDocHtml(doc)}</div>`,
    actions: [
      { label: 'Chiudi', kind: 'secondary' },
      { label: 'Scarica PDF', kind: 'primary', onClick: () => printProgramDoc(key) }
    ]
  });
}

/* Apre la versione stampabile: "Salva come PDF" del browser produce il file.
   Nessuna dipendenza esterna — è il motore di stampa del browser. */
function printProgramDoc(key, extraHtml) {
  const doc = PROGRAM_DOCS[key];
  if (!doc) return;
  const win = window.open('', '_blank', 'width=820,height=900');
  if (!win) {
    if (typeof showToast === 'function') showToast('Consenti le finestre popup per scaricare il PDF', 'error');
    return;
  }
  const body = doc.sections.map(([h, t]) => `<h2>${h}</h2><p>${t}</p>`).join('');
  win.document.write(`<!doctype html><html lang="it"><head><meta charset="utf-8">
<title>${doc.title} — ${doc.version}</title>
<style>
  @page { size: A4; margin: 22mm 20mm; }
  body { font-family: "Open Sans", -apple-system, Segoe UI, Roboto, sans-serif; color:#1A1A1A; font-size:11pt; line-height:1.6; margin:0; }
  .brand { font-size:9pt; letter-spacing:.12em; text-transform:uppercase; color:#0F6E56; font-weight:700; }
  h1 { font-size:17pt; margin:6px 0 4px; line-height:1.25; }
  .meta { font-size:9pt; color:#666; border-bottom:1px solid #DDD; padding-bottom:10px; margin-bottom:18px; }
  .meta code { font-family: ui-monospace, Menlo, Consolas, monospace; }
  h2 { font-size:11.5pt; margin:16px 0 4px; }
  p  { margin:0 0 4px; }
  .foot { margin-top:26px; border-top:1px solid #DDD; padding-top:10px; font-size:8.5pt; color:#666; }
  .sign { margin-top:22px; border:1px solid #C8E6CF; background:#F4FBF6; padding:12px 14px; font-size:9.5pt; }
  .sign h3 { font-size:10pt; margin:0 0 6px; color:#0F6E56; }
  .sign div { display:flex; justify-content:space-between; gap:16px; padding:2px 0; }
  @media print { .noprint { display:none; } }
</style></head><body>
<p class="brand">Programma ESG Carelink · Alphio APS</p>
<h1>${doc.title}</h1>
<p class="meta">Versione <strong>${doc.version}</strong> · in vigore dal ${doc.date} · documento <code>${doc.id}</code><br>
Impronta del testo: <code>${doc.hash}</code></p>
${body}
${extraHtml || ''}
<p class="foot">Documento generato dalla piattaforma AureaCare. Alphio APS — ente promotore del Programma ESG Carelink · Roma, Lazio.<br>
Il paziente non sostiene alcun costo per le prestazioni e i trasporti erogati nell'ambito del Programma.</p>
<p class="noprint" style="margin-top:18px;font-size:9pt;color:#666">Usa <strong>Stampa → Salva come PDF</strong> per conservare una copia.</p>
</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 350);
  if (typeof showToast === 'function') showToast('Documento pronto · scegli "Salva come PDF"', 'success');
}

// ---------- Sottoscrizione con firma elettronica avanzata ----------

/* Chiede il secondo fattore prima di registrare la sottoscrizione.
   onSigned riceve l'oggetto firma da conservare insieme alle dichiarazioni.

   Nel POC il codice è generato e mostrato a schermo: non esiste invio reale,
   e il flusso lo dichiara esplicitamente per non far credere il contrario. */
function requestFeaSignature(opts, onSigned) {
  opts = opts || {};
  const docKey = opts.doc || 'declarations';
  const doc = PROGRAM_DOCS[docKey] || PROGRAM_DOCS.declarations;
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const ref  = 'OTP-' + code.slice(0, 4) + '-' + code.slice(4) + '00';

  openDocModal({
    title: 'Firma le dichiarazioni',
    bodyHtml: `
      <p class="caption" style="line-height:1.6;margin:0 0 12px">Le dichiarazioni obbligatorie si sottoscrivono con
        <strong>firma elettronica avanzata</strong>: la spunta da sola non basta. Inserisci il codice monouso
        per completare la firma — restano conservati data e ora, versione del testo e impronta del documento.</p>
      <div style="background:var(--bg-warm);border:1px solid var(--bg-warm-br);border-radius:10px;padding:12px 14px;margin-bottom:14px">
        <p class="caption" style="margin:0 0 4px">Codice inviato a <strong>l***@***.it</strong> · valido 10 minuti</p>
        <p class="font-mono" style="margin:0;font-size:22px;font-weight:700;letter-spacing:.18em">${code}</p>
        <p class="caption" style="margin:6px 0 0;font-size:11px">Demo: nessun invio reale, il codice è mostrato qui.</p>
      </div>
      <label class="field-label" for="fea-otp">Codice monouso</label>
      <div class="input-container"><input class="input font-mono" id="fea-otp" inputmode="numeric" maxlength="6" placeholder="000000" autocomplete="one-time-code"></div>
      <p class="caption mt-8" style="font-size:11px">Testo sottoscritto: <strong>${doc.title}</strong> <span class="font-mono">${doc.version}</span>
        · <a href="#" onclick="event.preventDefault();printProgramDoc('${docKey}')" style="color:var(--care-blue);font-weight:700">scarica il PDF</a></p>`,
    actions: [
      { label: 'Annulla', kind: 'secondary' },
      { label: 'Firma', kind: 'primary', keepOpen: true, onClick: () => {
          const input = document.getElementById('fea-otp');
          if (!input || input.value.trim() !== code) {
            if (input) input.classList.add('input--error');
            showToast('Codice non corretto', 'error');
            return;
          }
          closeDocModal();
          const now = new Date();
          const p = n => String(n).padStart(2, '0');
          onSigned({
            type:   'Firma elettronica avanzata (FEA)',
            method: 'OTP via e-mail + marca temporale',
            otp_ref: ref,
            ts: `${formatItDate(now)} ${p(now.getHours())}:${p(now.getMinutes())}`,
            ip: '93.51.xxx.xxx',
            doc_hash: doc.hash,
            doc_version: `${doc.title} ${doc.version}`
          });
        } }
    ]
  });
}

/* Riquadro riepilogativo della firma, riusato da profilo e console. */
function feaSummaryHtml(sig) {
  if (!sig) return '';
  const row = (k, v) => `<div style="display:flex;justify-content:space-between;gap:14px;padding:3px 0"><span class="text-muted">${k}</span><strong style="text-align:right;word-break:break-all">${v}</strong></div>`;
  return `<div style="background:#F4FBF6;border:1px solid #C8E6CF;border-radius:10px;padding:12px 14px;font-size:12.5px">
      <p style="margin:0 0 8px;font-weight:700;color:#0F6E56;font-size:13px">${sig.type}</p>
      ${row('Metodo', sig.method)}
      ${row('Data e ora', sig.ts)}
      ${row('Riferimento OTP', `<span class="font-mono">${sig.otp_ref}</span>`)}
      ${row('Testo firmato', sig.doc_version)}
      ${row('Impronta', `<span class="font-mono">${sig.doc_hash}</span>`)}
    </div>`;
}
