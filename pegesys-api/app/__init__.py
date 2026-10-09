import click
from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import HTTPException
from werkzeug.middleware.proxy_fix import ProxyFix

from .config import Config
from .models import Admin, db
from .routes import api


def create_app(overrides=None):
    app = Flask(__name__)
    app.config.from_object(Config)
    if overrides:
        app.config.update(overrides)

    # Render gibi platformlarda gerçek ziyaretçi IP'si X-Forwarded-For başlığında gelir
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)
    CORS(app, resources={r"/api/*": {"origins": app.config["ALLOWED_ORIGINS"]}})
    db.init_app(app)
    app.register_blueprint(api)

    @app.errorhandler(HTTPException)
    def http_error(err):
        return jsonify(error=err.description), err.code

    @app.after_request
    def security_headers(resp):
        resp.headers.setdefault("X-Content-Type-Options", "nosniff")
        resp.headers.setdefault("X-Frame-Options", "DENY")
        resp.headers.setdefault("Referrer-Policy", "no-referrer")
        return resp

    with app.app_context():
        db.create_all()
        _bootstrap_admin(app)

    @app.cli.command("create-admin")
    @click.option("--email", prompt=True)
    @click.password_option()
    def create_admin(email, password):
        """Yeni yönetici oluşturur ya da şifresini günceller."""
        email = email.strip().lower()
        admin = db.session.execute(db.select(Admin).filter_by(email=email)).scalar_one_or_none() or Admin(email=email)
        admin.set_password(password)
        db.session.add(admin)
        db.session.commit()
        click.echo(f"Yönetici hazır: {email}")

    return app


def _bootstrap_admin(app):
    """Hiç yönetici yoksa ortam değişkenlerindeki bilgilerle ilkini oluşturur.
    Kabuk erişimi olmayan barındırma planlarında ilk kurulumu kolaylaştırır."""
    email, password = app.config["ADMIN_EMAIL"], app.config["ADMIN_PASSWORD"]
    if not (email and password) or db.session.execute(db.select(Admin.id).limit(1)).first():
        return
    admin = Admin(email=email)
    admin.set_password(password)
    db.session.add(admin)
    try:
        db.session.commit()
    except IntegrityError:  # aynı anda başlayan başka bir süreç oluşturmuş olabilir
        db.session.rollback()
