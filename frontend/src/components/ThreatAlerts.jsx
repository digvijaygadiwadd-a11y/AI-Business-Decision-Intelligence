import React from "react";

export default function ThreatAlerts({ inventoryList }) {
  const lowStockItems = inventoryList.filter(item => item.current_stock < 25);

  return (
    <div style={{ backgroundColor: "#090d16", border: "1px solid #1e293b", padding: "24px", borderRadius: "12px" }}>
      <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: "#fb7185" }}>🚨 Active Supply Chain Threat Matrix</h3>
      {lowStockItems.length === 0 ? (
        <p style={{ color: "#34d399", fontSize: "13px" }}>No active threats. All warehouse inventory levels are optimal.</p>
      ) : (
        lowStockItems.map((item, idx) => (
          <div key={idx} style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "16px", borderRadius: "8px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: "600", color: "#f8fafc", fontSize: "14px" }}>{item.product_name}</div>
              <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Location: {item.warehouse_location}</div>
            </div>
            <div style={{ background: "#ef4444", color: "#fff", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "700" }}>
              Stock: {item.current_stock}
            </div>
          </div>
        ))
      )}
    </div>
  );
}