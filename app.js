(function () {
'use strict';
var CFG = window.SITE_CONFIG || {};
var PAGES = window.PAGES || {};
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var root = document.documentElement;

/* ---------- safe storage ---------- */
function sGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function sSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

/* ---------- i18n ---------- */
var lang = 'en';
var T = {
  en: { back: '← Back to ', tabs: { home: 'Home', work: 'Work', media: 'Media & Archive', lab: 'Lab', about: 'About', contact: 'Contact' },
        ok: 'Thanks! The full FeedFlow Stack APK plus newsletter updates and news will arrive in your inbox shortly.', sending: 'Sending…', fail: 'Something went wrong. Please try again.',
        mail: 'Your email app will open to confirm the subscription.', bad: 'Please enter a valid email address.' },
  tr: { back: '← Geri: ', tabs: { home: 'Ana Sayfa', work: 'Çalışmalar', media: 'Medya & Arşiv', lab: 'Laboratuvar', about: 'Hakkımda', contact: 'İletişim' },
        ok: 'Teşekkürler! FeedFlow Stack tam sürüm APK ile birlikte bülten ve haberler kısa sürede gelen kutuna gelecek.', sending: 'Gönderiliyor…', fail: 'Bir sorun oluştu. Lütfen tekrar dene.',
        mail: 'Aboneliği onaylamak için e-posta uygulaman açılacak.', bad: 'Lütfen geçerli bir e-posta adresi gir.' }
};
function setLang(l, persist) {
  lang = l === 'tr' ? 'tr' : 'en';
  root.lang = lang; root.dataset.lang = lang; document.body.dataset.lang = lang;
  \[ ('[data-set-lang]').forEach(function (b) { b.classList.toggle('active', b.dataset.setLang === lang); });
  if (persist) sSet('barisy_lang', lang);
  updateTitle();
  var bl = $('.back-link[data-sec]'); if (bl) bl.querySelector('.bl-pre').textContent = T[lang].back;
} \]('[data-set-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.setLang, true); }); });

/* ---------- helpers ---------- */
function bi(o) { return '<span class="en">' + o.en + '</span><span class="tr">' + o.tr + '</span>'; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

/* ---------- list rendering ---------- */
function itemHTML(id, p) {
  return '<div class="list-item"><div class="list-item-content"><div class="list-item-title">' +
    '<a class="li-link" href="#/' + (p.sec === 'insights' ? 'insights' : p.sec) + '/' + id + '">' + bi(p.title) + '</a>' +
    (p.tag ? '<span class="inline-tag">' + p.tag + '</span>' : '') +
    '</div><div class="list-item-desc">' + bi(p.desc) + '</div></div><div class="list-item-date">' + p.date + '</div></div>';
}
var MEDIA_GROUPS = [
  { t: { en: 'Webinars', tr: 'Webinarlar' }, d: { en: 'Recorded presentations and technical talks on building voice AI and Android integrations.', tr: 'Sesli AI ve Android entegrasyonları üzerine kayıtlı sunumlar ve teknik konuşmalar.' }, ids: ['webinar-4', 'webinar-3', 'webinar-2', 'webinar-1'] },
  { t: { en: 'Podcasts', tr: 'Podcast\'ler' }, d: { en: 'Behind-the-scenes stories from building the AI Clinic Assistant.', tr: 'AI Clinic Assistant\'ı geliştirirken yaşananların perde arkası.' }, ids: ['podcast-2', 'podcast-1'] },
  { t: { en: 'Articles & Publications', tr: 'Makaleler ve Yayınlar' }, d: { en: 'Blog articles and academic work shaped by hands-on experience.', tr: 'Uygulamalı deneyimle şekillenen blog yazıları ve akademik çalışmalar.' }, ids: ['article-next-steps', 'article-appointments', 'article-pdfcraft', 'article-human-centric', 'article-clinic-assistant', 'thesis'] },
  { t: { en: 'Events', tr: 'Etkinlikler' }, d: { en: 'Meetups and conferences attended, with proof of participation.', tr: 'Katılınan buluşmalar ve konferanslar, katılım belgeleriyle.' }, ids: ['events'] }
];
function renderLists() {
  var home = $('#tab-home');
  home.innerHTML = Object.keys(PAGES).filter(function (k) { return PAGES[k].sec === 'insights'; }).sort().map(function (k) { return itemHTML(k, PAGES[k]); }).join('');
  $('#tab-media').innerHTML = MEDIA_GROUPS.map(function (g) {
    return '<h3 class="group-title">' + bi(g.t) + '</h3><p class="group-desc">' + bi(g.d) + '</p>' +
      g.ids.filter(function (i) { return PAGES[i]; }).map(function (i) { return itemHTML(i, PAGES[i]); }).join('');
  }).join('');
}
function refCardHTML(r, full) {
  var q = r.isQuote === false ? bi(r.quote) : '“' + r.quote.en + '”';
  var qq = r.isQuote === false ? bi(r.quote) : '<span class="en">“' + r.quote.en + '”</span><span class="tr">“' + r.quote.tr + '”</span>';
  return '<div class="recognition-card"><strong>' + esc(r.name) + '</strong><div class="role">' + bi(r.role) + '</div>' +
    '<blockquote' + (r.isQuote === false ? ' style="font-style:normal"' : '') + '>' + qq + '</blockquote>' +
    (full && r.note ? '<p class="note">' + bi(r.note) + '</p>' : '') +
    '</div>';
}
function renderRefs() {
  var list = window.REFERENCES || [];
  var home = $('#refs-home');
  if (home) home.innerHTML = list.slice(0, 3).map(function (r) { return refCardHTML(r, false); }).join('');
  var full = $('#refs-full');
  if (full) full.innerHTML = list.map(function (r) { return refCardHTML(r, true); }).join('');
}

/* ---------- routing ---------- */
function updateTitle() {
  var h = location.hash || '#/';
  var m = h.match(/^#\/([^/]+)(?:\/([^/]+))?/);
  var sec = m ? m[1] : '';
  var id = m ? m[2] : '';
  var base = 'barisy — AI Systems Builder';
  if (id && PAGES[id]) {
    var t = PAGES[id].title;
    document.title = (lang === 'tr' ? t.tr : t.en) + ' · barisy';
  } else if (sec && T[lang].tabs[sec]) {
    document.title = T[lang].tabs[sec] + ' · barisy';
  } else document.title = base;
}
function showTab(name) {
  \[ ('.tab').forEach(function (t) { t.classList.toggle('active', t.dataset.tab === name); }); \]('.tab-content').forEach(function (c) { c.classList.toggle('active', c.id === 'tab-' + name); });
  var pv = $('#page-view');
  if (pv) { pv.classList.remove('active'); pv.innerHTML = ''; }
}
function showPage(id) {
  var p = PAGES[id]; if (!p) { showTab('home'); return; }
  showTab(p.sec === 'insights' ? 'home' : p.sec);
  var pv = $('#page-view');
  pv.innerHTML = '<a class="back-link" href="#/' + (p.sec === 'insights' ? '' : p.sec) + '" data-sec="' + p.sec + '"><span class="bl-pre">' + T[lang].back + '</span><span class="en">' + (T.en.tabs[p.sec] || p.sec) + '</span><span class="tr">' + (T.tr.tabs[p.sec] || p.sec) + '</span></a>' +
    '<article class="article">' +
    '<h1 class="pv-title">' + bi(p.title) + '</h1>' +
    (p.date ? '<div class="pv-meta">' + p.date + (p.tag ? ' · ' + p.tag : '') + '</div>' : '') +
    '<div class="pv-body">' + (typeof p.body === 'function' ? p.body() : bi(p.body || { en: '', tr: '' })) + '</div></article>';
  pv.classList.add('active');
  \[ ('.tab-content').forEach(function (c) { c.classList.remove('active'); });
  updateTitle();
  window.scrollTo(0, 0);
}
function route() {
  var h = location.hash || '#/';
  var m = h.match(/^#\/([^/]+)(?:\/([^/]+))?/);
  var sec = (m && m[1]) || '';
  var id = (m && m[2]) || '';
  if (id && PAGES[id]) { showPage(id); return; }
  if (sec === 'work' || sec === 'media' || sec === 'lab' || sec === 'about' || sec === 'contact') showTab(sec);
  else showTab('home');
  updateTitle();
}
window.addEventListener('hashchange', route);

/* ---------- modals ---------- */
function anyModalOpen() { return !!$('.modal-overlay.active'); }
function openModal(id) {
  hideVideo();
  var m = document.getElementById(id); if (!m) return;
  m.classList.add('active');
  if (id === 'videoModal') { var v = $('#demoVideo'); if (!v.getAttribute('src')) v.src = 'assets/mclinic-demo.mp4'; }
}
function closeModal(m) {
  m.classList.remove('active');
  hideVideo();
  var v = m.querySelector('#demoVideo'); if (v) v.pause();
}
document.addEventListener('click', function (e) {
  var o = e.target.closest('[data-open-modal]'); if (o) { openModal(o.dataset.openModal); return; }
  var c = e.target.closest('[data-close-modal]'); if (c) { closeModal(c.closest('.modal-overlay')); return; }
  if (e.target.classList && e.target.classList.contains('modal-overlay')) closeModal(e.target);
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') { \]('.modal-overlay.active').forEach(closeModal); \[ ('.profile-badge.open').forEach(function (b) { b.classList.remove('open'); }); }
});

/* ---------- profile badge ---------- */
var badge = $('.profile-badge');
badge.addEventListener('click', function (e) { if (!e.target.closest('.profile-hover-card')) badge.classList.toggle('open'); });
document.addEventListener('click', function (e) { if (!e.target.closest('.profile-badge')) badge.classList.remove('open'); });

/* ---------- hover video preview ---------- */
var canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
document.documentElement.classList.add(canHover ? 'can-hover' : 'touch');
var style = document.createElement('style');
style.textContent = canHover ? '.touch-only{display:none!important}' : '.hover-only{display:none!important}';
document.head.appendChild(style);

var vpop = $('#vpop'), vvid = $('#vpopVideo'), VSRC = 'assets/feedflow-stack.mp4', vActive = null;
var ASPECT = 1080 / 2316;
function ensureSrc() { if (!vvid.getAttribute('src')) { vvid.src = VSRC; } }
function placeVideo(anchor, mode) {
  var vw = window.innerWidth, vh = window.innerHeight, GAP = 12, M = 8;
  var rootEl = anchor.closest('[data-vroot]') || anchor;
  var r = rootEl.getBoundingClientRect();
  var h = Math.min(380, vh - 2 * M), w;
  var x, y;
  if (mode === 'center') {
    // Center of viewport — large enough to see, keeps Subscribe button usable (vpop is pointer-events:none)
    h = Math.min(420, Math.floor(vh * 0.55));
    w = h * ASPECT;
    x = (vw - w) / 2;
    y = (vh - h) / 2;
  } else if (mode === 'above') {
    var above = r.top - GAP - M, below = vh - r.bottom - GAP - M;
    if (above >= 240) { h = Math.min(h, above); w = h * ASPECT; y = r.top - GAP - h; }
    else if (below >= 240) { h = Math.min(h, below); w = h * ASPECT; y = r.bottom + GAP; }
    else { h = Math.min(h, Math.max(above, below, 160)); w = h * ASPECT; y = M; }
    x = r.left + r.width / 2 - w / 2;
  } else if (mode === 'modal') {
    w = h * ASPECT;
    if (r.right + GAP + w <= vw - M) { x = r.right + GAP; y = r.top + r.height / 2 - h / 2; }
    else if (r.left - GAP - w >= M) { x = r.left - GAP - w; y = r.top + r.height / 2 - h / 2; }
    else { h = Math.min(h, r.top - GAP - M); if (h < 160) { h = Math.min(380, vh - 2 * M); } w = h * ASPECT; x = r.left + r.width / 2 - w / 2; y = Math.max(M, r.top - GAP - h); }
  } else { // item
    w = h * ASPECT; x = r.right - w - 110; y = r.top + r.height / 2 - h / 2;
  }
  x = Math.max(M, Math.min(x, vw - w - M)); y = Math.max(M, Math.min(y, vh - h - M));
  vpop.style.width = w + 'px'; vpop.style.height = h + 'px';
  vpop.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)';
}
function showVideo(anchor) {
  if (vActive === anchor) return;
  if (anyModalOpen() && anchor.dataset.vhover !== 'modal') return;
  vActive = anchor; ensureSrc();
  placeVideo(anchor, anchor.dataset.vhover);
  vpop.classList.add('on');
  try { vvid.currentTime = 0; } catch (e) {}
  var pr = vvid.play(); if (pr && pr.catch) pr.catch(function () {});
}
function hideVideo() {
  if (!vActive && !vpop.classList.contains('on')) return;
  vActive = null; vpop.classList.remove('on'); vvid.pause();
} \]('[data-vhover]').forEach(function (el) {
  if (canHover) {
    el.addEventListener('mouseenter', function () { showVideo(el); });
    el.addEventListener('mouseleave', hideVideo);
    if (el.tabIndex >= 0) { el.addEventListener('focus', function () { showVideo(el); }); el.addEventListener('blur', hideVideo); }
  }
});
// touch: tap on the text area toggles the preview
document.addEventListener('click', function (e) {
  if (canHover) return;
  var t = e.target.closest('[data-vhover]');
  if (t && !e.target.closest('form,button,a,input')) { vActive === t ? hideVideo() : showVideo(t); }
  else if (!e.target.closest('#vpop')) hideVideo();
});
window.addEventListener('scroll', function () { if (vActive) placeVideo(vActive, vActive.dataset.vhover); }, { passive: true });
window.addEventListener('resize', hideVideo);
window.addEventListener('blur', hideVideo);
// warm up the video after load so hover starts instantly
window.addEventListener('load', function () {
  setTimeout(function () { vvid.preload = 'auto'; ensureSrc(); try { vvid.load(); } catch (e) {} }, 1500);
});

/* ---------- subscribe ---------- */
function subscribe(form) {
  var input = form.querySelector('input[type=email]'), msg = form.parentNode.querySelector('.form-msg');
  var email = (input.value || '').trim();
  msg.className = 'form-msg';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { msg.classList.add('err'); msg.textContent = T[lang].bad; input.focus(); return; }
  if (CFG.SUBSCRIBE_ENDPOINT) {
    msg.textContent = T[lang].sending;
    var fd = new FormData(); fd.append('email', email); fd.append('source', 'barisy.org');
    fetch(CFG.SUBSCRIBE_ENDPOINT, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); msg.textContent = T[lang].ok; input.value = ''; })
      .catch(function () { msg.classList.add('err'); msg.textContent = T[lang].fail; });
  } else {
    msg.textContent = T[lang].ok + ' ' + T[lang].mail;
    var to = CFG.SUBSCRIBE_EMAIL_FALLBACK || 'hello@barisy.org';
    location.href = 'mailto:' + to + '?subject=' + encodeURIComponent('Subscribe: newsletter + FeedFlow Stack APK') +
      '&body=' + encodeURIComponent('Please subscribe me and send the FeedFlow Stack APK link.\n\nEmail: ' + email);
  }
}
$$('form[data-subscribe]').forEach(function (f) { f.addEventListener('submit', function (e) { e.preventDefault(); subscribe(f); }); });

/* ---------- 15 s pop-up ---------- */
function tryPopup() {
  if (sGet('barisy_popup_seen')) return;
  if (anyModalOpen() || document.activeElement && document.activeElement.type === 'email') { setTimeout(tryPopup, 5000); return; }
  sSet('barisy_popup_seen', '1');
  openModal('leadModal');
}
setTimeout(tryPopup, CFG.POPUP_DELAY_MS || 15000);

/* ---------- contact form (lazy) ---------- */
var det = $('#contactForm');
det.addEventListener('toggle', function () {
  var f = det.querySelector('iframe');
  if (det.open && !f.getAttribute('src')) f.src = CFG.CONTACT_FORM_URL;
});

/* ---------- init ---------- */
renderLists(); renderRefs();
var saved = sGet('barisy_lang');
setLang(saved === 'tr' || saved === 'en' ? saved : 'en', false);
route();
})();
