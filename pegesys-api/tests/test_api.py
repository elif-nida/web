VALID = {
    "name": "Ayşe Yılmaz",
    "email": "Ayse@Ornek.com",
    "type": "Web Uygulaması",
    "message": "E-ticaret sitemiz için bir yönetim paneli istiyoruz.",
    "consent": True,
}


def test_health(client):
    assert client.get("/api/health").get_json() == {"status": "ok"}


def test_contact_saves_message(client, auth):
    res = client.post("/api/contact", json=VALID)
    assert res.status_code == 201

    items = client.get("/api/admin/messages", headers=auth).get_json()["items"]
    assert len(items) == 1
    assert items[0]["email"] == "ayse@ornek.com"
    assert items[0]["status"] == "new"


def test_contact_validation(client):
    res = client.post("/api/contact", json={**VALID, "email": "gecersiz", "message": "kısa", "consent": False})
    assert res.status_code == 422
    assert set(res.get_json()["fields"]) == {"email", "message", "consent"}


def test_contact_rejects_non_json(client):
    assert client.post("/api/contact", data="merhaba").status_code == 400


def test_honeypot_is_not_saved(client, auth):
    assert client.post("/api/contact", json={**VALID, "website": "spam.com"}).status_code == 201
    assert client.get("/api/admin/messages", headers=auth).get_json()["total"] == 0


def test_contact_rate_limit(client):
    codes = [client.post("/api/contact", json=VALID).status_code for _ in range(6)]
    assert codes == [201] * 5 + [429]


def test_admin_requires_login(client):
    assert client.get("/api/admin/messages").status_code == 401
    assert client.get("/api/admin/messages", headers={"Authorization": "Bearer sahte"}).status_code == 401


def test_wrong_password(client):
    res = client.post("/api/admin/login", json={"email": "admin@pegesys.test", "password": "yanlis"})
    assert res.status_code == 401


def test_update_filter_and_delete(client, auth):
    client.post("/api/contact", json=VALID)
    client.post("/api/contact", json={**VALID, "name": "Mehmet Kaya", "type": "Mobil Uygulama"})
    first = client.get("/api/admin/messages?q=Mehmet", headers=auth).get_json()["items"]
    assert [m["name"] for m in first] == ["Mehmet Kaya"]

    msg_id = first[0]["id"]
    res = client.patch(f"/api/admin/messages/{msg_id}", json={"status": "read"}, headers=auth)
    assert res.get_json()["status"] == "read"
    assert client.patch(f"/api/admin/messages/{msg_id}", json={"status": "x"}, headers=auth).status_code == 422

    stats = client.get("/api/admin/stats", headers=auth).get_json()
    assert stats["total"] == 2 and stats["byStatus"]["read"] == 1 and stats["byStatus"]["new"] == 1

    assert client.get("/api/admin/messages?status=new", headers=auth).get_json()["total"] == 1
    assert client.delete(f"/api/admin/messages/{msg_id}", headers=auth).status_code == 204
    assert client.delete(f"/api/admin/messages/{msg_id}", headers=auth).status_code == 404


def test_cors_allows_site(client):
    res = client.post("/api/contact", json=VALID, headers={"Origin": "https://elif-nida.github.io"})
    assert res.headers.get("Access-Control-Allow-Origin") == "https://elif-nida.github.io"
    res = client.post("/api/contact", json=VALID, headers={"Origin": "https://kotu-site.com"})
    assert "Access-Control-Allow-Origin" not in res.headers
