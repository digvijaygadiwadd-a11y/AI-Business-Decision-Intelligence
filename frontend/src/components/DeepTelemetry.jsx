import React from "react";
import { Bar } from "react-chartjs-2";

export default function DeepTelemetry({ categoryData }) {
  return (
    <div style={{ backgroundColor: "#090d16", border: "1px solid #1e293b", padding: "24px", borderRadius: "12px" }}>
      <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: "#cbd5e1" }}>Detailed Financial & Operational Telemetry</h3>
      <div style={{ marginTop: "20px", height: "350px", position: "relative" }}>
        {categoryData.labels?.length > 0 ? (
          <Bar data={categoryData} options={{ responsive: true, maintainAspectRatio: false }} />
        ) : (
          <p style={{ color: "#64748b", fontSize: "13px" }}>Loading telemetry data...</p>
        )}
      </div>
    </div>
  );
}