// Frontend API Client Service for AI Business Decision Intelligence
const API_BASE_URL = "http://localhost:8000";

export async function fetchMetrics() {
  const response = await fetch(`${API_BASE_URL}/api/metrics`);
  return response.json();
}

export async function fetchKPIs() {
  const response = await fetch(`${API_BASE_URL}/api/kpis`);
  return response.json();
}

export async function fetchInventory() {
  const response = await fetch(`${API_BASE_URL}/api/inventory`);
  return response.json();
}

export async function submitNLPQuery(query: string) {
  const response = await fetch(`${API_BASE_URL}/api/nlp-query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return response.json();
}

export async function triggerBackgroundCheck() {
  const response = await fetch(`${API_BASE_URL}/api/tasks/trigger-background-check`, {
    method: "POST",
  });
  return response.json();
}