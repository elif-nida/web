import os


def _database_url():
    url = os.environ.get("DATABASE_URL", "").strip()
    if not url:
        return "sqlite:///pegesys.db"
    # Render/Heroku "postgres://" verir; SQLAlchemy psycopg 3 sürücüsünü ister
    for prefix in ("postgres://", "postgresql://"):
        if url.startswith(prefix):
            return "postgresql+psycopg://" + url[len(prefix):]
    return url


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "gelistirme-anahtari-canlida-degistirin")
    SQLALCHEMY_DATABASE_URI = _database_url()
    SQLALCHEMY_ENGINE_OPTIONS = {"pool_pre_ping": True}
    ALLOWED_ORIGINS = [o.strip() for o in os.environ.get(
        "ALLOWED_ORIGINS", "http://localhost:8000,https://elif-nida.github.io").split(",") if o.strip()]
    ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "").strip().lower()
    ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "")
    TOKEN_MAX_AGE = 8 * 60 * 60  # yönetici oturumu 8 saat geçerli

    SMTP_HOST = os.environ.get("SMTP_HOST", "")
    SMTP_PORT = int(os.environ.get("SMTP_PORT") or 587)
    SMTP_USER = os.environ.get("SMTP_USER", "")
    SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
    NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "")

    # Basit hız sınırları: (istek sayısı, saniye)
    CONTACT_LIMIT = (5, 10 * 60)
    LOGIN_LIMIT = (10, 15 * 60)
