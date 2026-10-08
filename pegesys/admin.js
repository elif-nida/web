/* PEGESYS yönetim paneli: giriş, mesaj listesi, filtre, durum değiştirme */
(() => {
  const $ = s => document.querySelector(s);
  const API = (window.PEGESYS_CONFIG || {}).apiUrl || "";
  const STATUS_TR = { new: "Yeni", read: "Okundu", archived: "Arşiv" };
  const state = { status: "all", q: "", page: 1 };

  const store = {
    get: () => { try { return JSON.parse(sessionStorage.getItem("pegesys-admin")); } catch { return null; } },
    set: v => { try { sessionStorage.setItem("pegesys-admin", JSON.stringify(v)); } catch {} },
    clear: () => { try { sessionStorage.removeItem("pegesys-admin"); } catch {} }
  };
  let session = store.get();

  async function call(path, options = {}) {
    const headers = { "Content-Type": "application/json" };
    if (session) headers.Authorization = "Bearer " + session.token;
    const res = await fetch(API + path, { ...options, headers });
    if (res.status === 401 && session) { logout(); throw new Error("Oturumunuz sona erdi, tekrar giriş yapın."); }
    if (res.status === 204) return null;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Bir hata oluştu.");
    return data;
  }

  function show(view) {
    $("#login-view").hidden = view !== "login";
    $("#dash-view").hidden = view !== "dash";
  }

  /* ---------- Giriş ---------- */
  const loginStatus = $("#login-status");
  if (!API) {
    loginStatus.className = "form-status err";
    loginStatus.textContent = "Backend adresi ayarlanmamış (config.js).";
  }
  $("#login-form").addEventListener("submit", async e => {
    e.preventDefault();
    const btn = e.target.querySelector("button span");
    btn.textContent = "Giriş yapılıyor...";
    try {
      const data = await call("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email: $("#l-email").value, password: $("#l-pass").value })
      });
      session = data;
      store.set(data);
      $("#l-pass").value = "";
      loginStatus.textContent = "";
      openDash();
    } catch (err) {
      loginStatus.className = "form-status err";
      loginStatus.textContent = err.message === "Failed to fetch" ? "Sunucuya ulaşılamadı." : err.message;
    }
    btn.textContent = "Giriş Yap";
  });

  function logout() {
    session = null;
    store.clear();
    show("login");
  }
  $("#logout").addEventListener("click", logout);

  /* ---------- Panel ---------- */
  function openDash() {
    $("#who").textContent = session.email;
    show("dash");
    refresh();
  }

  async function refresh() {
    await Promise.all([loadStats(), loadMessages()]).catch(err => alert(err.message));
  }

  async function loadStats() {
    const s = await call("/api/admin/stats");
    $("#s-total").textContent = s.total;
    Object.entries(s.byStatus).forEach(([k, v]) => ($("#s-" + k).textContent = v));
  }

  async function loadMessages() {
    const params = new URLSearchParams({ status: state.status, q: state.q, page: state.page });
    const data = await call("/api/admin/messages?" + params);
    const list = $("#messages");
    list.replaceChildren();
    if (!data.items.length) {
      const li = document.createElement("li");
      li.className = "empty";
      li.textContent = state.q || state.status !== "all" ? "Bu filtreye uyan talep yok." : "Henüz talep yok. Siteden gelen mesajlar burada görünecek.";
      list.append(li);
    }
    // Ziyaretçiden gelen metin her zaman textContent ile yazılır (XSS'e karşı)
    data.items.forEach(m => {
      const li = $("#msg-tpl").content.firstElementChild.cloneNode(true);
      li.classList.toggle("is-new", m.status === "new");
      li.querySelector(".m-name").textContent = m.name;
      const mail = li.querySelector(".m-email");
      mail.textContent = m.email;
      mail.href = "mailto:" + encodeURIComponent(m.email);
      li.querySelector(".m-type").textContent = m.projectType;
      const st = li.querySelector(".m-status");
      st.textContent = STATUS_TR[m.status];
      st.classList.add("s-" + m.status);
      const t = li.querySelector(".m-date");
      t.dateTime = m.createdAt;
      t.textContent = new Date(m.createdAt + (/[Z+]/.test(m.createdAt.slice(19)) ? "" : "Z"))
        .toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
      li.querySelector(".m-body").textContent = m.message;
      li.querySelector(".m-reply").href = "mailto:" + encodeURIComponent(m.email) +
        "?subject=" + encodeURIComponent("PEGESYS — " + m.projectType + " talebiniz hakkında");
      li.querySelectorAll("[data-act]").forEach(b => {
        if (b.dataset.act === m.status) b.hidden = true;
        b.addEventListener("click", () => act(m, b.dataset.act));
      });
      list.append(li);
    });
    renderPager(data);
  }

  function renderPager({ page, pages }) {
    const pager = $("#pager");
    pager.replaceChildren();
    if (pages <= 1) return;
    for (let i = 1; i <= pages; i++) {
      const b = document.createElement("button");
      b.className = "btn btn-ghost sm";
      b.textContent = i;
      b.disabled = i === page;
      b.addEventListener("click", () => { state.page = i; loadMessages(); });
      pager.append(b);
    }
  }

  async function act(m, action) {
    try {
      if (action === "delete") {
        if (!confirm(`${m.name} adlı kişinin mesajı kalıcı olarak silinsin mi?`)) return;
        await call("/api/admin/messages/" + m.id, { method: "DELETE" });
      } else {
        await call("/api/admin/messages/" + m.id, { method: "PATCH", body: JSON.stringify({ status: action }) });
      }
      refresh();
    } catch (err) { alert(err.message); }
  }

  $("#tabs").addEventListener("click", e => {
    const b = e.target.closest("[data-status]");
    if (!b) return;
    document.querySelectorAll("#tabs button").forEach(x => x.setAttribute("aria-selected", x === b));
    state.status = b.dataset.status;
    state.page = 1;
    loadMessages();
  });
  let qT;
  $("#search").addEventListener("input", e => {
    clearTimeout(qT);
    qT = setTimeout(() => { state.q = e.target.value.trim(); state.page = 1; loadMessages(); }, 250);
  });

  session ? openDash() : show("login");
})();
