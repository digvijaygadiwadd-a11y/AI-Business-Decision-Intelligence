import React from "react";

export default function DataIngestion({ selectedFile, setSelectedFile, handleFileUpload, uploadMessage }) {
  return (
    <div style={{ backgroundColor: "#090d16", border: "1px solid #1e293b", padding: "32px", borderRadius: "12px", maxWidth: "600px" }}>
      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#cbd5e1", marginBottom: "8px" }}>📂 Upload Custom CSV or Excel File</h3>
      <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "24px" }}>Instantly ingest new transactional records to update your database and charts.</p>
      
      <form onSubmit={handleFileUpload} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input 
          type="file" 
          accept=".csv, .xlsx, .xls" 
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ background: "#020617", border: "1px solid #334155", padding: "12px", borderRadius: "8px", color: "#f8fafc", fontSize: "13px" }}
        />
        <button type="submit" style={{ padding: "12px", background: "#3b82f6", color: "#fff", fontWeight: "600", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          Upload & Sync to Database
        </button>
      </form>
      {uploadMessage && <p style={{ marginTop: "16px", fontSize: "13px", color: uploadMessage.includes("success") ? "#34d399" : "#fb7185" }}>{uploadMessage}</p>}
    </div>
  );
}