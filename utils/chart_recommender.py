import pandas as pd
import numpy as np

def recommend_chart_type(df: pd.DataFrame):
    """Inspects schema to return the optimal visualization format."""
    if df is None or df.empty:
        return {"type": "none", "reason": "Empty dataset"}
    
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    datetime_cols = [col for col in df.columns if 'date' in col.lower() or 'time' in col.lower()]
    categorical_cols = df.select_dtypes(exclude=[np.number]).columns.tolist()
    
    if datetime_cols and numeric_cols:
        return {"chart_type": "line", "x_axis": datetime_cols[0], "y_axis": numeric_cols[0], "reason": "Time-series trend detected."}
    elif categorical_cols and numeric_cols:
        return {"chart_type": "bar", "x_axis": categorical_cols[0], "y_axis": numeric_cols[0], "reason": "Categorical distribution detected."}
    elif len(numeric_cols) >= 2:
        return {"chart_type": "scatter", "x_axis": numeric_cols[0], "y_axis": numeric_cols[1], "reason": "Dual numerical correlation detected."}
    elif len(numeric_cols) == 1:
        return {"chart_type": "histogram", "x_axis": numeric_cols[0], "y_axis": "frequency", "reason": "Single numerical distribution analysis."}
    
    return {"chart_type": "table", "reason": "Default tabular fallback view."}
