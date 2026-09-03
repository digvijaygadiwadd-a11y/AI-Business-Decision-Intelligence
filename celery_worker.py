from celery import Celery
import os

# Configure Redis as the broker and backend (Free open-source message broker)
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "worker",
    broker=REDIS_URL,
    backend=REDIS_URL
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

@celery_app.task(bind=True, name="process_dataset_async")
def process_dataset_async(self, file_path: str):
    """
    Background worker task to process large enterprise datasets asynchronously,
    preventing API blocking and ensuring high throughput.
    """
    try:
        # Simulate heavy data transformation / analytics pre-computation
        import pandas as pd
        if file_path.endswith(".csv"):
            df = pd.read_csv(file_path)
        else:
            df = pd.read_excel(file_path)
            
        summary_stats = {
            "row_count": len(df),
            "column_count": len(df.columns),
            "columns": list(df.columns)
        }
        return {"status": "SUCCESS", "data": summary_stats}
    except Exception as e:
        return {"status": "FAILURE", "error": str(e)}
