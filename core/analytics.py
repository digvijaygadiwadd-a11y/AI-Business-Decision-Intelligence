import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

def compute_forecast(values: list[float]) -> list[float]:
    if len(values) < 2:
        return values
    X = np.array(range(len(values))).reshape(-1, 1)
    y = np.array(values)
    model = LinearRegression()
    model.fit(X, y)
    
    # Predict next 3 steps
    future_X = np.array(range(len(values), len(values) + 3)).reshape(-1, 1)
    predictions = model.predict(future_X)
    return [float(p) for p in predictions]

def detect_anomalies(df: pd.DataFrame, column: str) -> list[int]:
    if column not in df.columns or not pd.api.types.is_numeric_dtype(df[column]):
        return []
    col_data = df[column].dropna()
    mean = col_data.mean()
    std = col_data.std()
    if std == 0 or pd.isna(std):
        return []
    z_scores = (col_data - mean) / std
    anomaly_indices = np.where(np.abs(z_scores) > 2.0)[0]
    return [int(i) for i in anomaly_indices]
