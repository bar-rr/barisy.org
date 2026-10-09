/* =====================================================================
   SİTE AYARLARI — burayı sadece gerektiğinde değiştir
   ===================================================================== */
window.SITE_CONFIG = {
  // Bülten formunun e-postaları nereye gideceği.
  //  - BOŞ bırakırsan: ziyaretçinin e-posta uygulaması "abone et" mesajıyla açılır
  //    (hello@barisy.org adresine). Çalışır ama sade bir çözümdür.
  //  - Formspree, Brevo (Sendinblue) formu vb. bir adres yazarsan form orada kaydolur.
  //    Örn: 'https://formspree.io/f/xxxxxxxx'
  SUBSCRIBE_ENDPOINT: '',
  SUBSCRIBE_EMAIL_FALLBACK: 'hello@barisy.org',

  // Pop-up kaç milisaniye sonra açılsın (15000 = 15 saniye)
  POPUP_DELAY_MS: 15000,

  // Site içinde çalışan PDFCraft aracının adresi
  PDFCRAFT_URL: 'https://pdfcraft-2302a.web.app/',

  // Contact sekmesindeki Google Form (eski siteden taşındı)
  CONTACT_FORM_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSd8xK5UmbCsC4CwROJGHWmHpyQCYLq-XCyqkLUzEJiiI-od4w/viewform?embedded=true'
};
