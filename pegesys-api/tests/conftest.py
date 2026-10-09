import pytest

from app import create_app
from app.models import db
from app.security import limiter


@pytest.fixture
def app():
    limiter.reset()
    app = create_app({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "SECRET_KEY": "test",
        "ADMIN_EMAIL": "admin@pegesys.test",
        "ADMIN_PASSWORD": "guclu-sifre-123",
    })
    yield app
    with app.app_context():
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def token(client):
    res = client.post("/api/admin/login", json={"email": "admin@pegesys.test", "password": "guclu-sifre-123"})
    return res.get_json()["token"]


@pytest.fixture
def auth(token):
    return {"Authorization": f"Bearer {token}"}
