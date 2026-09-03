import pandas as pd
import io
import numpy as np

def process_uploaded_file(file_bytes: bytes, filename: str):
    """Process an uploaded CSV or tabular file and return summary metrics, profiling, and KPIs."""
    if filename.endswith('.csv'):
        df = pd.read_csv(io.BytesIO(file_bytes))
    else:
        df = pd.DataFrame()
    
    cols = [c.lower() for c in df.columns]
    
    # Calculate total revenue dynamically if available
    total_rev = 0.0
    for col in df.columns:
        if col.lower() == 'revenue':
            total_rev = float(df[col].sum())
            break

    return {
        "status": "success",
        "filename": filename,
        "rows": len(df),
        "columns": cols,
        "schema": {
            "columns": cols
        },
        "profiling": {
            "total_rows": len(df)
        },
        "kpis": {
            "total_revenue": total_rev
        }
    }
