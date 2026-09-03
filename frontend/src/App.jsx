import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [questionInput, setQuestionInput] = useState("What are our core business metrics and how do they trend across the latest dataset?");
  const [analysisResult, setAnalysisResult] = useState({
    insight: "",
    data_analysis: "",
    evidence: "",
    answer: ""
  });
  const [loading, setLoading] = useState(false);

  const handleRunAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/nlp-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionInput })
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult({
        insight: typeof data.insight === "object" ? JSON.stringify(data.insight, null, 2) : (data.insight || "No insight returned."),
        data_analysis: typeof data.data_analysis === "object" ? JSON.stringify(data.data_analysis, null, 2) : (data.data_analysis || "No data analysis returned."),
        evidence: typeof data.evidence === "object" ? JSON.stringify(data.evidence, null, 2) : (data.evidence || "No evidence recorded."),
        answer: typeof data.answer === "object" ? JSON.stringify(data.answer, null, 2) : (data.answer || "No answer provided.")
      });
    } catch (err) {
      console.error("API Error:", err);
      setAnalysisResult({
        insight: "Connection error to backend service.",
        data_analysis: "Check backend terminal logs for validation errors.",
        evidence: err.toString(),
        answer: "Failed to fetch."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Dynamic Question → Analysis → Evidence → Answer Pipeline</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          style={{ flex: 1, padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleRunAnalysis}
          disabled={loading}
          style={{ padding: "10px 20px", background: "#7c3aed", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          {loading ? "Running..." : "Run Analysis"}
        </button>
      </div>

      <div style={{ borderLeft: "4px solid #7c3aed", paddingLeft: "15px", background: "#f9f9f9", padding: "15px", borderRadius: "4px" }}>
        <p><strong>Insight:</strong> {analysisResult.insight}</p>
        <p><strong>Data Analysis:</strong> {analysisResult.data_analysis}</p>
        <p><strong>Evidence:</strong> {analysisResult.evidence}</p>
        <p><strong>Answer:</strong> {analysisResult.answer}</p>
      </div>
    </div>
  );
}
