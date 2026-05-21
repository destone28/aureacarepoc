/* AureaCare — mock data condiviso
   Tutti i dati hard-coded, Roma-centrici. Caricato globalmente come window.MOCK.
   ============================================================ */

window.MOCK = (function () {

  // ---------- Strutture convenzionate Roma (18) ----------
  // Coordinate (lat, lng) reali — usate dalle mappe Leaflet/OpenStreetMap
  const structures = [
    { id: 'STR-001', name: 'Policlinico Universitario A. Gemelli', type: 'Pubblico convenzionato', area: 'Roma Nord-Ovest', address: 'Largo A. Gemelli 8',  district: 'Trionfale',     lat: 41.9281, lng: 12.4319, distance_km: 4.2, rating: 4.7, reviews: 1284, specialties: ['Cardiologia','Oncologia','Dermatologia','Ortopedia','Ginecologia','Neurologia'], next_slot: 'Domani, 10:30', tariff_factor: 1.00, weekly_open: '08:00 – 20:00', active: true },
    { id: 'STR-002', name: 'Policlinico Tor Vergata',                 type: 'Pubblico convenzionato', area: 'Roma Sud-Est',  address: 'Viale Oxford 81',     district: 'Tor Vergata',   lat: 41.8517, lng: 12.6191, distance_km: 9.6, rating: 4.4, reviews: 642,  specialties: ['Ortopedia','Riabilitazione','Cardiologia','Diabetologia'], next_slot: 'Mar 27 mag, 09:00', tariff_factor: 0.95, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-003', name: 'Azienda Ospedaliera San Camillo',          type: 'Pubblico convenzionato', area: 'Roma Centro-Ovest',address: 'Cir. Gianicolense 87',district: 'Monteverde',    lat: 41.8775, lng: 12.4543, distance_km: 3.1, rating: 4.5, reviews: 891,  specialties: ['Cardiologia','Pneumologia','Chirurgia','Oculistica','Nefrologia'], next_slot: 'Oggi, 16:45', tariff_factor: 0.98, weekly_open: '07:30 – 20:00', active: true },
    { id: 'STR-004', name: 'IDI — Istituto Dermopatico dell\'Immacolata', type: 'Privato convenzionato', area: 'Roma Sud-Est',  address: 'Via dei Monti di Creta 104', district: 'Aurelio', lat: 41.8993, lng: 12.4202, distance_km: 5.4, rating: 4.6, reviews: 432,  specialties: ['Dermatologia','Allergologia','Chirurgia plastica'], next_slot: 'Gio 29 mag, 11:30', tariff_factor: 1.05, weekly_open: '08:00 – 18:30', active: true },
    { id: 'STR-005', name: 'Ospedale Pediatrico Bambino Gesù',          type: 'Pubblico convenzionato', area: 'Roma Centro',   address: 'P.zza Sant\'Onofrio 4', district: 'Gianicolo',    lat: 41.8985, lng: 12.4566, distance_km: 2.7, rating: 4.9, reviews: 2104, specialties: ['Pediatria','Cardiologia pediatrica','Neurologia pediatrica'], next_slot: 'Mer 28 mag, 14:00', tariff_factor: 1.00, weekly_open: '08:00 – 20:00', active: true },
    { id: 'STR-006', name: 'Casa di Cura Quisisana',                    type: 'Privato convenzionato', area: 'Roma Nord',    address: 'Via G. Porro 5',     district: 'Parioli',       lat: 41.9192, lng: 12.4884, distance_km: 2.9, rating: 4.4, reviews: 287,  specialties: ['Cardiologia','Ginecologia','Senologia','Chirurgia'], next_slot: 'Domani, 09:30', tariff_factor: 1.10, weekly_open: '07:30 – 20:00', active: true },
    { id: 'STR-007', name: 'Centro Medico Sant\'Eugenio',               type: 'Privato convenzionato', area: 'Roma Sud',     address: 'P.le Umanesimo 10', district: 'EUR',           lat: 41.8316, lng: 12.4710, distance_km: 7.8, rating: 4.3, reviews: 198,  specialties: ['Fisioterapia','Logopedia','Riabilitazione','Ortopedia'], next_slot: 'Lun 26 mag, 15:00', tariff_factor: 0.92, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-008', name: 'CDC Casaccia',                              type: 'Privato convenzionato', area: 'Roma Nord-Est', address: 'Via Tiburtina 432',  district: 'Pietralata',    lat: 41.9197, lng: 12.5474, distance_km: 6.2, rating: 4.2, reviews: 154,  specialties: ['Cardiologia','Endocrinologia','Diabetologia','Dermatologia'], next_slot: 'Mar 27 mag, 17:30', tariff_factor: 0.95, weekly_open: '08:00 – 18:00', active: true },
    { id: 'STR-009', name: 'Aurelia Hospital',                          type: 'Privato convenzionato', area: 'Roma Ovest',   address: 'Via Aurelia 860',    district: 'Aurelio',       lat: 41.8990, lng: 12.4036, distance_km: 8.4, rating: 4.5, reviews: 376,  specialties: ['Ortopedia','Cardiologia','Chirurgia','Oncologia'], next_slot: 'Gio 29 mag, 10:00', tariff_factor: 1.08, weekly_open: '08:00 – 19:30', active: true },
    { id: 'STR-010', name: 'Centro Riabilitazione Don Gnocchi',         type: 'Pubblico convenzionato', area: 'Roma Sud',    address: 'Via Maresciallo Caviglia 30', district: 'Salario', lat: 41.9344, lng: 12.5050, distance_km: 5.7, rating: 4.6, reviews: 248, specialties: ['Fisioterapia','Riabilitazione','Logopedia','Neuropsicologia'], next_slot: 'Domani, 11:00', tariff_factor: 0.90, weekly_open: '07:30 – 18:00', active: true },
    { id: 'STR-011', name: 'INI Grottaferrata',                          type: 'Privato convenzionato', area: 'Roma Sud-Est', address: 'Via S. Anna 27',     district: 'Grottaferrata', lat: 41.7892, lng: 12.6708, distance_km: 11.2, rating: 4.4, reviews: 167, specialties: ['Ortopedia','Cardiologia','Fisioterapia'], next_slot: 'Ven 30 mag, 09:00', tariff_factor: 1.00, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-012', name: 'Ospedale San Giovanni Addolorata',          type: 'Pubblico convenzionato', area: 'Roma Centro', address: 'Via dell\'Amba Aradam 9', district: 'San Giovanni', lat: 41.8852, lng: 12.5050, distance_km: 1.9, rating: 4.2, reviews: 521, specialties: ['Cardiologia','Pneumologia','Neurologia','Geriatria'], next_slot: 'Lun 26 mag, 08:30', tariff_factor: 0.94, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-013', name: 'Salvator Mundi International Hospital',     type: 'Privato convenzionato', area: 'Roma Centro', address: 'Viale delle Mura Gianicolensi 67', district: 'Trastevere', lat: 41.8869, lng: 12.4626, distance_km: 3.0, rating: 4.7, reviews: 392, specialties: ['Cardiologia','Ginecologia','Ortopedia','Dermatologia'], next_slot: 'Mer 28 mag, 16:00', tariff_factor: 1.12, weekly_open: '08:00 – 20:00', active: true },
    { id: 'STR-014', name: 'CDC Villa Stuart',                          type: 'Privato convenzionato', area: 'Roma Nord',   address: 'Via Trionfale 5952',  district: 'Trionfale',     lat: 41.9479, lng: 12.4286, distance_km: 6.1, rating: 4.5, reviews: 234,  specialties: ['Ortopedia','Riabilitazione','Cardiologia','Senologia'], next_slot: 'Mar 27 mag, 14:30', tariff_factor: 1.06, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-015', name: 'Centro Diagnostico Italiano Eur',           type: 'Privato convenzionato', area: 'Roma Sud',    address: 'Via Pio Emanuelli 1', district: 'EUR',           lat: 41.8268, lng: 12.4658, distance_km: 7.2, rating: 4.3, reviews: 112,  specialties: ['Radiologia','Endocrinologia','Dermatologia','Diabetologia'], next_slot: 'Domani, 12:30', tariff_factor: 0.96, weekly_open: '08:00 – 19:00', active: true },
    { id: 'STR-016', name: 'Ospedale Santo Spirito',                    type: 'Pubblico convenzionato', area: 'Roma Centro', address: 'Lungotevere in Sassia 1', district: 'Borgo',     lat: 41.9015, lng: 12.4626, distance_km: 2.3, rating: 4.1, reviews: 418,  specialties: ['Cardiologia','Neurologia','Pneumologia','Chirurgia'], next_slot: 'Gio 29 mag, 08:30', tariff_factor: 0.93, weekly_open: '07:30 – 19:00', active: true },
    { id: 'STR-017', name: 'Poliambulatorio Roma Eur',                  type: 'Privato convenzionato', area: 'Roma Sud',    address: 'Via dell\'Oceano Indiano 13', district: 'EUR', lat: 41.8235, lng: 12.4787, distance_km: 8.0, rating: 4.4, reviews: 87,   specialties: ['Fisioterapia','Logopedia','Ortopedia','Pediatria'], next_slot: 'Lun 26 mag, 18:00', tariff_factor: 0.88, weekly_open: '08:00 – 19:00', active: false },
    { id: 'STR-018', name: 'Casa di Cura Mater Dei',                     type: 'Privato convenzionato', area: 'Roma Nord',   address: 'Via Bertoloni 34',     district: 'Parioli',       lat: 41.9217, lng: 12.4845, distance_km: 3.4, rating: 4.6, reviews: 312,  specialties: ['Ginecologia','Cardiologia','Senologia','Ortopedia'], next_slot: 'Mer 28 mag, 11:00', tariff_factor: 1.10, weekly_open: '08:00 – 20:00', active: true }
  ];

  // Coordinate paziente (Via Tuscolana 124) — usate per "distanza casa → struttura"
  const patient_location = { lat: 41.8762, lng: 12.5251 };
  const roma_center = { lat: 41.9028, lng: 12.4964 };

  // ---------- Catalogo prestazioni ----------
  const services = [
    // Visite specialistiche (10)
    { id: 'SRV-V01', kind: 'visita', name: 'Visita cardiologica', cat: 'Cardiologia', price_from: 80, price_to: 110, duration: 30, icon: 'heart' },
    { id: 'SRV-V02', kind: 'visita', name: 'Visita dermatologica', cat: 'Dermatologia', price_from: 70, price_to: 95, duration: 25, icon: 'shield' },
    { id: 'SRV-V03', kind: 'visita', name: 'Visita ortopedica', cat: 'Ortopedia', price_from: 75, price_to: 110, duration: 30, icon: 'activity' },
    { id: 'SRV-V04', kind: 'visita', name: 'Visita ginecologica', cat: 'Ginecologia', price_from: 80, price_to: 120, duration: 30, icon: 'venus' },
    { id: 'SRV-V05', kind: 'visita', name: 'Visita oculistica', cat: 'Oculistica', price_from: 65, price_to: 95, duration: 30, icon: 'eye' },
    { id: 'SRV-V06', kind: 'visita', name: 'Visita neurologica', cat: 'Neurologia', price_from: 90, price_to: 120, duration: 40, icon: 'brain' },
    { id: 'SRV-V07', kind: 'visita', name: 'Visita endocrinologica', cat: 'Endocrinologia', price_from: 80, price_to: 110, duration: 30, icon: 'droplet' },
    { id: 'SRV-V08', kind: 'visita', name: 'Visita pediatrica', cat: 'Pediatria', price_from: 60, price_to: 90, duration: 30, icon: 'baby' },
    { id: 'SRV-V09', kind: 'visita', name: 'Visita pneumologica', cat: 'Pneumologia', price_from: 80, price_to: 110, duration: 30, icon: 'wind' },
    { id: 'SRV-V10', kind: 'visita', name: 'Visita senologica', cat: 'Senologia', price_from: 90, price_to: 120, duration: 30, icon: 'flower' },

    // Terapie (10) — singole sedute
    { id: 'SRV-T01', kind: 'terapia', name: 'Seduta di fisioterapia', cat: 'Fisioterapia', price_from: 45, price_to: 65, duration: 60, icon: 'activity' },
    { id: 'SRV-T02', kind: 'terapia', name: 'Logopedia', cat: 'Logopedia', price_from: 50, price_to: 70, duration: 45, icon: 'message-square' },
    { id: 'SRV-T03', kind: 'terapia', name: 'Infiltrazione articolare', cat: 'Ortopedia', price_from: 70, price_to: 95, duration: 30, icon: 'syringe' },
    { id: 'SRV-T04', kind: 'terapia', name: 'Tecarterapia', cat: 'Fisioterapia', price_from: 50, price_to: 80, duration: 45, icon: 'zap' },
    { id: 'SRV-T05', kind: 'terapia', name: 'Onde d\'urto', cat: 'Fisioterapia', price_from: 60, price_to: 85, duration: 30, icon: 'radio' },
    { id: 'SRV-T06', kind: 'terapia', name: 'Massoterapia decontratturante', cat: 'Fisioterapia', price_from: 40, price_to: 60, duration: 50, icon: 'hand' },
    { id: 'SRV-T07', kind: 'terapia', name: 'Psicoterapia individuale', cat: 'Psicologia', price_from: 60, price_to: 80, duration: 50, icon: 'brain' },
    { id: 'SRV-T08', kind: 'terapia', name: 'Trattamento osteopatico', cat: 'Osteopatia', price_from: 55, price_to: 80, duration: 50, icon: 'activity' },
    { id: 'SRV-T09', kind: 'terapia', name: 'Agopuntura', cat: 'Agopuntura', price_from: 50, price_to: 75, duration: 45, icon: 'flower' },
    { id: 'SRV-T10', kind: 'terapia', name: 'Linfodrenaggio manuale', cat: 'Fisioterapia', price_from: 45, price_to: 70, duration: 60, icon: 'droplet' },

    // Cicli di cura (5)
    { id: 'SRV-C01', kind: 'ciclo',   name: 'Riabilitazione post-operatoria', cat: 'Ortopedia / Riab.', price_from: 850,  price_to: 1400, sessions: 12, duration: 60, icon: 'package' },
    { id: 'SRV-C02', kind: 'ciclo',   name: 'Ciclo oncologico ambulatoriale', cat: 'Oncologia', price_from: 1400, price_to: 2200, sessions: 8, duration: 90, icon: 'heart' },
    { id: 'SRV-C03', kind: 'ciclo',   name: 'Ciclo dialisi (mensile)',         cat: 'Nefrologia', price_from: 1100, price_to: 1700, sessions: 12, duration: 240, icon: 'droplet' },
    { id: 'SRV-C04', kind: 'ciclo',   name: 'Riabilitazione cardiologica',     cat: 'Cardiologia', price_from: 720,  price_to: 1100, sessions: 10, duration: 60, icon: 'heart' },
    { id: 'SRV-C05', kind: 'ciclo',   name: 'Logopedia infantile',             cat: 'Logopedia', price_from: 560,  price_to: 980,  sessions: 14, duration: 45, icon: 'message-square' }
  ];

  // ---------- Paziente loggato ----------
  const patient = {
    id: 'PAT-00142',
    first_name: 'Lucia',
    last_name: 'Marchetti',
    cf: 'MRCLCU82M55H501T',
    birth: '15/08/1982',
    phone: '+39 333 712 8439',
    email: 'lucia.marchetti@example.it',
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

  // ---------- Wallet ----------
  const wallet = {
    credit: 340,
    total_slots: 12,
    used_slots: 4, // 8 prestazioni residue
    movements: [
      { id: 'MV-018', date: '18 mag', label: 'Ricarica pacchetto base',  type: 'topup',   amount: +100, method: 'Stripe',     ref: 'TX-29A7' },
      { id: 'MV-017', date: '14 mag', label: 'Visita ortopedica · Aurelia Hospital', type: 'charge',  amount: -85, ref: 'BOOK-091' },
      { id: 'MV-016', date: '02 mag', label: 'Seduta fisioterapia · Don Gnocchi',     type: 'charge',  amount: -55, ref: 'BOOK-088' },
      { id: 'MV-015', date: '24 apr', label: 'Ricarica pacchetto plus',  type: 'topup',   amount: +250, method: 'PayPal',     ref: 'TX-2812' },
      { id: 'MV-014', date: '19 apr', label: 'Visita cardiologica · Gemelli',          type: 'charge',  amount: -95, ref: 'BOOK-082' },
      { id: 'MV-013', date: '12 apr', label: 'Tecarterapia · Don Gnocchi',             type: 'charge',  amount: -60, ref: 'BOOK-079' },
      { id: 'MV-012', date: '03 apr', label: 'Ricarica pacchetto base',                 type: 'topup',   amount: +100, method: 'Google Pay', ref: 'TX-2691' },
      { id: 'MV-011', date: '28 mar', label: 'Visita dermatologica · IDI',             type: 'charge',  amount: -75, ref: 'BOOK-076' }
    ]
  };

  // ---------- Prenotazioni paziente (8) ----------
  const bookings = [
    { id: 'BOOK-099', service_id: 'SRV-V01', service_name: 'Visita cardiologica', structure_id: 'STR-001', structure_name: 'Policlinico Gemelli', date: '22 mag', time: '14:30', cost: 95, status: 'approved', shuttle: true, doctor: 'Dr.ssa Elena Conti' },
    { id: 'BOOK-098', service_id: 'SRV-T01', service_name: 'Seduta fisioterapia',  structure_id: 'STR-010', structure_name: 'Centro Don Gnocchi',  date: '24 mag', time: '09:00', cost: 55, status: 'confirmed', shuttle: false, doctor: 'Dr. Marco Pace' },
    { id: 'BOOK-097', service_id: 'SRV-V03', service_name: 'Visita ortopedica',    structure_id: 'STR-009', structure_name: 'Aurelia Hospital',     date: '14 mag', time: '11:00', cost: 85, status: 'completed', shuttle: true, doctor: 'Dr. Luca Ferri' },
    { id: 'BOOK-096', service_id: 'SRV-T04', service_name: 'Tecarterapia',          structure_id: 'STR-010', structure_name: 'Centro Don Gnocchi',  date: '12 mag', time: '17:30', cost: 60, status: 'completed', shuttle: false, doctor: 'Dr.ssa Anna Lobello' },
    { id: 'BOOK-095', service_id: 'SRV-V02', service_name: 'Visita dermatologica',  structure_id: 'STR-004', structure_name: 'IDI',                  date: '08 mag', time: '10:00', cost: 75, status: 'completed', shuttle: false, doctor: 'Dr.ssa Sara Vitali' },
    { id: 'BOOK-094', service_id: 'SRV-V05', service_name: 'Visita oculistica',     structure_id: 'STR-003', structure_name: 'San Camillo',         date: '02 mag', time: '15:00', cost: 70, status: 'cancelled', shuttle: false, doctor: 'Dr. Paolo Sini' },
    { id: 'BOOK-093', service_id: 'SRV-T02', service_name: 'Logopedia',             structure_id: 'STR-007', structure_name: 'Centro Sant\'Eugenio',date: '28 apr', time: '16:30', cost: 60, status: 'completed', shuttle: true, doctor: 'Dr.ssa Marta Bui' },
    { id: 'BOOK-100', service_id: 'SRV-V07', service_name: 'Visita endocrinologica',structure_id: 'STR-008', structure_name: 'CDC Casaccia',         date: '27 mag', time: '17:00', cost: 90, status: 'pending', shuttle: false, doctor: 'Dr. Mauro Genna' }
  ];

  // ---------- Admin: richieste di approvazione (estese — 12 visibili) ----------
  const admin_requests = [
    { id: 'REQ-2026-0142', patient: 'Lucia Marchetti',  cf: 'MRCLCU82M55H501T', service: 'Visita endocrinologica', structure: 'CDC Casaccia',          date: '27 mag · 17:00', submitted: '20 mag 14:22', cost: 90,  wallet_after: 250, status: 'pending' },
    { id: 'REQ-2026-0141', patient: 'Andrea Rossi',     cf: 'RSSNDR79H03H501Z', service: 'Riabilitazione cardiologica (ciclo)', structure: 'Aurelia Hospital', date: '02 giu · 09:00', submitted: '20 mag 11:09', cost: 720, wallet_after: 80,  status: 'pending' },
    { id: 'REQ-2026-0140', patient: 'Giulia Bianchi',   cf: 'BNCGLI91D52H501W', service: 'Visita ginecologica',     structure: 'Casa di Cura Mater Dei', date: '28 mag · 11:00', submitted: '20 mag 09:45', cost: 110, wallet_after: 195, status: 'pending' },
    { id: 'REQ-2026-0139', patient: 'Marco De Luca',    cf: 'DLCMRC85A12H501P', service: 'Tecarterapia',            structure: 'Centro Don Gnocchi',     date: '23 mag · 18:00', submitted: '19 mag 22:17', cost: 60,  wallet_after: 175, status: 'info_requested' },
    { id: 'REQ-2026-0138', patient: 'Sofia Ferri',      cf: 'FRRSFO88P54H501M', service: 'Visita oculistica',       structure: 'San Camillo',            date: '26 mag · 15:30', submitted: '19 mag 17:32', cost: 75,  wallet_after: 220, status: 'approved' },
    { id: 'REQ-2026-0137', patient: 'Paolo Esposito',   cf: 'SPSPLA72L08F839B', service: 'Visita cardiologica',     structure: 'Gemelli',                 date: '24 mag · 10:00', submitted: '19 mag 13:08', cost: 95,  wallet_after: 145, status: 'approved' },
    { id: 'REQ-2026-0136', patient: 'Chiara Romano',    cf: 'RMNCHR93T67H501S', service: 'Visita dermatologica',    structure: 'IDI',                     date: '23 mag · 14:00', submitted: '19 mag 10:11', cost: 75,  wallet_after: 305, status: 'approved' },
    { id: 'REQ-2026-0135', patient: 'Davide Greco',     cf: 'GRCDVD80E21H501Y', service: 'Visita pneumologica',     structure: 'San Camillo',            date: '22 mag · 09:30', submitted: '18 mag 16:43', cost: 90,  wallet_after: 165, status: 'rejected' },
    { id: 'REQ-2026-0134', patient: 'Elena Riva',       cf: 'RVELNE76C44H501R', service: 'Ciclo dialisi (mensile)', structure: 'Tor Vergata',             date: '21 mag · 08:00', submitted: '18 mag 12:08', cost: 1100,wallet_after: 25,  status: 'approved' },
    { id: 'REQ-2026-0133', patient: 'Roberto Conti',    cf: 'CNTRRT69M28H501F', service: 'Visita ortopedica',       structure: 'Aurelia Hospital',        date: '21 mag · 11:30', submitted: '18 mag 09:32', cost: 85,  wallet_after: 240, status: 'approved' },
    { id: 'REQ-2026-0132', patient: 'Federica Santoro', cf: 'SNTFRC84S58H501J', service: 'Logopedia',                structure: 'Centro Sant\'Eugenio',    date: '20 mag · 17:00', submitted: '17 mag 21:09', cost: 60,  wallet_after: 110, status: 'approved' },
    { id: 'REQ-2026-0131', patient: 'Stefano Marino',   cf: 'MRNSFN77H15H501K', service: 'Riabilitazione post-op',   structure: 'Centro Don Gnocchi',     date: '18 mag · 09:00', submitted: '15 mag 14:00', cost: 850, wallet_after: 90,  status: 'approved' }
  ];

  // ---------- Admin: KPI dashboard ----------
  const admin_kpi = {
    services_month: { value: 247, delta: 12.5 },
    value_disbursed: { value: 18420, delta: 8.7 },
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
  const admin_patients = [
    { id: 'PAT-00142', name: 'Lucia Marchetti',  cf: 'MRCLCU82M55H501T', phone: '+39 333 712 8439', wallet: 340, completed: 8, last_login: 'Oggi 09:14', docs_status: 'complete' },
    { id: 'PAT-00141', name: 'Andrea Rossi',     cf: 'RSSNDR79H03H501Z', phone: '+39 348 220 1198', wallet: 800, completed: 12, last_login: 'Ieri 19:42', docs_status: 'complete' },
    { id: 'PAT-00140', name: 'Giulia Bianchi',   cf: 'BNCGLI91D52H501W', phone: '+39 340 561 2287', wallet: 305, completed: 6, last_login: 'Ieri 15:08', docs_status: 'complete' },
    { id: 'PAT-00139', name: 'Marco De Luca',    cf: 'DLCMRC85A12H501P', phone: '+39 347 808 4421', wallet: 235, completed: 9, last_login: '2 giorni fa', docs_status: 'partial' },
    { id: 'PAT-00138', name: 'Sofia Ferri',      cf: 'FRRSFO88P54H501M', phone: '+39 349 123 7790', wallet: 295, completed: 3, last_login: '3 giorni fa', docs_status: 'complete' },
    { id: 'PAT-00137', name: 'Paolo Esposito',   cf: 'SPSPLA72L08F839B', phone: '+39 333 991 1024', wallet: 240, completed: 14, last_login: '4 giorni fa', docs_status: 'complete' },
    { id: 'PAT-00136', name: 'Chiara Romano',    cf: 'RMNCHR93T67H501S', phone: '+39 366 222 7811', wallet: 380, completed: 5, last_login: '5 giorni fa', docs_status: 'complete' },
    { id: 'PAT-00135', name: 'Davide Greco',     cf: 'GRCDVD80E21H501Y', phone: '+39 345 612 7080', wallet: 255, completed: 7, last_login: '1 settimana fa', docs_status: 'partial' },
    { id: 'PAT-00134', name: 'Elena Riva',       cf: 'RVELNE76C44H501R', phone: '+39 388 220 1144', wallet: 1125, completed: 22, last_login: 'Oggi 08:02', docs_status: 'complete' },
    { id: 'PAT-00133', name: 'Roberto Conti',    cf: 'CNTRRT69M28H501F', phone: '+39 333 711 4488', wallet: 325, completed: 11, last_login: 'Ieri 22:00', docs_status: 'complete' },
    { id: 'PAT-00132', name: 'Federica Santoro', cf: 'SNTFRC84S58H501J', phone: '+39 348 022 5610', wallet: 170, completed: 6, last_login: '2 giorni fa', docs_status: 'pending' },
    { id: 'PAT-00131', name: 'Stefano Marino',   cf: 'MRNSFN77H15H501K', phone: '+39 347 117 2245', wallet: 940, completed: 16, last_login: '3 giorni fa', docs_status: 'complete' }
  ];

  return { structures, services, patient, patient_location, roma_center, wallet, bookings, admin_requests, admin_kpi, admin_trend, admin_patients };
})();
