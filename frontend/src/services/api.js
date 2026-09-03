const API_BASE = "http://127.0.0.1:8000/api/v1";

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Authentication failed");
  return res.json();
}

export async function processDirective(directive, token) {
  const res = await fetch(`${API_BASE}/ai/orchestrate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ directive })
  });
  if (!res.ok) throw new Error("Failed to process directive");
  return res.json();
}

export async function predictStockout(stockData, token) {
  const res = await fetch(`${API_BASE}/ai/predict-stockout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(stockData)
  });
  if (!res.ok) throw new Error("Failed to run prediction");
  return res.json();
}

export async function fetchAuditLogs() {
  const res = await fetch(`${API_BASE}/audit/logs`);
  if (!res.ok) throw new Error("Failed to fetch audit logs");
  return res.json();
}
