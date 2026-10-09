# PEGESYS Backend (API)

PEGESYS sitesinin iletişim formunu ve yönetim panelini çalıştıran **Python / Flask** backend'i.

```
Site (pegesys/)  ──POST /api/contact──►  Flask API  ──►  PostgreSQL
Yönetim paneli (pegesys/admin.html)  ◄──  /api/admin/*  (giriş gerekli)
                                              └──► E-posta bildirimi (isteğe bağlı)
```

## Özellikler

- **İletişim formu kaydı:** Mesajlar veritabanına kaydedilir, istenirse e-posta bildirimi gönderilir.
- **Yönetim paneli:** Giriş, özet sayılar, Yeni / Okundu / Arşiv filtreleri, arama, sayfalama, silme.
- **Güvenlik:**
  - Sunucu tarafında doğrulama (tarayıcı kontrolü atlatılabilir).
  - Şifreler hash'lenerek saklanır (Werkzeug, scrypt).
  - Süreli ve imzalı oturum anahtarı (8 saat).
  - Hız sınırı: formdan IP başına 10 dakikada 5 mesaj, girişte 15 dakikada 10 deneme.
  - Bot tuzağı (honeypot) alanı.
  - CORS ile yalnızca izin verilen sitelerden istek kabulü.
  - Güvenlik başlıkları.
- **KVKK:** Form onay kutusu zorunludur, onay zamanı veritabanında saklanır.
- **Testler:** `pytest` ile 10 test.

## API

| Yöntem | Adres | Açıklama |
|---|---|---|
| GET | `/api/health` | Sunucu ve veritabanı çalışıyor mu? |
| POST | `/api/contact` | Formdan gelen mesajı kaydeder |
| POST | `/api/admin/login` | Yönetici girişi, oturum anahtarı döner |
| GET | `/api/admin/messages?status=&q=&page=` | Mesajları listeler |
| GET | `/api/admin/stats` | Durum ve proje türüne göre sayılar |
| PATCH | `/api/admin/messages/<id>` | Durumu değiştirir (`new`, `read`, `archived`) |
| DELETE | `/api/admin/messages/<id>` | Mesajı siler |

## Yerelde çalıştırma

```bash
cd pegesys-api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env        # ADMIN_EMAIL ve ADMIN_PASSWORD alanlarını doldurun
python wsgi.py              # API: http://localhost:5000
```

Başka bir terminalde siteyi açın:

```bash
cd ..                       # repo kökü
python3 -m http.server 8000
```

- Site: http://localhost:8000/pegesys/ (form artık gerçekten kaydeder)
- Yönetim paneli: http://localhost:8000/pegesys/admin.html

Testleri çalıştırmak için: `pytest`

Yönetici eklemek ya da şifresini değiştirmek için: `flask --app wsgi create-admin`

## Canlıya alma (Render, ücretsiz)

1. https://render.com adresinde GitHub hesabınızla giriş yapın.
2. **New → Blueprint** seçin ve bu repoyu gösterin. Kökteki `render.yaml` dosyası API'yi ve PostgreSQL veritabanını birlikte kurar.
3. Sizden `ADMIN_EMAIL` ve `ADMIN_PASSWORD` istenecek. Bunlar panele giriş bilgileriniz olacak.
4. Kurulum bitince API adresinizi kopyalayın (ör. `https://pegesys-api.onrender.com`). `pegesys/config.js` içindeki `production` alanına yazıp GitHub'a gönderin.

> **Not:** Render'ın ücretsiz planında sunucu bir süre istek almazsa uyur; ilk istek 30-50 saniye sürebilir. Ücretsiz veritabanı da belli bir süre sonra sona erer. Kalıcı kullanım için ücretli plan ya da [Neon](https://neon.tech) / [Supabase](https://supabase.com) gibi ücretsiz bir PostgreSQL servisi kullanın; adresini `DATABASE_URL` olarak girmeniz yeterli.

## Klasör yapısı

```
pegesys-api/
├── app/
│   ├── __init__.py   # uygulama kurulumu, CORS, güvenlik başlıkları, create-admin komutu
│   ├── config.py     # ortam değişkenlerinden ayarlar
│   ├── models.py     # veritabanı tabloları (Message, Admin)
│   ├── routes.py     # API uçları ve doğrulama
│   ├── security.py   # oturum anahtarı ve hız sınırı
│   └── mailer.py     # e-posta bildirimi
├── tests/            # pytest testleri
├── wsgi.py           # giriş noktası
└── requirements.txt
```
