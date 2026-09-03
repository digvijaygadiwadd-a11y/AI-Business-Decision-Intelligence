from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_end_to_end_csv_workflow():
    response = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    assert response.status_code == 200
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    csv_content = "Revenue,Category\n100,A\n200,B\n300,A\n10000,C"
    files = {"file": ("test_data.csv", csv_content, "text/csv")}
    upload_res = client.post("/api/upload", files=files, headers=headers)
    assert upload_res.status_code == 200
    
    nlp_res = client.post(
        "/api/nlp-query",
        json={"query": "Give me an analyst review on revenue anomalies"},
        headers=headers
    )
    assert nlp_res.status_code == 200
