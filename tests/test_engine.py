import pytest
import pandas as pd
import io
from core.engine import process_uploaded_file

def test_process_uploaded_file_csv():
    df_sample = pd.DataFrame({
        "Revenue": [100, 200, 300, 10000],
        "Category": ["A", "B", "A", "C"]
    })
    csv_bytes = df_sample.to_csv(index=False).encode('utf-8')
    result = process_uploaded_file(csv_bytes, "test_data.csv")
    
    assert result["schema"]["columns"] == ["revenue", "category"]
    assert result["profiling"]["total_rows"] == 4
    assert "total_revenue" in result["kpis"]
