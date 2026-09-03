import io
import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_check():
    res = client.get("/")
    assert res.status_code == 200

def test_e2e_csv_upload_and_metrics_calculation():
    login_res = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    headers = {}
    if login_res.status_code == 200 and "access_token" in login_res.json():
        token = login_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

    csv_content = b"category,revenue\nA,100\nB,200\nC,300"
    files = {"file": ("test_airbnb.csv", io.BytesIO(csv_content), "text/csv")}
    
    upload_res = client.post("/api/upload", files=files, headers=headers)
    assert upload_res.status_code == 200
    
    metrics_res = client.get("/api/metrics", headers=headers)
    assert metrics_res.status_code == 200
    data = metrics_res.json()
    assert data.get("Total Records") == 3 and any("revenue" in k.lower() for k in data.keys())

