from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200

def test_get_metrics_unauthorized():
    response = client.get("/api/metrics")
    assert response.status_code == 401

def test_auth_login_success():
    response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_get_metrics_authorized():
    login_res = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    token = login_res.json()["access_token"]
    response = client.get("/api/metrics", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert "Total Records" in response.json()

def test_nlp_query_endpoint():
    login_res = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    token = login_res.json()["access_token"]
    response = client.post(
        "/api/nlp-query",
        json={"query": "Why did revenue fall in July?"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert "agent_insights" in response.json()

def test_v1_metrics_endpoint():
    login_res = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    token = login_res.json()["access_token"]
    response = client.get("/api/v1/metrics", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert "Total Records" in response.json() or "Message" in response.json()

