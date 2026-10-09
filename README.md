# Kişisel Portföy Sitesi

İş başvurularında öne çıkmak için hazırlanmış, **hiçbir kütüphane ya da derleme aracı gerektirmeyen** (saf HTML, CSS ve JavaScript) modern bir portföy sitesi. GitHub Pages üzerinde ücretsiz yayınlanır.

## Özellikler

- **Tek dosyadan yönetim:** Tüm içerik `js/data.js` içinde; HTML'e dokunmanız gerekmez
- **İki dil (TR / EN):** Yabancı şirketlere de tek linkle başvurabilirsiniz
- **Canlı GitHub istatistikleri:** Repo sayısı, yıldızlar ve en çok kullandığınız diller GitHub API'den otomatik çekilir
- **"Yeni fırsatlara açığım" rozeti:** İşe alım uzmanlarına müsait olduğunuzu ilk bakışta gösterir
- **Yazdırınca CV'ye dönüşür:** `Ctrl + P` ile site sade, tek renkli bir özgeçmişe dönüşür
- **Açık / koyu tema:** Sistem tercihine göre otomatik, elle de değiştirilebilir
- **Proje filtreleme:** Kategoriye ve "öne çıkan" projelere göre filtre
- **SEO ve paylaşım:** Open Graph etiketleri (LinkedIn önizlemesi) ve Google için `schema.org/Person` verisi
- **Erişilebilir ve hızlı:** Klavye ile gezinme, "içeriğe geç" bağlantısı, azaltılmış hareket desteği, mobil uyumlu tasarım
- **Otomatik yayın:** `main` dalına her push'ta GitHub Actions ile yeniden yayınlanır

## Proje yapısı

```
├── index.html               # Sayfa iskeleti
├── css/style.css            # Tüm stiller (renkler en üstteki değişkenlerde)
├── js/data.js               # ← SİZİN İÇERİĞİNİZ (burayı düzenleyin)
├── js/main.js               # Etkileşimler ve içerik oluşturma
├── assets/                  # favicon, paylaşım görseli, CV ve fotoğraf
└── .github/workflows/deploy.yml   # GitHub Pages yayını
```

## Kişiselleştirme

1. **`js/data.js`** dosyasını açın ve örnek bilgileri kendi bilgilerinizle değiştirin:
   - `profile` → ad, unvan, e-posta, sosyal medya bağlantıları, GitHub kullanıcı adı
   - `about`, `skills`, `experience`, `projects`, `education`, `certificates`, `languages`
2. **CV'nizi** `assets/cv.pdf` adıyla ekleyin.
3. **(İsteğe bağlı) Fotoğraf:** `assets/profil.jpg` ekleyip `data.js` içinde `photo: "assets/profil.jpg"` yapın. Boş bırakırsanız baş harfleriniz gösterilir.
4. **`index.html`** içindeki `<title>` ve `og:` etiketlerindeki adınızı güncelleyin (paylaşım önizlemeleri JavaScript çalıştırmadığı için bunlar HTML'de durmalı).
5. **(İsteğe bağlı) İletişim formu:** Varsayılan olarak ziyaretçinin e-posta uygulamasını açar. Mesajların doğrudan size gelmesi için [Formspree](https://formspree.io)'den ücretsiz bir form oluşturup adresini `formEndpoint` alanına yazın.
6. **Renkler:** `css/style.css` en üstündeki `--accent` ve `--accent-2` değerlerini değiştirin.

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
# Tarayıcıda http://localhost:8000 adresini açın
```

## GitHub Pages ile yayınlama

1. Kodu GitHub'a gönderin ve `main` dalına birleştirin.
2. Repo'da **Settings → Pages → Build and deployment → Source** alanını **GitHub Actions** olarak seçin.
3. Birkaç dakika sonra siteniz `https://<kullanici-adiniz>.github.io/<repo-adi>/` adresinde yayında olur.

> **İpucu:** Repo adını `<kullanici-adiniz>.github.io` yaparsanız site doğrudan `https://<kullanici-adiniz>.github.io` adresinde açılır.

## Öne çıkmak için ipuçları

- Deneyim maddelerinde **ölçülebilir sonuç** yazın ("sayfa yüklenme süresini %40 azalttım" gibi).
- En iyi 2–3 projenizi `featured: true` ile işaretleyin; mümkünse canlı demo bağlantısı ekleyin.
- Her projenin GitHub reposunda iyi bir README ve ekran görüntüsü olsun.
- Site linkini CV'nize, LinkedIn profilinize ve GitHub profil README'nize ekleyin.

## Lisans

MIT — dilediğiniz gibi kullanabilir ve değiştirebilirsiniz.

## PEGESYS konsept sitesi

`pegesys/` klasöründe, PEGESYS için hazırlanmış animasyonlu bir konsept web sitesi bulunur (parçacık ağı, aurora arka plan, 3D küre, kendi kendine yazan terminal vb.). Yayınlandığında `https://<kullanici-adiniz>.github.io/<repo-adi>/pegesys/` adresinde açılır. Ön yüz kütüphane gerektirmez (`pegesys/`). İletişim formu ve yönetim paneli (`pegesys/admin.html`) için Python/Flask + PostgreSQL backend'i `pegesys-api/` klasöründedir; kurulum için [pegesys-api/README.md](pegesys-api/README.md) dosyasına bakın.
