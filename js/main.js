/* ============================================================
   Portföy — ana betik
   İçerik js/data.js dosyasından okunur; burayı değiştirmeniz gerekmez.
   ============================================================ */
(() => {
  "use strict";

  const D = SITE_DATA;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // ---------- Arayüz metinleri (TR / EN) ----------
  const UI = {
    tr: {
      skip: "İçeriğe geç",
      "nav.about": "Hakkımda", "nav.skills": "Yetenekler", "nav.experience": "Deneyim",
      "nav.projects": "Projeler", "nav.education": "Eğitim", "nav.contact": "İletişim",
      "hero.open": "Yeni fırsatlara açığım", "hero.hi": "Merhaba, ben",
      "hero.cta_projects": "Projelerimi Gör", "hero.cta_cv": "CV İndir",
      "gh.title": "GitHub Aktivitem", "gh.repos": "Açık repo", "gh.stars": "Toplam yıldız",
      "gh.followers": "Takipçi", "gh.since": "GitHub'da",
      "edu.education": "Eğitim", "edu.languages": "Diller", "edu.certificates": "Sertifikalar", "edu.volunteering": "Gönüllülük",
      "projects.all": "Tümü", "projects.featured": "Öne çıkan",
      "projects.code": "Kaynak kodu", "projects.demo": "Canlı demo",
      "contact.lead": "Yeni bir pozisyon, proje ya da sadece merhaba demek için — mesajınızı bekliyorum!",
      "contact.name": "Adınız", "contact.email": "E-posta", "contact.message": "Mesajınız",
      "contact.send": "Gönder", "contact.invalid": "Lütfen tüm alanları doğru doldurun.",
      "contact.sending": "Gönderiliyor…", "contact.ok": "Teşekkürler! Mesajınız iletildi.",
      "contact.mail": "E-posta uygulamanız açılıyor…", "contact.err": "Bir hata oluştu, lütfen doğrudan e-posta gönderin.",
      "footer.built": "HTML, CSS ve JavaScript ile sıfırdan geliştirildi.",
    },
    en: {
      skip: "Skip to content",
      "nav.about": "About", "nav.skills": "Skills", "nav.experience": "Experience",
      "nav.projects": "Projects", "nav.education": "Education", "nav.contact": "Contact",
      "hero.open": "Open to new opportunities", "hero.hi": "Hi, I'm",
      "hero.cta_projects": "View My Work", "hero.cta_cv": "Download CV",
      "gh.title": "My GitHub Activity", "gh.repos": "Public repos", "gh.stars": "Total stars",
      "gh.followers": "Followers", "gh.since": "On GitHub since",
      "edu.education": "Education", "edu.languages": "Languages", "edu.certificates": "Certifications", "edu.volunteering": "Volunteering",
      "projects.all": "All", "projects.featured": "Featured",
      "projects.code": "Source code", "projects.demo": "Live demo",
      "contact.lead": "Whether it's a new role, a project or just to say hi — my inbox is open!",
      "contact.name": "Your name", "contact.email": "Email", "contact.message": "Message",
      "contact.send": "Send", "contact.invalid": "Please fill in all fields correctly.",
      "contact.sending": "Sending…", "contact.ok": "Thank you! Your message was sent.",
      "contact.mail": "Opening your email app…", "contact.err": "Something went wrong, please email me directly.",
      "footer.built": "Built from scratch with HTML, CSS and JavaScript.",
    },
  };

  const CATEGORY_LABELS = {
    web: { tr: "Web", en: "Web" },
    mobile: { tr: "Mobil", en: "Mobile" },
    data: { tr: "Veri", en: "Data" },
    tool: { tr: "Araç", en: "Tool" },
    ml: { tr: "Yapay Zekâ", en: "AI / ML" },
    game: { tr: "Oyun", en: "Game" },
  };

  let lang = "tr";
  try { lang = localStorage.getItem("lang") || (navigator.language.startsWith("tr") ? "tr" : "en"); } catch (e) {}
  if (!UI[lang]) lang = "tr";

  // Çok dilli alanı çözer: { tr, en } ise seçili dili, değilse değerin kendisini döndürür
  const t = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.tr : v);
  const ui = (key) => UI[lang][key] ?? key;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- İkonlar ----------
  const ICONS = {
    github: '<svg class="filled" viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z"/></svg>',
    linkedin: '<svg class="filled" viewBox="0 0 24 24"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>',
    twitter: '<svg class="filled" viewBox="0 0 24 24"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.8 2.3h7l4.8 6.4 5.6-6.4zm-1.2 17.9h1.9L7 4.2H5l12 16z"/></svg>',
    medium: '<svg class="filled" viewBox="0 0 24 24"><path d="M13.5 12a6.8 6.8 0 1 1-13.5 0 6.8 6.8 0 0 1 13.5 0zm7.4 0c0 3.5-1.5 6.4-3.4 6.4S14.2 15.5 14.2 12s1.5-6.4 3.3-6.4 3.4 2.9 3.4 6.4zM24 12c0 3.2-.5 5.7-1.2 5.7s-1.2-2.5-1.2-5.7.5-5.7 1.2-5.7S24 8.8 24 12z"/></svg>',
    email: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    website: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
    external: '<svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>',
    folder: '<svg class="folder" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  };

  // ============================================================
  //  Render
  // ============================================================
  function renderSocials() {
    const p = D.profile;
    const items = Object.entries(p.socials || {}).filter(([, url]) => url);
    if (p.email) items.push(["email", "mailto:" + p.email]);
    const html = items.map(([name, url]) => {
      const ext = url.startsWith("http");
      return `<li><a href="${esc(url)}" aria-label="${esc(name)}" title="${esc(name)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${ICONS[name] || ICONS.website}</a></li>`;
    }).join("");
    $("#hero-socials").innerHTML = html;
    $("#footer-socials").innerHTML = html;
  }

  function renderStatic() {
    const p = D.profile;
    document.title = `${p.name} — ${t(p.title)}`;
    $("#logo-initials").textContent = p.initials;
    $("#hero-name").textContent = p.name;
    $("#footer-name").textContent = p.name;
    $("#year").textContent = new Date().getFullYear();
    $("#open-badge").hidden = !p.openToWork;

    const cv = $("#cv-btn");
    if (p.cv) cv.href = p.cv; else cv.hidden = true;

    const mail = $("#mail-link");
    if (p.email) { mail.href = "mailto:" + p.email; mail.textContent = p.email; } else mail.hidden = true;

    const avatar = $("#avatar");
    avatar.innerHTML = p.photo
      ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" width="320" height="320" />`
      : esc(p.initials);

    renderSocials();
    injectJsonLd();
  }

  function renderLocalized() {
    const p = D.profile;
    document.documentElement.lang = lang;
    $("#lang-toggle").textContent = lang === "tr" ? "EN" : "TR";
    $$("[data-i18n]").forEach((el) => { el.textContent = ui(el.dataset.i18n); });

    $("#hero-tagline").textContent = t(p.tagline);
    $("#hero-location").innerHTML = ICONS.pin + " " + esc(t(p.location));

    // Hakkımda
    $("#about-text").innerHTML = t(D.about.paragraphs).map((x) => `<p>${esc(x)}</p>`).join("");
    $("#about-stats").innerHTML = D.about.highlights.map((h) =>
      `<div class="stat card"><strong class="gradient-text">${esc(h.value)}</strong><span>${esc(t(h.label))}</span></div>`).join("");

    // Yetenekler
    $("#skills-grid").innerHTML = D.skills.map((g) => `
      <article class="skill-card card reveal">
        <h3>${esc(t(g.category))}</h3>
        <div class="chips">${g.items.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
      </article>`).join("");

    // Deneyim
    $("#timeline").innerHTML = D.experience.map((e) => `
      <li class="tl-item reveal">
        <article class="tl-card card">
          <div class="tl-head">
            <div><h3>${esc(t(e.role))}</h3><span class="company">@ ${esc(e.company)}</span></div>
            <time>${esc(t(e.period))}</time>
          </div>
          <ul>${t(e.bullets).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          <div class="chips">${(e.tech || []).map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
        </article>
      </li>`).join("");

    renderProjects();

    // Eğitim, diller, sertifikalar
    $("#edu-list").innerHTML = D.education.map((e) => `
      <article class="edu-item card">
        <time>${esc(e.period)}</time>
        <h4>${esc(e.school)}</h4>
        <div class="meta">${esc(t(e.degree))}${e.note ? " · " + esc(t(e.note)) : ""}</div>
      </article>`).join("");
    $("#lang-list").innerHTML = D.languages.map((l) =>
      `<li class="card"><strong>${esc(t(l.name))}</strong><span class="lvl">${esc(t(l.level))}</span></li>`).join("");
    const certs = D.certificates || [], vols = D.volunteering || [];
    $("#cert-block").hidden = !certs.length;
    $("#vol-block").hidden = !vols.length;
    $("#vol-list").innerHTML = vols.map((v) => `
      <article class="edu-item card">
        <h4>${esc(t(v.title))}</h4>
        <div class="meta">${esc(t(v.place))}</div>
        <p class="vol-desc">${esc(t(v.description))}</p>
      </article>`).join("");
    $("#cert-list").innerHTML = certs.map((c) => {
      const name = c.url
        ? `<a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(c.name)} ↗</a>`
        : esc(c.name);
      return `<li class="card"><div><strong>${name}</strong><div class="issuer">${esc(c.issuer)}</div></div><time>${esc(c.year)}</time></li>`;
    }).join("");

    observeReveal();
    startTyping();
    if (ghData) renderGitHub(ghData);
  }

  // ---------- Projeler + filtre ----------
  let activeFilter = "all";
  function renderProjects() {
    const cats = [...new Set(D.projects.map((p) => p.category).filter(Boolean))];
    const hasFeatured = D.projects.some((p) => p.featured);
    const filters = ["all", ...(hasFeatured ? ["featured"] : []), ...cats];
    const label = (f) => f === "all" ? ui("projects.all") : f === "featured" ? "★ " + ui("projects.featured")
      : t(CATEGORY_LABELS[f]) || f;

    $("#filters").innerHTML = filters.map((f) =>
      `<button class="filter-btn" role="tab" data-filter="${esc(f)}" aria-selected="${f === activeFilter}">${esc(label(f))}</button>`).join("");

    // Öne çıkan projeler en başta
    const sorted = [...D.projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    $("#projects-grid").innerHTML = sorted.map((p) => `
      <article class="project card reveal${p.featured ? " featured" : ""}" data-category="${esc(p.category)}" data-featured="${!!p.featured}">
        ${p.featured ? `<span class="featured-tag">★ ${esc(ui("projects.featured"))}</span>` : ""}
        <div class="project-top">
          ${ICONS.folder}
          <div class="project-links">
            ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(ui("projects.code"))}: ${esc(t(p.title))}" title="${esc(ui("projects.code"))}">${ICONS.github}</a>` : ""}
            ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(ui("projects.demo"))}: ${esc(t(p.title))}" title="${esc(ui("projects.demo"))}">${ICONS.external}</a>` : ""}
          </div>
        </div>
        <h3>${esc(t(p.title))}</h3>
        <p>${esc(t(p.description))}</p>
        <ul class="tech-list">${p.tech.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </article>`).join("");
    applyFilter();
  }

  function applyFilter() {
    $$("#projects-grid .project").forEach((el) => {
      const show = activeFilter === "all"
        || (activeFilter === "featured" && el.dataset.featured === "true")
        || el.dataset.category === activeFilter;
      el.classList.toggle("hide", !show);
    });
  }

  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    $$(".filter-btn").forEach((b) => b.setAttribute("aria-selected", b === btn));
    applyFilter();
  });

  // ---------- Yazı makinesi efekti ----------
  let typingTimer;
  function startTyping() {
    clearTimeout(typingTimer);
    const el = $("#typed");
    const roles = t(D.profile.roles) || [t(D.profile.title)];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = roles[0]; return; }
    let i = 0, j = 0, deleting = false;
    const tick = () => {
      const word = roles[i];
      el.textContent = word.slice(0, j);
      if (!deleting && j === word.length) { deleting = true; typingTimer = setTimeout(tick, 1800); return; }
      if (deleting && j === 0) { deleting = false; i = (i + 1) % roles.length; }
      j += deleting ? -1 : 1;
      typingTimer = setTimeout(tick, deleting ? 40 : 85);
    };
    tick();
  }

  // ---------- GitHub istatistikleri (canlı) ----------
  const LANG_COLORS = {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c",
    Java: "#b07219", "C#": "#178600", "C++": "#f34b7d", C: "#555555", Go: "#00ADD8", Rust: "#dea584",
    PHP: "#4F5D95", Ruby: "#701516", Kotlin: "#A97BFF", Swift: "#F05138", Dart: "#00B4AB",
    Vue: "#41b883", Shell: "#89e051", "Jupyter Notebook": "#DA5B0B", SCSS: "#c6538c",
  };
  let ghData = null;

  async function loadGitHub() {
    const user = D.profile.githubUsername;
    if (!user) return;
    const key = "gh:" + user;
    try {
      const cached = JSON.parse(sessionStorage.getItem(key) || "null");
      if (cached) { ghData = cached; renderGitHub(ghData); return; }
    } catch (e) {}
    try {
      const [u, repos] = await Promise.all([
        fetch(`https://api.github.com/users/${encodeURIComponent(user)}`).then((r) => r.ok ? r.json() : Promise.reject(r.status)),
        fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&type=owner`).then((r) => r.ok ? r.json() : Promise.reject(r.status)),
      ]);
      const own = repos.filter((r) => !r.fork);
      const langs = {};
      own.forEach((r) => { if (r.language) langs[r.language] = (langs[r.language] || 0) + 1; });
      ghData = {
        repos: u.public_repos,
        followers: u.followers,
        since: new Date(u.created_at).getFullYear(),
        stars: own.reduce((s, r) => s + r.stargazers_count, 0),
        langs: Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 6),
      };
      try { sessionStorage.setItem(key, JSON.stringify(ghData)); } catch (e) {}
      renderGitHub(ghData);
    } catch (e) {
      // API limiti veya ağ hatası: kart gizli kalır
    }
  }

  function renderGitHub(g) {
    const card = $("#gh-card");
    card.hidden = false;
    card.classList.add("card");
    const stats = [["repos", g.repos], ["stars", g.stars], ["followers", g.followers], ["since", g.since]];
    $("#gh-stats").innerHTML = stats.map(([k, v]) =>
      `<div class="gh-stat"><strong>${esc(v)}</strong><span>${esc(ui("gh." + k))}</span></div>`).join("");
    const total = g.langs.reduce((s, [, n]) => s + n, 0);
    if (!total) { $("#gh-langs").innerHTML = ""; return; }
    const color = (l) => LANG_COLORS[l] || "#8b949e";
    $("#gh-langs").innerHTML = `
      <div class="lang-bar">${g.langs.map(([l, n]) => `<i style="width:${(n / total) * 100}%;background:${color(l)}" title="${esc(l)}"></i>`).join("")}</div>
      <div class="lang-legend">${g.langs.map(([l, n]) => `<span><b style="background:${color(l)}"></b>${esc(l)} ${Math.round((n / total) * 100)}%</span>`).join("")}</div>`;
    observeReveal();
  }

  // ---------- SEO: yapılandırılmış veri (Google için) ----------
  function injectJsonLd() {
    const p = D.profile;
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: p.name,
      jobTitle: p.title.en,
      url: location.href.split("#")[0],
      sameAs: Object.values(p.socials || {}).filter(Boolean),
      knowsAbout: D.skills.flatMap((g) => g.items),
    });
    document.head.appendChild(s);
  }

  // ============================================================
  //  Etkileşimler
  // ============================================================
  let revealObserver;
  function observeReveal() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("visible")); return; }
    revealObserver ??= new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); revealObserver.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal:not(.visible)").forEach((el) => revealObserver.observe(el));
  }

  // Tema
  $("#theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    $('meta[name="theme-color"]').content = next === "dark" ? "#0b0f19" : "#fbfbfe";
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Dil
  $("#lang-toggle").addEventListener("click", () => {
    lang = lang === "tr" ? "en" : "tr";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    renderLocalized();
  });

  // Mobil menü
  const menuBtn = $("#menu-toggle"), navLinks = $("#nav-links");
  const closeMenu = () => { navLinks.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); };
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  // Kaydırma: navbar arka planı, yukarı çık butonu, aktif menü bağlantısı
  const navbar = $("#navbar"), toTop = $("#to-top");
  const sections = $$("main section[id]");
  const onScroll = () => {
    const y = scrollY;
    navbar.classList.toggle("scrolled", y > 20);
    toTop.classList.toggle("show", y > 600);
    let current = "";
    sections.forEach((s) => { if (y >= s.offsetTop - 120) current = s.id; });
    $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  };
  addEventListener("scroll", onScroll, { passive: true });
  toTop.addEventListener("click", () => scrollTo({ top: 0 }));

  // İletişim formu
  // data.js içinde profile.formEndpoint (örn. Formspree) tanımlıysa oraya gönderilir,
  // değilse ziyaretçinin e-posta uygulaması açılır.
  $("#contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target, note = $("#form-note");
    const fields = [...form.elements].filter((el) => el.name);
    let valid = true;
    fields.forEach((el) => { const ok = el.checkValidity() && el.value.trim(); el.classList.toggle("invalid", !ok); if (!ok) valid = false; });
    if (!valid) { note.textContent = ui("contact.invalid"); return; }

    const data = Object.fromEntries(fields.map((el) => [el.name, el.value.trim()]));
    const endpoint = D.profile.formEndpoint;
    if (endpoint) {
      note.textContent = ui("contact.sending");
      try {
        const r = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error(r.status);
        form.reset();
        note.textContent = ui("contact.ok");
      } catch (err) { note.textContent = ui("contact.err"); }
    } else {
      const subject = encodeURIComponent(`Portföy — ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      location.href = `mailto:${D.profile.email}?subject=${subject}&body=${body}`;
      note.textContent = ui("contact.mail");
    }
  });

  // ---------- Başlat ----------
  renderStatic();
  renderLocalized();
  onScroll();
  loadGitHub();
})();
