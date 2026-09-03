import { useState } from "react";

export default function AiAssistant() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Apex Neural Core online. Enter an enterprise query or request telemetry diagnostics." }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMsg = query;
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { sender: "ai", text: data.reply || "Diagnostic completed." }]);
    } catch {
      setMessages(prev => [...prev, { sender: "ai", text: "Connection error: Failed to reach neural cluster backend." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px", color: "#fff", background: "#0f172a", minHeight: "100vh", borderRadius: "12px", display: "flex", flexDirection: "column" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Apex Neural Core (Cloud LLM Gateway)</h2>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>Secure serverless enterprise intelligence engine.</p>

      <div style={{ flex: 1, background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "400px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", maxHeight: "350px", marginBottom: "16px" }}>
          {messages.map((m, idx) => (
            <div key={idx} style={{ alignSelf: m.sender === "user" ? "flex-end" : "flex-start", background: m.sender === "user" ? "#3b82f6" : "#0f172a", color: "#fff", padding: "12px 16px", borderRadius: "8px", maxWidth: "75%", border: "1px solid #334155", fontSize: "14px" }}>
              <span style={{ display: "block", fontSize: "11px", color: m.sender === "user" ? "#bfdbfe" : "#94a3b8", marginBottom: "4px" }}>{m.sender === "user" ? "Operator" : "Neural Core"}</span>
              {m.text}
            </div>
          ))}
          {loading && <div style={{ color: "#facc15", fontSize: "13px" }}>Processing inference stream...</div>}
        </div>

        <form onSubmit={handleSend} style={{ display: "flex", gap: "12px" }}>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask enterprise query (e.g., analyze system risk, optimize nodes)..." style={{ flex: 1, background: "#0f172a", border: "1px solid #334155", padding: "12px", borderRadius: "6px", color: "#fff", outline: "none" }} />
          <button type="submit" disabled={loading} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "0 20px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
            {loading ? "Analyzing..." : "Transmit"}
          </button>
        </form>
      </div>
    </div>
  );
}