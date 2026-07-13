/* AureaCare — mock data condiviso
   Tutti i dati hard-coded, Roma-centrici. Caricato globalmente come window.MOCK.
   ============================================================ */

window.MOCK = (function () {

  // ---------- Strutture convenzionate Roma (18) ----------
  // Rete Layer 2 Carelink: SOLO strutture private certificate ISO 9001 / JCI.
  // Sconto fisso 15% sul listino ufficiale ("tariffa ESG") — listino depositato e verificato.
  // Coordinate (lat, lng) reali — usate dalle mappe Leaflet/OpenStreetMap
  const structures = [
    { id: 'STR-001', name: 'Policlinico A. Gemelli (privato universitario)', type: 'Privato convenzionato', area: 'Roma Nord-Ovest', address: 'Largo A. Gemelli 8',  district: 'Trionfale',     lat: 41.9281, lng: 12.4319, distance_km: 4.2, rating: 4.7, reviews: 1284, specialties: ['Cardiologia','Oncologia','Radiologia','Medicina nucleare','Ortopedia','Ginecologia','Neurologia'], next_slot: 'Domani, 10:30', cert: 'JCI', listing_verified: true, weekly_open: '08:00 – 20:00', active: true },
    { id: 'STR-002', name: 'Roma East Private Hospital',                 type: 'Privato convenzionato', area: 'Roma Sud-Est',  address: 'Viale Oxford 81',     district: 'Tor Vergata',   lat: 41.8517, lng: 12.6191, distance_km: 9.6, rating: 4.4, reviews: 642,  specialties: ['Ortopedia','Riabilitazione','Cardiologia','Nefrologia','Diabetologia'], next_slot: 'Mar 27 mag, 09:00', cert: 'ISO 9001', listing_verified: true, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-003', name: 'Clinica Villa Gianicolense',          type: 'Privato convenzionato', area: 'Roma Centro-Ovest',address: 'Cir. Gianicolense 87',district: 'Monteverde',    lat: 41.8775, lng: 12.4543, distance_km: 3.1, rating: 4.5, reviews: 891,  specialties: ['Cardiologia','Pneumologia','Chirurgia','Oculistica','Nefrologia'], next_slot: 'Oggi, 16:45', cert: 'ISO 9001', listing_verified: true, weekly_open: '07:30 – 20:00', active: true },
    { id: 'STR-004', name: 'IDI — Istituto Dermopatico dell\'Immacolata', type: 'Privato convenzionato', area: 'Roma Sud-Est',  address: 'Via dei Monti di Creta 104', district: 'Aurelio', lat: 41.8993, lng: 12.4202, distance_km: 5.4, rating: 4.6, reviews: 432,  specialties: ['Dermatologia','Allergologia','Chirurgia plastica'], next_slot: 'Gio 29 mag, 11:30', cert: 'ISO 9001', listing_verified: true, weekly_open: '08:00 – 18:30', active: true },
    { id: 'STR-005', name: 'Ospedale Pediatrico Bambino Gesù',          type: 'Privato convenzionato', area: 'Roma Centro',   address: 'P.zza Sant\'Onofrio 4', district: 'Gianicolo',    lat: 41.8985, lng: 12.4566, distance_km: 2.7, rating: 4.9, reviews: 2104, specialties: ['Pediatria','Cardiologia pediatrica','Neurologia pediatrica'], next_slot: 'Mer 28 mag, 14:00', cert: 'JCI', listing_verified: true, weekly_open: '08:00 – 20:00', active: true },
    { id: 'STR-006', name: 'Casa di Cura Quisisana',                    type: 'Privato convenzionato', area: 'Roma Nord',    address: 'Via G. Porro 5',     district: 'Parioli',       lat: 41.9192, lng: 12.4884, distance_km: 2.9, rating: 4.4, reviews: 287,  specialties: ['Cardiologia','Ginecologia','Senologia','Chirurgia'], next_slot: 'Domani, 09:30', cert: 'ISO 9001', listing_verified: true, weekly_open: '07:30 – 20:00', active: true },
    { id: 'STR-007', name: 'Centro Medico Sant\'Eugenio',               type: 'Privato convenzionato', area: 'Roma Sud',     address: 'P.le Umanesimo 10', district: 'EUR',           lat: 41.8316, lng: 12.4710, distance_km: 7.8, rating: 4.3, reviews: 198,  specialties: ['Fisioterapia','Logopedia','Riabilitazione','Ortopedia'], next_slot: 'Lun 26 mag, 15:00', cert: 'ISO 9001', listing_verified: true, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-008', name: 'CDC Casaccia',                              type: 'Privato convenzionato', area: 'Roma Nord-Est', address: 'Via Tiburtina 432',  district: 'Pietralata',    lat: 41.9197, lng: 12.5474, distance_km: 6.2, rating: 4.2, reviews: 154,  specialties: ['Cardiologia','Endocrinologia','Diabetologia','Dermatologia'], next_slot: 'Mar 27 mag, 17:30', cert: 'ISO 9001', listing_verified: true, weekly_open: '08:00 – 18:00', active: true },
    { id: 'STR-009', name: 'Aurelia Hospital',                          type: 'Privato convenzionato', area: 'Roma Ovest',   address: 'Via Aurelia 860',    district: 'Aurelio',       lat: 41.8990, lng: 12.4036, distance_km: 8.4, rating: 4.5, reviews: 376,  specialties: ['Ortopedia','Cardiologia','Chirurgia','Oncologia','Radiologia'], next_slot: 'Gio 29 mag, 10:00', cert: 'ISO 9001 + JCI', listing_verified: true, weekly_open: '08:00 – 19:30', active: true },
    { id: 'STR-010', name: 'Centro Riabilitazione Don Gnocchi',         type: 'Privato convenzionato', area: 'Roma Sud',    address: 'Via Maresciallo Caviglia 30', district: 'Salario', lat: 41.9344, lng: 12.5050, distance_km: 5.7, rating: 4.6, reviews: 248, specialties: ['Fisioterapia','Riabilitazione','Logopedia','Neuropsicologia'], next_slot: 'Domani, 11:00', cert: 'ISO 9001', listing_verified: true, weekly_open: '07:30 – 18:00', active: true },
    { id: 'STR-011', name: 'INI Grottaferrata',                          type: 'Privato convenzionato', area: 'Roma Sud-Est', address: 'Via S. Anna 27',     district: 'Grottaferrata', lat: 41.7892, lng: 12.6708, distance_km: 11.2, rating: 4.4, reviews: 167, specialties: ['Ortopedia','Cardiologia','Fisioterapia'], next_slot: 'Ven 30 mag, 09:00', cert: 'ISO 9001', listing_verified: true, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-012', name: 'Casa di Cura Laterano',          type: 'Privato convenzionato', area: 'Roma Centro', address: 'Via dell\'Amba Aradam 9', district: 'San Giovanni', lat: 41.8852, lng: 12.5050, distance_km: 1.9, rating: 4.2, reviews: 521, specialties: ['Cardiologia','Pneumologia','Neurologia','Geriatria'], next_slot: 'Lun 26 mag, 08:30', cert: 'ISO 9001', listing_verified: true, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-013', name: 'Salvator Mundi International Hospital',     type: 'Privato convenzionato', area: 'Roma Centro', address: 'Viale delle Mura Gianicolensi 67', district: 'Trastevere', lat: 41.8869, lng: 12.4626, distance_km: 3.0, rating: 4.7, reviews: 392, specialties: ['Cardiologia','Ginecologia','Ortopedia','Dermatologia'], next_slot: 'Mer 28 mag, 16:00', cert: 'JCI', listing_verified: true, weekly_open: '08:00 – 20:00', active: true },
    { id: 'STR-014', name: 'CDC Villa Stuart',                          type: 'Privato convenzionato', area: 'Roma Nord',   address: 'Via Trionfale 5952',  district: 'Trionfale',     lat: 41.9479, lng: 12.4286, distance_km: 6.1, rating: 4.5, reviews: 234,  specialties: ['Ortopedia','Riabilitazione','Cardiologia','Senologia'], next_slot: 'Mar 27 mag, 14:30', cert: 'ISO 9001', listing_verified: true, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-015', name: 'Centro Diagnostico Italiano Eur',           type: 'Privato convenzionato', area: 'Roma Sud',    address: 'Via Pio Emanuelli 1', district: 'EUR',           lat: 41.8268, lng: 12.4658, distance_km: 7.2, rating: 4.3, reviews: 112,  specialties: ['Radiologia','Medicina nucleare','Endocrinologia','Dermatologia','Diabetologia'], next_slot: 'Domani, 12:30', cert: 'ISO 9001', listing_verified: true, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-016', name: 'Clinica Borgo Salus',                    type: 'Privato convenzionato', area: 'Roma Centro', address: 'Lungotevere in Sassia 1', district: 'Borgo',     lat: 41.9015, lng: 12.4626, distance_km: 2.3, rating: 4.1, reviews: 418,  specialties: ['Cardiologia','Neurologia','Pneumologia','Chirurgia'], next_slot: 'Gio 29 mag, 08:30', cert: 'ISO 9001', listing_verified: true, weekly_open: '07:30 – 19:00', active: true },
    { id: 'STR-017', name: 'Poliambulatorio Roma Eur',                  type: 'Privato convenzionato', area: 'Roma Sud',    address: 'Via dell\'Oceano Indiano 13', district: 'EUR', lat: 41.8235, lng: 12.4787, distance_km: 8.0, rating: 4.4, reviews: 87,   specialties: ['Fisioterapia','Logopedia','Ortopedia','Pediatria'], next_slot: 'Lun 26 mag, 18:00', cert: 'ISO 9001', listing_verified: true, weekly_open: '08:00 – 19:00', active: false },
    { id: 'STR-018', name: 'Casa di Cura Mater Dei',                     type: 'Privato convenzionato', area: 'Roma Nord',   address: 'Via Bertoloni 34',     district: 'Parioli',       lat: 41.9217, lng: 12.4845, distance_km: 3.4, rating: 4.6, reviews: 312,  specialties: ['Ginecologia','Cardiologia','Senologia','Ortopedia'], next_slot: 'Mer 28 mag, 11:00', cert: 'ISO 9001 + JCI', listing_verified: true, weekly_open: '08:00 – 20:00', active: true }
  ];

  // Coordinate paziente (Via Tuscolana 124) — usate per "distanza casa → struttura"
  const patient_location = { lat: 41.8762, lng: 12.5251 };
  const roma_center = { lat: 41.9028, lng: 12.4964 };

  // ---------- Catalogo prestazioni (Convenzione Terzo Settore) ----------
  // FASCIA A (visite specialistiche) e FASCIA B (diagnostica strumentale):
  // listino ufficiale della struttura (price_list_*) → tariffa ESG (price_esg_*)
  // con sconto fisso 15% contrattuale. Ogni prestazione A/B consuma 1 voucher ESG.
  // CURE RICORSIVE (Layer 1): erogate nei centri di cura del paziente; il
  // programma copre il TRASPORTO gratuito porta-a-porta per ogni seduta
  // (rides = sedute × 2 tratte A/R). Nessun costo né voucher a carico.
  const services = [
    // FASCIA A — Visite specialistiche (5)
    { id: 'SRV-A01', kind: 'visita', name: 'Prima visita oncologica',        cat: 'Oncologia',   price_list_from: 150, price_list_to: 200, price_esg_from: 150, price_esg_to: 170, duration: 45, icon: 'shield' },
    { id: 'SRV-A02', kind: 'visita', name: 'Visita oncologica di controllo', cat: 'Oncologia',   price_list_from: 100, price_list_to: 150, price_esg_from: 100, price_esg_to: 120, duration: 30, icon: 'rotate' },
    { id: 'SRV-A03', kind: 'visita', name: 'Prima visita cardiologica',      cat: 'Cardiologia', price_list_from: 120, price_list_to: 200, price_esg_from: 120, price_esg_to: 170, duration: 40, icon: 'heart' },
    { id: 'SRV-A04', kind: 'visita', name: 'Prima visita neurologica',       cat: 'Neurologia',  price_list_from: 120, price_list_to: 200, price_esg_from: 120, price_esg_to: 170, duration: 45, icon: 'brain' },
    { id: 'SRV-A05', kind: 'visita', name: 'Visita nefrologica',             cat: 'Nefrologia',  price_list_from: 90,  price_list_to: 150, price_esg_from: 90,  price_esg_to: 120, duration: 30, icon: 'droplet' },

    // FASCIA B — Diagnostica strumentale (5)
    { id: 'SRV-B01', kind: 'diagnostica', name: 'RMN cranio/rachide',   cat: 'Radiologia',        price_list_from: 280,  price_list_to: 400,  price_esg_from: 280,  price_esg_to: 340,   duration: 45,  icon: 'radio' },
    { id: 'SRV-B02', kind: 'diagnostica', name: 'TC total body',        cat: 'Radiologia',        price_list_from: 200,  price_list_to: 350,  price_esg_from: 200,  price_esg_to: 297.5, duration: 25,  icon: 'grid' },
    { id: 'SRV-B03', kind: 'diagnostica', name: 'Ecografia addome',     cat: 'Radiologia',        price_list_from: 100,  price_list_to: 180,  price_esg_from: 100,  price_esg_to: 153,   duration: 30,  icon: 'search' },
    { id: 'SRV-B04', kind: 'diagnostica', name: 'PET scan oncologico',  cat: 'Medicina nucleare', price_list_from: 1000, price_list_to: 1400, price_esg_from: 1000, price_esg_to: 1190,  duration: 120, icon: 'zap' },
    { id: 'SRV-B05', kind: 'diagnostica', name: 'Scintigrafia ossea',   cat: 'Medicina nucleare', price_list_from: 250,  price_list_to: 400,  price_esg_from: 250,  price_esg_to: 340,   duration: 60,  icon: 'activity' },

    // CURE RICORSIVE — Layer 1 (4): solo trasporto gratuito, nessun voucher
    { id: 'SRV-L01', kind: 'ciclo', name: 'Ciclo oncologico ambulatoriale', cat: 'Oncologia',  sessions: 8,  rides: 16, duration: 90,  transport_covered: true, layer: 1, icon: 'heart' },
    { id: 'SRV-L02', kind: 'ciclo', name: 'Ciclo dialisi (mensile)',         cat: 'Nefrologia', sessions: 12, rides: 24, duration: 240, transport_covered: true, layer: 1, icon: 'droplet' },
    { id: 'SRV-L03', kind: 'ciclo', name: 'Ciclo neuro-riabilitativo',       cat: 'Neurologia', sessions: 10, rides: 20, duration: 60,  transport_covered: true, layer: 1, icon: 'brain' },
    { id: 'SRV-L04', kind: 'ciclo', name: 'Riabilitazione pediatrica',       cat: 'Pediatria',  sessions: 14, rides: 28, duration: 45,  transport_covered: true, layer: 1, icon: 'baby' }
  ];

  // ---------- Livelli di accesso al programma Carelink (Layer 2) ----------
  // Requisiti ALTERNATIVI, verificati dal Coordinatore Alphio: ne basta uno.
  const access_levels = [
    { level: 1, label: 'Urgenza clinica',  desc: 'Certificata da SSN/MMG' },
    { level: 2, label: 'ISEE < €20.000',   desc: 'Attestazione ISEE in corso di validità' },
    { level: 3, label: 'Due diligence',    desc: 'Valutazione documentale del Comitato ESG' }
  ];

  // ---------- Paziente loggato ----------
  // Dati di contatto (email/phone) volutamente non mockati: il POC mostra
  // solo info anagrafiche essenziali e residenza per non esporre pattern
  // fittizi di dati personali identificativi.
  const patient = {
    id: 'PAT-00142',
    first_name: 'Lucia',
    last_name: 'Marchetti',
    cf: 'MRCLCU82M55H501T',
    birth: '15/08/1982',
    address: 'Via Tuscolana 124, Roma',
    district: 'Tuscolano',
    avatar_initials: 'LM',
    // Livello di accesso al programma Carelink (vedi access_levels)
    access: { level: 2, label: 'ISEE < €20.000', doc: 'Modello ISEE 2026', verified_by: 'Coordinatore Alphio', verified_date: '02/02/2026' },
    // Ingresso mediato: Comuni/Regione segnalano i pazienti alle Associazioni,
    // che curano onboarding e privacy prima della presa in carico del Coordinatore.
    referred_by: {
      channel: 'Associazione',
      name: 'Associazione Insieme per la Cura ODV',
      flagged_by: 'Comune di Roma — Servizi Sociali',
      onboarding_date: '04/01/2026'
    },
    docs: {
      ricetta:  { status: 'verified',  uploaded: '12/04/2026', name: 'Ricetta rossa', file: 'ricetta_marchetti_apr26.pdf' },
      isee:     { status: 'verified',  uploaded: '02/02/2026', name: 'Modello ISEE', file: 'isee_marchetti_2026.pdf' },
      urgenza:  { status: 'not_required', name: 'Certificato urgenza SSN/MMG' },
      cie:      { status: 'verified',  uploaded: '04/01/2026', name: 'CIE',            file: 'cie_marchetti.jpg' },
      spid:     { status: 'verified',  uploaded: '04/01/2026', name: 'SPID',           file: '—' }
    }
  };

  // ---------- Voucher ESG (Layer 2) ----------
  // Il paziente NON paga e NON ricarica: il Coordinatore Alphio assegna un
  // plafond di voucher, ogni prestazione Fascia A/B consuma 1 voucher e il
  // Fondo ESG Territoriale di Roma copre la tariffa ESG (listino −15%).
  // Quota a carico del paziente: sempre €0.
  const vouchers = {
    assigned: 12, used: 4, // residui 8
    access_level: 2, // ISEE < €20.000 (vedi livelli di accesso)
    covered_value_ytd: 486, // € coperti dal fondo per Lucia YTD
    movements: [
      { id: 'VCH-2026-0142', date: '20 mag', label: 'Visita nefrologica · Villa Gianicolense',      list_price: 130, esg_price: 110, covered: 110, patient_paid: 0, ref: 'BOOK-100', status: 'assegnato' },
      { id: 'VCH-2026-0139', date: '18 mag', label: 'Prima visita oncologica · Gemelli',            list_price: 180, esg_price: 153, covered: 153, patient_paid: 0, ref: 'BOOK-099', status: 'usato' },
      { id: 'VCH-2026-0136', date: '12 mag', label: 'Ecografia addome · Gemelli',                   list_price: 153, esg_price: 130, covered: 130, patient_paid: 0, ref: 'BOOK-096', status: 'usato' },
      { id: 'VCH-2026-0133', date: '08 mag', label: 'Visita oncologica di controllo · Aurelia Hospital', list_price: 130, esg_price: 110, covered: 110, patient_paid: 0, ref: 'BOOK-095', status: 'usato' },
      { id: 'VCH-2026-0129', date: '18 apr', label: 'Visita nefrologica · Villa Gianicolense',      list_price: 109, esg_price: 93,  covered: 93,  patient_paid: 0, ref: 'BOOK-090', status: 'usato' },
      { id: 'VCH-2026-0121', date: '02 feb', label: 'Voucher assegnato dal Coordinatore Alphio',    list_price: null, esg_price: null, covered: 0, patient_paid: 0, ref: '—', status: 'assegnato' },
      { id: 'VCH-2026-0120', date: '02 feb', label: 'Voucher assegnato dal Coordinatore Alphio',    list_price: null, esg_price: null, covered: 0, patient_paid: 0, ref: '—', status: 'assegnato' }
    ]
  };

  // ---------- Prenotazioni paziente (8) ----------
  // esg_price = tariffa ESG (list_price −15%), coperta dal Fondo: quota
  // paziente sempre €0. Ogni prestazione Fascia A/B consuma 1 voucher ESG
  // (voucher_id). Le cure ricorsive (kind ciclo, Layer 1) non consumano
  // voucher: il programma copre il trasporto, non la cura — shuttle SEMPRE true.
  const bookings = [
    { id: 'BOOK-099', service_id: 'SRV-A01', service_name: 'Prima visita oncologica',        structure_id: 'STR-001', structure_name: 'Policlinico Gemelli',            date: '22 mag', time: '14:30', list_price: 180,  esg_price: 153,  voucher_id: 'VCH-2026-0139', status: 'approved',  shuttle: true,  doctor: 'Dr.ssa Elena Conti' },
    { id: 'BOOK-098', service_id: 'SRV-L01', service_name: 'Ciclo oncologico ambulatoriale', structure_id: 'STR-001', structure_name: 'Policlinico Gemelli',            date: '24 mag', time: '09:00', list_price: 0,    esg_price: 0,    voucher_id: null,            status: 'confirmed', shuttle: true,  doctor: 'Dr. Marco Pace' },
    { id: 'BOOK-097', service_id: 'SRV-B01', service_name: 'RMN cranio/rachide',             structure_id: 'STR-015', structure_name: 'Centro Diagnostico Italiano Eur', date: '14 mag', time: '11:00', list_price: 360,  esg_price: 306,  voucher_id: 'VCH-2026-0137', status: 'completed', shuttle: true,  doctor: 'Dr. Luca Ferri' },
    { id: 'BOOK-096', service_id: 'SRV-B03', service_name: 'Ecografia addome',               structure_id: 'STR-001', structure_name: 'Policlinico Gemelli',            date: '12 mag', time: '17:30', list_price: 153,  esg_price: 130,  voucher_id: 'VCH-2026-0136', status: 'completed', shuttle: false, doctor: 'Dr.ssa Anna Lobello' },
    { id: 'BOOK-095', service_id: 'SRV-A02', service_name: 'Visita oncologica di controllo', structure_id: 'STR-009', structure_name: 'Aurelia Hospital',               date: '08 mag', time: '10:00', list_price: 130,  esg_price: 110,  voucher_id: 'VCH-2026-0133', status: 'completed', shuttle: false, doctor: 'Dr.ssa Sara Vitali' },
    { id: 'BOOK-094', service_id: 'SRV-A03', service_name: 'Prima visita cardiologica',      structure_id: 'STR-003', structure_name: 'Villa Gianicolense',             date: '02 mag', time: '15:00', list_price: 170,  esg_price: 145,  voucher_id: null,            status: 'cancelled', shuttle: false, doctor: 'Dr. Paolo Sini' },
    { id: 'BOOK-093', service_id: 'SRV-B04', service_name: 'PET scan oncologico',            structure_id: 'STR-001', structure_name: 'Policlinico Gemelli',            date: '28 apr', time: '16:30', list_price: 1300, esg_price: 1105, voucher_id: 'VCH-2026-0128', status: 'completed', shuttle: true,  doctor: 'Dr.ssa Marta Bui' },
    { id: 'BOOK-100', service_id: 'SRV-A05', service_name: 'Visita nefrologica',             structure_id: 'STR-003', structure_name: 'Villa Gianicolense',             date: '27 mag', time: '17:00', list_price: 130,  esg_price: 110,  voucher_id: 'VCH-2026-0142', status: 'pending',   shuttle: false, doctor: 'Dr. Mauro Genna' }
  ];

  // ---------- Admin: richieste di validazione voucher (estese — 12 visibili) ----------
  // esg_price = tariffa ESG della prestazione (list_price −15%), coperta dal
  // Fondo ESG: la validazione del Coordinatore Alphio consuma 1 voucher
  // (voucher_id; vouchers_left = residui attuali del paziente). Le cure
  // ricorsive Layer 1 non consumano voucher: la richiesta riguarda il
  // trasporto gratuito (voucher_id null, esg_price 0).
  const admin_requests = [
    { id: 'REQ-2026-0142', patient: 'Lucia Marchetti',  cf: 'MRCLCU82M55H501T', service: 'Visita nefrologica',                          structure: 'Villa Gianicolense',              date: '27 mag · 17:00', submitted: '20 mag 14:22', list_price: 130,  esg_price: 110,  voucher_id: 'VCH-2026-0142', vouchers_left: 8,  access_level: 2, status: 'pending' },
    { id: 'REQ-2026-0141', patient: 'Andrea Rossi',     cf: 'RSSNDR79H03H501Z', service: 'Ciclo oncologico ambulatoriale (trasporto L1)', structure: 'Policlinico Gemelli',           date: '02 giu · 09:00', submitted: '20 mag 11:09', list_price: 0,    esg_price: 0,    voucher_id: null,            vouchers_left: 6,  access_level: 1, status: 'pending' },
    { id: 'REQ-2026-0140', patient: 'Giulia Bianchi',   cf: 'BNCGLI91D52H501W', service: 'Prima visita cardiologica',                   structure: 'Casa di Cura Mater Dei',          date: '28 mag · 11:00', submitted: '20 mag 09:45', list_price: 188,  esg_price: 160,  voucher_id: 'VCH-2026-0140', vouchers_left: 3,  access_level: 2, status: 'pending' },
    { id: 'REQ-2026-0139', patient: 'Marco De Luca',    cf: 'DLCMRC85A12H501P', service: 'Ecografia addome',                            structure: 'Centro Diagnostico Italiano Eur', date: '23 mag · 18:00', submitted: '19 mag 22:17', list_price: 153,  esg_price: 130,  voucher_id: 'VCH-2026-0138', vouchers_left: 5,  access_level: 3, status: 'info_requested' },
    { id: 'REQ-2026-0138', patient: 'Sofia Ferri',      cf: 'FRRSFO88P54H501M', service: 'RMN cranio/rachide',                          structure: 'Centro Diagnostico Italiano Eur', date: '26 mag · 15:30', submitted: '19 mag 17:32', list_price: 376,  esg_price: 320,  voucher_id: 'VCH-2026-0135', vouchers_left: 2,  access_level: 2, status: 'approved' },
    { id: 'REQ-2026-0137', patient: 'Paolo Esposito',   cf: 'SPSPLA72L08F839B', service: 'Prima visita cardiologica',                   structure: 'Gemelli',                         date: '24 mag · 10:00', submitted: '19 mag 13:08', list_price: 176,  esg_price: 150,  voucher_id: 'VCH-2026-0134', vouchers_left: 4,  access_level: 1, status: 'approved' },
    { id: 'REQ-2026-0136', patient: 'Chiara Romano',    cf: 'RMNCHR93T67H501S', service: 'Visita oncologica di controllo',              structure: 'Aurelia Hospital',                date: '23 mag · 14:00', submitted: '19 mag 10:11', list_price: 135,  esg_price: 115,  voucher_id: 'VCH-2026-0132', vouchers_left: 7,  access_level: 2, status: 'approved' },
    { id: 'REQ-2026-0135', patient: 'Davide Greco',     cf: 'GRCDVD80E21H501Y', service: 'Prima visita neurologica',                    structure: 'Clinica Borgo Salus',             date: '22 mag · 09:30', submitted: '18 mag 16:43', list_price: 182,  esg_price: 155,  voucher_id: 'VCH-2026-0131', vouchers_left: 1,  access_level: 3, status: 'rejected' },
    { id: 'REQ-2026-0134', patient: 'Elena Riva',       cf: 'RVELNE76C44H501R', service: 'Ciclo dialisi mensile (trasporto L1)',        structure: 'Roma East Private Hospital',      date: '21 mag · 08:00', submitted: '18 mag 12:08', list_price: 0,    esg_price: 0,    voucher_id: null,            vouchers_left: 10, access_level: 1, status: 'approved' },
    { id: 'REQ-2026-0133', patient: 'Roberto Conti',    cf: 'CNTRRT69M28H501F', service: 'TC total body',                               structure: 'Centro Diagnostico Italiano Eur', date: '21 mag · 11:30', submitted: '18 mag 09:32', list_price: 294,  esg_price: 250,  voucher_id: 'VCH-2026-0127', vouchers_left: 5,  access_level: 2, status: 'approved' },
    { id: 'REQ-2026-0132', patient: 'Federica Santoro', cf: 'SNTFRC84S58H501J', service: 'PET scan oncologico',                         structure: 'Policlinico Gemelli',             date: '20 mag · 17:00', submitted: '17 mag 21:09', list_price: 1300, esg_price: 1105, voucher_id: 'VCH-2026-0126', vouchers_left: 0,  access_level: 1, status: 'approved' },
    { id: 'REQ-2026-0131', patient: 'Stefano Marino',   cf: 'MRNSFN77H15H501K', service: 'Scintigrafia ossea',                          structure: 'Centro Diagnostico Italiano Eur', date: '18 mag · 09:00', submitted: '15 mag 14:00', list_price: 341,  esg_price: 290,  voucher_id: 'VCH-2026-0125', vouchers_left: 9,  access_level: 2, status: 'approved' }
  ];

  // ---------- Admin: KPI dashboard ----------
  // Scala anno 1 Roma: 33.500 voucher e 35.100 corse a target; YTD (Gen–Lug) 13.900 voucher e 14.620 corse.
  const admin_kpi = {
    voucher_month: { value: 2790, delta: 12.5 },  // voucher validati (mese corrente = Lug)
    value_covered: { value: 318000, delta: 8.7 }, // € coperti dal Fondo ESG (mese)
    rides_month:   { value: 2940, delta: 5.8 },   // corse Samarcanda coordinate (mese)
    approval_rate: { value: 87, delta: 2.4 },
    sroi:          { value: 3.2, delta: 0.4 }     // SROI combinato (range documento 2,76–3,64×)
  };

  // Voucher / corse / SROI · trend 7 mesi (anno 1: Gen–Lug 2026)
  // Somme YTD: vouchers = 13.900 · rides = 14.620 (coerenti con fund.committed_ytd).
  const admin_trend = {
    labels:    ['Gen','Feb','Mar','Apr','Mag','Giu','Lug'],
    vouchers:  [1180, 1520, 1820, 2010, 2100, 2480, 2790],
    rides:     [1050, 1450, 1800, 2150, 2450, 2780, 2940],
    sroi:      [2.3, 2.5, 2.7, 2.8, 3.0, 3.1, 3.2]
  };

  // ---------- Admin: lista pazienti registrati (estratto 12) ----------
  // vouchers_left = voucher ESG residui sul plafond assegnato dal Coordinatore.
  // access_level: 1 = urgenza clinica SSN/MMG · 2 = ISEE < €20.000 · 3 = due diligence.
  // referral = canale di ingresso istituzionale (Comuni/Regione segnalano alle
  // Associazioni, che curano onboarding e privacy; SSN/MMG certifica l'urgenza).
  const admin_patients = [
    { id: 'PAT-00142', name: 'Lucia Marchetti',  cf: 'MRCLCU82M55H501T', vouchers_left: 8,  access_level: 2, referral: 'Associazione Insieme per la Cura ODV', completed: 8, last_login: 'Oggi 09:14', docs_status: 'complete' },
    { id: 'PAT-00141', name: 'Andrea Rossi',     cf: 'RSSNDR79H03H501Z', vouchers_left: 6,  access_level: 1, referral: 'SSN/MMG', completed: 12, last_login: 'Ieri 19:42', docs_status: 'complete' },
    { id: 'PAT-00140', name: 'Giulia Bianchi',   cf: 'BNCGLI91D52H501W', vouchers_left: 3,  access_level: 2, referral: 'Comune di Roma', completed: 6, last_login: 'Ieri 15:08', docs_status: 'complete' },
    { id: 'PAT-00139', name: 'Marco De Luca',    cf: 'DLCMRC85A12H501P', vouchers_left: 5,  access_level: 3, referral: 'Regione Lazio', completed: 9, last_login: '2 giorni fa', docs_status: 'partial' },
    { id: 'PAT-00138', name: 'Sofia Ferri',      cf: 'FRRSFO88P54H501M', vouchers_left: 2,  access_level: 2, referral: 'Associazione Argo Salute ODV', completed: 3, last_login: '3 giorni fa', docs_status: 'complete' },
    { id: 'PAT-00137', name: 'Paolo Esposito',   cf: 'SPSPLA72L08F839B', vouchers_left: 4,  access_level: 1, referral: 'SSN/MMG', completed: 14, last_login: '4 giorni fa', docs_status: 'complete' },
    { id: 'PAT-00136', name: 'Chiara Romano',    cf: 'RMNCHR93T67H501S', vouchers_left: 7,  access_level: 2, referral: 'Comune di Roma', completed: 5, last_login: '5 giorni fa', docs_status: 'complete' },
    { id: 'PAT-00135', name: 'Davide Greco',     cf: 'GRCDVD80E21H501Y', vouchers_left: 1,  access_level: 3, referral: 'Regione Lazio', completed: 7, last_login: '1 settimana fa', docs_status: 'partial' },
    { id: 'PAT-00134', name: 'Elena Riva',       cf: 'RVELNE76C44H501R', vouchers_left: 10, access_level: 1, referral: 'Associazione Insieme per la Cura ODV', completed: 22, last_login: 'Oggi 08:02', docs_status: 'complete' },
    { id: 'PAT-00133', name: 'Roberto Conti',    cf: 'CNTRRT69M28H501F', vouchers_left: 5,  access_level: 2, referral: 'Comune di Roma', completed: 11, last_login: 'Ieri 22:00', docs_status: 'complete' },
    { id: 'PAT-00132', name: 'Federica Santoro', cf: 'SNTFRC84S58H501J', vouchers_left: 0,  access_level: 1, referral: 'SSN/MMG', completed: 6, last_login: '2 giorni fa', docs_status: 'pending' },
    { id: 'PAT-00131', name: 'Stefano Marino',   cf: 'MRNSFN77H15H501K', vouchers_left: 9,  access_level: 2, referral: 'Associazione Argo Salute ODV', completed: 16, last_login: '3 giorni fa', docs_status: 'complete' }
  ];

  // ---------- ESG: KPI anno 1 Carelink + breakdown ----------
  // Scala anno 1 Roma (documento Alphio Carelink): fondo €9M, 35.100 corse, 33.500 voucher,
  // 1.400 pazienti L1 + 5.580 L2, 52 t CO₂ ≈ 3.500 alberi, SROI combinato 2,76–3,64×.
  // YTD (Gen–Lug 2026): 14.620 corse, 13.900 voucher, 3.120 pazienti attivi (640 L1 + 2.480 L2).
  // Tutti i valori sono mock plausibili — il calcolo reale richiederebbe dataset di
  // mobilità urbana, ISEE, ore caregiver dichiarate, esiti clinici, ecc.
  const esg = {
    headline: {
      sroi:            { value: 3.2,  unit: '×', delta: +0.4,  label: 'SROI combinato',        range: '2,76 – 3,64×' },
      sroi_l1:         { value: 0.89, unit: '×', delta: +0.05, label: 'SROI Layer 1 · mobilità', range: '0,82 – 0,97×' },
      sroi_l2:         { value: 5.4,  unit: '×', delta: +0.6,  label: 'SROI Layer 2 · cure',     range: '4,56 – 6,31×' },
      social_value_y1: '€24,8M – 32,7M', // valore sociale generato anno 1 su €9M di fondo
      co2_saved:       { value: 21400, unit: 'kg', delta: +18.2, label: 'CO₂ evitata (YTD)' },
      caregiver_h:     { value: 16500, unit: 'h',  delta: +12.5, label: 'Ore caregiver risparmiate' },
      fragile_served:  { value: 38,    unit: '%',  delta: +4.1,  label: 'Pazienti fragili serviti' }
    },

    // ---------- Aderenza terapeutica: outcome fondante del programma ----------
    dropout: {
      adherence_rate: 94,     // % sedute onorate dai pazienti in cure ricorsive
      sessions_saved: 3120,   // sedute salvate grazie al trasporto gratuito L1
      dropout_avoided: 186,   // percorsi di cura interrotti evitati
      label: 'Drop-out terapeutico evitato'
    },

    // ---------- Target anno 1 vs avanzamento YTD ----------
    year1_targets: { patients_l1: 1400, rides: 35100, vouchers: 33500, patients_l2: 5580, fund: 9000000 },
    ytd:           { rides: 14620, vouchers: 13900, patients_l1: 640, patients_l2: 2480 },

    // ---------- Benefici monetizzati anno 1 (documento) ----------
    // Layer 1 — investimento €4,5M → valore sociale €3,71M – 4,36M
    benefits_l1: {
      investment: 4500000, value_from: 3710000, value_to: 4360000,
      items: [
        { id: 'A1', label: 'Risparmio SSN da drop-out evitati',   from: 270000,  to: 300000 },
        { id: 'A2', label: 'Risparmio out-of-pocket trasporto',   from: 1200000, to: 1200000 },
        { id: 'A3', label: 'Valore caregiver liberati',           from: 800000,  to: 1300000 },
        { id: 'A4', label: 'QALY paziente',                       from: 400000,  to: 400000 },
        { id: 'A5', label: 'WELLBY caregiver',                    from: 840000,  to: 840000 },
        { id: 'A6', label: 'Produttività',                        from: 200000,  to: 320000 }
      ]
    },
    // Layer 2 — investimento €4,5M → valore sociale €20,5M – 28,4M
    benefits_l2: {
      investment: 4500000, value_from: 20500000, value_to: 28400000,
      items: [
        { id: 'B1', label: 'Minori costi SSN',                             from: 5200000,  to: 6500000 },
        { id: 'B2', label: 'Risparmio out-of-pocket pazienti',             from: 3200000,  to: 3200000 },
        { id: 'B3', label: 'QALY qualità di vita e accesso tempestivo',    from: 12100000, to: 12100000 }
      ]
    },

    // ---------- Traiettoria pluriennale: incidenza costi → SROI ----------
    multiyear: {
      l1: [
        { year: 1, cost_incidence: 11, sroi: 2.76 },
        { year: 2, cost_incidence: 9,  sroi: 2.86 },
        { year: 3, cost_incidence: 7,  sroi: 2.92 },
        { year: 4, cost_incidence: 5,  sroi: 2.98 }
      ],
      l2: [
        { year: 1, cost_incidence: 8, sroi: 2.81 },
        { year: 2, cost_incidence: 7, sroi: 2.87 },
        { year: 3, cost_incidence: 5, sroi: 2.93 },
        { year: 4, cost_incidence: 5, sroi: 2.98 }
      ]
    },

    // Trend 7 mesi (allineato con admin_trend · CO₂ e ore caregiver cumulate YTD)
    trend: {
      labels:       ['Gen','Feb','Mar','Apr','Mag','Giu','Lug'],
      sroi:         [2.3, 2.5, 2.7, 2.8, 3.0, 3.1, 3.2],
      co2_kg:       [1850, 4320, 7480, 11020, 14680, 18100, 21400],
      caregiver_h:  [1420, 3350, 5780, 8400, 11200, 13900, 16500],
      vouchers:     [1180, 1520, 1820, 2010, 2100, 2480, 2790]
    },

    // ---------- Ambientale ----------
    environmental: {
      co2_per_visit_avg: 17.7,   // kg CO2 evitata per prestazione media (vs percorso senza programma)
      km_avoided:        249600, // km totali risparmiati (prossimità strutture + corse condivise)
      shuttle_share:     54,     // % prestazioni raggiunte con trasporto Samarcanda/AureaShuttle
      shuttle_breakdown: [
        { label: 'AureaShuttle (Samarcanda)', value: 54, color: 'var(--primary-orange)' },
        { label: 'Mezzo pubblico',            value: 23, color: 'var(--care-blue)' },
        { label: 'Auto privata',              value: 18, color: '#999' },
        { label: 'A piedi / bici',            value: 5,  color: '#0F6E56' }
      ],
      // Target anno 1 e avanzamento (documento: 52 t CO₂ ≈ 3.500 alberi)
      co2_target_t: 52,  trees_target: 3500,
      co2_ytd_t:    21.4, trees_ytd:   1020,
      // Confronto km medi per categoria
      avg_km_per_visit:  { aureacare: 3.4, baseline_roma: 8.9 }
    },

    // ---------- Sociale ----------
    social: {
      // Su 3.120 pazienti attivi YTD (640 Layer 1 + 2.480 Layer 2)
      fragile_categories: [
        { label: 'ISEE < 20.000 €',    count: 936, pct: 30, color: '#3B82F6' },
        { label: 'Over 70',            count: 780, pct: 25, color: '#0F6E56' },
        { label: 'Patologia cronica',  count: 624, pct: 20, color: '#F59E0B' },
        { label: 'Genitore single',    count: 250, pct: 8,  color: '#E91E63' },
        { label: 'Disabilità motoria', count: 187, pct: 6,  color: '#6366F1' }
      ],
      district_coverage: 14, // quartieri Roma coperti
      total_districts:   22, // di cui obiettivo totale
      district_top: [
        { name: 'Tuscolano',       patients: 440, completed: 1840 },
        { name: 'EUR',             patients: 360, completed: 1520 },
        { name: 'Trionfale',       patients: 320, completed: 1380 },
        { name: 'Parioli',         patients: 280, completed: 1190 },
        { name: 'Monteverde',      patients: 240, completed: 980  },
        { name: 'Pietralata',      patients: 220, completed: 840  },
        { name: 'Trastevere',      patients: 200, completed: 790  },
        { name: 'San Giovanni',    patients: 180, completed: 710  },
        { name: 'Gianicolo',       patients: 160, completed: 620  },
        { name: 'Aurelio',         patients: 140, completed: 540  },
        { name: 'Borgo',           patients: 120, completed: 480  },
        { name: 'Salario',         patients: 100, completed: 390  },
        { name: 'Tor Vergata',     patients: 60,  completed: 240  },
        { name: 'Grottaferrata',   patients: 20,  completed: 80   }
      ],
      facilitated_access_rate: 87 // % di richieste validate dal Coordinatore Alphio
    },

    // ---------- Governance / Economico ----------
    governance: {
      sroi_breakdown: [
        { label: 'Minori costi SSN (B1 + A1)',        value: 1.4 },
        { label: 'QALY e WELLBY (A4 · A5 · B3)',      value: 0.9 },
        { label: 'Out-of-pocket evitato (A2 · B2)',   value: 0.6 },
        { label: 'Produttività e caregiver (A3 · A6)', value: 0.3 }
      ], // somma = 3.2× (SROI combinato)
      value_covered_ytd: 1672170, // € coperti dal Fondo ESG per i voucher validati YTD
      tariff_avg: { list: 141, esg: 120 }, // € listino medio → tariffa ESG media (−15%)
      approval_rate: 87,
      cost_per_voucher: 120, // € medi coperti dal fondo per voucher validato
      auditor_note: 'SROI validato ex-post da primaria società di revisione · metodologia Social Value International'
    },

    // ---------- Demografia paziente ----------
    demographics: {
      age_buckets: [
        { label: '0-17',   count: 125, pct: 4  },
        { label: '18-30',  count: 406, pct: 13 },
        { label: '31-45',  count: 718, pct: 23 },
        { label: '46-60',  count: 842, pct: 27 },
        { label: '61-75',  count: 749, pct: 24 },
        { label: '76+',    count: 280, pct: 9  }
      ],
      gender_split: { female: 58, male: 41, other: 1 }, // %
      // Voucher validati YTD per specialità (somma = 13.900)
      top_specialties: [
        { label: 'Oncologia',          count: 4180 },
        { label: 'Radiologia',         count: 3260 },
        { label: 'Cardiologia',        count: 2140 },
        { label: 'Nefrologia',         count: 1520 },
        { label: 'Neurologia',         count: 1180 },
        { label: 'Medicina nucleare',  count: 980  },
        { label: 'Pediatria',          count: 640  }
      ],
      recurrence: { single: 32, two_three: 45, four_plus: 23 } // % pazienti per # prenotazioni
    }
  };

  /* =====================================================
     FONDO ESG TERRITORIALE · ROMA · ANNO 1
     Plafond ESG aziende (via Compagnie di Assicurazione) +
     sponsor nazionali + contributi comunali/regionali.
     ===================================================== */
  const fund = {
    city: 'Roma', year: 1, total: 9000000,
    allocation: [
      { label: 'Fee Alphio APS (15/10/7%)',      value: 960000 },
      { label: 'Layer 1 — Mobilità (corse)',     value: 4020000 },
      { label: 'Layer 2 — Voucher cure',         value: 4020000 }
    ],
    committed_ytd: { rides: 1052640, vouchers: 1672170, fee: 400000, total: 3124810 },
    residual: 5875190,
    sponsors: [
      { name: 'EnerVita S.p.A.',         kind: 'Sponsor ESG nazionale',                                  range: '€500.000 – 3.000.000', committed: 1800000 },
      { name: 'Assicura Welfare Group',  kind: 'Compagnia di Assicurazione · plafond welfare aziendale', range: '€500.000 – 3.000.000', committed: 2400000 },
      { name: 'BancaRoma ESG',           kind: 'Sponsor ESG territoriale',                               range: '€500.000 – 3.000.000', committed: 1500000 },
      { name: 'Corporate ESG vari',      kind: 'Altri plafond aziendali',                                range: '€500.000 – 3.000.000', committed: 2100000 },
      { name: 'Comune di Roma',          kind: 'Contributo comunale',                                    range: '—',                    committed: 1200000 }
    ],
    committee: {
      members: ['Alphio APS', 'Comune di Roma', 'Sponsor territoriali'],
      last_meeting: '12/06/2026', next_meeting: '18/09/2026',
      notes: 'Monitora l\'utilizzo dei fondi, definisce le priorità, supervisiona l\'impatto locale'
    },
    governance_national: 'AureaVia Srl Innovativa coordina piattaforma tecnologica e standard operativi. Alphio APS supervisiona etica, reporting annuale e rendicontazione verso le istituzioni. La primaria società di revisione convalida lo SROI ex-post.',
    auditor: { name: 'Primaria società di revisione (validazione SROI ex-post)', scope: 'Verifica CSRD su ogni fattura · sconto 15% contrattuale' },
    platform_fees: 'AureaVia Srl: fee di piattaforma + 5% voucher Layer 2 + canone strutture convenzionate',
    samarcanda: { ride_cost: 72, split: '€61 tariffa + €8 fee + €3 piattaforma', margin: '41,7%', cert: 'ISO 9001:2015' }
  };

  return { structures, services, access_levels, patient, patient_location, roma_center, vouchers, bookings, admin_requests, admin_kpi, admin_trend, admin_patients, esg, fund };
})();
