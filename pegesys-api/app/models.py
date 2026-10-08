from datetime import datetime, timezone

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash

db = SQLAlchemy()


def utcnow():
    return datetime.now(timezone.utc)


class Message(db.Model):
    """İletişim formundan gelen mesajlar."""

    __tablename__ = "messages"

    STATUSES = ("new", "read", "archived")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(254), nullable=False, index=True)
    project_type = db.Column(db.String(50), nullable=False)
    body = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="new", index=True)
    consent_at = db.Column(db.DateTime(timezone=True), nullable=False)  # KVKK onayı zamanı
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=utcnow, index=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "projectType": self.project_type,
            "message": self.body,
            "status": self.status,
            "createdAt": self.created_at.isoformat(),
        }


class Admin(db.Model):
    """Yönetim paneline giriş yapabilen kullanıcılar."""

    __tablename__ = "admins"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(254), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)  # şifre asla düz metin saklanmaz
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
