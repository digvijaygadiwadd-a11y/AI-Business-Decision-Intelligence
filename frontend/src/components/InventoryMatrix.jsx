import React from "react";

export default function InventoryMatrix({ inventoryList }) {
  return (
    <div style={{ backgroundColor: "#090d16", border: "1px solid #1e293b", padding: "24px", borderRadius: "12px" }}>
      <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: "#cbd5e1" }}>Enterprise Inventory Matrix & SKU Stock Levels</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px", color: "#94a3b8" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e293b", color: "#cbd5e1" }}>
              <th style={{ padding: "12px" }}>Product Name</th>
              <th style={{ padding: "12px" }}>Category</th>
              <th style={{ padding: "12px" }}>Warehouse</th>
              <th style={{ padding: "12px" }}>Current Stock</th>
              <th style={{ padding: "12px" }}>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {inventoryList.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #0f172a" }}>
                <td style={{ padding: "12px", color: "#f8fafc", fontWeight: "500" }}>{item.product_name}</td>
                <td style={{ padding: "12px" }}>{item.category}</td>
                <td style={{ padding: "12px" }}>{item.warehouse_location}</td>
                <td style={{ padding: "12px", color: item.current_stock < 25 ? "#fb7185" : "#34d399", fontWeight: "bold" }}>{item.current_stock}</td>
                <td style={{ padding: "12px" }}>${item.unit_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}