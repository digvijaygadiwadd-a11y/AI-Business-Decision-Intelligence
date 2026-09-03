import React from "react";

export default function AiRecommendations({ aiReport }) {
  return (
    <div style={{ backgroundColor: "#090d16", border: "1px solid #1e293b", padding: "24px", borderRadius: "12px" }}>
      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#cbd5e1", marginBottom: "16px" }}>🤖 Autonomous Generative AI Advisory Suite</h3>
      <div dangerouslySetInnerHTML={{ __html: aiReport }} style={{ backgroundColor: "#020617", padding: "24px", borderRadius: "8px", border: "1px solid #1e293b", color: "#94a3b8", fontSize: "14px", lineHeight: "1.8" }} />
    </div>
  );
}