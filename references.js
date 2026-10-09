/* =====================================================================
   REFERANSLAR / REFERENCES  —  buradan kolayca yeni referans ekleyebilirsin
   ---------------------------------------------------------------------
   NASIL EKLENİR?
   1) Aşağıdaki "ŞABLON" bloğunu kopyala.
   2) Listenin SONUNA (son kapanış parantezinden önce) yapıştır, virgülle ayır.
   3) Tırnak içindeki metinleri değiştir. Hem 'en' (İngilizce) hem 'tr' (Türkçe)
      alanını doldur. İstemediğin alanı (örn. note) tamamen silebilirsin.
   4) Dosyayı kaydet ve Cloudflare'e yeniden yükle. Referans hem
      "About" sekmesinde hem de "References" alt sayfasında kendiliğinden görünür.

   ALANLAR
     name   : Kişinin adı (dil fark etmez)
     role   : Unvanı / kurumu       {en:'...', tr:'...'}
     quote  : Alıntı (tırnaksız yaz, site ekler)   {en:'...', tr:'...'}
     note   : (isteğe bağlı) Referans sayfasında görünen kısa açıklama
     isQuote: (isteğe bağlı) false yazarsan quote alanı alıntı değil,
              düz açıklama gibi gösterilir.
     link   : (isteğe bağlı) LinkedIn / web adresi

   ŞABLON (kopyala → yapıştır):
   ,{
     name: 'Ad Soyad',
     role:  { en: 'Title · Organisation', tr: 'Unvan · Kurum' },
     quote: { en: 'What they said about my work.', tr: 'Çalışmam hakkında söyledikleri.' },
     note:  { en: 'Short context about the relationship.', tr: 'İlişki hakkında kısa bağlam.' },
     link:  'https://www.linkedin.com/in/...'
   }
   ===================================================================== */
window.REFERENCES = [
  {
    name: 'Dr. Mitra Arami',
    role:  { en: 'Associate Professor in Digital Business & Project Management · EM Normandie Business School',
             tr: 'Dijital İş ve Proje Yönetimi Doçenti · EM Normandie Business School' },
    quote: { en: 'Baris has the vision, discipline, and technical insight to contribute meaningfully to the UK’s digital technology ecosystem. He demonstrated academic excellence and APM award recognition during his MSc studies.',
             tr: 'Baris, Birleşik Krallık’ın dijital teknoloji ekosistemine anlamlı katkıda bulunacak vizyona, disipline ve teknik içgörüye sahip. Yüksek lisans eğitimi sırasında akademik mükemmellik ve APM ödül takdiri sergiledi.' },
    note:  { en: 'Dr. Arami taught Baris during his MSc studies and has followed his work since graduation. She highlights his academic excellence, APM award recognition, and the development of the AI Clinic Assistant as a technically viable and socially impactful solution.',
             tr: 'Dr. Arami, Baris’e yüksek lisans eğitimi sırasında ders verdi ve mezuniyetinden bu yana çalışmalarını takip ediyor. Akademik başarısını, APM ödül takdirini ve AI Clinic Assistant’ın teknik olarak uygulanabilir ve toplumsal etkisi yüksek bir çözüm olarak geliştirilmesini öne çıkarıyor.' }
  },
  {
    name: 'Prof. Tim Rocktäschel',
    role:  { en: 'Professor of AI at UCL · Principal Scientist at Google DeepMind',
             tr: 'UCL Yapay Zekâ Profesörü · Google DeepMind Baş Bilim İnsanı' },
    quote: { en: 'His design choices reflect a practical and scalable solution to real-world problems in the healthcare sector, showing strong technical merit and practical scalability.',
             tr: 'Tasarım tercihleri, sağlık sektöründeki gerçek dünya sorunlarına pratik ve ölçeklenebilir bir çözümü yansıtıyor; güçlü teknik değer ve pratik ölçeklenebilirlik gösteriyor.' },
    note:  { en: 'Although he hasn’t worked directly with Baris, Prof. Rocktäschel reviewed his AI project and confirmed its scalability and technical merit, emphasizing its alignment with healthcare transformation goals.',
             tr: 'Baris ile doğrudan çalışmamış olsa da Prof. Rocktäschel yapay zekâ projesini inceledi; ölçeklenebilirliğini ve teknik değerini, sağlık dönüşümü hedefleriyle uyumunu vurgulayarak doğruladı.' }
  },
  {
    name: 'Prof. Patrick Healey',
    role:  { en: 'Director, Centre for Human-Centered Computing · Queen Mary University of London',
             tr: 'İnsan Merkezli Bilişim Merkezi Direktörü · Queen Mary University of London' },
    quote: { en: 'Baris’s work demonstrates both technical awareness and a user-centric design philosophy with practical integration and potential benefit in NHS-like systems.',
             tr: 'Baris’in çalışması hem teknik farkındalığı hem de kullanıcı odaklı bir tasarım felsefesini; NHS benzeri sistemlerde pratik entegrasyon ve olası fayda ile birlikte gösteriyor.' },
    note:  { en: 'Prof. Healey reviewed the AI Clinic Assistant demo and endorsed its innovative use of voice AI in healthcare. He praises its practical integration and potential benefit in NHS-like systems.',
             tr: 'Prof. Healey, AI Clinic Assistant demosunu inceledi ve sağlıkta sesli yapay zekânın yenilikçi kullanımını onayladı. Pratik entegrasyonunu ve NHS benzeri sistemlerdeki potansiyel faydasını övüyor.' }
  },
  {
    name: 'Prof. Ibrahim Aydoğdu',
    role:  { en: 'Academic Mentor', tr: 'Akademik Mentor' },
    isQuote: false,
    quote: { en: 'Academic guidance and ongoing mentorship across system engineering initiatives.',
             tr: 'Sistem mühendisliği girişimleri boyunca akademik rehberlik ve süregelen mentorluk.' }
  },
  {
    name: 'Dr. Haydar Bolat',
    role:  { en: 'Clinic Owner & GP · First Clinical Pilot Partner',
             tr: 'Klinik Sahibi ve Aile Hekimi · İlk Klinik Pilot Ortağı' },
    quote: { en: 'We’ve piloted the voice assistant system created by Baris in a clinical setting. The system has performed seamlessly, and we’re excited to see its continued development and deployment.',
             tr: 'Baris’in oluşturduğu sesli asistan sistemini klinik bir ortamda pilot olarak uyguladık. Sistem kusursuz çalıştı; gelişimini ve devreye alınmasını görmek için heyecanlıyız.' },
    note:  { en: 'First medical practitioner partner deploying live AI receptionist prototypes in clinical environments.',
             tr: 'Canlı yapay zekâ resepsiyonist prototiplerini klinik ortamlarda devreye alan ilk hekim ortak.' }
  }
];
