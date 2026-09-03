from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_pipeline_upload_and_nlp_query():
    login_res = client.post("/api/auth/login", data={"username": "admin", "password": "admin123"})
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    csv_content = "quarter,sales_revenue,profit_margin\nQ1,500000,20\nQ2,750000,25\nQ3,600000,22"
    files = {"file": ("test_data.csv", csv_content, "text/csv")}
    upload_res = client.post("/api/upload", files=files, headers=headers)
    assert upload_res.status_code == 200
