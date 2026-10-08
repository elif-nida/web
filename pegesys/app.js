/* ============================================================
   PEGESYS — etkileşimler ve animasyonlar (kütüphanesiz)
   ============================================================ */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Metin karıştırma (scramble) efekti ---------- */
  function scramble(el, to, duration = 900) {
    const from = el.textContent;
    const len = Math.max(from.length, to.length);
    const start = performance.now();
    return new Promise(resolve => {
      (function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        let out = "";
        for (let i = 0; i < len; i++) {
          const settle = (i / len) * 0.6 + 0.4;
          if (t >= settle) out += to[i] || "";
          else if (t > (i / len) * 0.4) out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
          else out += from[i] || "";
        }
        el.textContent = out;
        t < 1 ? requestAnimationFrame(frame) : resolve();
      })(start);
    });
  }

  /* ---------- Açılış ekranı ---------- */
  const loader = $("#loader");
  const fill = $("#loader-fill");
  document.body.classList.add("loading");
  let pct = 0;
  const tick = setInterval(() => {
    pct = Math.min(100, pct + Math.random() * 18 + 6);
    fill.style.width = pct + "%";
    if (pct >= 100) clearInterval(tick);
  }, 90);
  scramble($(".loader-text"), "PEGESYS", 1100);

  function finishLoading() {
    fill.style.width = "100%";
    setTimeout(() => {
      loader.classList.add("done");
      document.body.classList.remove("loading");
      setTimeout(() => loader.remove(), 1100);
      $$(".hero .reveal").forEach((el, i) => {
        el.style.setProperty("--d", i * 0.08 + "s");
        el.classList.add("in");
      });
      startRotator();
    }, reduced ? 0 : 500);
  }
  const minShow = new Promise(r => setTimeout(r, reduced ? 0 : 1300));
  const loaded = new Promise(r => (document.readyState === "complete" ? r() : addEventListener("load", r)));
  Promise.all([minShow, loaded]).then(finishLoading);

  /* ---------- Hero'da dönen kelime ---------- */
  function startRotator() {
    const el = $("#rotator");
    const words = ["web", "mobil", "yapay zekâ", "bulut", "SaaS"];
    let i = 0;
    if (reduced) return;
    setInterval(() => {
      i = (i + 1) % words.length;
      scramble(el, words[i], 800);
    }, 2600);
  }

  /* ---------- Parçacık ağı (canvas) ---------- */
  const canvas = $("#network");
  const ctx = canvas.getContext("2d");
  const mouse = { x: -9999, y: -9999 };
  let W, H, DPR, points = [];

  function resize() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = canvas.width = innerWidth * DPR;
    H = canvas.height = innerHeight * DPR;
    const count = Math.min(120, Math.floor((innerWidth * innerHeight) / 13000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35 * DPR,
      vy: (Math.random() - 0.5) * 0.35 * DPR,
      r: (Math.random() * 1.6 + 0.6) * DPR,
      hue: Math.random() < 0.5 ? 255 : 190
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const maxD = 140 * DPR;
    const mx = mouse.x * DPR, my = mouse.y * DPR;
    for (const p of points) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      // fare, noktaları hafifçe iter
      const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
      if (d < 160 * DPR && d > 0) {
        const f = (1 - d / (160 * DPR)) * 1.2;
        p.x += (dx / d) * f; p.y += (dy / d) * f;
      }
    }
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < maxD) {
          ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2},100%,70%,${(1 - d / maxD) * 0.35})`;
          ctx.lineWidth = DPR * 0.7;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      // fareye yakın noktalar fareye bağlanır
      const dm = Math.hypot(a.x - mx, a.y - my);
      if (dm < 200 * DPR) {
        ctx.strokeStyle = `rgba(34,225,255,${(1 - dm / (200 * DPR)) * 0.6})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke();
      }
      ctx.fillStyle = `hsla(${a.hue},100%,75%,.9)`;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduced) requestAnimationFrame(draw);
  }
  resize();
  draw();
  let rT;
  addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(resize, 150); });
  addEventListener("pointermove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });

  /* ---------- Özel imleç ---------- */
  if (finePointer && !reduced) {
    addEventListener("pointermove", () => document.body.classList.add("has-cursor"), { once: true });
    const dot = $(".cursor-dot"), ring = $(".cursor-ring");
    let rx = 0, ry = 0, tx = 0, ty = 0;
    addEventListener("pointermove", e => {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = `translate(${tx}px,${ty}px)`;
    }, { passive: true });
    (function loop() {
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();
    $$("a, button, input, textarea, select, [data-tilt]").forEach(el => {
      el.addEventListener("pointerenter", () => ring.classList.add("hover"));
      el.addEventListener("pointerleave", () => ring.classList.remove("hover"));
    });
  }

  /* ---------- Mıknatıslı butonlar ---------- */
  if (finePointer && !reduced) {
    $$(".magnetic").forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px,${y * 0.35}px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }

  /* ---------- 3D eğilme + ışık takibi ---------- */
  $$("[data-tilt]").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", px * 100 + "%");
      el.style.setProperty("--my", py * 100 + "%");
      if (finePointer && !reduced) {
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg) translateZ(0)`;
      }
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });

  /* ---------- Küre fareyle döner ---------- */
  const orb = $("#orb");
  if (finePointer && !reduced) {
    addEventListener("pointermove", e => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      orb.style.transform = `rotateY(${x * 25}deg) rotateX(${-y * 25}deg)`;
    }, { passive: true });
  }

  /* ---------- Kaydırınca görünme ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      // aynı gruptaki kardeşler sırayla gelsin
      const sibs = $$(":scope > .reveal", el.parentElement);
      el.style.setProperty("--d", Math.max(0, sibs.indexOf(el)) * 0.08 + "s");
      el.classList.add("in");
      io.unobserve(el);
      if (el.classList.contains("terminal")) runTerminal();
      $$("[data-count]", el).forEach(countUp);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => { if (!el.closest(".hero")) io.observe(el); });

  /* ---------- Sayaçlar ---------- */
  function countUp(el) {
    const end = +el.dataset.count, dur = 1600, start = performance.now();
    if (end === 0 || reduced) { el.textContent = end; return; }
    (function f(now) {
      const t = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - t, 4)));
      if (t < 1) requestAnimationFrame(f);
    })(start);
  }

  /* ---------- Kaydırma: ilerleme çubuğu, menü, zaman çizelgesi ---------- */
  const nav = $("#nav"), bar = $("#scroll-progress"), tl = $("#timeline"), tlFill = $("#timeline-fill");
  const steps = $$(".step");
  let lastY = scrollY;
  function onScroll() {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("scrolled", y > 30);
    const menuOpen = $("#nav-links").classList.contains("open");
    nav.classList.toggle("hide", !menuOpen && y > lastY && y > 400);
    lastY = y;
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    tlFill.style.transform = `scaleY(${p})`;
    steps.forEach(s => {
      const sr = s.getBoundingClientRect();
      s.classList.toggle("active", sr.top + 28 < innerHeight * 0.6);
    });
  }
  addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
  onScroll();

  /* ---------- Mobil menü ---------- */
  const burger = $("#burger"), links = $("#nav-links");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));

  /* ---------- Kendi kendine yazan terminal ---------- */
  const TERM = [
    ["cmd", "pegesys init proje --stack next,node,postgres"],
    ["out", '<span class="dim">› Proje iskeleti oluşturuluyor...</span>'],
    ["out", '<span class="ok">✓</span> Mimari hazır <span class="dim">(clean architecture)</span>'],
    ["cmd", "npm run test"],
    ["out", '<span class="ok">✓</span> 248 test geçti <span class="dim">· kapsam %94</span>'],
    ["cmd", "pegesys audit --security"],
    ["out", '<span class="ok">✓</span> 0 kritik açık bulundu'],
    ["cmd", "pegesys deploy --env production"],
    ["out", '<span class="dim">› Docker imajı derleniyor...</span>'],
    ["out", '<span class="dim">› Bulut altyapısına dağıtılıyor...</span>'],
    ["out", '<span class="ok">✓</span> Yayında! <span class="hl">https://projeniz.com</span> 🚀']
  ];
  let termStarted = false;
  async function runTerminal() {
    if (termStarted) return;
    termStarted = true;
    const box = $("#term");
    const wait = ms => new Promise(r => setTimeout(r, reduced ? 0 : ms));
    let html = "";
    const caret = '<span class="caret"></span>';
    for (const [kind, text] of TERM) {
      if (kind === "cmd") {
        const prefix = '<span class="p">❯</span> ';
        for (let i = 1; i <= text.length; i++) {
          box.innerHTML = html + prefix + text.slice(0, i) + caret;
          await wait(28 + Math.random() * 40);
        }
        html += prefix + text + "\n";
        await wait(350);
      } else {
        html += text + "\n";
        box.innerHTML = html + caret;
        await wait(420);
      }
    }
    box.innerHTML = html + '<span class="p">❯</span> ' + caret;
  }

  /* ---------- İletişim formu ----------
     Konsept sürümde mesaj gönderilmez. Gerçek kullanımda
     FORM_ENDPOINT alanına Formspree vb. bir adres yazın. */
  const FORM_ENDPOINT = "";
  const form = $("#form"), status = $("#form-status");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    let ok = true;
    $$("input, textarea, select", form).forEach(f => {
      const valid = f.checkValidity() && f.value.trim() !== "";
      f.closest(".field").classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      status.className = "form-status err";
      status.textContent = "Lütfen tüm alanları doğru şekilde doldurun.";
      return;
    }
    const btn = $("button[type=submit] span", form);
    btn.textContent = "Gönderiliyor...";
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error();
      } else {
        await new Promise(r => setTimeout(r, 900));
      }
      status.className = "form-status ok";
      status.textContent = FORM_ENDPOINT
        ? "Teşekkürler! Mesajınız bize ulaştı, en kısa sürede dönüş yapacağız."
        : "Teşekkürler! (Bu bir konsept demo olduğu için mesaj gönderilmedi.)";
      form.reset();
    } catch {
      status.className = "form-status err";
      status.textContent = "Bir sorun oluştu, lütfen tekrar deneyin.";
    }
    btn.textContent = "Gönder";
  });
  $$("input, textarea, select", form).forEach(f =>
    f.addEventListener("input", () => f.closest(".field").classList.remove("invalid"))
  );
})();
