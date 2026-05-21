/* AureaCare — global navigation & utilities
   Estende il pattern di AureaVia (toast, confirm dialog, mobile menu)
   Aggiunge: SSO simulato, app switcher, wallet ring renderer.
   ============================================================ */

// ---------- Auth (simulato, condiviso con AureaVia) ----------

const AUTH_KEY = 'aurea_auth_user';

function getAuth() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)); }
  catch (e) { return null; }
}

function setAuth(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function requireAuth() {
  if (!getAuth()) { window.location.href = 'index.html'; }
}

function requireAdmin() {
  const u = getAuth();
  if (!u || u.role !== 'admin') { window.location.href = 'admin-login.html'; }
}

function logout() {
  showConfirmDialog(
    'Conferma logout',
    'Sei sicuro di voler uscire dal tuo account Aurea?',
    () => {
      localStorage.removeItem(AUTH_KEY);
      // wallet/booking restano salvati in locale per riprendere alla prossima visita
      window.location.href = 'index.html';
    }
  );
}

// ---------- Toast ----------
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  const icons = {
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    care: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
  };
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Chiudi">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 250); }, 3200);
}

// ---------- Confirm dialog ----------
function showConfirmDialog(title, message, onConfirm, opts = {}) {
  const overlay = document.createElement('div');
  overlay.className = 'confirm-overlay';
  overlay.innerHTML = `
    <div class="confirm-dialog">
      <h3 class="confirm-title">${title}</h3>
      <p class="confirm-message">${message}</p>
      <div class="confirm-actions">
        <button class="btn btn--secondary" style="flex:1" data-cancel>${opts.cancelLabel || 'Annulla'}</button>
        <button class="btn ${opts.danger ? 'btn--primary' : 'btn--care'}" style="flex:1" data-confirm>${opts.confirmLabel || 'Conferma'}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('[data-cancel]').onclick = () => overlay.remove();
  overlay.querySelector('[data-confirm]').onclick = () => { overlay.remove(); if (onConfirm) onConfirm(); };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// ---------- Modal helpers ----------
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}
function closeModal(id) {
  if (id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
  } else {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
  }
}

// ---------- App switcher (style controlled by localStorage 'aureacare_app_switcher_style') ----------
function mountAppSwitcher(triggerEl) {
  if (!triggerEl) return;
  triggerEl.addEventListener('click', (e) => {
    e.stopPropagation();
    const style = localStorage.getItem('aureacare_app_switcher_style') || 'dropdown';
    if (style === 'modal') return openAppSwitcherModal();
    if (style === 'sheet') return openAppSwitcherSheet();
    toggleAppSwitcherDropdown(triggerEl);
  });
}

function appSwitcherCards() {
  return `
    <a class="app-card via" href="https://destone28.github.io/aureaviapoc/" target="_blank" rel="noopener">
      <div class="app-dot">V</div>
      <div>
        <div class="app-name">AureaVia</div>
        <div class="app-tag">NCC &amp; taxi premium</div>
      </div>
    </a>
    <a class="app-card shuttle" href="#" onclick="event.preventDefault(); showToast('AureaShuttle: in arrivo','info');">
      <div class="app-dot">S</div>
      <div>
        <div class="app-name">AureaShuttle <span class="app-coming">Coming soon</span></div>
        <div class="app-tag">Trasporto sanitario</div>
      </div>
    </a>
    <a class="app-card care current" href="home.html">
      <div class="app-dot">C</div>
      <div>
        <div class="app-name">AureaCare</div>
        <div class="app-tag">Accesso alle cure · In uso</div>
      </div>
    </a>`;
}

function toggleAppSwitcherDropdown(trigger) {
  let dd = document.getElementById('appSwitcherDropdown');
  if (dd) { dd.classList.toggle('open'); return; }
  dd = document.createElement('div');
  dd.id = 'appSwitcherDropdown';
  dd.className = 'app-switcher-dropdown open';
  dd.innerHTML = `<h4>Aurea Suite</h4>${appSwitcherCards()}`;
  // anchor positioning
  const wrap = trigger.closest('.app-switcher-wrap');
  if (wrap) wrap.appendChild(dd);
  else document.body.appendChild(dd);
  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target) && e.target !== trigger) dd.classList.remove('open');
  }, { once: true });
}

function openAppSwitcherModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">Aurea Suite</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="modal-body">
        <p class="caption mb-16">Un solo account per tutta la suite. Passa da un servizio all'altro senza accessi multipli.</p>
        ${appSwitcherCards()}
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

function openAppSwitcherSheet() {
  const backdrop = document.createElement('div');
  backdrop.className = 'sheet-backdrop open';
  const sheet = document.createElement('div');
  sheet.className = 'sheet open';
  sheet.innerHTML = `<div class="sheet-handle"></div><h3>Aurea Suite</h3>${appSwitcherCards()}`;
  document.body.appendChild(backdrop);
  document.body.appendChild(sheet);
  const close = () => { backdrop.remove(); sheet.remove(); };
  backdrop.onclick = close;
}

// ---------- Wallet ring (segmented by default, variants supported) ----------
function renderWalletRing(el, opts) {
  if (!el) return;
  const variant = localStorage.getItem('aureacare_wallet_variant') || (opts && opts.variant) || 'segmented';
  const total = opts.total || 12;
  const used = opts.used || 0;
  const credit = opts.credit || 0;
  const size = opts.size || 220;
  el.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'wallet-ring';
  wrap.style.width = size + 'px';
  wrap.style.height = size + 'px';

  if (variant === 'segmented') {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    const cx = 50, cy = 50, r = 42;
    const circ = 2 * Math.PI * r;
    const gap = 2.5; // degrees
    const segDeg = (360 / total) - gap;
    const segLen = (segDeg / 360) * circ;
    const gapLen = (gap / 360) * circ;
    for (let i = 0; i < total; i++) {
      const seg = document.createElementNS(svgNS, 'circle');
      seg.setAttribute('cx', cx);
      seg.setAttribute('cy', cy);
      seg.setAttribute('r', r);
      seg.setAttribute('class', 'seg ' + (i < (total - used) ? 'unused' : 'used'));
      seg.setAttribute('stroke-width', '7');
      seg.setAttribute('stroke-dasharray', `${segLen} ${circ - segLen}`);
      const offset = -(i * (segLen + gapLen)) + (gapLen/2);
      seg.setAttribute('stroke-dashoffset', offset);
      svg.appendChild(seg);
    }
    wrap.appendChild(svg);
  } else if (variant === 'single') {
    const pct = Math.max(0, Math.min(1, (total - used) / total));
    wrap.innerHTML = `
      <svg viewBox="0 0 100 100">
        <circle class="ring-bg" cx="50" cy="50" r="42" stroke-width="7"/>
        <circle class="ring-fg" cx="50" cy="50" r="42" stroke-width="7"
                stroke-dasharray="${(2*Math.PI*42).toFixed(2)}"
                stroke-dashoffset="${((1-pct)*2*Math.PI*42).toFixed(2)}"/>
      </svg>`;
  } else if (variant === 'dual') {
    // two concentric rings (€ outer, prestazioni inner)
    const pctC = Math.max(0, Math.min(1, credit / (opts.creditMax || 500)));
    const pctP = Math.max(0, Math.min(1, (total - used) / total));
    wrap.innerHTML = `
      <svg viewBox="0 0 100 100">
        <circle class="ring-bg" cx="50" cy="50" r="44" stroke-width="5"/>
        <circle class="ring-fg" cx="50" cy="50" r="44" stroke-width="5"
                stroke-dasharray="${(2*Math.PI*44).toFixed(2)}"
                stroke-dashoffset="${((1-pctC)*2*Math.PI*44).toFixed(2)}"/>
        <circle class="ring-bg" cx="50" cy="50" r="34" stroke-width="5"/>
        <circle class="ring-fg" cx="50" cy="50" r="34" stroke-width="5"
                stroke="var(--primary-orange)"
                stroke-dasharray="${(2*Math.PI*34).toFixed(2)}"
                stroke-dashoffset="${((1-pctP)*2*Math.PI*34).toFixed(2)}"/>
      </svg>`;
  }

  const center = document.createElement('div');
  center.className = 'ring-center';
  if (variant === 'dual') {
    center.innerHTML = `
      <div class="ring-eyebrow">Wallet</div>
      <div class="ring-amount" style="font-size:26px">€${credit}</div>
      <div class="ring-sub">${total - used} di ${total} prestazioni</div>`;
  } else {
    center.innerHTML = `
      <div class="ring-eyebrow">Wallet AureaCare</div>
      <div class="ring-amount">€${credit}</div>
      <div class="ring-sub">${total - used} di ${total} prestazioni</div>`;
  }
  wrap.appendChild(center);
  el.appendChild(wrap);
}

// ---------- Wizard helpers (onboarding) ----------
function setWizardStep(currentStep, totalSteps) {
  const stepsEl = document.querySelector('.steps');
  if (!stepsEl) return;
  stepsEl.innerHTML = '';
  for (let i = 1; i <= totalSteps; i++) {
    const s = document.createElement('div');
    s.className = 'step';
    if (i < currentStep) s.classList.add('done');
    else if (i === currentStep) s.classList.add('active');
    stepsEl.appendChild(s);
  }
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  // app switcher trigger if present
  document.querySelectorAll('[data-app-switcher]').forEach(el => mountAppSwitcher(el));

  // active bottom nav link
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.bottom-nav .nav-item').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // global ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.confirm-overlay').forEach(el => el.remove());
      document.querySelectorAll('.sheet, .sheet-backdrop').forEach(el => el.classList.remove('open'));
      closeModal();
      const dd = document.getElementById('appSwitcherDropdown');
      if (dd) dd.classList.remove('open');
    }
  });
});
