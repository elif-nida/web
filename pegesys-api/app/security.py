import time
from collections import defaultdict, deque
from functools import wraps
from threading import Lock

from flask import current_app, g, jsonify, request
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer

from .models import Admin, db


# ---------- Yönetici oturum anahtarı (token) ----------

def _serializer():
    return URLSafeTimedSerializer(current_app.config["SECRET_KEY"], salt="admin-auth")


def issue_token(admin):
    return _serializer().dumps({"id": admin.id})


def login_required(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return jsonify(error="Giriş yapmanız gerekiyor."), 401
        try:
            data = _serializer().loads(header[7:], max_age=current_app.config["TOKEN_MAX_AGE"])
        except SignatureExpired:
            return jsonify(error="Oturumunuzun süresi doldu, tekrar giriş yapın."), 401
        except BadSignature:
            return jsonify(error="Geçersiz oturum."), 401
        admin = db.session.get(Admin, data.get("id"))
        if admin is None:
            return jsonify(error="Geçersiz oturum."), 401
        g.admin = admin
        return view(*args, **kwargs)

    return wrapper


# ---------- Basit hız sınırlayıcı (spam ve kaba kuvvet saldırısına karşı) ----------

class RateLimiter:
    """Bellek içi, IP başına kayan pencere. Tek sunuculu kurulum için yeterlidir;
    birden fazla sunucuda Redis tabanlı bir çözüme geçilmelidir."""

    def __init__(self):
        self._hits = defaultdict(deque)
        self._lock = Lock()

    def allow(self, key, limit, window):
        now = time.monotonic()
        with self._lock:
            hits = self._hits[key]
            while hits and now - hits[0] > window:
                hits.popleft()
            if len(hits) >= limit:
                return False
            hits.append(now)
            return True

    def reset(self):
        with self._lock:
            self._hits.clear()


limiter = RateLimiter()


def rate_limit(name, config_key):
    def decorator(view):
        @wraps(view)
        def wrapper(*args, **kwargs):
            limit, window = current_app.config[config_key]
            if not limiter.allow(f"{name}:{request.remote_addr}", limit, window):
                return jsonify(error="Çok fazla istek gönderdiniz, lütfen biraz sonra tekrar deneyin."), 429
            return view(*args, **kwargs)

        return wrapper

    return decorator
