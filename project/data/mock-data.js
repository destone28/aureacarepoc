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
    docs: {
      ricetta:  { status: 'verified',  uploaded: '12/04/2026', name: 'Ricetta rossa', file: 'ricetta_marchetti_apr26.pdf' },
      isee:     { status: 'verified',  uploaded: '02/02/2026', name: 'Modello ISEE', file: 'isee_marchetti_2026.pdf' },
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
    { id: 'REQ-2026-0142', patient: 'Lucia Marchetti',  cf: 'MRCLCU82M55H501T', service: 'Visita nefrologica',                          structure: 'Villa Gianicolense',              date: '27 mag · 17:00', submitted: '20 mag 14:22', list_price: 130,  esg_price: 110,  voucher_id: 'VCH-2026-0142', vouchers_left: 8,  status: 'pending' },
    { id: 'REQ-2026-0141', patient: 'Andrea Rossi',     cf: 'RSSNDR79H03H501Z', service: 'Ciclo oncologico ambulatoriale (trasporto L1)', structure: 'Policlinico Gemelli',           date: '02 giu · 09:00', submitted: '20 mag 11:09', list_price: 0,    esg_price: 0,    voucher_id: null,            vouchers_left: 6,  status: 'pending' },
    { id: 'REQ-2026-0140', patient: 'Giulia Bianchi',   cf: 'BNCGLI91D52H501W', service: 'Prima visita cardiologica',                   structure: 'Casa di Cura Mater Dei',          date: '28 mag · 11:00', submitted: '20 mag 09:45', list_price: 188,  esg_price: 160,  voucher_id: 'VCH-2026-0140', vouchers_left: 3,  status: 'pending' },
    { id: 'REQ-2026-0139', patient: 'Marco De Luca',    cf: 'DLCMRC85A12H501P', service: 'Ecografia addome',                            structure: 'Centro Diagnostico Italiano Eur', date: '23 mag · 18:00', submitted: '19 mag 22:17', list_price: 153,  esg_price: 130,  voucher_id: 'VCH-2026-0138', vouchers_left: 5,  status: 'info_requested' },
    { id: 'REQ-2026-0138', patient: 'Sofia Ferri',      cf: 'FRRSFO88P54H501M', service: 'RMN cranio/rachide',                          structure: 'Centro Diagnostico Italiano Eur', date: '26 mag · 15:30', submitted: '19 mag 17:32', list_price: 376,  esg_price: 320,  voucher_id: 'VCH-2026-0135', vouchers_left: 2,  status: 'approved' },
    { id: 'REQ-2026-0137', patient: 'Paolo Esposito',   cf: 'SPSPLA72L08F839B', service: 'Prima visita cardiologica',                   structure: 'Gemelli',                         date: '24 mag · 10:00', submitted: '19 mag 13:08', list_price: 176,  esg_price: 150,  voucher_id: 'VCH-2026-0134', vouchers_left: 4,  status: 'approved' },
    { id: 'REQ-2026-0136', patient: 'Chiara Romano',    cf: 'RMNCHR93T67H501S', service: 'Visita oncologica di controllo',              structure: 'Aurelia Hospital',                date: '23 mag · 14:00', submitted: '19 mag 10:11', list_price: 135,  esg_price: 115,  voucher_id: 'VCH-2026-0132', vouchers_left: 7,  status: 'approved' },
    { id: 'REQ-2026-0135', patient: 'Davide Greco',     cf: 'GRCDVD80E21H501Y', service: 'Prima visita neurologica',                    structure: 'Clinica Borgo Salus',             date: '22 mag · 09:30', submitted: '18 mag 16:43', list_price: 182,  esg_price: 155,  voucher_id: 'VCH-2026-0131', vouchers_left: 1,  status: 'rejected' },
    { id: 'REQ-2026-0134', patient: 'Elena Riva',       cf: 'RVELNE76C44H501R', service: 'Ciclo dialisi mensile (trasporto L1)',        structure: 'Roma East Private Hospital',      date: '21 mag · 08:00', submitted: '18 mag 12:08', list_price: 0,    esg_price: 0,    voucher_id: null,            vouchers_left: 10, status: 'approved' },
    { id: 'REQ-2026-0133', patient: 'Roberto Conti',    cf: 'CNTRRT69M28H501F', service: 'TC total body',                               structure: 'Centro Diagnostico Italiano Eur', date: '21 mag · 11:30', submitted: '18 mag 09:32', list_price: 294,  esg_price: 250,  voucher_id: 'VCH-2026-0127', vouchers_left: 5,  status: 'approved' },
    { id: 'REQ-2026-0132', patient: 'Federica Santoro', cf: 'SNTFRC84S58H501J', service: 'PET scan oncologico',                         structure: 'Policlinico Gemelli',             date: '20 mag · 17:00', submitted: '17 mag 21:09', list_price: 1300, esg_price: 1105, voucher_id: 'VCH-2026-0126', vouchers_left: 0,  status: 'approved' },
    { id: 'REQ-2026-0131', patient: 'Stefano Marino',   cf: 'MRNSFN77H15H501K', service: 'Scintigrafia ossea',                          structure: 'Centro Diagnostico Italiano Eur', date: '18 mag · 09:00', submitted: '15 mag 14:00', list_price: 341,  esg_price: 290,  voucher_id: 'VCH-2026-0125', vouchers_left: 9,  status: 'approved' }
  ];

  // ---------- Admin: KPI dashboard ----------
  const admin_kpi = {
    services_month: { value: 247, delta: 12.5 }, // voucher validati (mese)
    value_covered: { value: 18420, delta: 8.7 }, // valore coperto dal Fondo (mese)
    approval_rate: { value: 87, delta: 2.4 },
    sroi: { value: 3.2, delta: 0.4 }
  };

  // SROI / prestazioni trend (7 mesi)
  const admin_trend = {
    labels:    ['Nov','Dic','Gen','Feb','Mar','Apr','Mag'],
    services:  [142, 168, 175, 190, 215, 232, 247],
    sroi:      [2.3, 2.5, 2.7, 2.8, 3.0, 3.1, 3.2]
  };

  // ---------- Admin: lista pazienti registrati (estratto 12) ----------
  // vouchers_left = voucher ESG residui sul plafond assegnato dal Coordinatore.
  // access_level: 1 = urgenza clinica SSN/MMG · 2 = ISEE < €20.000 · 3 = due diligence.
  const admin_patients = [
    { id: 'PAT-00142', name: 'Lucia Marchetti',  cf: 'MRCLCU82M55H501T', vouchers_left: 8,  access_level: 2, completed: 8, last_login: 'Oggi 09:14', docs_status: 'complete' },
    { id: 'PAT-00141', name: 'Andrea Rossi',     cf: 'RSSNDR79H03H501Z', vouchers_left: 6,  access_level: 1, completed: 12, last_login: 'Ieri 19:42', docs_status: 'complete' },
    { id: 'PAT-00140', name: 'Giulia Bianchi',   cf: 'BNCGLI91D52H501W', vouchers_left: 3,  access_level: 2, completed: 6, last_login: 'Ieri 15:08', docs_status: 'complete' },
    { id: 'PAT-00139', name: 'Marco De Luca',    cf: 'DLCMRC85A12H501P', vouchers_left: 5,  access_level: 3, completed: 9, last_login: '2 giorni fa', docs_status: 'partial' },
    { id: 'PAT-00138', name: 'Sofia Ferri',      cf: 'FRRSFO88P54H501M', vouchers_left: 2,  access_level: 2, completed: 3, last_login: '3 giorni fa', docs_status: 'complete' },
    { id: 'PAT-00137', name: 'Paolo Esposito',   cf: 'SPSPLA72L08F839B', vouchers_left: 4,  access_level: 1, completed: 14, last_login: '4 giorni fa', docs_status: 'complete' },
    { id: 'PAT-00136', name: 'Chiara Romano',    cf: 'RMNCHR93T67H501S', vouchers_left: 7,  access_level: 2, completed: 5, last_login: '5 giorni fa', docs_status: 'complete' },
    { id: 'PAT-00135', name: 'Davide Greco',     cf: 'GRCDVD80E21H501Y', vouchers_left: 1,  access_level: 3, completed: 7, last_login: '1 settimana fa', docs_status: 'partial' },
    { id: 'PAT-00134', name: 'Elena Riva',       cf: 'RVELNE76C44H501R', vouchers_left: 10, access_level: 1, completed: 22, last_login: 'Oggi 08:02', docs_status: 'complete' },
    { id: 'PAT-00133', name: 'Roberto Conti',    cf: 'CNTRRT69M28H501F', vouchers_left: 5,  access_level: 2, completed: 11, last_login: 'Ieri 22:00', docs_status: 'complete' },
    { id: 'PAT-00132', name: 'Federica Santoro', cf: 'SNTFRC84S58H501J', vouchers_left: 0,  access_level: 1, completed: 6, last_login: '2 giorni fa', docs_status: 'pending' },
    { id: 'PAT-00131', name: 'Stefano Marino',   cf: 'MRNSFN77H15H501K', vouchers_left: 9,  access_level: 2, completed: 16, last_login: '3 giorni fa', docs_status: 'complete' }
  ];

  // ---------- ESG: KPI aggregati + breakdown ----------
  // Numeri coerenti con admin_kpi (247 prestazioni mese, 142 pazienti attivi).
  // Tutti i valori sono mock plausibili — il calcolo reale richiederebbe
  // dataset di mobilità urbana, ISEE medio, ore caregiver dichiarate, ecc.
  const esg = {
    headline: {
      sroi:           { value: 3.2,  unit: '×',   delta: +0.4, label: 'SROI sanitario' },
      co2_saved:      { value: 4180, unit: 'kg',  delta: +18.2, label: 'CO₂ evitata (Q2)' },
      caregiver_h:    { value: 824,  unit: 'h',   delta: +12.5, label: 'Ore caregiver risparmiate' },
      fragile_served: { value: 38,   unit: '%',   delta: +4.1,  label: 'Pazienti fragili serviti' }
    },

    // Trend 7 mesi (allineato con admin_trend)
    trend: {
      labels:       ['Nov','Dic','Gen','Feb','Mar','Apr','Mag'],
      sroi:         [2.3, 2.5, 2.7, 2.8, 3.0, 3.1, 3.2],
      co2_kg:       [1820, 2240, 2510, 2960, 3340, 3760, 4180],
      caregiver_h:  [340, 410, 480, 560, 640, 730, 824]
    },

    // ---------- Ambientale ----------
    environmental: {
      co2_per_visit_avg: 17.7,  // kg CO2 evitata per visita media (vs ospedale lontano)
      km_avoided:        12480, // km totali risparmiati grazie a strutture in zona
      shuttle_share:     54,    // % visite con trasporto AureaShuttle vs auto privata
      shuttle_breakdown: [
        { label: 'AureaShuttle (condiviso)', value: 54, color: 'var(--primary-orange)' },
        { label: 'Mezzo pubblico',           value: 23, color: 'var(--care-blue)' },
        { label: 'Auto privata',             value: 18, color: '#999' },
        { label: 'A piedi / bici',           value: 5,  color: '#0F6E56' }
      ],
      // Confronto km medi per categoria
      avg_km_per_visit:  { aureacare: 3.4, baseline_roma: 8.9 }
    },

    // ---------- Sociale ----------
    social: {
      fragile_categories: [
        { label: 'ISEE < 15.000 €',    count: 42, pct: 30, color: '#3B82F6' },
        { label: 'Over 70',            count: 35, pct: 25, color: '#0F6E56' },
        { label: 'Patologia cronica',  count: 28, pct: 20, color: '#F59E0B' },
        { label: 'Genitore single',    count: 12, pct: 8,  color: '#E91E63' },
        { label: 'Disabilità motoria', count: 8,  pct: 6,  color: '#6366F1' }
      ],
      district_coverage: 14, // quartieri Roma coperti
      total_districts:   22, // di cui obiettivo totale
      district_top: [
        { name: 'Tuscolano',       patients: 22, completed: 184 },
        { name: 'EUR',             patients: 18, completed: 152 },
        { name: 'Trionfale',       patients: 16, completed: 138 },
        { name: 'Parioli',         patients: 14, completed: 119 },
        { name: 'Monteverde',      patients: 12, completed: 98  },
        { name: 'Pietralata',      patients: 11, completed: 84  },
        { name: 'Trastevere',      patients: 10, completed: 79  },
        { name: 'San Giovanni',    patients: 9,  completed: 71  },
        { name: 'Gianicolo',       patients: 8,  completed: 62  },
        { name: 'Aurelio',         patients: 7,  completed: 54  },
        { name: 'Borgo',           patients: 6,  completed: 48  },
        { name: 'Salario',         patients: 5,  completed: 39  },
        { name: 'Tor Vergata',     patients: 3,  completed: 24  },
        { name: 'Grottaferrata',   patients: 1,  completed: 8   }
      ],
      facilitated_access_rate: 87 // % di richieste approvate (accesso facilitato)
    },

    // ---------- Governance / Economico ----------
    governance: {
      sroi_breakdown: [
        { label: 'Risparmio sanità pubblica',    value: 1.4 },
        { label: 'Tempo caregiver liberato',     value: 0.8 },
        { label: 'Mobilità evitata (CO₂)',       value: 0.5 },
        { label: 'Accesso facilitato (welfare)', value: 0.5 }
      ], // somma = 3.2×
      value_disbursed_ytd: 91200, // €
      tariff_avg_vs_market: { aureacare: 78, market: 105 }, // €
      approval_rate: 87,
      cost_per_outcome: 372 // € per cura completata
    },

    // ---------- Demografia paziente ----------
    demographics: {
      age_buckets: [
        { label: '0-17',   count: 6,  pct: 4  },
        { label: '18-30',  count: 18, pct: 13 },
        { label: '31-45',  count: 32, pct: 23 },
        { label: '46-60',  count: 38, pct: 27 },
        { label: '61-75',  count: 34, pct: 24 },
        { label: '76+',    count: 14, pct: 10 }
      ],
      gender_split: { female: 58, male: 41, other: 1 }, // %
      top_specialties: [
        { label: 'Oncologia',          count: 78 },
        { label: 'Radiologia',         count: 61 },
        { label: 'Cardiologia',        count: 46 },
        { label: 'Nefrologia',         count: 32 },
        { label: 'Neurologia',         count: 24 },
        { label: 'Medicina nucleare',  count: 17 },
        { label: 'Pediatria',          count: 12 }
      ],
      recurrence: { single: 32, two_three: 45, four_plus: 23 } // % pazienti per # prenotazioni
    }
  };

  return { structures, services, patient, patient_location, roma_center, vouchers, bookings, admin_requests, admin_kpi, admin_trend, admin_patients, esg };
})();
