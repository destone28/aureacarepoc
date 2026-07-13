/* ============================================================
   AureaCare · Fattura verificabile CSRD
   Modulo della SOLA console del Coordinatore Alphio: la fattura
   (listino ufficiale, sconto contrattuale −15%, tariffa ESG, ID
   voucher) è un requisito di verificabilità CSRD del programma e
   non appartiene all'app paziente, che non espone alcuna
   componente economica. Incluso solo dalle pagine admin-*.
   ============================================================ */

const csrdEur = n => '€' + Number(n || 0).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Costruisce il testo della fattura verificabile CSRD.
 * @param {Object} inv
 *   id, date, patient, cf, structure_name, cert, doctor,
 *   service_name, status_label, list_price, esg_price, voucher_id
 */
function buildCsrdInvoice(inv) {
  const hasVoucher = !!inv.voucher_id;
  const lines = [
    'PROGRAMMA ESG CARELINK — Alphio APS · piattaforma AureaCare',
    'Fattura verificabile · Convenzione Terzo Settore (Layer 2)',
    'Emessa dalla console del Coordinatore Alphio',
    '════════════════════════════════════════════════════════════',
    '',
    'Numero:              INV-' + inv.id,
    'Data:                ' + inv.date,
    'Paziente:            ' + (inv.patient || '—'),
    'Codice fiscale:      ' + (inv.cf || '—'),
    '',
    'STRUTTURA EROGANTE',
    'Struttura:           ' + (inv.structure_name || '—'),
    'Certificazione:      ' + (inv.cert || 'ISO 9001') + ' · listino ufficiale depositato e verificato',
    inv.doctor ? 'Medico:              ' + inv.doctor : null,
    '',
    'PRESTAZIONE',
    'Prestazione:         ' + (inv.service_name || '—'),
    'Stato:               ' + (inv.status_label || '—'),
    '',
    'ECONOMICS (verificabili dal revisore CSRD)',
    hasVoucher
      ? [
          'Listino ufficiale:               ' + csrdEur(inv.list_price),
          'Sconto ESG contrattuale:         −15%',
          'Tariffa ESG:                     ' + csrdEur(inv.esg_price),
          'Coperto dal Fondo ESG Territoriale Roma: ' + csrdEur(inv.esg_price),
          'Quota paziente:                  €0,00',
          '',
          'Voucher:             ' + inv.voucher_id
        ].join('\n')
      : [
          'Prestazione in cure ricorsive · Layer 1 — Mobilità sanitaria assistita',
          'Trasporto porta-a-porta erogato da Samarcanda Scarl (ISO 9001:2015)',
          'Costo al programma:              €72,00/corsa (coperto dal Fondo ESG)',
          'Quota paziente:                  €0,00',
          '',
          'Voucher:             — (nessun voucher: trasporto Layer 1)'
        ].join('\n'),
    '',
    '════════════════════════════════════════════════════════════',
    'Documento verificabile dal revisore CSRD del programma.',
    'SROI validato ex-post da primaria società di revisione.',
    'Alphio APS · Fondo ESG Territoriale di Roma · AureaVia Srl Innovativa'
  ];
  return lines.filter(l => l !== null).join('\n');
}

/** Genera e scarica la fattura CSRD (.txt), con toast di conferma. */
function downloadCsrdInvoice(inv) {
  if (!inv || !inv.id) return;
  const blob = new Blob([buildCsrdInvoice(inv)], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'fattura_csrd_' + inv.id + '.txt';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  if (typeof showToast === 'function') showToast('Fattura CSRD scaricata · ' + inv.id, 'success');
}
