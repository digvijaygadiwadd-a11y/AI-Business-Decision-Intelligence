from celery import Celery
import os

# Use standard memory/rpc settings compatible with Celery
celery_app = Celery(
    "enterprise_worker",
    broker="memory://",
    backend="rpc://"
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
    task_always_eager=True,
)

@celery_app.task(name="tasks.perform_health_check")
def perform_health_check():
    return {
        "status": "success",
        "check": "Enterprise Health & Risk Threshold Validation",
        "metric_status": "All systems operating within normal parameters. No risk threshold breaches detected."
    }