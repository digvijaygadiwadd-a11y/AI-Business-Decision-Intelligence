from sqlalchemy import Column, Integer, String, DateTime, Float, Text
from datetime import datetime, timezone
from database.sql_db import Base, engine

class DirectiveAuditLog(Base):
    __tablename__ = "directive_audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    directive = Column(Text, nullable=False)
    user = Column(String(100), default="system")
    priority = Column(String(20), default="HIGH")
    confidence_score = Column(Float, default=0.98)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class StockPredictionLog(Base):
    __tablename__ = "stock_prediction_logs"

    id = Column(Integer, primary_key=True, index=True)
    current_stock = Column(Integer, nullable=False)
    daily_burn_rate = Column(Float, nullable=False)
    stockout_probability = Column(Float, nullable=False)
    risk_level = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

# Create tables automatically on import
Base.metadata.create_all(bind=engine)
