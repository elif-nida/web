/* Backend (API) adresi.
   Yerelde çalışırken otomatik olarak http://localhost:5000 kullanılır.
   Backend'i canlıya aldığınızda (ör. Render) adresini aşağıdaki "production" alanına yazın.
   Boş kalırsa iletişim formu demo modunda çalışır. */
(() => {
  const production = "";
  const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
  window.PEGESYS_CONFIG = { apiUrl: isLocal ? "http://localhost:5000" : production };
})();
