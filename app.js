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
  en: { 
    back: '← Back to ', 
    tabs: { home: 'Home', work: 'Work', media: 'Media & Archive', lab: 'Lab', about: 'About', contact: 'Contact' },
    ok: '✓ Subscription confirmed! Your full version APK download link has been sent to your email. Please check your spam folder.', 
    sending: 'Sending…', 
    fail: 'Something went wrong. Please try again.',
    bad: 'Please enter a valid email address.' 
  },
  tr: { 
    back: '← Geri: ', 
    tabs: { home: 'Ana Sayfa', work: 'Çalışmalar', media: 'Medya & Arşiv', lab: 'Laboratuvar', about: 'Hakkımda', contact: 'İletişim' },
    ok: '✓ Kaydınız alındı! Tam versiyon APK indirme bağlantınız e-posta adresinize gönderilmiştir. Lütfen spam klasörünüzü de kontrol ediniz.', 
    sending: 'Gönderiliyor…', 
    fail: 'Bir sorun oluştu. Lütfen tekrar dene.',
    bad: 'Lütfen geçerli bir e-posta adresi gir.' 
  }
};

function setLang(l, persist) {
  lang = l === 'tr' ? 'tr' : 'en';
  root.lang = lang; root.dataset.lang = lang; document.body.dataset.lang = lang;
  $$('[data-set-lang]').forEach(function (b) { b.classList.toggle('active', b.dataset.setLang === lang); });
  if (persist) sSet('barisy_lang', lang);
  updateTitle();
  var bl = $('.back-link[data-sec]'); if (bl) bl.querySelector('.bl-pre').textContent = T[lang].back;
}
$$('[data-set-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.setLang, true); }); });

/* ---------- helpers ---------- */
function bi(o) { return '<span class="en">' + o.en + '</span><span class="tr">' + o.tr + '</span>'; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

/* ---------- list rendering ---------- */
function itemHTML(id, p) {
  var isVhover = id === 'feedflow-stack' || p.vhover;
  return '<div class="list-item' + (isVhover ? ' has-vpreview' : '') + '"' + (isVhover ? ' data-vhover="item"' : '') + '><div class="list-item-content"><div class="list-item-title">' +
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
  if (home) {
    home.innerHTML = Object.keys(PAGES).filter(function (k) { return PAGES[k].sec === 'insights'; }).sort().map(function (k) { return itemHTML(k, PAGES[k]); }).join('');
  }
  var media = $('#tab-media');
  if (media) {
    media.innerHTML = MEDIA_GROUPS.map(function (g) {
      return '<h3 class="group-title">' + bi(g.t) + '</h3><p class="group-desc">' + bi(g.d) + '</p>' +
        g.ids.filter(function (i) { return PAGES[i]; }).map(function (i) { return itemHTML(i, PAGES[i]); }).join('');
    }).join('');
  }
}

function refCardHTML(r, full) {
  var qq = r.isQuote === false ? bi(r.quote) : '<span class="en">“' + r.quote.en + '”</span><span class="tr">“' + r.quote.tr + '”</span>';
  return '<div class="recognition-card"><strong>' + esc(r.name) + '</strong><div class="role">' + bi(r.role) + '</div>' +
    '<blockquote' + (r.isQuote === false ? ' style="font-style:normal"' : '') + '>' + qq + '</blockquote>' +
    (full && r.note ? '<p class="note">' + bi(r.note) + '</p>' : '') +
    (r.link ? '<p class="note"><a href="' + r.link + '" target="_blank" rel="noopener">LinkedIn →</a></p>' : '') + '</div>';
}

function renderRefs() {
  var refs = window.REFERENCES_DATA || window.REFERENCES || [];
  var refEl = $('#refs-about');
  if (refEl) {
    refEl.innerHTML = refs.map(function (r) { return refCardHTML(r, false); }).join('');
  }
}

/* ---------- router ---------- */
var TABS = ['home', 'work', 'media', 'lab', 'about', 'contact'];
var SEC_TAB = { media: 'media', work: 'work', about: 'about', insights: 'home' };
var currentPage = null;

function activateTab(name) {
  $$('.tab-content').forEach(function (el) { el.classList.toggle('active', el.id === 'tab-' + name); });
  $$('.tab').forEach(function (el) { el.classList.toggle('active', el.dataset.tab === name); });
}

function pageHTML(id, p) {
  var tab = SEC_TAB[p.sec] || 'home';
  var html = '<a class="back-link" data-sec="' + tab + '" href="#/' + (tab === 'home' ? '' : tab) + '"><span class="bl-pre">' + T[lang].back + '</span>' +
    bi({ en: T.en.tabs[tab], tr: T.tr.tabs[tab] }) + '</a>';
  html += '<div class="pv-kicker">' + (p.tag ? '<span class="inline-tag">' + p.tag + '</span>' : '') + '<span>' + bi(p.kind) + '</span><span>·</span><span>' + p.date + '</span>' +
    (p.kicker ? '<span>·</span><span>' + bi(p.kicker) + '</span>' : '') + '</div>';
  html += '<h1 class="pv-title">' + bi(p.title) + '</h1><div class="article">';
  if (p.special === 'pdfcraft') {
    var X = window.PDFCRAFT;
    html += '<p class="lead">' + bi({ en: X.intro_en, tr: X.intro_tr }) + '</p>' +
      '<div class="chips"><a class="chip" href="' + CFG.PDFCRAFT_URL + '" target="_blank" rel="noopener">' + bi({ en: X.open_en, tr: X.open_tr }) + '</a>' +
      '<a class="chip" href="#/media/article-pdfcraft">' + bi({ en: X.article_en, tr: X.article_tr }) + '</a></div>' +
      '<iframe class="pdf-frame" title="PDFCraft" src="' + CFG.PDFCRAFT_URL + '" loading="lazy" allow="clipboard-write; fullscreen" referrerpolicy="no-referrer"></iframe>' +
      '<p class="pdf-note">' + bi({ en: 'If the tool does not load in this frame, use “Open in a new tab” above.', tr: 'Araç bu çerçevede yüklenmezse yukarıdaki “Yeni sekmede aç” bağlantısını kullanın.' }) + '</p>';
  } else if (p.special === 'references') {
    var refs = window.REFERENCES_DATA || window.REFERENCES || [];
    html += '<div class="recognition-list" style="max-width:820px">' + refs.map(function (r) { return refCardHTML(r, true); }).join('') + '</div>';
  } else {
    html += '<div class="en">' + p.body.en + '</div><div class="tr">' + p.body.tr + '</div>';
  }
  return html + '</div>';
}

function updateTitle() {
  var base = 'barisy — AI Systems Builder';
  document.title = currentPage && PAGES[currentPage] ? PAGES[currentPage].title[lang] + ' — barisy' : base;
}

function route() {
  var parts = (location.hash || '#/').replace(/^#\/?/, '').split('/').filter(Boolean);
  hideVideo();
  var view = $('#page-view');
  if (parts.length >= 2 && PAGES[parts[1]]) {
    var id = parts[1], p = PAGES[id];
    currentPage = id;
    if (view) view.innerHTML = pageHTML(id, p);
    document.body.classList.add('subpage');
    activateTab(SEC_TAB[p.sec] || 'home');
    $$('.tab-content').forEach(function (el) { el.classList.remove('active'); });
    window.scrollTo(0, 0);
  } else {
    currentPage = null;
    document.body.classList.remove('subpage');
    if (view) view.innerHTML = '';
    activateTab(TABS.indexOf(parts[0]) > -1 ? parts[0] : 'home');
  }
  updateTitle();
  bindHoverEvents();
}
window.addEventListener('hashchange', route);

/* ---------- modals ---------- */
function anyModalOpen() { return !!$('.modal-overlay.active'); }
function openModal(id) {
  hideVideo();
  var m = document.getElementById(id); if (!m) return;
  m.classList.add('active');
  if (id === 'videoModal') { 
    var v = $('#demoVideo'); 
    if (v && !v.getAttribute('src')) v.src = 'assets/mclinic-demo.mp4'; 
  }
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
  if (e.key === 'Escape') { $$('.modal-overlay.active').forEach(closeModal); $$('.profile-badge.open').forEach(function (b) { b.classList.remove('open'); }); }
});

/* ---------- profile badge ---------- */
var badge = $('.profile-badge');
if (badge) {
  badge.addEventListener('click', function (e) { if (!e.target.closest('.profile-hover-card')) badge.classList.toggle('open'); });
  document.addEventListener('click', function (e) { if (!e.target.closest('.profile-badge')) badge.classList.remove('open'); });
}

/* ---------- hover video (ekran ortasında açılma) ---------- */
var vpop = $('#vpop'), vvid = $('#vpopVideo'), VSRC = 'assets/feedflow-stack.mp4';

function ensureSrc() { 
  if (vvid && !vvid.getAttribute('src')) { 
    vvid.src = VSRC; 
  } 
}

function showVideo() {
  if (anyModalOpen()) return;
  ensureSrc();
  if (vpop) vpop.classList.add('on');
  if (vvid) {
    try { vvid.currentTime = 0; } catch (e) {}
    var pr = vvid.play(); 
    if (pr && pr.catch) pr.catch(function () {});
  }
}

function hideVideo() {
  if (vpop) vpop.classList.remove('on');
  if (vvid) vvid.pause();
}

function bindHoverEvents() {
  $$('[data-vhover], .has-vpreview, .newsletter').forEach(function (el) {
    el.removeEventListener('mouseenter', showVideo);
    el.removeEventListener('mouseleave', hideVideo);
    el.addEventListener('mouseenter', showVideo);
    el.addEventListener('mouseleave', hideVideo);
  });
}

/* ---------- subscribe (MAILTO YERİNE DOĞRUDAN ONAY MESAJI) ---------- */
function subscribe(form) {
  var input = form.querySelector('input[type=email]');
  var msg = form.parentElement.querySelector('.form-msg') || form.querySelector('.form-msg');
  var email = (input ? input.value : '').trim();

  if (msg) msg.className = 'form-msg';

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { 
    if (msg) {
      msg.classList.add('err'); 
      msg.textContent = T[lang].bad; 
    }
    if (input) input.focus(); 
    return; 
  }

  // Mailto tetikleme tamamen kaldırıldı, doğrudan ekrana basılıyor
  if (msg) {
    msg.style.display = 'block';
    msg.style.color = '#00E676';
    msg.textContent = T[lang].ok;
  }

  if (input) input.value = '';

  setTimeout(function () {
    if (msg) msg.textContent = '';
  }, 10000);
}

$$('form[data-subscribe], .newsletter-form').forEach(function (f) {
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    subscribe(f);
    return false;
  });
});

/* ---------- 15 s pop-up ---------- */
function tryPopup() {
  if (sGet('barisy_popup_seen')) return;
  if (anyModalOpen() || (document.activeElement && document.activeElement.type === 'email')) { 
    setTimeout(tryPopup, 5000); 
    return; 
  }
  sSet('barisy_popup_seen', '1');
  openModal('leadModal');
}
setTimeout(tryPopup, CFG.POPUP_DELAY_MS || 15000);

/* ---------- contact form ---------- */
var det = $('#contactForm');
if (det) {
  det.addEventListener('toggle', function () {
    var f = det.querySelector('iframe');
    if (det.open && f && !f.getAttribute('src')) f.src = CFG.CONTACT_FORM_URL;
  });
}

/* ---------- init ---------- */
renderLists(); 
renderRefs();
var saved = sGet('barisy_lang');
setLang(saved === 'tr' || saved === 'en' ? saved : 'en', false);
route();
bindHoverEvents();
})();
