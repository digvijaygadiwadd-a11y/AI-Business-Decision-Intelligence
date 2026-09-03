from database.sql_db import SessionLocal
from database.models import DirectiveAuditLog, StockPredictionLog

db = SessionLocal()

logs = [
    DirectiveAuditLog(directive="Evaluate supply chain risk for Q3 components", user="admin", priority="HIGH", confidence_score=0.99),
    DirectiveAuditLog(directive="Check inventory levels for SKU-994", user="analyst", priority="MEDIUM", confidence_score=0.95),
]

predictions = [
    StockPredictionLog(current_stock=42, daily_burn_rate=10.0, stockout_probability=1.0, risk_level="CRITICAL"),
    StockPredictionLog(current_stock=200, daily_burn_rate=5.0, stockout_probability=0.1, risk_level="LOW"),
]

db.add_all(logs + predictions)
db.commit()
db.close()
print("Database successfully seeded with enterprise audit data.")
