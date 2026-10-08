import re
from datetime import datetime, timezone

from flask import Blueprint, jsonify, request
from sqlalchemy import func, or_

from .mailer import notify_new_message
from .models import Admin, Message, db
from .security import issue_token, login_required, rate_limit

api = Blueprint("api", __name__, url_prefix="/api")

PROJECT_TYPES = ("Web Uygulaması", "Mobil Uygulama", "Yapay Zekâ", "Bulut / DevOps", "Diğer")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def _text(data, key):
    value = data.get(key)
    return value.strip() if isinstance(value, str) else ""


def validate_contact(data):
    """Formu sunucu tarafında da doğrular; tarayıcıdaki kontrol atlatılabilir."""
    errors = {}
    name, email = _text(data, "name"), _text(data, "email").lower()
    project_type, body = _text(data, "type"), _text(data, "message")

    if not 2 <= len(name) <= 100:
        errors["name"] = "Ad 2-100 karakter olmalı."
    if len(email) > 254 or not EMAIL_RE.match(email):
        errors["email"] = "Geçerli bir e-posta adresi girin."
    if project_type not in PROJECT_TYPES:
        errors["type"] = "Geçerli bir proje türü seçin."
    if not 10 <= len(body) <= 5000:
        errors["message"] = "Mesaj 10-5000 karakter olmalı."
    if data.get("consent") is not True:
        errors["consent"] = "Devam etmek için aydınlatma metnini onaylayın."

    clean = {"name": name, "email": email, "project_type": project_type, "body": body}
    return clean, errors


@api.get("/health")
def health():
    db.session.execute(db.select(1))
    return jsonify(status="ok")


@api.post("/contact")
@rate_limit("contact", "CONTACT_LIMIT")
def create_contact():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify(error="Geçersiz istek."), 400

    # Bal küpü (honeypot): insanlar bu gizli alanı görmez, botlar doldurur.
    # Bota başarılı yanıt verilir ama hiçbir şey kaydedilmez.
    if _text(data, "website"):
        return jsonify(ok=True), 201

    clean, errors = validate_contact(data)
    if errors:
        return jsonify(error="Lütfen formdaki hataları düzeltin.", fields=errors), 422

    message = Message(**clean, consent_at=datetime.now(timezone.utc))
    db.session.add(message)
    db.session.commit()
    notify_new_message(message)
    return jsonify(ok=True, id=message.id), 201


# ---------- Yönetim paneli ----------

@api.post("/admin/login")
@rate_limit("login", "LOGIN_LIMIT")
def admin_login():
    data = request.get_json(silent=True) or {}
    email, password = _text(data, "email").lower(), data.get("password") or ""
    admin = db.session.execute(db.select(Admin).filter_by(email=email)).scalar_one_or_none()
    if admin is None or not admin.check_password(password):
        # Hangi bilginin yanlış olduğunu söylemeyiz
        return jsonify(error="E-posta veya şifre hatalı."), 401
    return jsonify(token=issue_token(admin), email=admin.email)


@api.get("/admin/messages")
@login_required
def list_messages():
    status = request.args.get("status", "all")
    query = (request.args.get("q") or "").strip()
    page = max(1, request.args.get("page", 1, type=int))
    per_page = min(100, max(1, request.args.get("perPage", 20, type=int)))

    stmt = db.select(Message).order_by(Message.created_at.desc(), Message.id.desc())
    if status in Message.STATUSES:
        stmt = stmt.filter(Message.status == status)
    if query:
        like = f"%{query}%"
        stmt = stmt.filter(or_(Message.name.ilike(like), Message.email.ilike(like), Message.body.ilike(like)))

    result = db.paginate(stmt, page=page, per_page=per_page, error_out=False)
    return jsonify(items=[m.to_dict() for m in result.items], total=result.total, page=page, pages=result.pages)


@api.get("/admin/stats")
@login_required
def stats():
    by_status = dict(db.session.execute(db.select(Message.status, func.count()).group_by(Message.status)).all())
    by_type = dict(db.session.execute(db.select(Message.project_type, func.count()).group_by(Message.project_type)).all())
    return jsonify(
        total=sum(by_status.values()),
        byStatus={s: by_status.get(s, 0) for s in Message.STATUSES},
        byType=by_type,
    )


@api.patch("/admin/messages/<int:message_id>")
@login_required
def update_message(message_id):
    message = db.get_or_404(Message, message_id)
    status = (request.get_json(silent=True) or {}).get("status")
    if status not in Message.STATUSES:
        return jsonify(error="Geçersiz durum."), 422
    message.status = status
    db.session.commit()
    return jsonify(message.to_dict())


@api.delete("/admin/messages/<int:message_id>")
@login_required
def delete_message(message_id):
    message = db.get_or_404(Message, message_id)
    db.session.delete(message)
    db.session.commit()
    return "", 204
