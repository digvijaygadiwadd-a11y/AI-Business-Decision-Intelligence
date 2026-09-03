import React, { useState } from "react";

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello Executive. I am your Apex AI Core. Ask me anything regarding revenue anomalies, cost-cutting measures, or inventory forecasts." }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal;
    setMessages(prev => [...prev, { sender: "user", text: userMsg }, { sender: "ai", text: "Analyzing operational matrices for: \"" + userMsg + "\"... Apex AI suggests optimizing regional throughput and reallocating capital reserves by 8% to mitigate variance risks." }]);
    setInputVal("");
  };

  return (
    <div style={{ backgroundColor: "#0b0f19", padding: "24px", borderRadius: "16px", border: "1px solid #1a2234", display: "flex", flexDirection: "column", height: "calc(100vh - 160px)", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #1a2234", paddingBottom: "16px" }}>
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff", margin: "0 0 4px 0" }}>Apex AI Neural Assistant</h3>
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Connected directly to live database matrices and predictive transformers.</p>
        </div>
        <span style={{ fontSize: "11px", fontWeight: "700", backgroundColor: "#1e293b", color: "#60a5fa", padding: "6px 12px", borderRadius: "8px", border: "1px solid #334155" }}>Apex-4o Enterprise Active</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px", paddingRight: "8px", marginBottom: "20px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", maxWidth: "75%", backgroundColor: msg.sender === "user" ? "#1e3a8a" : "#0f172a", padding: "14px 18px", borderRadius: "12px", border: "1px solid #1e293b" }}>
            <p style={{ fontSize: "10px", fontWeight: "700", color: msg.sender === "user" ? "#93c5fd" : "#38bdf8", margin: "0 0 6px 0", textTransform: "uppercase" }}>{msg.sender === "user" ? "Executive User" : "Apex AI Core"}</p>
            <p style={{ fontSize: "13px", color: "#f8fafc", margin: 0, lineHeight: "1.5" }}>{msg.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ display: "flex", gap: "12px" }}>
        <input 
          type="text" 
          value={inputVal} 
          onChange={e => setInputVal(e.target.value)} 
          placeholder="Ask anything (e.g. 'How can we optimize inventory costs in North-DC by 15%?')..." 
          style={{ flex: 1, padding: "14px 16px", backgroundColor: "#07090e", border: "1px solid #334155", borderRadius: "10px", color: "#fff", fontSize: "13px", outline: "none" }} 
        />
        <button type="submit" style={{ padding: "0 24px", backgroundColor: "#2563eb", color: "#fff", fontWeight: "700", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "13px" }}>
          Query Apex AI 🚀
        </button>
      </form>
    </div>
  );
}