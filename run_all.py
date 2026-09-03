import requests

BASE_URL = "http://127.0.0.1:8000"

print("1. Authenticating via /api/v1/auth/login...")
login_res = requests.post(f"{BASE_URL}/api/v1/auth/login", json={"username": "admin", "password": "admin123"})
token = login_res.json()["access_token"]
print("Authentication Successful! Token acquired.")

headers = {"Authorization": f"Bearer {token}"}

print("\n2. Uploading test dataset...")
with open("test_data.csv", "rb") as f:
    files = {"file": ("test_data.csv", f, "text/csv")}
    upload_res = requests.post(f"{BASE_URL}/api/v1/data/upload", headers=headers, files=files)
print(upload_res.json())

print("\n3. Fetching Dynamic KPIs...")
kpis_res = requests.get(f"{BASE_URL}/api/v1/kpis", headers=headers)
print(kpis_res.json())

print("\n4. Running AI Analysis & SQL Pipeline...")
ai_res = requests.post(f"{BASE_URL}/api/v1/ai/analyze", headers=headers, json={"query": "Summarize revenue by category"})
print(ai_res.json())

print("\nAll operations executed successfully from PowerShell!")
