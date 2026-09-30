"use strict";
// ── Configuración editable ──────────────────────────────────────────
const CONFIG = {
    phone: '+34 912 345 678',
    whatsapp: '34600123456',
    whatsappLabel: '+34 600 123 456',
    hours: 'Lunes a Sábado: 10:00 – 20:00 h',
    instagram: '@hanami_joyeria',
    atelier: '@hanami_atelier',
    hashtag: '#HanamiPrimavera',
    currency: 'USD',
};
const PRODUCTS = [
    { name: 'Anillo Salara de Diamante', tag: 'Anillo Exclusivo', category: 'Anillos', price: 1450,
        description: 'Envuelto en oro de 18k con un diamante central talla brillante de 0.50ct y detalles florales que evocan el despertar del cerezo.', image: 'anillo-salara.jpg' },
    { name: 'Collar Pétalos de Oro', tag: 'Collar de Autor', category: 'Collares', price: 890,
        description: 'Cadena veneciana en oro con colgante en gota de 18 quilates y una delicada capa de pétalos que se mueve con la brisa.', image: 'collar-petalos.jpg' },
    { name: 'Pendientes Rocío Rosa', tag: 'Pendientes', category: 'Pendientes', price: 760,
        description: 'Pendientes en oro rosa con cuarzo rosado facetado en forma de gota, rodeados por un marco de filigrana.', image: 'pendientes-rocio.jpg' },
    { name: 'Pulsera Eslabón Imperial', tag: 'Brazalete', category: 'Pulseras', price: 1850,
        description: 'Eslabones articulados entrelazados en oro de 18k pulido a mano, complementados con un cierre de seguridad discreto.', image: 'pulsera-eslabon.jpg' },
    { name: 'Solitario Aurora Boreal', tag: 'Pieza Única', category: 'Anillos', price: 2100,
        description: 'Ópalo australiano de fuego con vibraciones iridiscentes, engarzado en una montura de oro amarillo.', image: 'solitario-aurora.jpg' },
    { name: 'Gargantilla Flor de Cerezo', tag: 'Alta Joyería', category: 'Collares', price: 2430,
        description: 'Gargantilla articulada con motivos florales de cerezo, engarzados con pequeñas gemas naturales.', image: 'gargantilla-cerezo.jpg' },
];
// ── Utilidades ──────────────────────────────────────────────────────
const $ = (id) => {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Falta el elemento #${id}`);
    return el;
};
const esc = (s) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = (n) => `$${n.toLocaleString('en-US')}`;
const waLink = (p) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(`Hola, me gustaría reservar: ${p.name} (${money(p.price)} ${CONFIG.currency})`)}`;
// ── Render ──────────────────────────────────────────────────────────
function renderContact() {
    $('contact-rows').innerHTML = `
    <a class="row" href="tel:${CONFIG.phone.replace(/\s/g, '')}">
      <span class="row-icon" aria-hidden="true">☏</span>
      <span><small>Línea boutique</small><strong>${esc(CONFIG.phone)}</strong></span>
    </a>
    <a class="row" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">
      <span class="row-icon" aria-hidden="true">✉</span>
      <span><small>WhatsApp concierge</small><strong>${esc(CONFIG.whatsappLabel)}</strong></span>
    </a>
    <div class="row">
      <span class="row-icon" aria-hidden="true">◷</span>
      <span><small>Horario de boutique</small><strong>${esc(CONFIG.hours)}</strong></span>
    </div>`;
    $('social').innerHTML = `Síguenos en Instagram<br>${esc(CONFIG.instagram)} · ${esc(CONFIG.atelier)}<br>${esc(CONFIG.hashtag)}`;
}
function cardHTML(p) {
    return `
    <article class="card">
      <div class="card-media">
        <img src="assets/img/${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">
        <span class="tag">${esc(p.tag)}</span>
      </div>
      <div class="card-body">
        <h3>${esc(p.name)}</h3>
        <p class="price">${money(p.price)} <span>${CONFIG.currency}</span></p>
        <p class="desc">${esc(p.description)}</p>
        <a class="cta" href="${waLink(p)}" target="_blank" rel="noopener">Reservar por WhatsApp</a>
      </div>
    </article>`;
}
let active = 'Todos';
function renderGrid() {
    const list = active === 'Todos' ? PRODUCTS : PRODUCTS.filter(p => p.category === active);
    $('grid').innerHTML = list.map(cardHTML).join('');
    $('count').textContent = `${list.length} ${list.length === 1 ? 'creación' : 'creaciones'}`;
}
function renderFilters() {
    const cats = ['Todos', 'Anillos', 'Collares', 'Pulseras', 'Pendientes'];
    const box = $('filters');
    box.innerHTML = cats
        .map(c => `<button role="tab" data-cat="${c}" aria-selected="${c === active}" class="${c === active ? 'on' : ''}">${c}</button>`)
        .join('');
    box.addEventListener('click', e => {
        const btn = e.target.closest('button[data-cat]');
        if (!btn)
            return;
        active = btn.dataset.cat;
        box.querySelectorAll('button').forEach(b => {
            const on = b === btn;
            b.classList.toggle('on', on);
            b.setAttribute('aria-selected', String(on));
        });
        renderGrid();
    });
}
renderContact();
renderFilters();
renderGrid();
