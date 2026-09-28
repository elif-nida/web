/*
 * ============================================================
 *  SİTENİN TÜM İÇERİĞİ BU DOSYADA
 *  Sadece burayı düzenleyerek sitenizi kişiselleştirebilirsiniz.
 *  İki dilli alanlar { tr: "...", en: "..." } şeklindedir.
 * ============================================================
 */
const SITE_DATA = {
  profile: {
    name: "Elif Nida",
    initials: "EN",
    title: { tr: "Full-Stack Geliştirici", en: "Full-Stack Developer" },
    // Hero bölümünde sırayla yazılıp silinen unvanlar
    roles: {
      tr: ["Full-Stack Geliştirici", "Frontend Tutkunu", "Problem Çözücü"],
      en: ["Full-Stack Developer", "Frontend Enthusiast", "Problem Solver"],
    },
    tagline: {
      tr: "Kullanıcı odaklı, hızlı ve erişilebilir web uygulamaları geliştiriyorum. Temiz kod, iyi dokümantasyon ve ekip çalışmasına önem veririm.",
      en: "I build user-focused, fast and accessible web applications. I care about clean code, good documentation and teamwork.",
    },
    location: { tr: "İstanbul, Türkiye", en: "Istanbul, Türkiye" },
    // İş arayışında olduğunuzu gösteren rozet. Gizlemek için false yapın.
    openToWork: true,
    email: "ornek@eposta.com",
    cv: "assets/cv.pdf", // CV'nizi assets/cv.pdf olarak ekleyin
    // İletişim formu için (isteğe bağlı): https://formspree.io adresinden ücretsiz endpoint alın
    formEndpoint: "", // Örn: "https://formspree.io/f/xxxxxxx"
    photo: "", // Örn: "assets/profil.jpg" — boş bırakılırsa baş harfler gösterilir
    socials: {
      github: "https://github.com/elif-nida",
      linkedin: "https://www.linkedin.com/in/kullanici-adiniz",
      // twitter: "https://x.com/kullanici-adiniz",
      // medium: "https://medium.com/@kullanici-adiniz",
    },
    // GitHub istatistikleri bu kullanıcı adından canlı çekilir
    githubUsername: "elif-nida",
  },

  about: {
    paragraphs: {
      tr: [
        "Merhaba! Yazılım geliştirmeye olan ilgim, bir problemi adım adım çözmenin verdiği keyifle başladı. Bugün modern web teknolojileriyle uçtan uca ürünler geliştiriyorum.",
        "Yeni teknolojileri öğrenmeyi, açık kaynak projelere katkı vermeyi ve öğrendiklerimi paylaşmayı seviyorum. Ölçülebilir etki yaratan, kullanıcı deneyimini iyileştiren işler üzerinde çalışmak beni motive ediyor.",
      ],
      en: [
        "Hi! My interest in software began with the joy of solving a problem step by step. Today I build end-to-end products with modern web technologies.",
        "I love learning new technologies, contributing to open source and sharing what I learn. I'm motivated by work that creates measurable impact and improves user experience.",
      ],
    },
    // Öne çıkan sayılar — işe alımcıların ilk baktığı yer
    highlights: [
      { value: "2+", label: { tr: "Yıl deneyim", en: "Years experience" } },
      { value: "15+", label: { tr: "Tamamlanan proje", en: "Projects completed" } },
      { value: "5", label: { tr: "Sertifika", en: "Certifications" } },
    ],
  },

  skills: [
    {
      category: { tr: "Frontend", en: "Frontend" },
      items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      category: { tr: "Backend", en: "Backend" },
      items: ["Node.js", "Express", "Python", "Django", "REST API", "GraphQL"],
    },
    {
      category: { tr: "Veritabanı", en: "Database" },
      items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    },
    {
      category: { tr: "Araçlar & DevOps", en: "Tools & DevOps" },
      items: ["Git", "GitHub Actions", "Docker", "Linux", "Figma", "Jest"],
    },
  ],

  experience: [
    {
      role: { tr: "Frontend Geliştirici", en: "Frontend Developer" },
      company: "Şirket Adı",
      period: { tr: "2024 — Günümüz", en: "2024 — Present" },
      bullets: {
        tr: [
          "React ve TypeScript ile müşteri paneli geliştirdim; sayfa yüklenme süresini %40 azalttım.",
          "Ortak bileşen kütüphanesi oluşturarak ekip genelinde geliştirme süresini kısalttım.",
          "Birim ve entegrasyon testleriyle kod kapsamını %30'dan %80'e çıkardım.",
        ],
        en: [
          "Built a customer dashboard with React and TypeScript; reduced page load time by 40%.",
          "Created a shared component library, shortening development time across the team.",
          "Raised code coverage from 30% to 80% with unit and integration tests.",
        ],
      },
      tech: ["React", "TypeScript", "Jest"],
    },
    {
      role: { tr: "Yazılım Stajyeri", en: "Software Engineering Intern" },
      company: "Staj Yapılan Şirket",
      period: { tr: "Haz 2023 — Eyl 2023", en: "Jun 2023 — Sep 2023" },
      bullets: {
        tr: [
          "Node.js ile iç kullanım için REST API servisleri geliştirdim.",
          "Agile/Scrum süreçlerinde sprint planlama ve kod incelemelerine katıldım.",
        ],
        en: [
          "Developed internal REST API services with Node.js.",
          "Took part in sprint planning and code reviews in an Agile/Scrum team.",
        ],
      },
      tech: ["Node.js", "Express", "PostgreSQL"],
    },
  ],

  // category: filtre butonlarında kullanılır (web, mobile, data, tool ...)
  projects: [
    {
      title: "E-Ticaret Platformu",
      description: {
        tr: "Sepet, ödeme entegrasyonu ve yönetim paneli içeren tam kapsamlı e-ticaret uygulaması.",
        en: "Full-featured e-commerce app with cart, payment integration and admin panel.",
      },
      category: "web",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      github: "https://github.com/elif-nida/proje-1",
      demo: "https://ornek-demo.com",
      featured: true,
    },
    {
      title: "Görev Yönetim Uygulaması",
      description: {
        tr: "Sürükle-bırak destekli, gerçek zamanlı senkronize çalışan Kanban tahtası.",
        en: "Real-time synced Kanban board with drag-and-drop support.",
      },
      category: "web",
      tech: ["React", "Firebase", "Tailwind CSS"],
      github: "https://github.com/elif-nida/proje-2",
      demo: "",
      featured: true,
    },
    {
      title: "Veri Analizi Paneli",
      description: {
        tr: "Açık veri setlerini görselleştiren ve trend analizi yapan interaktif panel.",
        en: "Interactive dashboard that visualizes open datasets and analyzes trends.",
      },
      category: "data",
      tech: ["Python", "Pandas", "Plotly"],
      github: "https://github.com/elif-nida/proje-3",
      demo: "",
      featured: false,
    },
    {
      title: "CLI Not Asistanı",
      description: {
        tr: "Terminalden hızlı not almayı ve etiketle aramayı sağlayan komut satırı aracı.",
        en: "Command-line tool for quick note-taking and tag-based search from the terminal.",
      },
      category: "tool",
      tech: ["Node.js", "SQLite"],
      github: "https://github.com/elif-nida/proje-4",
      demo: "",
      featured: false,
    },
  ],

  education: [
    {
      school: "Üniversite Adı",
      degree: { tr: "Bilgisayar Mühendisliği, Lisans", en: "B.Sc. Computer Engineering" },
      period: "2020 — 2024",
      note: { tr: "GNO: 3.40 / 4.00", en: "GPA: 3.40 / 4.00" },
    },
  ],

  certificates: [
    { name: "Meta Front-End Developer", issuer: "Coursera", year: "2024", url: "" },
    { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024", url: "" },
    { name: "Responsive Web Design", issuer: "freeCodeCamp", year: "2023", url: "" },
  ],

  languages: [
    { name: { tr: "Türkçe", en: "Turkish" }, level: { tr: "Ana dil", en: "Native" } },
    { name: { tr: "İngilizce", en: "English" }, level: { tr: "İleri (C1)", en: "Advanced (C1)" } },
  ],
};
