# 1. Authenticate & Obtain Bearer Token
$auth = Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/auth/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"username":"admin","password":"admin123"}'

$headers = @{ Authorization = "Bearer $($auth.access_token)" }

Write-Host "`n=== Multi-Agent Orchestration Response ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/ai/orchestrate" `
  -Method Post `
  -Headers $headers `
  -ContentType "application/json" `
  -Body '{"directive":"Evaluate Q3 inventory levels and high risk components"}' | ConvertTo-Json -Depth 5

Write-Host "`n=== Predictive Stockout Forecast ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/ai/predict-stockout" `
  -Method Post `
  -Headers $headers `
  -ContentType "application/json" `
  -Body '{"current_stock":42,"daily_burn_rate":10.0,"lead_time_days":12}' | ConvertTo-Json -Depth 5

Write-Host "`n=== Relational Audit Logs ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/v1/audit/logs" -Method Get | ConvertTo-Json -Depth 5
