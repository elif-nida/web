/*
 * ============================================================
 *  SİTENİN TÜM İÇERİĞİ BU DOSYADA
 *  Sadece burayı düzenleyerek sitenizi kişiselleştirebilirsiniz.
 *  İki dilli alanlar { tr: "...", en: "..." } şeklindedir.
 * ============================================================
 */
const SITE_DATA = {
  profile: {
    name: "Elif Nida Şölen",
    initials: "EN",
    title: { tr: "Bilgisayar Mühendisi", en: "Computer Engineer" },
    // Hero bölümünde sırayla yazılıp silinen unvanlar
    roles: {
      tr: ["Bilgisayar Mühendisi", "Full-Stack Geliştirici", "Backend & API Geliştirici"],
      en: ["Computer Engineer", "Full-Stack Developer", "Backend & API Developer"],
    },
    tagline: {
      tr: "Python, Flask ve GraphQL ile API'ler geliştiriyor; yazılım geliştirme ile proje ve planlama süreçlerini bir araya getiriyorum. Barselona'da uluslararası bir ekipte full-stack staj deneyimim var.",
      en: "I build APIs with Python, Flask and GraphQL, bridging software development with project and planning processes. I gained full-stack experience in an international team in Barcelona.",
    },
    location: { tr: "Konya, Türkiye", en: "Konya, Türkiye" },
    // İş arayışında olduğunuzu gösteren rozet. Gizlemek için false yapın.
    openToWork: true,
    email: "nidaaasolen@gmail.com",
    cv: "assets/cv.pdf",
    // İletişim formu için (isteğe bağlı): https://formspree.io adresinden ücretsiz endpoint alın
    formEndpoint: "", // Örn: "https://formspree.io/f/xxxxxxx"
    photo: "assets/profil.jpg", // Boş bırakılırsa baş harfler gösterilir
    socials: {
      github: "https://github.com/elif-nida",
      linkedin: "https://www.linkedin.com/in/nida-%C5%9F%C3%B6len/", // nida-şölen
    },
    // GitHub istatistikleri bu kullanıcı adından canlı çekilir
    githubUsername: "elif-nida",
  },

  about: {
    paragraphs: {
      tr: [
        "Konya Gıda ve Tarım Üniversitesi'nde %100 İngilizce Bilgisayar Mühendisliği bölümünden mezun oldum; aynı zamanda Endüstri Mühendisliği yan dal programını tamamladım.",
        "Yazılım geliştirme ve proje yönetimi alanlarına ilgi duyuyor, akademik ve profesyonel projeler aracılığıyla her iki alanda da uygulamalı deneyim kazanıyorum. Pratik çözümler geliştirmekten, ekiplerle iş birliği yapmaktan ve sürekli yeni şeyler öğrenmekten keyif alıyorum.",
      ],
      en: [
        "I graduated from Konya Food and Agriculture University's Computer Engineering program (100% English) and also completed a minor in Industrial Engineering.",
        "I'm interested in software development and project management, and I gain hands-on experience in both through academic and professional projects. I enjoy building practical solutions, collaborating with teams and constantly learning new things.",
      ],
    },
    // Öne çıkan bilgiler — işe alımcıların ilk baktığı yer
    highlights: [
      { value: "3", label: { tr: "Kurumda iş ve staj deneyimi", en: "Companies worked at" } },
      { value: "9 ay", label: { tr: "Yurt dışı staj (Barselona)", en: "Internship abroad (Barcelona)" } },
      { value: "C1", label: { tr: "İngilizce", en: "English" } },
    ],
  },

  skills: [
    {
      category: { tr: "Programlama & Web", en: "Programming & Web" },
      items: ["Python", "JavaScript", "PHP", "HTML", "CSS", "SQL", "C", "C++", "Java", "C# (.NET)"],
    },
    {
      category: { tr: "API & Backend", en: "API & Backend" },
      items: ["Flask", "REST API", "GraphQL (Ariadne)", "Kimlik doğrulama / Auth", "MySQL", "Postman"],
    },
    {
      category: { tr: "Mobil & Low-code", en: "Mobile & Low-code" },
      items: ["FlutterFlow", "Responsive tasarım", "Form doğrulama"],
    },
    {
      category: { tr: "DevOps & Araçlar", en: "DevOps & Tools" },
      items: ["Kubernetes", "kubeconfig", "OIDC", "Git", "VS Code", "XAMPP / Apache"],
    },
    {
      category: { tr: "Planlama & Raporlama", en: "Planning & Reporting" },
      items: ["IFS ERP", "Microsoft Excel", "VBA", "Microsoft Office"],
    },
  ],

  experience: [
    {
      role: { tr: "Planlama Mühendisi", en: "Planning Engineer" },
      company: "Şimşek Plastik",
      period: { tr: "Eyl 2025 — Şub 2026", en: "Sep 2025 — Feb 2026" },
      bullets: {
        tr: [
          "Üretim ve planlama süreçlerinin takibinde görev aldım.",
          "IFS ERP sistemi üzerinden planlama ve operasyon süreçlerinde çalıştım.",
          "Excel kullanarak veri takibi, raporlama ve planlama çalışmalarını gerçekleştirdim.",
        ],
        en: [
          "Tracked production and planning processes.",
          "Worked on planning and operations processes in the IFS ERP system.",
          "Handled data tracking, reporting and planning with Excel.",
        ],
      },
      tech: ["IFS ERP", "Excel", "VBA"],
    },
    {
      role: { tr: "Full Stack Developer Stajyeri", en: "Full Stack Developer Intern" },
      company: "Proceedit (BPaaS) · Barselona, İspanya",
      period: { tr: "Ağu 2024 — May 2025", en: "Aug 2024 — May 2025" },
      bullets: {
        tr: [
          "Model-Based Testing (MBT) web uygulamasının geliştirilmesinde full-stack stajyer olarak çalıştım.",
          "Python ve Flask ile REST ve GraphQL (Ariadne) API'leri geliştirdim.",
          "FlutterFlow arayüzlerini Flask tabanlı kimlik doğrulama servisleriyle entegre ederek Sign In / Sign Up işlevlerini geliştirdim.",
          "FlutterFlow ile kullanıcı deneyimi ve responsive tasarıma odaklanan arayüzler geliştirdim.",
          "Üretim kümesindeki Kubernetes pod ve servisleriyle çalıştım; güvenli iletişim için kubeconfig ve OIDC giriş yapılandırmasını gerçekleştirdim.",
          "Postman ve terminal araçlarıyla API testleri ve hata ayıklama yaptım; çevik ekip toplantılarında geliştirme, tasarım ve altyapı ekipleriyle iş birliği yaptım.",
        ],
        en: [
          "Worked as a full-stack intern on a Model-Based Testing (MBT) web application.",
          "Developed REST and GraphQL (Ariadne) APIs with Python and Flask.",
          "Built Sign In / Sign Up flows by integrating FlutterFlow with Flask-based authentication services.",
          "Designed FlutterFlow interfaces focused on user experience and responsive design.",
          "Worked with Kubernetes pods and services in the production cluster; configured kubeconfig and OIDC login for secure communication.",
          "Tested and debugged APIs with Postman and terminal tools; collaborated with development, design and infrastructure teams in agile meetings.",
        ],
      },
      tech: ["Python", "Flask", "GraphQL", "FlutterFlow", "Kubernetes", "OIDC", "Postman"],
    },
    {
      role: { tr: "Web Geliştirici Stajyeri", en: "Web Developer Intern" },
      company: "Konya Büyükşehir Belediyesi",
      period: { tr: "Tem 2023 — Ağu 2023", en: "Jul 2023 — Aug 2023" },
      bullets: {
        tr: [
          "PHP ile web tabanlı bir yazılım envanter sistemi geliştirdim ve belediyenin kullanımına sundum.",
          "XAMPP (Apache, MySQL, PHP) ile geliştirme ortamı kurdum; Apache sunucusunu yapılandırıp MySQL veritabanlarını yönettim.",
          "Kayıt ekleme ve güncelleme için kullanıcı dostu formlar tasarladım; sunucu tarafı mantığını ön yüzle entegre ettim.",
          "Projeyi gerçek iş akışlarıyla uyumlu hale getirmek için belediyenin BT ekibiyle birlikte çalıştım.",
        ],
        en: [
          "Built a web-based software inventory system in PHP, now used by the municipality.",
          "Set up a XAMPP (Apache, MySQL, PHP) environment, configured Apache and managed MySQL databases.",
          "Designed user-friendly forms for adding and updating records and integrated server-side logic with the front end.",
          "Worked with the municipality's IT team to align the project with real business workflows.",
        ],
      },
      tech: ["PHP", "MySQL", "Apache", "HTML", "CSS"],
    },
  ],

  // category: filtre butonlarında kullanılır (web, mobile, data, tool ...)
  // GitHub'a yüklediğiniz projeleri buraya ekleyin; github/demo alanları boşsa bağlantı gösterilmez.
  projects: [
    {
      title: { tr: "MBT Uygulaması — Kimlik Doğrulama & API", en: "MBT App — Authentication & APIs" },
      description: {
        tr: "Proceedit'in Model-Based Testing web uygulaması için Flask tabanlı REST/GraphQL API'leri ve FlutterFlow ile entegre Sign In / Sign Up akışı.",
        en: "Flask-based REST/GraphQL APIs and a Sign In / Sign Up flow integrated with FlutterFlow for Proceedit's Model-Based Testing web app.",
      },
      category: "web",
      tech: ["Python", "Flask", "GraphQL", "FlutterFlow", "Kubernetes"],
      github: "",
      demo: "",
      featured: true,
    },
    {
      title: { tr: "Yazılım Envanter Sistemi", en: "Software Inventory System" },
      description: {
        tr: "Konya Büyükşehir Belediyesi için geliştirilen, yazılım kayıtlarının eklenip güncellendiği web tabanlı envanter sistemi. Belediyede kullanıma alındı.",
        en: "Web-based inventory system for adding and updating software records, built for Konya Metropolitan Municipality and put into use.",
      },
      category: "web",
      tech: ["PHP", "MySQL", "Apache", "HTML", "CSS"],
      github: "",
      demo: "",
      featured: true,
    },
    {
      title: { tr: "Kişisel Portföy Sitesi", en: "Personal Portfolio Website" },
      description: {
        tr: "Bu site: iki dilli, açık/koyu temalı, canlı GitHub istatistikleri gösteren ve yazdırıldığında CV'ye dönüşen, kütüphanesiz bir portföy.",
        en: "This site: a bilingual, dependency-free portfolio with light/dark themes, live GitHub stats and a print-to-CV layout.",
      },
      category: "web",
      tech: ["HTML", "CSS", "JavaScript", "GitHub Actions"],
      github: "https://github.com/elif-nida/web",
      demo: "",
      featured: false,
    },
  ],

  education: [
    {
      school: "Konya Gıda ve Tarım Üniversitesi",
      degree: { tr: "Bilgisayar Mühendisliği, Lisans (%100 İngilizce)", en: "B.Sc. Computer Engineering (100% English)" },
      period: "2020 — 2025",
      note: { tr: "Endüstri Mühendisliği yan dal (%100 İngilizce)", en: "Minor in Industrial Engineering (100% English)" },
    },
  ],

  // Sertifikanız olduğunda ekleyin: { name: "...", issuer: "...", year: "2025", url: "" }
  certificates: [],

  volunteering: [
    {
      title: { tr: "Gönüllü Tercüman ve Rehber", en: "Volunteer Interpreter & Guide" },
      place: { tr: "Konya'daki uluslararası etkinlikler", en: "International events in Konya" },
      description: {
        tr: "Uluslararası Belediye Başkanları Toplantısı'nda görev aldım; şehir maratonları ve diğer büyük ölçekli etkinliklerde yabancı misafirlere destek sağlıyorum.",
        en: "Served at the International Mayors' Meeting; I support foreign guests at city marathons and other large-scale events.",
      },
    },
  ],

  languages: [
    { name: { tr: "Türkçe", en: "Turkish" }, level: { tr: "Ana dil", en: "Native" } },
    { name: { tr: "İngilizce", en: "English" }, level: { tr: "İleri (C1)", en: "Advanced (C1)" } },
  ],
};
